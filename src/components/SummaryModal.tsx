/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Company, GameState, BuffettAnalysisResult } from '../types';
import { formatCurrency, formatPercent } from '../game/financeLogic';
import {
  Trophy,
  Award,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  X,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

interface SummaryModalProps {
  gameState: GameState;
  finalNetWorth: number;
  companies: Company[];
  benchmarkReturnPercent: number;
  analysis: BuffettAnalysisResult;
  onRestart: () => void;
  onClose: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  gameState,
  finalNetWorth,
  companies,
  benchmarkReturnPercent,
  analysis,
  onRestart,
  onClose,
}) => {
  const [filterArchetype, setFilterArchetype] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  const totalReturnPercent = ((finalNetWorth - gameState.initialCapital) / gameState.initialCapital) * 100;
  const alpha = totalReturnPercent - benchmarkReturnPercent;
  const isAlphaPositive = alpha >= 0;

  // Generate detailed prompt for AI analysis
  const generateAnalysisPrompt = () => {
    const holdings = Object.entries(gameState.portfolio);
    const transactionsText = gameState.transactions
      .map((t) => {
        const isBuy = t.type === 'BUY';
        return `${t.dateStr}: ${isBuy ? 'MUA' : 'BÁN'} ${t.shares} CP ${t.ticker} @ ${t.price.toFixed(2)} Kr/CP | Tổng: ${t.totalAmount.toFixed(0)} Kr | Phí: ${t.fee.toFixed(0)} Kr`;
      })
      .join('\n');

    const portfolioText = holdings.length > 0
      ? holdings
          .map(([ticker, h]) => {
            const company = companies.find((c) => c.ticker === ticker);
            const currentPrice = company ? company.historicalMonthlyPrices[59] : 0;
            const currentValue = h.shares * currentPrice;
            const costBasis = h.totalCost;
            const profit = currentValue - costBasis;
            const profitPercent = costBasis > 0 ? (profit / costBasis) * 100 : 0;
            return `${ticker} (${company?.name || 'Unknown'}): ${h.shares} CP | Giá vốn: ${h.averagePrice.toFixed(2)} Kr | Giá hiện tại: ${currentPrice.toFixed(2)} Kr | Lãi/Lỗ: ${profit.toFixed(0)} Kr (${profitPercent.toFixed(1)}%)`;
          })
          .join('\n')
      : 'Không nắm giữ cổ phiếu nào';

    const prompt = `## PHÂN TÍCH ĐẦU TƯ THEO PHONG CÁCH WARREN BUFFETT

### THÔNG TIN NHÀ ĐẦU TƯ
- Tên: ${gameState.playerName}
- Vốn ban đầu: ${gameState.initialCapital.toLocaleString()} Kr
- Tài sản cuối cùng: ${finalNetWorth.toLocaleString()} Kr
- Tỷ suất sinh lời: ${totalReturnPercent.toFixed(1)}%
- Thời gian đầu tư: 60 tháng (5 năm)
- Chỉ số thị trường: ${benchmarkReturnPercent.toFixed(1)}%
- Hiệu suất vượt trội (Alpha): ${alpha.toFixed(1)}%

### DANH MỤC CỔ PHIỆU HIỆN TẠI
${portfolioText}

### LỊCH SỬ GIAO DỊCH (Tất cả ${gameState.transactions.length} giao dịch)
${transactionsText}

### CÁC CÔNG TY ĐÃ ĐẦU TƯ
${holdings.map(([ticker]) => {
  const company = companies.find((c) => c.ticker === ticker);
  if (!company) return '';
  return `
### ${company.ticker} - ${company.name}
- Ngành: ${company.sector}
- Market Cap: ${company.marketCapCategory}
- Kiểu cổ phiếu: ${company.archetype}
- Mô tả: ${company.description}
- Lợi thế cạnh tranh: ${company.competitiveMoat}
- Rủi ro: ${company.risks.join(', ')}
- Giá Năm 1: ${company.historicalMonthlyPrices[0].toFixed(2)} Kr
- Giá Năm 5: ${company.historicalMonthlyPrices[59].toFixed(2)} Kr
- Tăng trưởng 5 năm: ${(((company.historicalMonthlyPrices[59] - company.historicalMonthlyPrices[0]) / company.historicalMonthlyPrices[0]) * 100).toFixed(1)}%
- ROE Năm 5: ${company.financials[4].roe.toFixed(1)}%
- Nợ/Vốn Năm 5: ${company.financials[4].debtToEquity.toFixed(2)}x
- Góc nhìn Buffett: ${company.buffettRationale}
- Nguyên mẫu thực tế: ${company.realWorldCounterpart}
`;
}).join('\n')}

### ĐÁNH GIÁ THEO TIÊU CHÍ BUFFETT
- Điểm số tổng thể: ${analysis.score}/100
- Danh hiệu: ${analysis.title}
- Tập trung Hào kinh tế: ${analysis.moatFocusScore}/100
- Kỷ luật & Kiên nhẫn: ${analysis.patienceScore}/100 (${analysis.turnoverRating})
- Biên độ an toàn: ${analysis.marginOfSafetyScore}/100

### NHẬN XÉT CHI TIẾT
${analysis.critique}

### LỜI KHUYÊN CẢI THIỆN
${analysis.adviceList.map((advice, i) => `${i + 1}. ${advice}`).join('\n')}

---
Yêu cầu: Hãy phân tích phong cách đầu tư này dựa trên triết lý Warren Buffett. Chỉ ra:
1. Điểm mạnh (ví dụ: có tập trung vào công ty có hào kinh tế không, có kiên nhẫn không, có mua khi giá rẻ không)
2. Điểm yếu (ví dụ: có hay bán sai thời điểm, có mua cổ phiếu bong bóng, có thiếu kỷ luật không)
3. Cụ thể từng giao dịch: nào là quyết định đúng, nào là sai
4. Gợi ý cải thiện cho ván tiếp theo

Hãy phân tích chi tiết và đưa ra lời khuyên thực tế.`;

    return prompt;
  };

  const handleCopyPrompt = () => {
    const prompt = generateAnalysisPrompt();
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const archetypeLabels: Record<string, { label: string; color: string; badge: string }> = {
    BUFFETT_VALUE: {
      label: 'Cơ hội giá trị Buffett',
      color: 'text-emerald-400',
      badge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
    OVERHYPED_BUBBLE: {
      label: 'Bong bóng thổi phồng',
      color: 'text-rose-400',
      badge: 'bg-rose-950 text-rose-300 border-rose-800',
    },
    VALUE_TRAP: {
      label: 'Bẫy giá rẻ (Value Trap)',
      color: 'text-amber-400',
      badge: 'bg-amber-950 text-amber-300 border-amber-800',
    },
    CONSISTENT_COMPOUNDER: {
      label: 'Tăng trưởng bền bỉ',
      color: 'text-blue-400',
      badge: 'bg-blue-950 text-blue-300 border-blue-800',
    },
    HIGH_DIVIDEND: {
      label: 'Phòng thủ cổ tức cao',
      color: 'text-purple-400',
      badge: 'bg-purple-950 text-purple-300 border-purple-800',
    },
    CYCLICAL: {
      label: 'Cổ phiếu chu kỳ',
      color: 'text-cyan-400',
      badge: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    },
  };

  const filteredCompanies = companies.filter((c) => {
    return filterArchetype === 'ALL' || c.archetype === filterArchetype;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-600/30 via-slate-900 to-emerald-600/20 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500 text-slate-950 rounded-xl font-black shadow-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                TỔNG KẾT HÀNH TRÌNH ĐẦU TƯ 5 NĂM (60 THÁNG)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Báo Cáo Thành Tích & Vén Màn Sự Thật
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng báo cáo tổng kết"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Performance Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Player Final Result */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-slate-400 font-semibold uppercase">Tài sản của bạn</div>
              <div className="text-2xl font-black text-white mt-1">
                {formatCurrency(finalNetWorth)}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="text-slate-400">Tỷ suất sinh lời:</span>
                <span
                  className={`font-bold ${totalReturnPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}
                >
                  {formatPercent(totalReturnPercent)}
                </span>
              </div>
            </div>

            {/* Benchmark Market Index */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-slate-400 font-semibold uppercase">Chỉ số Thị trường chung</div>
              <div className="text-2xl font-black text-slate-300 mt-1">Boreal Index</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="text-slate-400">Hiệu suất thị trường:</span>
                <span className="font-bold text-slate-200">{formatPercent(benchmarkReturnPercent)}</span>
              </div>
            </div>

            {/* Alpha / Outperformance */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-slate-400 font-semibold uppercase">Hiệu suất vượt trội (Alpha)</div>
              <div
                className={`text-2xl font-black mt-1 ${isAlphaPositive ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {formatPercent(alpha)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {isAlphaPositive ? 'Đánh bại thị trường xuất sắc!' : 'Kém hơn chỉ số thụ động'}
              </div>
            </div>
          </div>

          {/* Buffett Style Diagnostic Card */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/30 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Danh hiệu đầu tư của bạn:</div>
                  <div className="text-lg sm:text-xl font-black text-amber-300">{analysis.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                <span className="text-xs text-slate-300 font-semibold">Điểm số Buffett:</span>
                <span className="text-xl font-black text-amber-400">{analysis.score}/100</span>
              </div>
            </div>

            {/* Critique paragraph */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              {analysis.critique}
            </p>

            {/* Sub scores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400">Tập trung Hào kinh tế:</div>
                <div className="font-bold text-white text-sm mt-0.5">{analysis.moatFocusScore}/100</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400">Kỷ luật & Kiên nhẫn:</div>
                <div className="font-bold text-white text-sm mt-0.5">{analysis.patienceScore}/100 ({analysis.turnoverRating})</div>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400">Biên độ an toàn:</div>
                <div className="font-bold text-white text-sm mt-0.5">{analysis.marginOfSafetyScore}/100</div>
              </div>
            </div>
          </div>

          {/* THE BIG REVEAL: VÉN MÀN SỰ THẬT TỪNG DOANH NGHIỆP */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Vén Màn Sự Thật: Bản Chất Thực Sự Của 24 Cổ Phiếu
                </h3>
              </div>

              {/* Archetype filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setFilterArchetype('ALL')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    filterArchetype === 'ALL'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả ({companies.length})
                </button>
                {Object.entries(archetypeLabels).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setFilterArchetype(key)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer whitespace-nowrap ${
                      filterArchetype === key
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {info.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Revealed Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredCompanies.map((c) => {
                const startPrice = c.historicalMonthlyPrices[0];
                const endPrice = c.historicalMonthlyPrices[59];
                const fiveYearReturn = ((endPrice - startPrice) / startPrice) * 100;
                const isGain = fiveYearReturn >= 0;
                const arch = archetypeLabels[c.archetype];

                return (
                  <div
                    key={c.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5 hover:border-slate-700 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-base">{c.ticker}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${arch.badge}`}>
                            {arch.label}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{c.name}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-400">5 năm qua:</div>
                        <div
                          className={`font-black text-sm ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}
                        >
                          {formatPercent(fiveYearReturn)}
                        </div>
                      </div>
                    </div>

                    {/* Buffett Rationale */}
                    <div className="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      <strong className="text-amber-400">Góc nhìn Buffett: </strong>
                      {c.buffettRationale}
                    </div>

                    {/* Real World Counterpart */}
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-900">
                      <span>Nguyên mẫu thực tế:</span>
                      <strong className="text-slate-200">{c.realWorldCounterpart}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disguised Historical Events Explained */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Giải Mã Các Sự Kiện Lịch Sử Thật Được Ngụy Trang:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400">Tháng 14 - 22: Cuộc Đóng Băng Tín Dụng Toàn Cầu</div>
                <div className="text-slate-400">
                  Chính là cuộc khủng hoảng tài chính toàn cầu 2008 khi ngân hàng đầu tư Lehman Brothers sụp đổ. Những công ty vay nợ nhiều (hàng không, khoan dầu cũ) bị xóa sổ, còn những công ty nợ thấp, tiền mặt dồi dào trở thành người chiến thắng lớn nhất.
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400">Tháng 29 - 44: Cơn Sốt Công Nghệ Xanh & Năng Lượng Mới</div>
                <div className="text-slate-400">
                  Mô phỏng giai đoạn tiền rẻ lãi suất 0% năm 2020-2021 khi cổ phiếu xe điện, hydro và thực tế ảo metaverse tăng nóng phi lý. Khi lãi suất tăng trở lại vào 2022, bong bóng vỡ vụn khiến người mua đỉnh mất trắng tới 90-99%.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-500">
            Dữ liệu mô phỏng dựa trên thực tế sàn giao dịch Bắc Âu.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPrompt}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy prompt phân tích chi tiết để dán vào AI khác"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đã Copy!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Phân Tích</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Xem Lại Danh Mục
            </button>
            <button
              onClick={onRestart}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi Lại Ván Mới</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
