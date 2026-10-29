/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ArrowRightLeft, DollarSign, Coins, HelpCircle, Check } from 'lucide-react';
import { KR_TO_USD_RATE, KR_TO_VND_RATE, formatCurrency } from '../game/financeLogic';

interface CurrencyConverterModalProps {
  currentCash: number;
  totalNetWorth: number;
  onClose: () => void;
}

export const CurrencyConverterModal: React.FC<CurrencyConverterModalProps> = ({
  currentCash,
  totalNetWorth,
  onClose,
}) => {
  const [inputKr, setInputKr] = useState<string>(Math.round(totalNetWorth || 50000).toString());

  const parsedKr = parseFloat(inputKr) || 0;
  const usdValue = parsedKr * KR_TO_USD_RATE;
  const vndValue = parsedKr * KR_TO_VND_RATE;

  const quickPresets = [
    { label: '100 Kr', val: 100, desc: 'Bữa ăn nhanh / 1kg cá hồi phi lê' },
    { label: '1.000 Kr', val: 1000, desc: 'Chi phí mua sắm cuối tuần' },
    { label: '10.000 Kr', val: 10000, desc: 'Gói vốn khởi nghiệp' },
    { label: '50.000 Kr', val: 50000, desc: 'Mức vốn tiêu chuẩn' },
    { label: '100.000 Kr', val: 100000, desc: 'Quỹ tích sản gia đình' },
    { label: 'Tiền mặt bạn có', val: Math.round(currentCash), desc: 'Số dư khả dụng hiện tại' },
    { label: 'Tổng tài sản bạn có', val: Math.round(totalNetWorth), desc: 'Giá trị toàn bộ danh mục' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Bảng Quy Đổi Mệnh Giá (Kr ⇄ USD ⇄ VNĐ)
              </h2>
              <div className="text-xs text-slate-400">
                Hiểu rõ giá trị tiền tệ Krone Bắc Âu so với Đô la Mỹ và Tiền Việt
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng bảng quy đổi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Explanation Banner */}
          <div className="p-3.5 bg-slate-800/60 border border-slate-700 rounded-xl text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-400">Tỷ giá tham chiếu thực tế:</span> Trong game, đơn vị tiền tệ là <strong className="text-white">Kr (Krone Bắc Âu - Na Uy/Đan Mạch)</strong>.
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-slate-200">
              <span>• <strong>10 Kr ≈ 1 USD</strong> ($1)</span>
              <span>• <strong>1 Kr ≈ 2.500 VNĐ</strong></span>
              <span>• <strong>10.000 Kr ≈ $1.000 USD</strong> (~25 triệu VNĐ)</span>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
            <div>
              <label htmlFor="kr-input" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Nhập số tiền Kr (Krone) cần quy đổi:
              </label>
              <div className="relative">
                <input
                  id="kr-input"
                  type="number"
                  min="0"
                  value={inputKr}
                  onChange={(e) => setInputKr(e.target.value)}
                  placeholder="Nhập số tiền Kr..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  Kr
                </span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {quickPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputKr(preset.val.toString())}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                  title={preset.desc}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Conversion Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* USD Result */}
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Tương đương Đô La Mỹ (USD)</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">
                    ${usdValue.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                  </div>
                </div>
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              {/* VND Result */}
              <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Tương đương Tiền Việt (VNĐ)</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">
                    {vndValue.toLocaleString('vi-VN')} đ
                  </div>
                </div>
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Coins className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Real-life Purchasing Power Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bảng quy chiếu sức mua thực tế (Dễ hình dung):
            </h4>
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Mệnh giá Kr</th>
                    <th className="py-2.5 px-3">Quy ra USD</th>
                    <th className="py-2.5 px-3">Quy ra VNĐ</th>
                    <th className="py-2.5 px-3">Sức mua thực tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">100 Kr</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">$10</td>
                    <td className="py-2 px-3 text-amber-400 font-semibold">250.000 đ</td>
                    <td className="py-2 px-3 text-slate-400">1 bữa ăn nhanh hoặc 1kg cá hồi</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">1.000 Kr</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">$100</td>
                    <td className="py-2 px-3 text-amber-400 font-semibold">2.500.000 đ</td>
                    <td className="py-2 px-3 text-slate-400">Vé tàu cao tốc / Chi phí 1 tuần</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">10.000 Kr</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">$1.000</td>
                    <td className="py-2 px-3 text-amber-400 font-semibold">25.000.000 đ</td>
                    <td className="py-2 px-3 text-slate-400">Vốn nhỏ để tập đầu tư</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">50.000 Kr</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">$5.000</td>
                    <td className="py-2 px-3 text-amber-400 font-semibold">125.000.000 đ</td>
                    <td className="py-2 px-3 text-slate-400">Khoản vốn danh mục tiêu chuẩn</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">250.000 Kr</td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold">$25.000</td>
                    <td className="py-2 px-3 text-amber-400 font-semibold">625.000.000 đ</td>
                    <td className="py-2 px-3 text-slate-400">Quỹ tài sản đầu tư quy mô lớn</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Đã Hiểu Mệnh Giá
          </button>
        </div>
      </div>
    </div>
  );
};
