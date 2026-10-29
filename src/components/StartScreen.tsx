/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SectorType } from '../types';
import { ALL_SECTORS, INITIAL_CAPITAL_OPTIONS } from '../data/marketData';
import { formatCurrency } from '../game/financeLogic';
import { ShieldCheck, BookOpen, TrendingUp, AlertTriangle, ArrowRight, Check } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (name: string, capital: number, sectors: SectorType[]) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('Nhà Đầu Tư Giá Trị');
  const [selectedCapital, setSelectedCapital] = useState(50000);
  const [selectedSectors, setSelectedSectors] = useState<SectorType[]>([
    'Thủy sản & Tiêu dùng',
    'Ngân hàng & Tài chính',
    'Công nghệ & Bán dẫn',
  ]);

  const toggleSector = (sector: SectorType) => {
    if (selectedSectors.includes(sector)) {
      if (selectedSectors.length > 1) {
        setSelectedSectors(selectedSectors.filter((s) => s !== sector));
      }
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    onStartGame(playerName.trim(), selectedCapital, selectedSectors);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle accent backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <span>TRIẾT LÝ ĐẦU TƯ WARREN BUFFETT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            BUFFETT WAY
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl mx-auto">
            Học cách phân tích doanh nghiệp thật: Tìm kiếm những cỗ máy sinh lời có hào kinh tế bền vững và tránh xa bẫy giá rẻ & bong bóng thổi phồng.
          </p>

          {/* Buffett Quote */}
          <div className="mt-4 p-3 bg-slate-800/60 border-l-4 border-amber-400 rounded-r-lg text-left text-xs sm:text-sm text-slate-300 italic">
            &ldquo;Nếu bạn không sẵn sàng sở hữu một cổ phiếu trong 10 năm, thì đừng bao giờ nghĩ đến việc sở hữu nó trong 10 phút.&rdquo; — <span className="font-semibold text-amber-400 not-italic">Warren Buffett</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleStart} className="space-y-6">
          {/* Player Name */}
          <div>
            <label htmlFor="player-name" className="block text-xs sm:text-sm font-semibold text-slate-300 mb-1.5">
              Tên nhà đầu tư của bạn
            </label>
            <input
              id="player-name"
              type="text"
              required
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>

          {/* Starting Capital */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
              Chọn mức vốn ban đầu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INITIAL_CAPITAL_OPTIONS.map((opt) => {
                const isSelected = selectedCapital === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedCapital(opt.value)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500'
                        : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-base text-amber-400">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">{opt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sectors of Interest */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-300">
                Lĩnh vực quan tâm (Vòng tròn năng lực)
              </label>
              <span className="text-xs text-slate-500">Đã chọn: {selectedSectors.length} ngành</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_SECTORS.map((sector) => {
                const isChecked = selectedSectors.includes(sector);
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => toggleSector(sector)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-800/50 border-slate-700/80 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <span className="truncate">{sector}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 shrink-0 ml-1 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Rules Brief */}
          <div className="bg-slate-800/40 border border-slate-700/70 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Quy tắc vận hành mô phỏng:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Dữ liệu thị trường:</strong> Mô phỏng sát thực tế diễn biến giá 60 tháng (5 năm) của sàn chứng khoán Bắc Âu, bao gồm khủng hoảng tín dụng và các chu kỳ bùng nổ.
              </li>
              <li>
                <strong className="text-slate-200">Không biết trước tương lai:</strong> Bạn chỉ thấy dữ liệu và báo cáo tài chính tới tháng hiện tại.
              </li>
              <li>
                <strong className="text-slate-200">Kỷ luật tài chính:</strong> Phí giao dịch 0.2% mỗi lệnh, bảo toàn vốn là ưu tiên số một.
              </li>
              <li>
                <strong className="text-slate-200">Vén màn sự thật:</strong> Sau khi hoàn thành 60 tháng, hệ thống sẽ tiết lộ mã nào là kim cương giá trị, mã nào là bẫy giá rẻ và sự kiện lịch sử thật tương ứng.
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer hover:shadow-amber-500/20"
          >
            <span>Bắt Đầu Hành Trình Đầu Tư</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
