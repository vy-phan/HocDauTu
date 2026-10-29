/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Company, Holding } from '../types';
import { formatCurrency, formatPercent, calculateHoldingPL } from '../game/financeLogic';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Briefcase, ChevronRight } from 'lucide-react';

interface PortfolioViewProps {
  portfolio: Record<string, Holding>;
  companies: Company[];
  currentMonth: number;
  cash: number;
  initialCapital: number;
  onSelectCompany: (companyId: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  portfolio,
  companies,
  currentMonth,
  cash,
  initialCapital,
  onSelectCompany,
}) => {
  const mIndex = Math.max(0, Math.min(59, currentMonth - 1));
  const holdingsList = Object.values(portfolio);

  const companyMap = new Map<string, Company>();
  companies.forEach((c) => companyMap.set(c.ticker, c));

  let totalStockValue = 0;
  let totalStockCost = 0;

  const holdingsWithMetrics = holdingsList.map((holding) => {
    const comp = companyMap.get(holding.ticker);
    const currentPrice = comp ? comp.historicalMonthlyPrices[mIndex] || holding.averagePrice : holding.averagePrice;
    const pl = calculateHoldingPL(holding, currentPrice);

    totalStockValue += pl.currentValue;
    totalStockCost += holding.totalCost;

    return {
      ...holding,
      companyId: comp?.id || '',
      sector: comp?.sector || 'Khác',
      currentPrice,
      ...pl,
    };
  });

  const totalPortfolioPL = totalStockValue - totalStockCost;
  const totalPortfolioPLPercent = totalStockCost > 0 ? (totalPortfolioPL / totalStockCost) * 100 : 0;
  const totalNetWorth = cash + totalStockValue;

  // Sector Allocation Breakdown
  const sectorAlloc: Record<string, number> = {};
  holdingsWithMetrics.forEach((h) => {
    sectorAlloc[h.sector] = (sectorAlloc[h.sector] || 0) + h.currentValue;
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Net Worth */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">Tổng tài sản ròng</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">{formatCurrency(totalNetWorth)}</div>
          <div className="text-xs text-slate-400 mt-1">
            Vốn ban đầu: <span className="font-semibold">{formatCurrency(initialCapital)}</span>
          </div>
        </div>

        {/* Total Stock Value */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">Giá trị cổ phiếu</span>
            <PieChart className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">{formatCurrency(totalStockValue)}</div>
          <div className="text-xs text-slate-400 mt-1">
            Tỷ trọng: <span className="font-semibold">{totalNetWorth > 0 ? ((totalStockValue / totalNetWorth) * 100).toFixed(1) : 0}%</span> tài sản
          </div>
        </div>

        {/* Cash Balance */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">Tiền mặt khả dụng</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">{formatCurrency(cash)}</div>
          <div className="text-xs text-slate-400 mt-1">
            Tỷ trọng tiền mặt: <span className="font-semibold">{totalNetWorth > 0 ? ((cash / totalNetWorth) * 100).toFixed(1) : 100}%</span>
          </div>
        </div>

        {/* Unrealized Portfolio P/L */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="uppercase tracking-wider font-semibold">Lãi / Lỗ danh mục</span>
            {totalPortfolioPL >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div className={`text-xl sm:text-2xl font-black ${totalPortfolioPL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(totalPortfolioPL)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Tỷ suất: <span className={`font-semibold ${totalPortfolioPL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{formatPercent(totalPortfolioPLPercent)}</span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm sm:text-base">
              Danh sách cổ phiếu đang sở hữu ({holdingsList.length})
            </h3>
          </div>
        </div>

        {holdingsList.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <p className="text-sm">Bạn chưa sở hữu cổ phiếu nào trong danh mục.</p>
            <p className="text-xs text-slate-600">
              Hãy chuyển sang mục &ldquo;Thị trường&rdquo; để nghiên cứu báo cáo tài chính và tìm kiếm cơ hội tốt!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/70 text-xs uppercase text-slate-400 border-b border-slate-800 font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Mã CP</th>
                  <th className="py-3 px-3">Tên công ty</th>
                  <th className="py-3 px-3 text-right">Số lượng</th>
                  <th className="py-3 px-3 text-right">Giá vốn TB</th>
                  <th className="py-3 px-3 text-right">Giá hiện tại</th>
                  <th className="py-3 px-3 text-right">Tổng giá trị</th>
                  <th className="py-3 px-3 text-right">Lãi / Lỗ</th>
                  <th className="py-3 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {holdingsWithMetrics.map((h) => {
                  const isProfit = h.profitAmount >= 0;
                  return (
                    <tr
                      key={h.ticker}
                      onClick={() => onSelectCompany(h.companyId)}
                      className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-sans font-bold text-white group-hover:text-amber-400">
                        {h.ticker}
                      </td>
                      <td className="py-3.5 px-3 font-sans text-xs text-slate-300 truncate max-w-xs">
                        {h.companyName}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-200">{h.shares.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-right text-slate-400">{formatCurrency(h.averagePrice)}</td>
                      <td className="py-3.5 px-3 text-right font-bold text-white">{formatCurrency(h.currentPrice)}</td>
                      <td className="py-3.5 px-3 text-right font-bold text-slate-100">{formatCurrency(h.currentValue)}</td>
                      <td className="py-3.5 px-3 text-right">
                        <div className={`font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {formatCurrency(h.profitAmount)}
                        </div>
                        <div className={`text-xs ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {formatPercent(h.profitPercent)}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCompany(h.companyId);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Giao dịch</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sector Allocation Breakdown Bar */}
      {holdingsList.length > 0 && totalStockValue > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
          <h4 className="font-bold text-white text-sm">Phân bổ danh mục theo ngành</h4>
          <div className="w-full bg-slate-950 h-3 rounded-full flex overflow-hidden">
            {Object.entries(sectorAlloc).map(([sec, val], idx) => {
              const pct = (val / totalStockValue) * 100;
              const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-orange-500'];
              return (
                <div
                  key={sec}
                  style={{ width: `${pct}%` }}
                  className={`${colors[idx % colors.length]} transition-all`}
                  title={`${sec}: ${pct.toFixed(1)}%`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            {Object.entries(sectorAlloc).map(([sec, val], idx) => {
              const pct = (val / totalStockValue) * 100;
              const textColors = ['text-emerald-400', 'text-blue-400', 'text-amber-400', 'text-purple-400', 'text-pink-400', 'text-cyan-400', 'text-orange-400'];
              return (
                <div key={sec} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${textColors[idx % textColors.length]} bg-current`} />
                  <span className="text-slate-300">{sec}:</span>
                  <span className="font-semibold text-white">{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
