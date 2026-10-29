/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Shield, BookOpen, Compass, HeartHandshake, AlertOctagon, Sparkles } from 'lucide-react';

interface BuffettGuideModalProps {
  onClose: () => void;
}

export const BuffettGuideModal: React.FC<BuffettGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Sổ Tay Triết Lý Đầu Tư Warren Buffett
              </h2>
              <div className="text-xs text-slate-400">
                4 Trụ cột cốt lõi và các cạm bẫy tâm lý trên sàn chứng khoán
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng sổ tay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Intro Quote */}
          <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl text-amber-300 italic">
            &ldquo;Đầu tư rất đơn giản, nhưng không hề dễ dàng. Bạn không cần phải có chỉ số IQ thiên tài để thành công trên thị trường chứng khoán, bạn chỉ cần có tính khí kỷ luật để kiểm soát những thôi thúc khiến người khác gặp rắc rối.&rdquo;
          </div>

          {/* 4 Pillars */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>4 Tiêu Chuẩn Chọn Cổ Phiếu Của Warren Buffett:</span>
            </h3>

            {/* Pillar 1 */}
            <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span>1. Doanh nghiệp dễ hiểu (Vòng tròn năng lực)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chỉ đầu tư vào những mô hình kinh doanh mà bạn có thể hình dung được họ kiếm tiền bằng cách nào sau 10 năm nữa (ví dụ: thực phẩm thiết yếu, ngân hàng pháo đài, cảng biển hạ tầng). Đừng bao giờ mua cổ phiếu chỉ vì thấy người khác bàn tán xôn xao.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>2. Lợi thế cạnh tranh bền vững (Hào kinh tế - Economic Moat)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Một lâu đài kinh tế cần con hào sâu bảo vệ trước các đối thủ. Hào kinh tế có thể đến từ:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 ml-2">
                <li><strong className="text-slate-200">Độc quyền địa lý / Trạm thu phí:</strong> Cảng biển, vịnh nuôi cá hồi tự nhiên độc quyền.</li>
                <li><strong className="text-slate-200">Lợi thế chi phí thấp:</strong> Chuỗi bán lẻ quy mô lớn, chi phí vốn ngân hàng rẻ.</li>
                <li><strong className="text-slate-200">Chi phí chuyển đổi cao:</strong> Thiết bị y tế phẫu thuật, giải pháp công nghệ ngách.</li>
                <li><strong className="text-slate-200">Hiệu ứng mạng lưới:</strong> Cổng rao vặt trực tuyến số 1.</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-purple-400" />
                <span>3. Ban lãnh đạo trung thực và tài năng</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quan sát kỷ luật phân bổ vốn: Họ có vay nợ ồ ạt để phô trương quy mô không? Họ có trả cổ tức tiền mặt đều đặn cho cổ đông không? Chỉ số ROE (Tỷ suất sinh lời trên vốn) trên 18-20% là bằng chứng thép cho tài năng quản trị.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-400" />
                <span>4. Mức giá hấp dẫn có Biên độ an toàn (Margin of Safety)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Một công ty vĩ đại cũng có thể là một khoản đầu tư tồi nếu bạn trả mức giá quá đắt. Hãy kiên nhẫn chờ đợi những đợt thị trường điều chỉnh hoặc khủng hoảng để mua được với định giá P/E, P/B hợp lý.
              </p>
            </div>
          </div>

          {/* Pitfalls */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-rose-400 text-sm">2 Cạm Bẫy Chết Người Cần Tránh:</h4>
            
            <div className="space-y-1 text-xs">
              <div className="font-semibold text-white">• Bẫy giá rẻ (Value Trap):</div>
              <div className="text-slate-400">
                Cổ phiếu có chỉ số P/E rất thấp (3-5x) hoặc P/B &lt; 0.5 trông như món hời, nhưng thực chất doanh nghiệp ôm đống nợ khổng lồ, ngành nghề đang suy tàn (như bách hóa cổ điển, báo giấy, hàng không). Cổ phiếu sẽ tiếp tục giảm về 0.
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-semibold text-white">• Bong bóng thổi phồng (Overhyped Bubble):</div>
              <div className="text-slate-400">
                Các cổ phiếu công nghệ hay ý tưởng xanh tăng giá phi mã hàng trăm % chỉ dựa vào tin đồn và lời hứa hẹn tương lai xa xôi, trong khi không có doanh thu hay lợi nhuận thực tế. Khi cơn say qua đi, chúng sẽ sụp đổ 90-99%.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Đã Hiểu, Quay Lại Game
          </button>
        </div>
      </div>
    </div>
  );
};
