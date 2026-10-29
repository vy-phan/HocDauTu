/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatMonthYear,
  calculateTradeFee,
  validateBuyOrder,
  validateSellOrder,
  executeBuyOrder,
  executeSellOrder,
  calculateHoldingPL,
  calculateTotalAccountStats,
} from './financeLogic';
import { Holding } from '../types';

test('formatMonthYear formats 1 to 60 correctly', () => {
  assert.equal(formatMonthYear(1), 'Năm 1 - Tháng 1');
  assert.equal(formatMonthYear(12), 'Năm 1 - Tháng 12');
  assert.equal(formatMonthYear(13), 'Năm 2 - Tháng 1');
  assert.equal(formatMonthYear(24), 'Năm 2 - Tháng 12');
  assert.equal(formatMonthYear(60), 'Năm 5 - Tháng 12');
});

test('calculateTradeFee computes 0.2% fee correctly', () => {
  assert.equal(calculateTradeFee(100, 100), 20); // 10,000 * 0.002 = 20
  assert.equal(calculateTradeFee(50, 12.5), 1.25);
  assert.equal(calculateTradeFee(0, 50), 0);
});

test('validateBuyOrder checks funds, integers and edge cases', () => {
  // Invalid shares
  assert.equal(validateBuyOrder(10000, 0, 100).isValid, false);
  assert.equal(validateBuyOrder(10000, -5, 100).isValid, false);
  assert.equal(validateBuyOrder(10000, 1.5, 100).isValid, false);

  // Insufficient cash
  // buying 100 shares @ 100 = 10,000 + 20 fee = 10,020. Cash is 10,000
  const fail = validateBuyOrder(10000, 100, 100);
  assert.equal(fail.isValid, false);
  assert.ok(fail.error?.includes('Số dư tiền mặt không đủ'));

  // Sufficient cash
  const pass = validateBuyOrder(10020, 100, 100);
  assert.equal(pass.isValid, true);
  assert.equal(pass.fee, 20);
  assert.equal(pass.totalRequired, 10020);
});

test('validateSellOrder checks holdings, shares and edge cases', () => {
  // Selling 0 or negative
  assert.equal(validateSellOrder(100, 0, 50).isValid, false);
  assert.equal(validateSellOrder(100, -10, 50).isValid, false);
  assert.equal(validateSellOrder(100, 10.5, 50).isValid, false);

  // Selling more than held
  const fail = validateSellOrder(50, 60, 100);
  assert.equal(fail.isValid, false);
  assert.ok(fail.error?.includes('Không thể bán quá số lượng'));

  // Valid sell
  const pass = validateSellOrder(50, 20, 100);
  assert.equal(pass.isValid, true);
  assert.equal(pass.grossAmount, 2000);
  assert.equal(pass.fee, 4);
  assert.equal(pass.netProceeds, 1996);
});

test('executeBuyOrder correctly deducts cash and averages price', () => {
  const initialCash = 50000;
  const portfolio: Record<string, Holding> = {};

  // First Buy: 100 shares of FJORD @ 100 Kr. Fee: 20 Kr. Total cash deducted: 10,020 Kr.
  const buy1 = executeBuyOrder(initialCash, portfolio, 'FJORD', 'Fjord Petroleum', 100, 100, 1);
  assert.equal(buy1.newCash, 39980);
  assert.equal(buy1.newPortfolio['FJORD'].shares, 100);
  assert.equal(buy1.newPortfolio['FJORD'].averagePrice, 100);
  assert.equal(buy1.newPortfolio['FJORD'].totalCost, 10000);

  // Second Buy: 100 more shares @ 150 Kr. Fee: 30 Kr. Total cost added: 15,000 Kr. Total shares: 200. Avg price: 125 Kr.
  const buy2 = executeBuyOrder(buy1.newCash, buy1.newPortfolio, 'FJORD', 'Fjord Petroleum', 100, 150, 2);
  assert.equal(buy2.newCash, 39980 - 15030); // 24,950
  assert.equal(buy2.newPortfolio['FJORD'].shares, 200);
  assert.equal(buy2.newPortfolio['FJORD'].averagePrice, 125);
  assert.equal(buy2.newPortfolio['FJORD'].totalCost, 25000);
});

test('executeSellOrder adds cash with profit/loss and adjusts portfolio', () => {
  const initialCash = 10000;
  const portfolio: Record<string, Holding> = {
    FJORD: {
      ticker: 'FJORD',
      companyName: 'Fjord Petroleum',
      shares: 100,
      averagePrice: 100,
      totalCost: 10000,
    },
  };

  // Sell 40 shares @ 150 Kr. Gross: 6,000 Kr. Fee: 12 Kr. Net cash added: 5,988 Kr.
  // Remaining shares: 60. Remaining cost: 6,000 Kr. Realized P/L: 6000 - 4000 - 12 = 1988 Kr.
  const sell1 = executeSellOrder(initialCash, portfolio, 'FJORD', 'Fjord Petroleum', 40, 150, 3);
  assert.equal(sell1.newCash, 15988);
  assert.equal(sell1.newPortfolio['FJORD'].shares, 60);
  assert.equal(sell1.newPortfolio['FJORD'].totalCost, 6000);
  assert.equal(sell1.realizedPL, 1988);

  // Sell remaining 60 shares @ 80 Kr (loss). Gross: 4,800 Kr. Fee: 9.6 Kr. Net: 4790.4 Kr.
  // Cost was 6000. Realized P/L: 4800 - 6000 - 9.6 = -1209.6 Kr.
  const sell2 = executeSellOrder(sell1.newCash, sell1.newPortfolio, 'FJORD', 'Fjord Petroleum', 60, 80, 4);
  assert.equal(sell2.newPortfolio['FJORD'], undefined); // position closed
  assert.equal(sell2.realizedPL, -1209.6);
  assert.equal(sell2.newCash, 15988 + 4790.4);
});

test('calculateHoldingPL and calculateTotalAccountStats math is exact', () => {
  const holding: Holding = {
    ticker: 'TEST',
    companyName: 'Test Co',
    shares: 100,
    averagePrice: 50,
    totalCost: 5000,
  };

  // Current price = 75 (+50%)
  const pl1 = calculateHoldingPL(holding, 75);
  assert.equal(pl1.currentValue, 7500);
  assert.equal(pl1.profitAmount, 2500);
  assert.equal(pl1.profitPercent, 50);

  // Total stats
  const totalStats = calculateTotalAccountStats(50000, 45000, 7500);
  assert.equal(totalStats.totalNetWorth, 52500);
  assert.equal(totalStats.totalProfitAmount, 2500);
  assert.equal(totalStats.totalProfitPercent, 5);
});
