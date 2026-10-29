/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NewsItem } from '../types';
import { formatMonthYear } from '../game/financeLogic';
import {
  Newspaper,
  Search,
  Globe,
  Building2,
  Flame,
  AlertCircle,
  ChevronRight,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';

interface NewsViewProps {
  newsList: NewsItem[];
  currentMonth: number;
  onSelectCompanyByTicker?: (ticker: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  newsList,
  currentMonth,
  onSelectCompanyByTicker,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Only news released on or before currentMonth, sorted newest first
  const visibleNews = newsList
    .filter((n) => n.month <= currentMonth)
    .sort((a, b) => b.month - a.month);

  const macroCount = visibleNews.filter((n) => n.category === 'Vĩ mô').length;
  const sectorCount = visibleNews.filter((n) => n.category === 'Ngành').length;
  const companyCount = visibleNews.filter((n) => n.category === 'Doanh nghiệp').length;
  const rumorCount = visibleNews.filter((n) => n.isNoiseOrRumor).length;

  const filteredNews = visibleNews.filter((n) => {
    let matchesFilter = true;
    if (selectedFilter === 'Vĩ mô') matchesFilter = n.category === 'Vĩ mô';
    else if (selectedFilter === 'Ngành') matchesFilter = n.category === 'Ngành';
    else if (selectedFilter === 'Doanh nghiệp') matchesFilter = n.category === 'Doanh nghiệp';
    else if (selectedFilter === 'Tin đồn') matchesFilter = !!n.isNoiseOrRumor;

    const matchesQuery =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.companyName && n.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.ticker && n.ticker.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-5">
      {/* Buffett Guidance Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-4 flex items-start gap-3 shadow-sm">
        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-400">Lời khuyên Warren Buffett về thông tin: </span>
          &ldquo;Phần lớn tin tức giật gân hàng ngày chỉ là tiếng ồn (noise) gây hoang mang hoặc kích thích lòng tham. Người đầu tư giá trị luôn tập trung vào kết quả kinh doanh cốt lõi và lợi thế cạnh tranh dài hạn của công ty.&rdquo;
        </div>
      </div>

      {/* Search and Wrapped Category Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tin tức theo từ khóa, ngành hoặc mã cổ phiếu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Filter Pills with Wrap */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 border-t border-slate-800/80">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === 'ALL'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tất cả bản tin ({visibleNews.length})
          </button>

          <button
            onClick={() => setSelectedFilter('Vĩ mô')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'Vĩ mô'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'bg-slate-800 text-blue-300 hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Kinh tế Vĩ mô ({macroCount})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('Ngành')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'Ngành'
                ? 'bg-purple-600 text-white font-bold shadow'
                : 'bg-slate-800 text-purple-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Ngành nghề ({sectorCount})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('Doanh nghiệp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === 'Doanh nghiệp'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'bg-slate-800 text-emerald-300 hover:bg-slate-700'
            }`}
          >
            Doanh nghiệp ({companyCount})
          </button>

          <button
            onClick={() => setSelectedFilter('Tin đồn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'Tin đồn'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Tin đồn & Cảnh báo ({rumorCount})</span>
          </button>
        </div>
      </div>

      {/* News Feed Cards */}
      <div className="space-y-3.5">
        {filteredNews.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
            Không tìm thấy bản tin nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredNews.map((news) => {
            const isMacro = news.category === 'Vĩ mô';
            const isSector = news.category === 'Ngành';

            return (
              <article
                key={news.id}
                className={`bg-slate-900 border rounded-xl p-4 sm:p-5 transition-all shadow-sm ${
                  news.month === currentMonth
                    ? 'border-emerald-500/50 bg-slate-900/90'
                    : 'border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category badge */}
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        isMacro
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : isSector
                          ? 'bg-purple-950 text-purple-400 border border-purple-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {isMacro ? <Globe className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                      <span>{news.category}</span>
                    </span>

                    {/* Month badge */}
                    <span className="text-xs font-semibold text-emerald-400">
                      {formatMonthYear(news.month)}
                    </span>

                    {news.month === currentMonth && (
                      <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded uppercase">
                        Tháng này
                      </span>
                    )}

                    {news.isNoiseOrRumor && (
                      <span className="text-[10px] bg-amber-950/80 text-amber-400 border border-amber-800 px-2 py-0.2 rounded font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Tin đồn / Chưa kiểm chứng</span>
                      </span>
                    )}
                  </div>

                  {news.ticker && onSelectCompanyByTicker && (
                    <button
                      onClick={() => onSelectCompanyByTicker(news.ticker!)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Xem mã {news.ticker}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {news.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {news.content}
                </p>

                {news.summary && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-slate-400 italic">
                    Ghi chú: {news.summary}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
