/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, BookOpen, Search, Sparkles, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

interface DictionaryModalProps {
  onClose: () => void;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const terms = [
    {
      term: 'P/E (Hệ số Giá / Lợi nhuận)',
      meaning: 'Bạn phải trả bao nhiêu tiền để mua được 1 đồng tiền lời hàng năm của công ty.',
      plainExplanation:
        'Tưởng tượng bạn mua lại một quán cà phê với giá 1 tỷ, mỗi năm quán kiếm lãi ròng 100 triệu. Vậy P/E = 10, nghĩa là mất 10 năm bạn mới hoàn vốn. Nếu P/E = 100, tức là mất 100 năm mới hoàn vốn (giá đang bị thổi phồng quá cao trên mây!). Buffett thích công ty tốt với P/E vừa phải (10 - 20x).',
      buffettTip: 'P/E quá cao (> 60x) thường là cổ phiếu bong bóng. P/E quá thấp (< 5x) coi chừng là bẫy giá rẻ vì công ty sắp lỗ nặng.',
      tag: 'Định giá',
    },
    {
      term: 'ROE (Tỷ suất sinh lời trên Vốn)',
      meaning: 'Cứ mỗi 100 đồng tiền vốn tự có của công ty thì một năm tạo ra được bao nhiêu đồng tiền lời.',
      plainExplanation:
        'Đây là thước đo cỗ máy kiếm tiền giỏi hay dở. Nếu ROE = 25%, nghĩa là công ty dùng 100 triệu tiền vốn để tạo ra tới 25 triệu lãi ròng mỗi năm. Đây là công ty xuất sắc! Nếu ROE chỉ 3-5%, còn thấp hơn cả lãi suất gửi ngân hàng.',
      buffettTip: 'Chỉ số quan trọng số 1 của Warren Buffett! Ông luôn tìm kiếm các doanh nghiệp có ROE duy trì đều đặn trên 18 - 20% suốt nhiều năm.',
      tag: 'Chất lượng',
    },
    {
      term: 'Dòng tiền tự do (FCF - Free Cash Flow)',
      meaning: 'Số tiền mặt "tươi" thật sự chảy vào két sắt công ty sau khi đã thanh toán mọi chi phí và đầu tư máy móc.',
      plainExplanation:
        'Lợi nhuận trên sổ sách kế toán đôi khi chỉ là "lãi trên giấy" (chưa thu được tiền hoặc khách nợ). Nhưng Dòng tiền tự do là TIỀN MẶT THẬT để trả cổ tức cho bạn hoặc mua lại cổ phiếu. Công ty có FCF dồi dào thì không bao giờ sợ khủng hoảng.',
      buffettTip: 'Buffett xem FCF là "Thu nhập thực tế của chủ sở hữu" (Owner Earnings). Tiền mặt trong két không thể nói dối.',
      tag: 'Sức khỏe tài chính',
    },
    {
      term: 'Đòn bẩy Nợ / Vốn (Debt / Equity)',
      meaning: 'Công ty đang vay nợ bao nhiêu so với số vốn tự có của mình.',
      plainExplanation:
        'Nếu bạn có 1 tỷ nhưng đi vay ngân hàng thêm 5 tỷ để mua đất, tỷ lệ Nợ/Vốn = 5 lần. Khi kinh tế tốt thì bạn giàu nhanh, nhưng khi kinh tế gặp khủng hoảng hoặc lãi suất tăng, tiền lãi vay sẽ bóp nghẹt bạn đến mức phá sản. Doanh nghiệp nợ thấp (< 0.5) sống sót qua mọi cuộc khủng hoảng.',
      buffettTip: 'Buffett nói: "Nếu bạn thông minh, bạn không cần dùng nhiều đòn bẩy nợ. Còn nếu bạn không thông minh, nợ sẽ giết chết bạn."',
      tag: 'Rủi ro',
    },
    {
      term: 'Hào kinh tế (Economic Moat)',
      meaning: 'Lợi thế cạnh tranh độc nhất vô nhị giúp bảo vệ lợi nhuận của doanh nghiệp trước các đối thủ.',
      plainExplanation:
        'Tưởng tượng doanh nghiệp là một tòa lâu đài. Để đối thủ không vào cướp khách hàng, tòa lâu đài phải có con hào sâu bao quanh. Ví dụ: vịnh hẹp tự nhiên không ai cấp mới được (Viking Aqua), hệ thống cảng biển độc quyền không ai dời đi được (Fjord Ports), hay mạng lưới rao vặt ai cũng vào xem.',
      buffettTip: 'Một doanh nghiệp không có Hào kinh tế thì lợi nhuận sớm muộn cũng sẽ bị đối thủ cạnh tranh kéo tụt về 0.',
      tag: 'Chiến lược',
    },
    {
      term: 'Bẫy giá rẻ (Value Trap)',
      meaning: 'Cổ phiếu nhìn chỉ số P/E rất rẻ, thị giá rớt thê thảm trông như món hời, nhưng nội tại công ty đang chết dần.',
      plainExplanation:
        'Giống như việc bạn thấy một chiếc xe hơi cũ nát được rao bán giá rẻ mạt, bạn nghĩ mình vớ được món hời nhưng thực chất tiền sửa chữa lớn hơn giá xe và nó sắp thành sắt vụn. Trong game: Hàng không nợ đầm đìa Boreal Airways hay Bách hóa truyền thống Krona Mall là ví dụ điển hình.',
      buffettTip: 'Buffett từng cảnh báo: "Thà mua một công ty tuyệt vời với giá hợp lý còn hơn mua một công ty tồi với giá rẻ mạt."',
      tag: 'Cạm bẫy',
    },
    {
      term: 'Bong bóng đầu cơ (Overhyped Bubble)',
      meaning: 'Cổ phiếu tăng giá phi mã hàng trăm % chỉ dựa vào tin đồn, truyền thông giật gân, dù công ty chưa hề có lãi.',
      plainExplanation:
        'Các công ty vẽ ra viễn cảnh tương lai thần thánh (hydro xanh, thế giới ảo metaverse, pin tương lai) để bán cổ phiếu giá cao. Đám đông tranh nhau mua vì sợ bỏ lỡ cơ hội (FOMO). Khi cơn sốt qua đi, cổ phiếu sẽ rơi tự do 80 - 99%.',
      buffettTip: 'Buffett dạy: "Hãy sợ hãi khi người khác tham lam, và chỉ tham lam khi người khác sợ hãi."',
      tag: 'Cạm bẫy',
    },
    {
      term: 'Cổ tức tiền mặt (Dividend Yield)',
      meaning: 'Khoản lợi nhuận bằng tiền mặt mà công ty trích ra chia đều cho từng cổ phiếu bạn đang nắm giữ.',
      plainExplanation:
        'Tương tự như việc bạn mua một căn nhà rồi cho thuê lấy tiền hàng tháng. Cổ tức trả bằng tiền tươi thóc thật giúp bạn có dòng tiền phòng thủ ngay cả khi thị trường chứng khoán đi ngang hoặc giảm điểm.',
      buffettTip: 'Các công ty trả cổ tức tiền mặt bền bỉ 20-30 năm liên tục thường là những cỗ máy kinh doanh cực kỳ lành mạnh.',
      tag: 'Thu nhập',
    },
    {
      term: 'Biên độ an toàn (Margin of Safety)',
      meaning: 'Mua cổ phiếu ở mức giá thấp hơn nhiều so với giá trị thực để đề phòng những sai sót hoặc bất trắc.',
      plainExplanation:
        'Nếu bạn xây một cây cầu cho xe tải 10 tấn đi qua, bạn sẽ thiết kế cho nó chịu được 30 tấn. Khoảng chênh lệch 20 tấn đó chính là Biên độ an toàn! Mua cổ phiếu có biên an toàn giúp bạn dù có tính toán sai lệch một chút thì tài khoản vẫn không bị thua lỗ nặng.',
      buffettTip: 'Đây là hòn đá tảng nền móng của trường phái đầu tư giá trị Benjamin Graham & Warren Buffett.',
      tag: 'Triết lý',
    },
  ];

  const filteredTerms = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plainExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Từ Điển Nhà Đầu Tư F0</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                  Giải thích dễ hiểu
                </span>
              </h2>
              <div className="text-xs text-slate-400">
                Hiểu tường tận các thuật ngữ tài chính cốt lõi bằng ví dụ đời thường
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng từ điển"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm nhanh thuật ngữ (P/E, ROE, FCF, Hào kinh tế, Bẫy giá rẻ...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Term Cards */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Không tìm thấy thuật ngữ nào khớp với từ khóa tìm kiếm.
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-amber-400 text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{item.term}</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.tag}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-semibold border-l-2 border-amber-500/60 pl-2.5">
                  Định nghĩa: {item.meaning}
                </div>

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="font-bold text-white flex items-center gap-1 mb-1">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span>Hiểu nôm na như người nhà:</span>
                  </span>
                  {item.plainExplanation}
                </div>

                <div className="text-xs text-emerald-300 bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-400">Lời khuyên của Buffett: </strong>
                    {item.buffettTip}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Đã Hiểu, Quay Lại Bảng Giao Dịch
          </button>
        </div>
      </div>
    </div>
  );
};
