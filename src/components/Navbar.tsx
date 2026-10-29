/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameState } from '../types';
import { formatCurrency, formatPercent, formatMonthYear, krToUsd } from '../game/financeLogic';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  FastForward,
  Award,
  HelpCircle,
  RotateCcw,
  ArrowRightLeft,
  BookOpen,
} from 'lucide-react';

interface NavbarProps {
  gameState: GameState;
  portfolioValue: number;
  totalNetWorth: number;
  totalProfitAmount: number;
  totalProfitPercent: number;
  onNextMonth: () => void;
  onAdvanceMonths: (count: number) => void;
  onOpenGuide: () => void;
  onOpenDictionary: () => void;
  onOpenConverter: () => void;
  onEndGameEarly: () => void;
  onResetGame: () => void;
  unreadNewsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  gameState,
  portfolioValue,
  totalNetWorth,
  totalProfitAmount,
  totalProfitPercent,
  onNextMonth,
  onAdvanceMonths,
  onOpenGuide,
  onOpenDictionary,
  onOpenConverter,
  onEndGameEarly,
  onResetGame,
  unreadNewsCount,
}) => {
  const isProfitable = totalProfitAmount >= 0;
  const progressPercent = Math.min(100, Math.round((gameState.currentMonth / 60) * 100));

  const cashUsd = krToUsd(gameState.cash);
  const netWorthUsd = krToUsd(totalNetWorth);
  const stockUsd = krToUsd(portfolioValue);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner with HUD */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Month Indicator */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded text-sm sm:text-base tracking-wider uppercase flex items-center gap-1.5 shadow">
              <span>BUFFETT WAY</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-emerald-400">
                  {formatMonthYear(gameState.currentMonth)}
                </span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  {gameState.currentMonth}/60 tháng
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-32 sm:w-44 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Key Financial Metrics with Dual USD Previews */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
            {/* Cash */}
            <div className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span>Tiền mặt</span>
                  <span className="text-emerald-400 font-semibold">(~${Math.round(cashUsd)})</span>
                </div>
                <div className="font-semibold text-slate-100">{formatCurrency(gameState.cash)}</div>
              </div>
            </div>

            {/* Portfolio Value */}
            <div className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span>Cổ phiếu</span>
                  <span className="text-blue-400 font-semibold">(~${Math.round(stockUsd)})</span>
                </div>
                <div className="font-semibold text-slate-100">{formatCurrency(portfolioValue)}</div>
              </div>
            </div>

            {/* Total Net Worth & Profit/Loss */}
            <div className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
              {isProfitable ? (
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span>Tổng tài sản</span>
                  <span className="text-amber-400 font-semibold">(~${Math.round(netWorthUsd)})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-100">{formatCurrency(totalNetWorth)}</span>
                  <span
                    className={`font-semibold text-xs px-1.5 py-0.2 rounded ${
                      isProfitable ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                    }`}
                  >
                    {formatPercent(totalProfitPercent)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Controls & Assistance Tools */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Quick Currency Converter Button */}
            <button
              onClick={onOpenConverter}
              className="bg-slate-800 hover:bg-slate-700 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-2.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Quy đổi mệnh giá Kr sang USD và VNĐ"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Quy đổi Kr/USD</span>
              <span className="sm:hidden">Kr/USD</span>
            </button>

            {/* F0 Beginner Dictionary Button */}
            <button
              onClick={onOpenDictionary}
              className="bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 text-xs font-semibold px-2.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Từ điển giải thích thuật ngữ tài chính dễ hiểu cho người mới"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Từ điển F0</span>
              <span className="sm:hidden">Từ điển</span>
            </button>

            {/* Advance Next Month */}
            <button
              onClick={onNextMonth}
              disabled={gameState.currentMonth >= 60 || gameState.gameEnded}
              className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 shadow transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Cập nhật giá và tin tức sang tháng tiếp theo"
            >
              <FastForward className="w-4 h-4" />
              <span>Sang tháng ({gameState.currentMonth < 60 ? gameState.currentMonth + 1 : 60})</span>
            </button>

            {/* Jump 6 Months */}
            {gameState.currentMonth <= 54 && !gameState.gameEnded && (
              <button
                onClick={() => onAdvanceMonths(6)}
                className="hidden lg:flex bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-2.5 py-2 rounded-lg transition-colors cursor-pointer"
                title="Tua nhanh 6 tháng để theo dõi hiệu quả dài hạn"
              >
                +6 tháng
              </button>
            )}

            {/* Guide */}
            <button
              onClick={onOpenGuide}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sổ tay triết lý Warren Buffett"
              aria-label="Sổ tay Warren Buffett"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* End Game / Summary */}
            <button
              onClick={onEndGameEarly}
              className="bg-amber-600/90 hover:bg-amber-500 text-slate-950 text-xs font-bold px-2.5 sm:px-3 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              title="Tổng kết và xem đánh giá xếp hạng Buffett"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tổng kết</span>
            </button>

            {/* Reset */}
            <button
              onClick={onResetGame}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Chơi lại ván mới"
              aria-label="Chơi lại ván mới"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
