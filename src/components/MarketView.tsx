/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Company, SectorType } from '../types';
import { ALL_SECTORS } from '../data/marketData';
import { formatCurrency, formatPercent, krToUsd } from '../game/financeLogic';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Filter,
  ChevronRight,
  Activity,
  HelpCircle,
  Eye,
  Check,
  Star,
} from 'lucide-react';

interface MarketViewProps {
  companies: Company[];
  currentMonth: number;
  benchmarkIndex: number;
  benchmarkReturnPercent: number;
  onSelectCompany: (companyId: string) => void;
  userInterestedSectors: SectorType[];
  onOpenDictionary?: () => void;
  onOpenConverter?: () => void;
  watchlist: string[];
  onToggleWatchlist: (companyId: string) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  companies,
  currentMonth,
  benchmarkIndex,
  benchmarkReturnPercent,
  onSelectCompany,
  userInterestedSectors,
  onOpenDictionary,
  onOpenConverter,
  watchlist,
  onToggleWatchlist,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'ticker' | 'price' | 'change' | 'roe' | 'pe'>('ticker');
  const [sortAsc, setSortAsc] = useState(true);
  const [showUsdPreview, setShowUsdPreview] = useState(true);

  const mIndex = Math.max(0, Math.min(59, currentMonth - 1));
  const prevMonthIndex = Math.max(0, mIndex - 1);
  const currentYear = Math.floor((currentMonth - 1) / 12) + 1;

  // Filtered and sorted companies
  const filteredCompanies = companies.filter((c) => {
    const matchesSector = selectedSector === 'ALL' || c.sector === selectedSector;
    const matchesQuery =
      c.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWatchlist = !showWatchlistOnly || watchlist.includes(c.id);
    return matchesSector && matchesQuery && matchesWatchlist;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const priceA = a.historicalMonthlyPrices[mIndex] || 1;
    const priceB = b.historicalMonthlyPrices[mIndex] || 1;

    const prevPriceA = a.historicalMonthlyPrices[prevMonthIndex] || priceA;
    const prevPriceB = b.historicalMonthlyPrices[prevMonthIndex] || priceB;

    const changeA = prevPriceA > 0 ? ((priceA - prevPriceA) / prevPriceA) * 100 : 0;
    const changeB = prevPriceB > 0 ? ((priceB - prevPriceB) / prevPriceB) * 100 : 0;

    // Latest available financial report up to current year
    const finA = a.financials[Math.min(a.financials.length - 1, currentYear - 1)];
    const finB = b.financials[Math.min(b.financials.length - 1, currentYear - 1)];

    let result = 0;
    if (sortBy === 'ticker') {
      result = a.ticker.localeCompare(b.ticker);
    } else if (sortBy === 'price') {
      result = priceA - priceB;
    } else if (sortBy === 'change') {
      result = changeA - changeB;
    } else if (sortBy === 'roe') {
      result = (finA?.roe || 0) - (finB?.roe || 0);
    } else if (sortBy === 'pe') {
      const peA = finA && finA.eps > 0 ? priceA / finA.eps : 999;
      const peB = finB && finB.eps > 0 ? priceB / finB.eps : 999;
      result = peA - peB;
    }

    return sortAsc ? result : -result;
  });

  const handleSort = (field: 'ticker' | 'price' | 'change' | 'roe' | 'pe') => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false); // Default descending for metrics
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Benchmark Index Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Chỉ số Thị trường Chung (Boreal Composite Index)
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-white">{benchmarkIndex.toFixed(1)}</span>
              <span
                className={`text-sm font-bold flex items-center gap-0.5 ${
                  benchmarkReturnPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {benchmarkReturnPercent >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {formatPercent(benchmarkReturnPercent)} (kể từ Năm 1)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenConverter && (
            <button
              onClick={onOpenConverter}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>10 Kr ≈ $1 USD</span>
            </button>
          )}

          {onOpenDictionary && (
            <button
              onClick={onOpenDictionary}
              className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Từ điển F0</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL AREA - REDESIGNED TO PREVENT CUTOFF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5 shadow-sm">
        {/* Row 1: Search & Quick Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã cổ phiếu (VIKING, BOREAL...), tên công ty hoặc ngành..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            {/* Toggle Watchlist Filter */}
            <button
              type="button"
              onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
              className={`px-3 py-2 rounded-lg font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showWatchlistOnly
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Chỉ hiển thị các công ty đang theo dõi"
            >
              <Star className={`w-3.5 h-3.5 ${showWatchlistOnly ? 'fill-current' : ''}`} />
              <span>{showWatchlistOnly ? `Đang theo dõi (${watchlist.length})` : 'Xem theo dõi'}</span>
            </button>

            {/* Toggle Dual Currency Preview */}
            <button
              type="button"
              onClick={() => setShowUsdPreview(!showUsdPreview)}
              className={`px-3 py-2 rounded-lg font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showUsdPreview
                  ? 'bg-slate-800 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Bật/tắt hiển thị quy đổi USD ước tính"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showUsdPreview ? 'Đang hiện giá USD' : 'Ẩn giá USD'}</span>
            </button>
          </div>
        </div>

        {/* Row 2: All Sectors Filter Tabs - WRAPPED TO PREVENT CUTTING OFF */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Lọc theo lĩnh vực kinh doanh:</span>
          </div>

          {/* Fully wrapable grid/flex pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedSector('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSector === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow ring-1 ring-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Tất cả ngành ({companies.length})
            </button>

            {ALL_SECTORS.map((sector) => {
              const count = companies.filter((c) => c.sector === sector).length;
              const isSelected = selectedSector === sector;
              const isUserPref = userInterestedSectors.includes(sector);

              return (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow ring-1 ring-amber-400'
                      : isUserPref
                      ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40 hover:bg-slate-700'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{sector}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-900/30 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800 font-semibold tracking-wider">
              <tr>
                <th
                  onClick={() => handleSort('ticker')}
                  className="py-3 px-4 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Mã / Doanh nghiệp</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-3">Ngành</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-3 cursor-pointer hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Giá hiện tại</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('change')}
                  className="py-3 px-3 cursor-pointer hover:text-white text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Biến động</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('pe')}
                  className="py-3 px-3 cursor-pointer hover:text-white text-right hidden sm:table-cell"
                >
                  <div className="flex items-center justify-end gap-1" title="P/E: Giá / Lợi nhuận (Bao nhiêu năm hoàn vốn?)">
                    <span>P/E (Đắt/Rẻ)</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('roe')}
                  className="py-3 px-3 cursor-pointer hover:text-white text-right hidden md:table-cell"
                >
                  <div className="flex items-center justify-end gap-1" title="ROE: Tỷ suất sinh lời trên vốn (Cỗ máy in tiền có khỏe không?)">
                    <span>ROE (Sinh lời %)</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right hidden lg:table-cell" title="Cổ tức tiền mặt chia hàng năm">
                  Cổ tức (%)
                </th>
                <th className="py-3 px-3 text-center">Theo dõi</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedCompanies.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    Không tìm thấy cổ phiếu nào phù hợp với bộ lọc & từ khóa.
                  </td>
                </tr>
              ) : (
                sortedCompanies.map((company) => {
                  const currentPrice = company.historicalMonthlyPrices[mIndex] || 1;
                  const prevPrice = company.historicalMonthlyPrices[prevMonthIndex] || currentPrice;
                  const monthChange =
                    prevPrice > 0 ? ((currentPrice - prevPrice) / prevPrice) * 100 : 0;
                  const isUp = monthChange >= 0;

                  const fin = company.financials[Math.min(company.financials.length - 1, currentYear - 1)];
                  const pe = fin && fin.eps > 0 ? (currentPrice / fin.eps).toFixed(1) : 'Âm/Lỗ';
                  const divYield = fin && currentPrice > 0 ? ((fin.dividendPerShare / currentPrice) * 100).toFixed(1) : '0';
                  const approxUsd = krToUsd(currentPrice);
                  const isWatched = watchlist.includes(company.id);

                  return (
                    <tr
                      key={company.id}
                      onClick={() => onSelectCompany(company.id)}
                      className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      {/* Ticker & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-base group-hover:text-amber-400 transition-colors">
                            {company.ticker}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {company.marketCapCategory}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-xs">{company.name}</div>
                      </td>

                      {/* Sector */}
                      <td className="py-3.5 px-3">
                        <span className="text-xs text-slate-300 bg-slate-800/80 px-2 py-1 rounded">
                          {company.sector}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="font-bold text-white text-sm">
                          {formatCurrency(currentPrice)}
                        </div>
                        {showUsdPreview && (
                          <div className="text-[11px] text-emerald-400 font-medium">
                            ~${approxUsd} USD
                          </div>
                        )}
                      </td>

                      {/* Month Change */}
                      <td className="py-3.5 px-3 text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded ${
                            isUp
                              ? 'bg-emerald-950/60 text-emerald-400'
                              : 'bg-rose-950/60 text-rose-400'
                          }`}
                        >
                          {isUp ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {formatPercent(monthChange)}
                        </span>
                      </td>

                      {/* P/E */}
                      <td className="py-3.5 px-3 text-right text-xs hidden sm:table-cell">
                        <span className={pe === 'Âm/Lỗ' ? 'text-rose-400 font-semibold' : 'text-slate-200 font-mono font-medium'}>
                          {pe}
                        </span>
                      </td>

                      {/* ROE */}
                      <td className="py-3.5 px-3 text-right text-xs hidden md:table-cell">
                        <span
                          className={`font-semibold font-mono ${
                            (fin?.roe || 0) >= 20
                              ? 'text-emerald-400'
                              : (fin?.roe || 0) > 10
                              ? 'text-slate-200'
                              : 'text-amber-400'
                          }`}
                        >
                          {fin?.roe ? `${fin.roe.toFixed(1)}%` : '--'}
                        </span>
                      </td>

                      {/* Dividend Yield */}
                      <td className="py-3.5 px-3 text-right text-xs text-slate-300 font-mono hidden lg:table-cell">
                        {divYield}%
                      </td>

                      {/* Watchlist */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(company.id);
                          }}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isWatched
                              ? 'text-amber-400 hover:text-amber-300'
                              : 'text-slate-500 hover:text-amber-400'
                          }`}
                          title={isWatched ? 'Bỏ theo dõi' : 'Theo dõi công ty này'}
                        >
                          <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCompany(company.id);
                          }}
                          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Phân tích</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
