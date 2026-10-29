/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Company, Holding, NewsItem, Transaction } from '../types';
import {
  formatCurrency,
  formatPercent,
  formatMonthYear,
  validateBuyOrder,
  validateSellOrder,
  TRANSACTION_FEE_RATE,
} from '../game/financeLogic';
import {
  X,
  TrendingUp,
  TrendingDown,
  Shield,
  AlertCircle,
  FileText,
  MessageSquare,
  Newspaper,
  CheckCircle,
  DollarSign,
  Star,
  History,
} from 'lucide-react';

interface CompanyDetailModalProps {
  company: Company;
  currentMonth: number;
  cash: number;
  holding?: Holding;
  companyNews: NewsItem[];
  companyTransactions: Transaction[];
  onClose: () => void;
  onBuy: (shares: number) => void;
  onSell: (shares: number) => void;
  isWatched: boolean;
  onToggleWatchlist: () => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  currentMonth,
  cash,
  holding,
  companyNews,
  companyTransactions,
  onClose,
  onBuy,
  onSell,
  isWatched,
  onToggleWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'analysts' | 'news' | 'transactions'>('overview');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [shareInput, setShareInput] = useState<string>('10');
  const [tradeFeedback, setTradeFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const mIndex = Math.max(0, Math.min(59, currentMonth - 1));
  const currentPrice = company.historicalMonthlyPrices[mIndex] || 1;
  const prevPrice = mIndex > 0 ? company.historicalMonthlyPrices[mIndex - 1] : currentPrice;
  const monthChange = prevPrice > 0 ? ((currentPrice - prevPrice) / prevPrice) * 100 : 0;
  const isUp = monthChange >= 0;
  const approxUsd = Math.round(currentPrice * 0.1 * 10) / 10;

  // Chart data: ONLY elapsed months up to current month (no future leak!)
  const visiblePrices = company.historicalMonthlyPrices.slice(0, currentMonth);
  const minPrice = Math.min(...visiblePrices) * 0.95;
  const maxPrice = Math.max(...visiblePrices) * 1.05;
  const priceRange = maxPrice - minPrice || 1;

  // Financials up to current year (currentMonth 1-12 = Year 1, etc.)
  const currentYear = Math.floor((currentMonth - 1) / 12) + 1;
  const visibleFinancials = company.financials.filter((f) => f.year <= currentYear);

  const parsedShares = parseInt(shareInput, 10) || 0;
  const holdingShares = holding ? holding.shares : 0;

  // Quick preset calculation
  const setPercentage = (pct: number) => {
    if (tradeType === 'BUY') {
      const estimatedFeeFactor = 1 + TRANSACTION_FEE_RATE;
      const budget = cash * pct;
      const maxCanBuy = Math.floor(budget / (currentPrice * estimatedFeeFactor));
      setShareInput(Math.max(1, maxCanBuy).toString());
    } else {
      const sharesToSell = Math.floor(holdingShares * pct);
      setShareInput(Math.max(1, sharesToSell).toString());
    }
    setTradeFeedback(null);
  };

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeFeedback(null);

    if (tradeType === 'BUY') {
      const validation = validateBuyOrder(cash, parsedShares, currentPrice);
      if (!validation.isValid) {
        setTradeFeedback({ type: 'error', message: validation.error || 'Lệnh mua không hợp lệ.' });
        return;
      }
      onBuy(parsedShares);
      setTradeFeedback({
        type: 'success',
        message: `Mua thành công ${parsedShares} cổ phiếu ${company.ticker}!`,
      });
    } else {
      const validation = validateSellOrder(holdingShares, parsedShares, currentPrice);
      if (!validation.isValid) {
        setTradeFeedback({ type: 'error', message: validation.error || 'Lệnh bán không hợp lệ.' });
        return;
      }
      onSell(parsedShares);
      setTradeFeedback({
        type: 'success',
        message: `Bán thành công ${parsedShares} cổ phiếu ${company.ticker}!`,
      });
    }
  };

  // SVG Chart path calculation
  const svgWidth = 600;
  const svgHeight = 160;
  const chartPoints = visiblePrices.map((p, idx) => {
    const x = visiblePrices.length === 1 ? svgWidth / 2 : (idx / (visiblePrices.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 20 - ((p - minPrice) / priceRange) * (svgHeight - 40);
    return `${x},${y}`;
  });
  const pathD = `M ${chartPoints.join(' L ')}`;
  const areaD = `${pathD} L ${visiblePrices.length === 1 ? svgWidth / 2 : svgWidth - 20},${svgHeight - 10} L 20,${svgHeight - 10} Z`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-slate-950/80 px-4 sm:px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black px-2.5 py-1 rounded text-lg">
              {company.ticker}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{company.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-normal">
                  {company.sector}
                </span>
              </h2>
              <div className="text-xs text-slate-400">
                {company.marketCapCategory} • Thời điểm: {formatMonthYear(currentMonth)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-lg sm:text-xl font-black text-white">
                {formatCurrency(currentPrice)}
              </div>
              <div className="text-xs text-emerald-400 font-semibold">
                ~${approxUsd} USD (10 Kr ≈ $1)
              </div>
              <div
                className={`text-xs font-semibold flex items-center justify-end gap-1 ${
                  isUp ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {formatPercent(monthChange)} (tháng này)
              </div>
            </div>

            <button
              onClick={onToggleWatchlist}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isWatched
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-500 hover:text-amber-400'
              }`}
              title={isWatched ? 'Bỏ theo dõi' : 'Theo dõi công ty này'}
            >
              <Star className={`w-5 h-5 ${isWatched ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Đóng bảng phân tích"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Price Chart Section */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold uppercase text-slate-400">
                Biểu đồ giá lịch sử ({visiblePrices.length} tháng đã trôi qua)
              </div>
              <div className="text-xs text-slate-400">
                Cao nhất: <span className="text-emerald-400 font-bold">{Math.round(maxPrice / 1.05)} Kr</span> • Thấp nhất: <span className="text-rose-400 font-bold">{Math.round(minPrice / 0.95)} Kr</span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full h-36 relative">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid horizontal lines */}
                <line x1="20" y1="20" x2={svgWidth - 20} y2="20" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                <line x1="20" y1={svgHeight / 2} x2={svgWidth - 20} y2={svgHeight / 2} stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                <line x1="20" y1={svgHeight - 20} x2={svgWidth - 20} y2={svgHeight - 20} stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

                {/* Area under curve */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Main line */}
                <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Current point */}
                {visiblePrices.length > 0 && (
                  <circle
                    cx={visiblePrices.length === 1 ? svgWidth / 2 : svgWidth - 20}
                    cy={svgHeight - 20 - ((currentPrice - minPrice) / priceRange) * (svgHeight - 40)}
                    r="4.5"
                    fill="#34d399"
                    stroke="#022c22"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-800 text-xs sm:text-sm font-semibold gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Hào kinh tế & Rủi ro</span>
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'financials'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Báo cáo tài chính</span>
            </button>
            <button
              onClick={() => setActiveTab('analysts')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'analysts'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ý kiến chuyên gia ({company.analystRatings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'news'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Tin tức ({companyNews.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'transactions'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Lịch sử giao dịch ({companyTransactions.length})</span>
            </button>
          </div>

          {/* Tab 1: Overview & Moat */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-1.5">Mô tả hoạt động kinh doanh</h4>
                <p className="text-slate-300 leading-relaxed">{company.description}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {company.products.map((p, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs">
                      • {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Economic Moat */}
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Lợi thế cạnh tranh (Hào kinh tế)</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{company.competitiveMoat}</p>
                </div>

                {/* Risks */}
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl">
                  <h4 className="font-bold text-rose-400 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Rủi ro tiềm ẩn cần theo dõi</span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {company.risks.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Management */}
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-amber-400 mb-1">Đánh giá Ban lãnh đạo & Quản trị</h4>
                <p className="text-slate-300 leading-relaxed">{company.managementSummary}</p>
              </div>
            </div>
          )}

          {/* Tab 2: Financial Statements */}
          {activeTab === 'financials' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Dữ liệu tài chính hợp nhất qua các năm (chỉ hiển thị các kỳ báo cáo đã công bố tính đến Năm {currentYear}):
              </div>

              <div className="overflow-x-auto bg-slate-950/50 rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Chỉ số tài chính</th>
                      {visibleFinancials.map((f) => (
                        <th key={f.year} className="py-2.5 px-3 text-right">
                          Năm {f.year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">Doanh thu (triệu Kr)</td>
                      {visibleFinancials.map((f) => (
                        <td key={f.year} className="py-2 px-3 text-right">{f.revenue.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">Lợi nhuận ròng (triệu Kr)</td>
                      {visibleFinancials.map((f) => (
                        <td
                          key={f.year}
                          className={`py-2 px-3 text-right font-bold ${
                            f.netIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {f.netIncome.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">Biên lợi nhuận ròng (%)</td>
                      {visibleFinancials.map((f) => (
                        <td key={f.year} className="py-2 px-3 text-right">{f.netMargin.toFixed(1)}%</td>
                      ))}
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="py-2 px-3 font-sans font-bold text-amber-400">ROE (Tỷ suất sinh lời / Vốn %)</td>
                      {visibleFinancials.map((f) => (
                        <td
                          key={f.year}
                          className={`py-2 px-3 text-right font-bold ${
                            f.roe >= 20 ? 'text-emerald-400' : f.roe > 0 ? 'text-slate-200' : 'text-rose-400'
                          }`}
                        >
                          {f.roe.toFixed(1)}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">Đòn bẩy Nợ / Vốn (lần)</td>
                      {visibleFinancials.map((f) => (
                        <td
                          key={f.year}
                          className={`py-2 px-3 text-right ${
                            f.debtToEquity > 3 ? 'text-rose-400 font-bold' : f.debtToEquity < 0.5 ? 'text-emerald-400' : 'text-slate-300'
                          }`}
                        >
                          {f.debtToEquity.toFixed(2)}x
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="py-2 px-3 font-sans font-bold text-emerald-400">Dòng tiền tự do FCF (triệu Kr)</td>
                      {visibleFinancials.map((f) => (
                        <td
                          key={f.year}
                          className={`py-2 px-3 text-right font-bold ${
                            f.freeCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {f.freeCashFlow.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">EPS - Thu nhập / Cổ phiếu (Kr)</td>
                      {visibleFinancials.map((f) => (
                        <td key={f.year} className="py-2 px-3 text-right">{f.eps.toFixed(1)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">Giá trị sổ sách / CP (Kr)</td>
                      {visibleFinancials.map((f) => (
                        <td key={f.year} className="py-2 px-3 text-right">{f.bookValuePerShare.toFixed(1)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-sans font-medium text-slate-200">Cổ tức tiền mặt / CP (Kr)</td>
                      {visibleFinancials.map((f) => (
                        <td key={f.year} className="py-2 px-3 text-right text-amber-400">{f.dividendPerShare.toFixed(1)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-xs text-slate-400">
                <span className="font-bold text-amber-400">Tiêu chuẩn Warren Buffett:</span> Doanh nghiệp tuyệt vời thường duy trì ROE &gt; 18%, tỷ lệ Nợ/VCSH thấp (&lt; 0.6) và Dòng tiền tự do (FCF) dương liên tục qua các năm.
              </div>
            </div>
          )}

          {/* Tab 3: Analyst Opinions */}
          {activeTab === 'analysts' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Ý kiến từ các công ty chứng khoán và chuyên gia phân tích (lưu ý: chuyên gia thị trường thường có quan điểm trái chiều hoặc quá lạc quan/bi quan):
              </div>
              {company.analystRatings.map((rating, idx) => {
                const isBuy = rating.verdict.includes('MUA');
                const isSell = rating.verdict.includes('BÁN');
                return (
                  <div key={idx} className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs sm:text-sm">{rating.analystFirm}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-black px-2 py-0.5 rounded ${
                            isBuy
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : isSell
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {rating.verdict}
                        </span>
                        <span className="text-xs text-slate-400">
                          Giá mục tiêu: <strong className="text-amber-400">{rating.targetPrice} Kr</strong>
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 italic">&ldquo;{rating.comment}&rdquo;</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 4: News Feed */}
          {activeTab === 'news' && (
            <div className="space-y-3">
              {companyNews.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs sm:text-sm">
                  Chưa có tin tức riêng nào được ghi nhận cho {company.name} tính đến thời điểm hiện tại.
                </div>
              ) : (
                companyNews.map((n) => (
                  <div key={n.id} className="bg-slate-800/40 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-400">
                        {formatMonthYear(n.month)}
                      </span>
                      {n.isNoiseOrRumor && (
                        <span className="text-[10px] bg-amber-950/80 text-amber-400 border border-amber-800 px-1.5 py-0.2 rounded font-semibold">
                          Tin đồn / Chưa kiểm chứng
                        </span>
                      )}
                    </div>
                    <h5 className="font-bold text-sm text-white">{n.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 5: Transaction History */}
          {activeTab === 'transactions' && (
            <div className="space-y-3">
              {companyTransactions.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs sm:text-sm">
                  Bạn chưa thực hiện giao dịch nào với {company.name} tính đến thời điểm hiện tại.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 mb-3">
                    Lịch sử giao dịch của bạn với cổ phiếu này:
                  </div>
                  {companyTransactions.map((t) => {
                    const isBuy = t.type === 'BUY';
                    return (
                      <div key={t.id} className={`bg-slate-800/40 border ${isBuy ? 'border-emerald-900/40' : 'border-rose-900/40'} p-3.5 rounded-xl space-y-1.5`}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-black px-2 py-0.5 rounded ${
                              isBuy
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}>
                              {isBuy ? 'MUA' : 'BÁN'}
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                              {t.dateStr}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-amber-400">
                            {formatCurrency(t.totalAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Số lượng: <strong className="text-white">{t.shares} CP</strong></span>
                          <span>Giá: <strong className="text-white">{formatCurrency(t.price)}/CP</strong></span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Phí: <strong className="text-slate-300">{formatCurrency(t.fee)}</strong></span>
                          <span className={isBuy ? 'text-rose-400' : 'text-emerald-400'}>
                            {isBuy ? 'Chi phí tổng: ' : 'Thực nhận: '}
                            <strong>{formatCurrency(isBuy ? t.totalAmount + t.fee : t.totalAmount - t.fee)}</strong>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TRADING ORDER PANEL */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 mt-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTradeType('BUY');
                    setTradeFeedback(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    tradeType === 'BUY'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Đặt Lệnh MUA
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTradeType('SELL');
                    setTradeFeedback(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    tradeType === 'SELL'
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Đặt Lệnh BÁN
                </button>
              </div>

              {/* Position Info */}
              <div className="text-right text-xs">
                {tradeType === 'BUY' ? (
                  <div>
                    <span className="text-slate-400">Tiền mặt khả dụng: </span>
                    <strong className="text-emerald-400">{formatCurrency(cash)}</strong>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-400">Đang nắm giữ: </span>
                    <strong className="text-amber-400">{holdingShares} CP</strong>
                    {holding && (
                      <span className="text-slate-500 ml-1">
                        (Giá vốn: {formatCurrency(holding.averagePrice)})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleExecuteTrade} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shares Input */}
                <div>
                  <label htmlFor="shares-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Số lượng cổ phiếu (CP)
                  </label>
                  <input
                    id="shares-input"
                    type="number"
                    min="1"
                    step="1"
                    value={shareInput}
                    onChange={(e) => {
                      setShareInput(e.target.value);
                      setTradeFeedback(null);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />

                  {/* Percentage buttons */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {[0.25, 0.5, 0.75, 1.0].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setPercentage(pct)}
                        className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold rounded transition-colors cursor-pointer"
                      >
                        {pct === 1.0 ? 'Tối đa' : `${pct * 100}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Giá khớp lệnh:</span>
                    <span className="text-slate-200 font-semibold">{formatCurrency(currentPrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Giá trị giao dịch:</span>
                    <span className="text-slate-200 font-semibold">{formatCurrency(parsedShares * currentPrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Phí giao dịch (0.2%):</span>
                    <span className="text-slate-200 font-semibold">
                      {formatCurrency(parsedShares * currentPrice * TRANSACTION_FEE_RATE)}
                    </span>
                  </div>
                  <div className="border-t border-slate-800 pt-1.5 flex justify-between font-bold">
                    <span className="text-white">
                      {tradeType === 'BUY' ? 'Tổng thanh toán:' : 'Thực nhận vào tiền mặt:'}
                    </span>
                    <div className="text-right">
                      <div className={tradeType === 'BUY' ? 'text-rose-400 text-sm' : 'text-emerald-400 text-sm'}>
                        {tradeType === 'BUY'
                          ? formatCurrency(parsedShares * currentPrice * (1 + TRANSACTION_FEE_RATE))
                          : formatCurrency(Math.max(0, parsedShares * currentPrice * (1 - TRANSACTION_FEE_RATE)))}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        ~${Math.round(
                          (tradeType === 'BUY'
                            ? parsedShares * currentPrice * (1 + TRANSACTION_FEE_RATE)
                            : parsedShares * currentPrice * (1 - TRANSACTION_FEE_RATE)) * 0.1
                        )} USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Alert */}
              {tradeFeedback && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    tradeFeedback.type === 'error'
                      ? 'bg-rose-950/80 border border-rose-800 text-rose-300'
                      : 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                  }`}
                >
                  {tradeFeedback.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{tradeFeedback.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-sm shadow transition-all cursor-pointer ${
                  tradeType === 'BUY'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {tradeType === 'BUY'
                  ? `Xác Nhận Mua ${parsedShares} Cổ Phiếu ${company.ticker}`
                  : `Xác Nhận Bán ${parsedShares} Cổ Phiếu ${company.ticker}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
