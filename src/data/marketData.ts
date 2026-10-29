/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company, SectorType } from '../types';

export const ALL_SECTORS: SectorType[] = [
  'Năng lượng & Dầu khí',
  'Ngân hàng & Tài chính',
  'Thủy sản & Tiêu dùng',
  'Công nghệ & Bán dẫn',
  'Y tế & Dược phẩm',
  'Bán lẻ & Thương mại',
  'Khai khoáng & Vật liệu',
  'Bất động sản & Hạ tầng',
];

export const INITIAL_CAPITAL_OPTIONS = [
  { value: 10000, label: '10.000 Kr', desc: 'Thử thách khởi nghiệp - Dành cho người muốn kiểm soát vốn chặt chẽ' },
  { value: 50000, label: '50.000 Kr', desc: 'Mức vốn tiêu chuẩn - Đủ để phân bổ đa dạng 4-6 cổ phiếu' },
  { value: 100000, label: '100.000 Kr', desc: 'Quỹ gia đình - Tối ưu cho chiến lược tích sản giá trị dài hạn' },
  { value: 250000, label: '250.000 Kr', desc: 'Nhà đầu tư tổ chức - Quy mô lớn, kiểm nghiệm triệt để kỷ luật Buffett' },
];

/**
 * 24 Doanh nghiệp đại diện cho nền kinh tế Bắc Âu (mô phỏng theo sàn Oslo Børs và thị trường Bắc Âu)
 * Được thiết kế khoa học với các nhóm cổ phiếu đặc trưng theo triết lý Warren Buffett
 */
export const COMPANIES: Company[] = [
  // ================= 1. NĂNG LƯỢNG & DẦU KHÍ =================
  {
    id: 'c1',
    ticker: 'NORD-OIL',
    name: 'Nordic Energy Holdings',
    sector: 'Năng lượng & Dầu khí',
    marketCapCategory: 'Large Cap',
    description: 'Tập đoàn khai thác dầu khí và năng lượng ngoài khơi lớn nhất khu vực thềm lục địa, sở hữu cơ sở hạ tầng dẫn khí độc quyền cung cấp cho châu lục.',
    products: ['Dầu thô Brent Bắc Hải', 'Khí tự nhiên đường ống', 'Điện gió ngoài khơi thử nghiệm'],
    competitiveMoat: 'Giấy phép khai thác độc quyền thềm lục địa với chi phí khai thác cực thấp ($18/thùng) và hệ thống đường ống vận chuyển không thể xây dựng lại.',
    risks: ['Biến động giá dầu thế giới', 'Chi phí chuyển dịch sang năng lượng tái tạo', 'Thuế tài nguyên'],
    managementSummary: 'Ban lãnh đạo kỳ cựu với kỷ luật phân bổ vốn nghiêm ngặt, luôn duy trì lượng tiền mặt dự trữ dồi dào và chính sách cổ tức ổn định.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Equinor ASA (Na Uy) - Gã khổng lồ năng lượng quốc gia',
    buffettRationale: 'Buffett yêu thích các công ty năng lượng có chi phí sản xuất thấp nhất ngành, bảng cân đối kế toán như pháo đài và tạo dòng tiền tự do khổng lồ (tương tự khoản đầu tư vào Chevron/Occidental).',
    historicalMonthlyPrices: [
      120, 122, 126, 130, 134, 138, 142, 140, 136, 132, 128, 124, // Năm 1
      118, 110, 95, 82, 74, 70, 72, 78, 85, 92, 98, 105,         // Năm 2 (Khủng hoảng)
      112, 120, 128, 135, 142, 150, 158, 165, 172, 180, 188, 195, // Năm 3 (Hồi phục)
      202, 210, 218, 225, 232, 240, 238, 245, 252, 260, 268, 275, // Năm 4
      282, 290, 300, 310, 320, 328, 335, 342, 350, 358, 365, 375, // Năm 5 (+212%)
    ],
    financials: [
      { year: 1, revenue: 85000, netIncome: 14200, netMargin: 16.7, roe: 18.2, debtToEquity: 0.42, freeCashFlow: 12500, eps: 11.2, bookValuePerShare: 68, dividendPerShare: 5.5 },
      { year: 2, revenue: 64000, netIncome: 7800, netMargin: 12.1, roe: 10.4, debtToEquity: 0.39, freeCashFlow: 6200, eps: 6.2, bookValuePerShare: 71, dividendPerShare: 4.8 },
      { year: 3, revenue: 98000, netIncome: 18400, netMargin: 18.8, roe: 22.5, debtToEquity: 0.35, freeCashFlow: 16100, eps: 14.5, bookValuePerShare: 82, dividendPerShare: 7.2 },
      { year: 4, revenue: 112000, netIncome: 23500, netMargin: 20.9, roe: 25.1, debtToEquity: 0.28, freeCashFlow: 21000, eps: 18.6, bookValuePerShare: 96, dividendPerShare: 9.0 },
      { year: 5, revenue: 128000, netIncome: 28900, netMargin: 22.5, roe: 27.4, debtToEquity: 0.22, freeCashFlow: 25800, eps: 22.8, bookValuePerShare: 114, dividendPerShare: 11.5 },
    ],
    analystRatings: [
      { analystFirm: 'Nordic Capital Research', verdict: 'MUA', targetPrice: 280, comment: 'Dòng tiền dồi dào, vị thế độc quyền khó lay chuyển.' },
      { analystFirm: 'Continental Securities', verdict: 'NẮM GIỮ', targetPrice: 210, comment: 'Rủi ro biến động giá nguyên liệu và chi phí ESG cao.' },
    ],
  },
  {
    id: 'c2',
    ticker: 'GREEN-HY',
    name: 'Nordic Clean Hydrogen',
    sector: 'Năng lượng & Dầu khí',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp khởi nghiệp công nghệ hydro xanh và pin nhiên liệu cho tàu biển không phát thải, nhận nhiều cam kết tài trợ danh nghĩa.',
    products: ['Thiết bị điện phân hydro', 'Hệ thống trạm tiếp nhiên liệu sạch'],
    competitiveMoat: 'Nhiều bằng sáng chế sơ khai trong phòng lab, hưởng ứng các gói kích thích môi trường của chính phủ nhưng chưa có lợi thế thương mại hóa rõ rệt.',
    risks: ['Chưa có lợi nhuận thương mại', 'Đốt tiền mặt cực nhanh', 'Phụ thuộc vào các đợt phát hành cổ phiếu liên tục để duy trì hoạt động'],
    managementSummary: 'CEO xuất thân từ diễn thuyết công nghệ, rất giỏi tạo tiếng vang truyền thông nhưng liên tục lùi thời hạn hòa vốn.',
    archetype: 'OVERHYPED_BUBBLE',
    realWorldCounterpart: 'Nel ASA / Plug Power - Cơn sốt bong bóng năng lượng xanh',
    buffettRationale: 'Buffett luôn né tránh những công ty liên tục đốt tiền, không có lợi nhuận thực tế và định giá hoàn toàn dựa trên sự cường điệu của tương lai xa xôi.',
    historicalMonthlyPrices: [
      22, 24, 25, 28, 30, 32, 29, 27, 24, 22, 20, 18,             // Năm 1
      16, 14, 11, 9, 8, 12, 18, 25, 34, 42, 55, 68,              // Năm 2 (Bắt đầu cơn sốt)
      78, 88, 96, 110, 118, 112, 95, 84, 72, 60, 52, 45,          // Năm 3 (Đỉnh bong bóng 118 rồi đổ vỡ)
      40, 35, 31, 26, 22, 19, 17, 15, 14, 13, 12, 11,             // Năm 4 (Sụp đổ)
      10, 9.5, 9, 8.8, 8.5, 8.0, 7.8, 7.5, 7.2, 7.0, 6.8, 6.5,    // Năm 5 (-70% so với giá ban đầu, -94% từ đỉnh)
    ],
    financials: [
      { year: 1, revenue: 1200, netIncome: -850, netMargin: -70.8, roe: -24.5, debtToEquity: 0.15, freeCashFlow: -920, eps: -1.2, bookValuePerShare: 8.5, dividendPerShare: 0 },
      { year: 2, revenue: 1800, netIncome: -1250, netMargin: -69.4, roe: -32.1, debtToEquity: 0.22, freeCashFlow: -1400, eps: -1.6, bookValuePerShare: 7.2, dividendPerShare: 0 },
      { year: 3, revenue: 2400, netIncome: -1980, netMargin: -82.5, roe: -44.0, debtToEquity: 0.45, freeCashFlow: -2100, eps: -2.4, bookValuePerShare: 5.8, dividendPerShare: 0 },
      { year: 4, revenue: 2100, netIncome: -2400, netMargin: -114.3, roe: -65.2, debtToEquity: 0.95, freeCashFlow: -2600, eps: -2.8, bookValuePerShare: 3.5, dividendPerShare: 0 },
      { year: 5, revenue: 1900, netIncome: -2800, netMargin: -147.4, roe: -95.0, debtToEquity: 2.10, freeCashFlow: -2900, eps: -3.2, bookValuePerShare: 1.8, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Future Trends Tech', verdict: 'MUA MẠNH', targetPrice: 150, comment: 'Cách mạng năng lượng hydro tương lai, tiềm năng vô hạn!' },
      { analystFirm: 'Prudent Valuation', verdict: 'BÁN MẠNH', targetPrice: 10, comment: 'Đốt tiền khủng khiếp, cổ đông sẽ bị pha loãng thê thảm.' },
    ],
  },
  {
    id: 'c3',
    ticker: 'DEEP-SEAL',
    name: 'Deep Sea Drilling Corp',
    sector: 'Năng lượng & Dầu khí',
    marketCapCategory: 'Small Cap',
    description: 'Doanh nghiệp vận hành đội giàn khoan nước sâu đời cũ, cho các tập đoàn dầu khí lớn thuê theo hợp đồng ngắn hạn.',
    products: ['Cho thuê giàn khoan bán chìm', 'Dịch vụ bảo dưỡng đáy biển'],
    competitiveMoat: 'Không có lợi thế cạnh tranh khác biệt ngoài việc hạ giá cước thuê ngày; tài sản khấu hao nhanh.',
    risks: ['Khoản nợ vay ngân hàng khổng lồ mua sắm giàn khoan', 'Nguy cơ dư thừa nguồn cung giàn khoan', 'Chi phí neo đậu không hoạt động lớn'],
    managementSummary: 'Ban quản trị dùng đòn bẩy tài chính quá đà thời kỳ thịnh vượng, giờ đây chịu áp lực lãi vay đè nặng.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Seadrill Ltd - Bi kịch đòn bẩy nợ giàn khoan',
    buffettRationale: 'Bẫy giá rẻ điển hình: chỉ số P/E thời kỳ đỉnh cao có vẻ thấp (4x), nhưng tài sản là đống nợ ròng khổng lồ và không tạo ra thặng dư cho cổ đông.',
    historicalMonthlyPrices: [
      58, 56, 52, 48, 44, 40, 36, 32, 28, 25, 22, 19,             // Năm 1
      16, 14, 11, 8.5, 7.0, 6.2, 5.8, 6.5, 7.2, 7.8, 7.0, 6.5,     // Năm 2 (Sụp gãy)
      6.2, 5.9, 5.5, 5.2, 5.0, 4.8, 4.5, 4.2, 4.0, 3.8, 3.6, 3.5,  // Năm 3
      3.2, 3.0, 2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8,  // Năm 4
      1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1.0, 0.9, 0.8,  // Năm 5 (-98%)
    ],
    financials: [
      { year: 1, revenue: 14500, netIncome: 1800, netMargin: 12.4, roe: 8.5, debtToEquity: 3.80, freeCashFlow: -1200, eps: 3.5, bookValuePerShare: 42, dividendPerShare: 1.0 },
      { year: 2, revenue: 9200, netIncome: -2400, netMargin: -26.1, roe: -18.2, debtToEquity: 5.60, freeCashFlow: -3800, eps: -4.8, bookValuePerShare: 28, dividendPerShare: 0 },
      { year: 3, revenue: 6800, netIncome: -4100, netMargin: -60.3, roe: -42.5, debtToEquity: 9.80, freeCashFlow: -4500, eps: -8.2, bookValuePerShare: 14, dividendPerShare: 0 },
      { year: 4, revenue: 5200, netIncome: -5600, netMargin: -107.7, roe: -98.0, debtToEquity: 18.5, freeCashFlow: -5200, eps: -11.2, bookValuePerShare: 5, dividendPerShare: 0 },
      { year: 5, revenue: 4100, netIncome: -6800, netMargin: -165.9, roe: -240.0, debtToEquity: 45.0, freeCashFlow: -5900, eps: -13.5, bookValuePerShare: 0.8, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Value Bargain Hunters', verdict: 'MUA', targetPrice: 25, comment: 'Định giá P/B dưới 0.3, tài sản thực nhiều giàn khoan giá trị!' },
      { analystFirm: 'Credit Risk Advisory', verdict: 'BÁN MẠNH', targetPrice: 1, comment: 'Khủng hoảng cơ cấu nợ sắp xảy ra, cổ đông trắng tay.' },
    ],
  },

  // ================= 2. NGÂN HÀNG & TÀI CHÍNH =================
  {
    id: 'c4',
    ticker: 'BOREAL-B',
    name: 'Boreal National Bank',
    sector: 'Ngân hàng & Tài chính',
    marketCapCategory: 'Large Cap',
    description: 'Ngân hàng thương mại lớn nhất với thị phần tiền gửi trên 35%, hệ thống chi nhánh và nền tảng số hóa bao phủ toàn dân.',
    products: ['Cho vay thế chấp bất động sản', 'Dịch vụ ngân hàng số', 'Quản lý tài sản gia đình'],
    competitiveMoat: 'Chi phí vốn rẻ nhất thị trường nhờ tiền gửi không kỳ hạn (CASA) dồi dào, thói quen khó bỏ của người tiêu dùng và thương hiệu trăm năm.',
    risks: ['Quy định an toàn vốn nghiêm ngặt', 'Tỷ lệ nợ xấu có thể tăng nhẹ trong suy thoái'],
    managementSummary: 'Ban điều hành bảo thủ, nói không với đầu cơ tài chính phức tạp, tập trung sinh lời bền vững trên vốn (ROE 14-17%).',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'DNB Bank ASA (Na Uy) - Ngân hàng pháo đài',
    buffettRationale: 'Cổ phiếu ngân hàng kiểu mẫu của Buffett: chi phí huy động vốn thấp, rủi ro nợ xấu được kiểm soát chặt, trả cổ tức tiền mặt hậu hĩnh.',
    historicalMonthlyPrices: [
      85, 87, 88, 90, 92, 94, 96, 95, 93, 91, 88, 86,              // Năm 1
      82, 75, 65, 54, 48, 52, 58, 64, 70, 75, 80, 86,              // Năm 2 (Chạm đáy 48 rồi bật lại mạnh)
      90, 95, 100, 106, 112, 118, 124, 130, 135, 140, 146, 152,    // Năm 3
      158, 164, 170, 175, 180, 185, 190, 194, 198, 204, 210, 215,  // Năm 4
      220, 226, 232, 238, 245, 252, 258, 265, 272, 278, 285, 295,  // Năm 5 (+247%)
    ],
    financials: [
      { year: 1, revenue: 52000, netIncome: 18500, netMargin: 35.6, roe: 14.8, debtToEquity: 1.15, freeCashFlow: 17200, eps: 12.0, bookValuePerShare: 85, dividendPerShare: 6.8 },
      { year: 2, revenue: 48000, netIncome: 12100, netMargin: 25.2, roe: 9.6, debtToEquity: 1.20, freeCashFlow: 11000, eps: 7.8, bookValuePerShare: 88, dividendPerShare: 5.0 },
      { year: 3, revenue: 58000, netIncome: 21500, netMargin: 37.1, roe: 15.8, debtToEquity: 1.10, freeCashFlow: 20100, eps: 13.9, bookValuePerShare: 98, dividendPerShare: 8.2 },
      { year: 4, revenue: 66000, netIncome: 26200, netMargin: 39.7, roe: 17.2, debtToEquity: 1.05, freeCashFlow: 24500, eps: 16.9, bookValuePerShare: 110, dividendPerShare: 10.5 },
      { year: 5, revenue: 74000, netIncome: 31000, netMargin: 41.9, roe: 18.1, debtToEquity: 0.98, freeCashFlow: 29000, eps: 20.0, bookValuePerShare: 124, dividendPerShare: 12.8 },
    ],
    analystRatings: [
      { analystFirm: 'Nordic Banking Monitor', verdict: 'MUA', targetPrice: 220, comment: 'Chất lượng tài sản tuyệt hảo, cổ tức tiền mặt vững như bàn thạch.' },
      { analystFirm: 'Macro Trends', verdict: 'NẮM GIỮ', targetPrice: 170, comment: 'Tăng trưởng tín dụng chậm lại do thị trường bất động sản nguội.' },
    ],
  },
  {
    id: 'c5',
    ticker: 'AURORA-INS',
    name: 'Aurora Life & Pension',
    sector: 'Ngân hàng & Tài chính',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp bảo hiểm nhân thọ và quản lý quỹ hưu trí tư nhân lâu đời, phục vụ hơn 1,5 triệu người lao động.',
    products: ['Bảo hiểm nhân thọ tích lũy', 'Quỹ hưu trí doanh nghiệp', 'Bảo hiểm tài sản doanh nghiệp'],
    competitiveMoat: 'Nắm giữ nguồn tiền nhàn rỗi (float) chi phí âm khổng lồ từ phí bảo hiểm thu trước, chi phí chuyển đổi cao của các hợp đồng hưu trí 30 năm.',
    risks: ['Môi trường lãi suất quá thấp ảnh hưởng lợi suất đầu tư', 'Rủi ro tuổi thọ trung bình tăng'],
    managementSummary: 'Ban lãnh đạo chuyên về định phí bảo hiểm (actuary) cẩn trọng, không chạy đua hạ phí vô tội vạ.',
    archetype: 'HIGH_DIVIDEND',
    realWorldCounterpart: 'Storebrand ASA (Na Uy) / Gjensidige Forsikring',
    buffettRationale: 'Buffett xây dựng đế chế Berkshire Hathaway dựa trên "Float" bảo hiểm. Aurora là nguồn máy in tiền nhàn rỗi ổn định và an toàn.',
    historicalMonthlyPrices: [
      60, 61, 62, 63, 64, 65, 66, 65, 64, 63, 62, 61,              // Năm 1
      59, 54, 49, 44, 42, 45, 48, 52, 55, 58, 62, 65,              // Năm 2
      68, 71, 74, 76, 78, 81, 83, 86, 88, 90, 92, 95,              // Năm 3
      97, 99, 101, 104, 106, 108, 110, 112, 114, 116, 118, 120,    // Năm 4
      122, 125, 127, 130, 132, 135, 137, 140, 142, 145, 148, 152,  // Năm 5 (+153%, cộng thêm 7%/năm cổ tức)
    ],
    financials: [
      { year: 1, revenue: 28000, netIncome: 3800, netMargin: 13.6, roe: 12.5, debtToEquity: 0.35, freeCashFlow: 4200, eps: 5.5, bookValuePerShare: 46, dividendPerShare: 4.2 },
      { year: 2, revenue: 27500, netIncome: 2900, netMargin: 10.5, roe: 9.2, debtToEquity: 0.38, freeCashFlow: 3500, eps: 4.2, bookValuePerShare: 48, dividendPerShare: 3.8 },
      { year: 3, revenue: 31000, netIncome: 4600, netMargin: 14.8, roe: 13.8, debtToEquity: 0.32, freeCashFlow: 5100, eps: 6.6, bookValuePerShare: 54, dividendPerShare: 5.2 },
      { year: 4, revenue: 34500, netIncome: 5500, netMargin: 15.9, roe: 14.9, debtToEquity: 0.29, freeCashFlow: 6000, eps: 7.9, bookValuePerShare: 60, dividendPerShare: 6.3 },
      { year: 5, revenue: 38000, netIncome: 6400, netMargin: 16.8, roe: 15.6, debtToEquity: 0.25, freeCashFlow: 7100, eps: 9.2, bookValuePerShare: 68, dividendPerShare: 7.5 },
    ],
    analystRatings: [
      { analystFirm: 'Income & Dividend Advisor', verdict: 'MUA', targetPrice: 110, comment: 'Lựa chọn phòng thủ số một, cổ tức tiền mặt chia đều đặn.' },
      { analystFirm: 'Alpha Hunters', verdict: 'NẮM GIỮ', targetPrice: 95, comment: 'Cổ phiếu phòng thủ, biến động thấp không thích hợp cho lướt sóng.' },
    ],
  },
  {
    id: 'c6',
    ticker: 'KRONA-FIN',
    name: 'Krona Fast Credit',
    sector: 'Ngân hàng & Tài chính',
    marketCapCategory: 'Small Cap',
    description: 'Công ty tài chính tiêu dùng chuyên cấp thẻ tín dụng lãi suất cao và vay trả góp mua sắm trực tuyến cho giới trẻ.',
    products: ['Vay mua sắm không thế chấp', 'Thẻ tín dụng quay vòng', 'Vay tiền mặt qua app'],
    competitiveMoat: 'Duyệt vay cấp tốc qua ứng dụng, tuy nhiên rủi ro tín dụng của khách hàng thuộc nhóm thấp nhất xã hội.',
    risks: ['Tỷ lệ nợ xấu bùng nổ khi kinh tế giảm tốc', 'Chi phí trích lập dự phòng rủi ro lớn', 'Chính sách siết trần lãi suất'],
    managementSummary: 'Ban điều hành chạy theo tăng trưởng nóng bằng mọi giá, nới lỏng điều kiện thẩm định tín dụng.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'B2Holding / Hoist Finance - Rủi ro nợ xấu tiêu dùng',
    buffettRationale: 'Buffett kiên quyết tránh các tổ chức tài chính dùng đòn bẩy cho vay rủi ro cao để tìm kiếm lợi nhuận ngắn hạn.',
    historicalMonthlyPrices: [
      45, 46, 48, 49, 47, 44, 40, 36, 32, 27, 22, 17,              // Năm 1
      14, 10, 8.2, 6.5, 5.0, 4.5, 4.2, 4.0, 3.8, 3.5, 3.2, 3.0,     // Năm 2 (Nợ xấu bộc lộ, sụp đổ)
      2.8, 2.7, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6,  // Năm 3
      1.5, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1.0, 1.0, 0.9,  // Năm 4
      0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3,  // Năm 5 (-99%)
    ],
    financials: [
      { year: 1, revenue: 6500, netIncome: 1200, netMargin: 18.5, roe: 16.5, debtToEquity: 4.80, freeCashFlow: 350, eps: 3.2, bookValuePerShare: 22, dividendPerShare: 1.5 },
      { year: 2, revenue: 4200, netIncome: -1800, netMargin: -42.8, roe: -35.2, debtToEquity: 8.50, freeCashFlow: -950, eps: -4.8, bookValuePerShare: 12, dividendPerShare: 0 },
      { year: 3, revenue: 2800, netIncome: -2600, netMargin: -92.8, roe: -68.0, debtToEquity: 16.2, freeCashFlow: -1200, eps: -6.9, bookValuePerShare: 4, dividendPerShare: 0 },
      { year: 4, revenue: 1900, netIncome: -3100, netMargin: -163.1, roe: -140.0, debtToEquity: 32.0, freeCashFlow: -1500, eps: -8.2, bookValuePerShare: 1, dividendPerShare: 0 },
      { year: 5, revenue: 1200, netIncome: -3500, netMargin: -291.6, roe: -300.0, debtToEquity: 80.0, freeCashFlow: -1800, eps: -9.5, bookValuePerShare: 0.2, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Deep Value Screen', verdict: 'MUA', targetPrice: 15, comment: 'P/E quá khứ chỉ 4x, cơ hội tái cơ cấu tài sản giá rẻ!' },
      { analystFirm: 'Credit Watchdogs', verdict: 'BÁN MẠNH', targetPrice: 0.5, comment: 'Làn sóng vỡ nợ thẻ tiêu dùng lan rộng, vốn chủ sở hữu bị xóa sạch.' },
    ],
  },

  // ================= 3. THỦY SẢN & TIÊU DÙNG =================
  {
    id: 'c7',
    ticker: 'VIKING-AQ',
    name: 'Viking Aquaculture Group',
    sector: 'Thủy sản & Tiêu dùng',
    marketCapCategory: 'Large Cap',
    description: 'Doanh nghiệp nuôi trồng và xuất khẩu cá hồi Đại Tây Dương lớn nhất thế giới, sở hữu các vịnh hẹp tự nhiên (fjord) nước lạnh lý tưởng.',
    products: ['Cá hồi tươi nguyên con', 'Cá hồi phi lê hun khói cao cấp', 'Dầu cá omega-3 dược phẩm'],
    competitiveMoat: 'Lợi thế địa lý độc nhất vô nhị: chính phủ ngừng cấp mới giấy phép mặt nước vịnh hẹp do rào cản sinh thái. Chi phí sản xuất thấp nhất toàn cầu với thương hiệu được chứng nhận.',
    risks: ['Rận biển ký sinh và dịch bệnh thủy sản', 'Biến đổi khí hậu nước ấm', 'Hạn ngạch xuất khẩu'],
    managementSummary: 'Tập trung tối đa vào sinh học biển bền vững, tự động hóa cho ăn bằng AI, dòng tiền tái đầu tư với ROE duy trì trên 22%.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Mowi ASA / SalMar ASA (Na Uy) - Ngành cá hồi triệu đô',
    buffettRationale: 'Đây chính là loại tài sản "Lâu đài có hào bảo vệ" mà Buffett và Munger mê mẩn: một sản phẩm protein lành mạnh được toàn cầu thèm muốn, rào cản gia nhập tự nhiên gần như không thể vượt qua.',
    historicalMonthlyPrices: [
      110, 114, 118, 122, 126, 130, 134, 132, 128, 125, 120, 115,  // Năm 1
      108, 98, 88, 79, 72, 75, 82, 90, 100, 112, 125, 136,         // Năm 2 (Chịu ảnh hưởng khủng hoảng ngắn, phục hồi siêu nhanh)
      145, 155, 168, 180, 192, 205, 218, 230, 242, 255, 268, 280,  // Năm 3
      292, 305, 318, 330, 342, 355, 368, 380, 395, 410, 425, 440,  // Năm 4
      455, 470, 490, 510, 530, 550, 570, 590, 610, 630, 650, 680,  // Năm 5 (+518% - Siêu cổ phiếu giá trị)
    ],
    financials: [
      { year: 1, revenue: 38000, netIncome: 7600, netMargin: 20.0, roe: 22.4, debtToEquity: 0.45, freeCashFlow: 6800, eps: 15.2, bookValuePerShare: 72, dividendPerShare: 8.5 },
      { year: 2, revenue: 36000, netIncome: 5400, netMargin: 15.0, roe: 14.8, debtToEquity: 0.48, freeCashFlow: 4900, eps: 10.8, bookValuePerShare: 76, dividendPerShare: 6.5 },
      { year: 3, revenue: 46000, netIncome: 11200, netMargin: 24.3, roe: 26.5, debtToEquity: 0.38, freeCashFlow: 10100, eps: 22.4, bookValuePerShare: 90, dividendPerShare: 13.0 },
      { year: 4, revenue: 58000, netIncome: 16800, netMargin: 28.9, roe: 31.2, debtToEquity: 0.30, freeCashFlow: 15200, eps: 33.6, bookValuePerShare: 112, dividendPerShare: 19.5 },
      { year: 5, revenue: 72000, netIncome: 22500, netMargin: 31.2, roe: 33.8, debtToEquity: 0.24, freeCashFlow: 20800, eps: 45.0, bookValuePerShare: 142, dividendPerShare: 26.0 },
    ],
    analystRatings: [
      { analystFirm: 'Agri-Food Global', verdict: 'MUA MẠNH', targetPrice: 550, comment: 'Cầu cá hồi thế giới bùng nổ, biên lợi nhuận cao nhất ngành thủy sản.' },
      { analystFirm: 'Commodity Watch', verdict: 'MUA', targetPrice: 420, comment: 'Lợi thế tự nhiên vịnh hẹp là rào cản không thể xâm phạm.' },
    ],
  },
  {
    id: 'c8',
    ticker: 'FROST-DAIRY',
    name: 'Frost Valley Foods',
    sector: 'Thủy sản & Tiêu dùng',
    marketCapCategory: 'Mid Cap',
    description: 'Tập đoàn chế biến sữa tươi, bơ phô mai và thực phẩm đóng gói thiết yếu, có mặt trong 95% tủ lạnh các gia đình Bắc Âu.',
    products: ['Sữa tươi thanh trùng', 'Phô mai nâu truyền thống', 'Thực phẩm đông lạnh gia đình'],
    competitiveMoat: 'Thương hiệu quốc dân gắn bó qua nhiều thế hệ, hệ thống chuỗi cung ứng lạnh khép kín từ nông trại đến siêu thị.',
    risks: ['Chi phí thức ăn chăn nuôi gia súc tăng', 'Áp lực giá bán từ các chuỗi bán lẻ'],
    managementSummary: 'Quản trị bảo thủ, tập trung tối ưu năng suất, tạo dòng tiền nhàn rỗi ổn định bất kể kinh tế thịnh vượng hay khủng hoảng.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Orkla ASA / TINE Group (Na Uy) - Hàng tiêu dùng thiết yếu',
    buffettRationale: 'Thuộc nhóm doanh nghiệp "Người tiêu dùng mua mỗi ngày" tương tự Coca-Cola hay Kraft Heinz. Lợi nhuận tăng trưởng đều đặn 8-12%/năm.',
    historicalMonthlyPrices: [
      70, 71, 72, 73, 74, 75, 76, 75, 74, 73, 72, 71,              // Năm 1
      70, 67, 63, 59, 58, 60, 63, 66, 69, 72, 75, 78,              // Năm 2 (Chống đỡ khủng hoảng xuất sắc)
      81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114,          // Năm 3
      117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150,  // Năm 4
      153, 156, 160, 164, 168, 172, 176, 180, 185, 190, 195, 202,  // Năm 5 (+188%)
    ],
    financials: [
      { year: 1, revenue: 42000, netIncome: 4500, netMargin: 10.7, roe: 15.2, debtToEquity: 0.38, freeCashFlow: 4100, eps: 6.8, bookValuePerShare: 48, dividendPerShare: 4.2 },
      { year: 2, revenue: 43500, netIncome: 4200, netMargin: 9.6, roe: 13.8, debtToEquity: 0.36, freeCashFlow: 3900, eps: 6.3, bookValuePerShare: 50, dividendPerShare: 4.2 },
      { year: 3, revenue: 48000, netIncome: 5400, netMargin: 11.2, roe: 16.4, debtToEquity: 0.32, freeCashFlow: 5100, eps: 8.1, bookValuePerShare: 56, dividendPerShare: 5.4 },
      { year: 4, revenue: 53000, netIncome: 6500, netMargin: 12.2, roe: 17.8, debtToEquity: 0.28, freeCashFlow: 6200, eps: 9.8, bookValuePerShare: 63, dividendPerShare: 6.6 },
      { year: 5, revenue: 59000, netIncome: 7800, netMargin: 13.2, roe: 18.9, debtToEquity: 0.25, freeCashFlow: 7500, eps: 11.7, bookValuePerShare: 72, dividendPerShare: 8.0 },
    ],
    analystRatings: [
      { analystFirm: 'Consumer Staples Equity', verdict: 'MUA', targetPrice: 140, comment: 'Hàng tiêu dùng thiết yếu, kháng lạm phát và suy thoái cực tốt.' },
      { analystFirm: 'Growth Seekers', verdict: 'NẮM GIỮ', targetPrice: 120, comment: 'Tăng trưởng ổn định nhưng không có đột biến công nghệ.' },
    ],
  },

  // ================= 4. CÔNG NGHỆ & BÁN DẪN =================
  {
    id: 'c9',
    ticker: 'TOMRA-REV',
    name: 'Nordic Sensor & Sorting',
    sector: 'Công nghệ & Bán dẫn',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp tiên phong và thống trị toàn cầu về máy thu hồi vỏ lon/chai tự động (Reverse Vending) và công nghệ quang học phân loại quặng/rác.',
    products: ['Máy thu hồi vỏ chai tự động siêu thị', 'Hệ thống cảm biến quang phổ phân loại nhựa', 'Phần mềm quản lý hoàn tiền ký quỹ'],
    competitiveMoat: 'Thị phần 75% toàn cầu trong máy thu hồi tự động. Mạng lưới bảo trì phần mềm độc quyền và các quy định pháp luật châu Âu bắt buộc áp dụng hệ thống tái chế.',
    risks: ['Chậm trễ ban hành luật tái chế tại các thị trường mới (Mỹ, châu Á)', 'Cạnh tranh từ các giải pháp cơ học giá rẻ'],
    managementSummary: 'Định hướng R&D bài bản, giữ vững vị thế độc quyền thị trường ngách, tỷ suất ROE liên tục trên 20%.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Tomra Systems ASA (Na Uy) - "Monopoly" công nghệ xanh',
    buffettRationale: 'Điển hình cho mô hình "Độc quyền ngách" (Niche Monopoly) mà Buffett săn lùng: thị trường không đủ lớn để các gã khổng lồ nhảy vào tranh giành, nhưng người sở hữu nó thu phí đều đặn suốt hàng thập kỷ.',
    historicalMonthlyPrices: [
      95, 98, 102, 106, 110, 114, 118, 116, 112, 108, 104, 100,     // Năm 1
      94, 85, 75, 68, 62, 66, 74, 84, 96, 108, 120, 134,           // Năm 2 (Bật tăng thần tốc sau khủng hoảng)
      145, 158, 172, 186, 200, 215, 230, 245, 260, 275, 290, 305,  // Năm 3
      320, 335, 350, 365, 380, 395, 410, 425, 440, 455, 470, 485,  // Năm 4
      500, 520, 540, 560, 580, 600, 620, 640, 665, 690, 715, 745,  // Năm 5 (+684%)
    ],
    financials: [
      { year: 1, revenue: 11000, netIncome: 1800, netMargin: 16.3, roe: 21.2, debtToEquity: 0.28, freeCashFlow: 1650, eps: 8.5, bookValuePerShare: 45, dividendPerShare: 4.8 },
      { year: 2, revenue: 10500, netIncome: 1450, netMargin: 13.8, roe: 16.5, debtToEquity: 0.30, freeCashFlow: 1300, eps: 6.8, bookValuePerShare: 48, dividendPerShare: 4.2 },
      { year: 3, revenue: 14200, netIncome: 2750, netMargin: 19.3, roe: 26.8, debtToEquity: 0.22, freeCashFlow: 2500, eps: 12.9, bookValuePerShare: 58, dividendPerShare: 7.5 },
      { year: 4, revenue: 18500, netIncome: 4100, netMargin: 22.1, roe: 31.5, debtToEquity: 0.18, freeCashFlow: 3850, eps: 19.2, bookValuePerShare: 72, dividendPerShare: 11.2 },
      { year: 5, revenue: 23800, netIncome: 5800, netMargin: 24.3, roe: 34.2, debtToEquity: 0.12, freeCashFlow: 5400, eps: 27.2, bookValuePerShare: 91, dividendPerShare: 16.0 },
    ],
    analystRatings: [
      { analystFirm: 'CleanTech Global', verdict: 'MUA MẠNH', targetPrice: 500, comment: 'Độc quyền toàn cầu về máy phân loại tự động, rào cản kỹ thuật vượt trội.' },
      { analystFirm: 'Tech Valuation Watch', verdict: 'MUA', targetPrice: 380, comment: 'Chỉ số ROE dẫn đầu bảng, biên dòng tiền tự do xuất sắc.' },
    ],
  },
  {
    id: 'c10',
    ticker: 'METAVERSE-N',
    name: 'Nordic Virtual Worlds',
    sector: 'Công nghệ & Bán dẫn',
    marketCapCategory: 'Small Cap',
    description: 'Công ty phát triển đồ họa không gian thực tế ảo, bán các mảnh đất ảo và vật phẩm kỹ thuật số trong không gian metaverse.',
    products: ['Phần mềm VR/AR thế hệ mới', 'Nền tảng giao dịch tài sản số thế giới ảo'],
    competitiveMoat: 'Không có. Mô hình kinh doanh dựa hoàn toàn vào hiệu ứng mạng lưới ảo tạm thời và sự quan tâm đầu cơ của giới trẻ.',
    risks: ['Người dùng rời bỏ nhanh chóng sau khi hết trend', 'Doanh thu bốc hơi', 'Không có tài sản thực có thể thanh lý'],
    managementSummary: 'Đội ngũ sáng lập trẻ trung, phát ngôn gây bão trên mạng xã hội nhưng liên tục bán ra cổ phiếu cá nhân.',
    archetype: 'OVERHYPED_BUBBLE',
    realWorldCounterpart: 'Cơn sốt cổ phiếu VR/Web3/NFT thời kỳ tiền rẻ',
    buffettRationale: 'Buffett gọi những thứ này là "Thuốc diệt chuột tài chính" (Rat poison squared). Chúng không tạo ra bất kỳ của cải hữu hình nào cho nhân loại.',
    historicalMonthlyPrices: [
      15, 17, 20, 24, 28, 35, 45, 60, 78, 102, 130, 165,            // Năm 1 (Bùng nổ phi lý từ 15 lên 165 Kr)
      180, 195, 170, 135, 95, 65, 45, 32, 22, 15, 11, 8.5,          // Năm 2 (Sụp gãy thảm khốc)
      7.2, 6.0, 5.2, 4.5, 4.0, 3.6, 3.2, 2.9, 2.6, 2.3, 2.1, 1.9,  // Năm 3
      1.7, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.9, 0.8, 0.8, 0.7,  // Năm 4
      0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.2,  // Năm 5 (-98.7% từ đầu, -99.9% từ đỉnh)
    ],
    financials: [
      { year: 1, revenue: 850, netIncome: 120, netMargin: 14.1, roe: 8.5, debtToEquity: 0.10, freeCashFlow: 80, eps: 0.4, bookValuePerShare: 5.2, dividendPerShare: 0 },
      { year: 2, revenue: 620, netIncome: -450, netMargin: -72.5, roe: -38.0, debtToEquity: 0.25, freeCashFlow: -520, eps: -1.5, bookValuePerShare: 3.5, dividendPerShare: 0 },
      { year: 3, revenue: 180, netIncome: -980, netMargin: -544.4, roe: -120.0, debtToEquity: 0.85, freeCashFlow: -1050, eps: -3.2, bookValuePerShare: 1.2, dividendPerShare: 0 },
      { year: 4, revenue: 90, netIncome: -1200, netMargin: -1333.3, roe: -300.0, debtToEquity: 3.50, freeCashFlow: -1250, eps: -4.1, bookValuePerShare: 0.3, dividendPerShare: 0 },
      { year: 5, revenue: 45, netIncome: -1400, netMargin: -3111.1, roe: -700.0, debtToEquity: 12.0, freeCashFlow: -1420, eps: -4.8, bookValuePerShare: 0.05, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Cyber Visionaries', verdict: 'MUA MẠNH', targetPrice: 250, comment: 'Kỷ nguyên số mới, định giá theo lượng truy cập tương lai!' },
      { analystFirm: 'Traditional Equity', verdict: 'BÁN MẠNH', targetPrice: 1, comment: 'Bong bóng đầu cơ thuần túy, không có mô hình kinh doanh bền vững.' },
    ],
  },
  {
    id: 'c11',
    ticker: 'SCAND-SEMI',
    name: 'Scandia IoT Microchips',
    sector: 'Công nghệ & Bán dẫn',
    marketCapCategory: 'Mid Cap',
    description: 'Nhà thiết kế chip vi điều khiển tiêu thụ siêu ít năng lượng hàng đầu châu Âu cho các thiết bị đeo thông minh và thiết bị y tế IoT.',
    products: ['Chip Bluetooth Low Energy (BLE)', 'Chip bán dẫn định vị vệ tinh năng lượng thấp'],
    competitiveMoat: 'Thư viện phần mềm nhúng tối ưu hóa và liên minh đối tác lâu năm với các hãng công nghệ lớn.',
    risks: ['Thiếu hụt năng lực gia công tại các xưởng đúc toàn cầu', 'Chu kỳ tồn kho thiết bị điện tử'],
    managementSummary: 'Tập thể kỹ sư xuất sắc, đầu tư R&D đều đặn 18% doanh thu, bảo toàn cấu trúc vốn an toàn.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Nordic Semiconductor ASA (Na Uy) - Bán dẫn tầm cỡ thế giới',
    buffettRationale: 'Doanh nghiệp tăng trưởng lành mạnh dựa trên năng lực công nghệ thực thụ, mặc dù có biến động chu kỳ bán dẫn ngắn hạn.',
    historicalMonthlyPrices: [
      80, 83, 86, 90, 94, 98, 102, 100, 96, 92, 88, 84,             // Năm 1
      80, 72, 62, 54, 49, 53, 60, 70, 82, 95, 108, 122,            // Năm 2
      135, 148, 162, 175, 188, 202, 215, 228, 240, 252, 265, 278,  // Năm 3
      270, 260, 250, 242, 235, 245, 258, 272, 285, 298, 310, 325,  // Năm 4 (Chu kỳ hàng tồn kho điều chỉnh nhẹ)
      340, 355, 370, 385, 400, 415, 430, 445, 460, 480, 500, 520,  // Năm 5 (+550%)
    ],
    financials: [
      { year: 1, revenue: 5200, netIncome: 750, netMargin: 14.4, roe: 16.8, debtToEquity: 0.15, freeCashFlow: 680, eps: 4.8, bookValuePerShare: 32, dividendPerShare: 1.5 },
      { year: 2, revenue: 4800, netIncome: 510, netMargin: 10.6, roe: 11.2, debtToEquity: 0.18, freeCashFlow: 450, eps: 3.2, bookValuePerShare: 34, dividendPerShare: 1.0 },
      { year: 3, revenue: 7400, netIncome: 1420, netMargin: 19.2, roe: 24.5, debtToEquity: 0.12, freeCashFlow: 1300, eps: 9.1, bookValuePerShare: 42, dividendPerShare: 3.2 },
      { year: 4, revenue: 9200, netIncome: 1950, netMargin: 21.2, roe: 27.2, debtToEquity: 0.08, freeCashFlow: 1820, eps: 12.5, bookValuePerShare: 52, dividendPerShare: 5.0 },
      { year: 5, revenue: 12500, netIncome: 2850, netMargin: 22.8, roe: 29.5, debtToEquity: 0.05, freeCashFlow: 2650, eps: 18.2, bookValuePerShare: 66, dividendPerShare: 7.5 },
    ],
    analystRatings: [
      { analystFirm: 'Semiconductor Insights', verdict: 'MUA', targetPrice: 350, comment: 'Nhu cầu thiết bị thông minh IoT tăng trưởng cấp số nhân.' },
      { analystFirm: 'Hardware Trends', verdict: 'NẮM GIỮ', targetPrice: 280, comment: 'Áp lực phân bổ wafer từ các xưởng đúc châu Á.' },
    ],
  },

  // ================= 5. Y TẾ & DƯỢC PHẨM =================
  {
    id: 'c12',
    ticker: 'POLAR-MED',
    name: 'Polaris Medical Tech',
    sector: 'Y tế & Dược phẩm',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp chế tạo thiết bị cấy ghép phẫu thuật chỉnh hình và máy nội soi laser chính xác cao, cung cấp cho các bệnh viện hàng đầu châu Âu.',
    products: ['Khớp háng nhân tạo titan sinh học', 'Hệ thống phẫu thuật nội soi tối thiểu', 'Vật liệu vá xương sinh học'],
    competitiveMoat: 'Đạt hơn 30 bằng sáng chế y tế, bác sĩ phẫu thuật được đào tạo gắn bó lâu năm, chi phí chuyển đổi của bệnh viện cực kỳ tốn kém.',
    risks: ['Rủi ro kiện tụng chất lượng sản phẩm y tế', 'Quy trình phê duyệt thiết bị y tế mới mất nhiều năm'],
    managementSummary: 'Ban điều hành gồm các chuyên gia y sinh và tài chính dày dặn kinh nghiệm, không thỏa hiệp về chất lượng.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Coloplast / Demant / Vitrolife (Bắc Âu) - Thiết bị y tế bền vững',
    buffettRationale: 'Buffett yêu mến những công ty có chi phí chuyển đổi cao (High switching costs) và sản phẩm thiết yếu đến mức khách hàng không bao giờ mặc cả về giá khi sức khỏe bị đe dọa.',
    historicalMonthlyPrices: [
      88, 91, 94, 97, 100, 103, 106, 105, 102, 99, 96, 93,          // Năm 1
      90, 84, 78, 72, 68, 72, 78, 85, 93, 102, 112, 122,            // Năm 2
      130, 140, 150, 160, 172, 184, 196, 208, 220, 232, 245, 258,  // Năm 3
      270, 282, 295, 308, 320, 332, 345, 358, 370, 385, 400, 415,  // Năm 4
      430, 445, 462, 480, 500, 520, 540, 560, 580, 605, 630, 660,  // Năm 5 (+650%)
    ],
    financials: [
      { year: 1, revenue: 8200, netIncome: 1650, netMargin: 20.1, roe: 21.5, debtToEquity: 0.22, freeCashFlow: 1520, eps: 9.8, bookValuePerShare: 52, dividendPerShare: 4.5 },
      { year: 2, revenue: 8600, netIncome: 1580, netMargin: 18.4, roe: 19.2, debtToEquity: 0.20, freeCashFlow: 1450, eps: 9.4, bookValuePerShare: 57, dividendPerShare: 4.5 },
      { year: 3, revenue: 10800, netIncome: 2450, netMargin: 22.7, roe: 25.8, debtToEquity: 0.16, freeCashFlow: 2300, eps: 14.5, bookValuePerShare: 68, dividendPerShare: 7.2 },
      { year: 4, revenue: 13500, netIncome: 3400, netMargin: 25.2, roe: 29.4, debtToEquity: 0.12, freeCashFlow: 3180, eps: 20.2, bookValuePerShare: 82, dividendPerShare: 10.5 },
      { year: 5, revenue: 17200, netIncome: 4600, netMargin: 26.7, roe: 31.8, debtToEquity: 0.08, freeCashFlow: 4320, eps: 27.4, bookValuePerShare: 102, dividendPerShare: 14.8 },
    ],
    analystRatings: [
      { analystFirm: 'Healthcare Research', verdict: 'MUA MẠNH', targetPrice: 420, comment: 'Tỷ suất lợi nhuận gộp trên 65%, khách hàng bệnh viện trung thành.' },
      { analystFirm: 'MedTech Weekly', verdict: 'MUA', targetPrice: 320, comment: 'Lợi thế bảo hộ bằng sáng chế vững chắc.' },
    ],
  },
  {
    id: 'c13',
    ticker: 'GENE-CURE',
    name: 'BioNordic Gene Therapeutics',
    sector: 'Y tế & Dược phẩm',
    marketCapCategory: 'Small Cap',
    description: 'Công ty công nghệ sinh học giai đoạn nghiên cứu lâm sàng, phát triển liệu pháp gen nhằm chữa trị các chứng bệnh thoái hóa cơ hiếm gặp.',
    products: ['Liệu pháp gen BNG-01 (Đang thử nghiệm giai đoạn II)', 'Nghiên cứu tiền lâm sàng BNG-02'],
    competitiveMoat: 'Không có sản phẩm bán trên thị trường. Toàn bộ định giá phụ thuộc vào xác suất thành công của thử nghiệm lâm sàng.',
    risks: ['Tỷ lệ thất bại thử nghiệm lâm sàng pha III thường trên 80%', 'Không có doanh thu thương mại', 'Liên tục bán tháo cổ phiếu để huy động vốn'],
    managementSummary: 'Các nhà khoa học hàn lâm, thiếu kinh nghiệm thương mại và quản lý tài chính doanh nghiệp.',
    archetype: 'OVERHYPED_BUBBLE',
    realWorldCounterpart: 'Cổ phiếu công nghệ sinh học lâm sàng (Biotech clinical stage)',
    buffettRationale: 'Buffett tuyệt đối không mua "xổ số sinh học". Nếu bạn không thể tính toán được dòng tiền tương lai với độ tin cậy hợp lý, đó không phải là đầu tư mà là đánh bạc.',
    historicalMonthlyPrices: [
      30, 34, 40, 48, 58, 70, 85, 105, 125, 110, 88, 65,            // Năm 1 (Bơm thổi tin đồn thử nghiệm)
      50, 38, 28, 20, 15, 12, 10, 8.5, 7.2, 6.0, 5.2, 4.5,          // Năm 2 (Thử nghiệm thất bại, giá rơi tự do)
      4.0, 3.6, 3.3, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.9, 1.8, 1.7,  // Năm 3
      1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.1, 1.0, 0.9, 0.9, 0.8, 0.8,  // Năm 4
      0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2,  // Năm 5 (-99.3%)
    ],
    financials: [
      { year: 1, revenue: 50, netIncome: -620, netMargin: -1240.0, roe: -45.0, debtToEquity: 0.10, freeCashFlow: -680, eps: -2.8, bookValuePerShare: 6.2, dividendPerShare: 0 },
      { year: 2, revenue: 20, netIncome: -950, netMargin: -4750.0, roe: -85.0, debtToEquity: 0.35, freeCashFlow: -1020, eps: -4.2, bookValuePerShare: 3.1, dividendPerShare: 0 },
      { year: 3, revenue: 0, netIncome: -1250, netMargin: -9999.0, roe: -160.0, debtToEquity: 1.20, freeCashFlow: -1300, eps: -5.5, bookValuePerShare: 1.0, dividendPerShare: 0 },
      { year: 4, revenue: 0, netIncome: -1400, netMargin: -9999.0, roe: -350.0, debtToEquity: 4.80, freeCashFlow: -1420, eps: -6.2, bookValuePerShare: 0.2, dividendPerShare: 0 },
      { year: 5, revenue: 0, netIncome: -1600, netMargin: -9999.0, roe: -900.0, debtToEquity: 15.0, freeCashFlow: -1620, eps: -7.1, bookValuePerShare: 0.02, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Biotech Moonshot', verdict: 'MUA MẠNH', targetPrice: 180, comment: 'Đột phá chữa bệnh di truyền thế kỷ, cơ hội nhân 10 tài khoản!' },
      { analystFirm: 'Medical Science Audit', verdict: 'BÁN MẠNH', targetPrice: 0.5, comment: 'Dữ liệu lâm sàng không đạt ý nghĩa thống kê, nguy cơ giải thể.' },
    ],
  },

  // ================= 6. BÁN LẺ & THƯƠNG MẠI =================
  {
    id: 'c14',
    ticker: 'EURO-DISC',
    name: 'Scandic Discount Stores',
    sector: 'Bán lẻ & Thương mại',
    marketCapCategory: 'Mid Cap',
    description: 'Chuỗi siêu thị bách hóa bán lẻ giá rẻ (discount store) với hơn 400 cửa hàng tại các thị trấn và ngoại ô, bán hàng tiêu dùng thiết yếu và đồ gia dụng.',
    products: ['Thực phẩm khô và đồ hộp giá sỉ', 'Đồ gia dụng & vật dụng tiện ích gia đình', 'Hóa mỹ phẩm bình dân'],
    competitiveMoat: 'Quy mô thu mua số lượng lớn giúp ép giá nhà sản xuất (Cost Advantage), mạng lưới cửa hàng nằm ở vị trí ngoại ô giá thuê thấp khó bị cạnh tranh bởi thương mại điện tử.',
    risks: ['Áp lực tiền lương nhân viên bán hàng tăng', 'Lạm phát giá vốn hàng mua vào'],
    managementSummary: 'Ban điều hành thực dụng theo phong cách Walmart buổi đầu: tiết kiệm từng đồng xu chi phí vận hành để giảm giá cho khách.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Europris ASA (Na Uy) / Costco - Cỗ máy sinh lời bán lẻ',
    buffettRationale: 'Buffett và Munger luôn tôn sùng các nhà bán lẻ có lợi thế chi phí thấp bền vững (như Costco hay Nebraska Furniture Mart): họ chia sẻ phần lớn thặng dư cho khách hàng, tạo nên sự trung thành tuyệt đối.',
    historicalMonthlyPrices: [
      75, 77, 80, 83, 86, 89, 92, 90, 87, 84, 82, 79,              // Năm 1
      76, 72, 68, 65, 62, 66, 72, 79, 87, 96, 105, 115,            // Năm 2 (Kinh tế suy thoái người dân càng đổ xô đi mua hàng giảm giá)
      124, 134, 144, 155, 166, 178, 190, 202, 215, 228, 240, 254,  // Năm 3
      266, 278, 290, 302, 315, 328, 342, 356, 370, 385, 400, 415,  // Năm 4
      430, 446, 462, 480, 498, 516, 535, 555, 575, 595, 615, 640,  // Năm 5 (+753%)
    ],
    financials: [
      { year: 1, revenue: 22000, netIncome: 1850, netMargin: 8.4, roe: 23.5, debtToEquity: 0.42, freeCashFlow: 1920, eps: 8.2, bookValuePerShare: 38, dividendPerShare: 5.2 },
      { year: 2, revenue: 24500, netIncome: 2100, netMargin: 8.6, roe: 25.1, debtToEquity: 0.40, freeCashFlow: 2250, eps: 9.3, bookValuePerShare: 42, dividendPerShare: 6.0 },
      { year: 3, revenue: 29800, netIncome: 2850, netMargin: 9.6, roe: 28.9, debtToEquity: 0.35, freeCashFlow: 3100, eps: 12.6, bookValuePerShare: 49, dividendPerShare: 8.5 },
      { year: 4, revenue: 36200, netIncome: 3750, netMargin: 10.4, roe: 32.4, debtToEquity: 0.30, freeCashFlow: 4120, eps: 16.6, bookValuePerShare: 58, dividendPerShare: 11.5 },
      { year: 5, revenue: 43500, netIncome: 4850, netMargin: 11.1, roe: 35.6, debtToEquity: 0.25, freeCashFlow: 5350, eps: 21.5, bookValuePerShare: 70, dividendPerShare: 15.2 },
    ],
    analystRatings: [
      { analystFirm: 'Retail Watch Europe', verdict: 'MUA MẠNH', targetPrice: 380, comment: 'Cỗ máy in tiền mặt, hưởng lợi lớn từ xu hướng thắt lưng buộc bụng.' },
      { analystFirm: 'Consumer Pulse', verdict: 'MUA', targetPrice: 300, comment: 'Lợi thế mạng lưới cửa hàng ngoại ô khó đối thủ nào sao chép.' },
    ],
  },
  {
    id: 'c15',
    ticker: 'KRONA-MALL',
    name: 'Krona Department Stores',
    sector: 'Bán lẻ & Thương mại',
    marketCapCategory: 'Small Cap',
    description: 'Chuỗi trung tâm thương mại bách hóa cao cấp truyền thống tại các trục đường trung tâm thủ đô, chuyên bán hàng thời trang xa xỉ và mỹ phẩm.',
    products: ['Quần áo thời trang hàng hiệu', 'Mỹ phẩm và nước hoa quầy kệ', 'Dịch vụ ẩm thực tầng thượng'],
    competitiveMoat: 'Từng có vị thế đắc địa nhưng hiện bị bóp nghẹt bởi thương mại điện tử và chi phí thuê mặt bằng cố định đắt đỏ.',
    risks: ['Khách trẻ chuyển hẳn sang mua sắm trực tuyến', 'Tồn kho lỗi mốt lớn', 'Hợp đồng thuê mặt bằng dài hạn không thể hủy'],
    managementSummary: 'Ban điều hành bảo thủ chậm chuyển đổi số, liên tục tung ra các đợt giảm giá xả kho làm xói mòn hình ảnh thương hiệu.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Sears / Debenhams - Sự sụp đổ của bách hóa truyền thống',
    buffettRationale: 'Bẫy giá rẻ điển hình trong ngành bán lẻ suy thoái. Cổ phiếu có vẻ "rẻ" theo chỉ số P/B, nhưng tài sản thực chất đang tan rã nhanh chóng.',
    historicalMonthlyPrices: [
      48, 47, 45, 43, 41, 38, 35, 32, 29, 26, 23, 20,              // Năm 1
      18, 15, 12, 9.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.6,     // Năm 2
      4.2, 3.9, 3.6, 3.3, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.9, 1.8,  // Năm 3
      1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.9, 0.8, 0.7,  // Năm 4
      0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1,  // Năm 5 (-99.8%)
    ],
    financials: [
      { year: 1, revenue: 15000, netIncome: 750, netMargin: 5.0, roe: 6.2, debtToEquity: 1.85, freeCashFlow: -200, eps: 2.1, bookValuePerShare: 35, dividendPerShare: 1.0 },
      { year: 2, revenue: 12200, netIncome: -850, netMargin: -7.0, roe: -8.5, debtToEquity: 2.80, freeCashFlow: -950, eps: -2.4, bookValuePerShare: 28, dividendPerShare: 0 },
      { year: 3, revenue: 9500, netIncome: -1800, netMargin: -18.9, roe: -24.0, debtToEquity: 5.20, freeCashFlow: -1600, eps: -5.1, bookValuePerShare: 18, dividendPerShare: 0 },
      { year: 4, revenue: 7100, netIncome: -2500, netMargin: -35.2, roe: -55.0, debtToEquity: 14.0, freeCashFlow: -2100, eps: -7.2, bookValuePerShare: 8, dividendPerShare: 0 },
      { year: 5, revenue: 4800, netIncome: -3200, netMargin: -66.7, roe: -160.0, debtToEquity: 38.0, freeCashFlow: -2800, eps: -9.1, bookValuePerShare: 1.2, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Old Economy Bargains', verdict: 'NẮM GIỮ', targetPrice: 12, comment: 'Định giá P/B dưới 0.2, mặt bằng trung tâm vẫn có giá trị đất.' },
      { analystFirm: 'E-commerce Disruption', verdict: 'BÁN MẠNH', targetPrice: 0.5, comment: 'Mô hình bách hóa đã chết, lỗ lũy kế xóa sạch vốn.' },
    ],
  },

  // ================= 7. KHAI KHOÁNG & VẬT LIỆU =================
  {
    id: 'c16',
    ticker: 'BOREAL-FERT',
    name: 'Boreal Crop Nutrition',
    sector: 'Khai khoáng & Vật liệu',
    marketCapCategory: 'Large Cap',
    description: 'Tập đoàn sản xuất phân bón đạm và dinh dưỡng cây trồng lớn nhất Bắc Âu, xuất khẩu tới hơn 60 quốc gia phục vụ an ninh lương thực.',
    products: ['Phân đạm nitrat hạt cao cấp', 'Dinh dưỡng lá công nghệ cao', 'Hóa chất xử lý khí thải công nghiệp'],
    competitiveMoat: 'Quy mô nhà máy tích hợp khổng lồ ven biển gần nguồn khí giá rẻ, mạng lưới kho phân phối toàn cầu khó có đối thủ mới nào xây dựng nổi.',
    risks: ['Biến động giá nguyên liệu khí tự nhiên đầu vào', 'Chu kỳ mùa vụ và thời tiết nông nghiệp'],
    managementSummary: 'Ban điều hành kỷ luật cao trong quản trị chi phí, tối ưu hóa công suất vận hành và duy trì chi trả cổ tức hậu hĩnh.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Yara International ASA (Na Uy) - Tập đoàn phân bón toàn cầu',
    buffettRationale: 'Buffett đánh giá cao những công ty sản xuất sản phẩm không thể thiếu cho sự sinh tồn của loài người, có vị thế dẫn đầu về chi phí và tạo thặng dư cổ tức tiền mặt lớn.',
    historicalMonthlyPrices: [
      100, 103, 106, 110, 114, 118, 122, 120, 116, 112, 108, 104,  // Năm 1
      98, 88, 76, 68, 60, 64, 72, 82, 94, 108, 122, 136,           // Năm 2
      148, 160, 172, 184, 196, 208, 220, 232, 245, 258, 270, 282,  // Năm 3
      295, 308, 320, 332, 345, 358, 370, 382, 395, 410, 425, 440,  // Năm 4
      455, 470, 485, 502, 520, 538, 556, 575, 595, 615, 635, 660,  // Năm 5 (+560%)
    ],
    financials: [
      { year: 1, revenue: 54000, netIncome: 6800, netMargin: 12.6, roe: 16.5, debtToEquity: 0.45, freeCashFlow: 5900, eps: 14.5, bookValuePerShare: 92, dividendPerShare: 8.5 },
      { year: 2, revenue: 46000, netIncome: 4200, netMargin: 9.1, roe: 9.8, debtToEquity: 0.48, freeCashFlow: 3800, eps: 9.0, bookValuePerShare: 96, dividendPerShare: 6.0 },
      { year: 3, revenue: 65000, netIncome: 10500, netMargin: 16.2, roe: 22.4, debtToEquity: 0.38, freeCashFlow: 9200, eps: 22.4, bookValuePerShare: 112, dividendPerShare: 14.0 },
      { year: 4, revenue: 78000, netIncome: 14200, netMargin: 18.2, roe: 26.5, debtToEquity: 0.30, freeCashFlow: 12800, eps: 30.2, bookValuePerShare: 132, dividendPerShare: 19.5 },
      { year: 5, revenue: 92000, netIncome: 18600, netMargin: 20.2, roe: 29.8, debtToEquity: 0.22, freeCashFlow: 16900, eps: 39.6, bookValuePerShare: 158, dividendPerShare: 25.0 },
    ],
    analystRatings: [
      { analystFirm: 'Global Agrochemicals', verdict: 'MUA', targetPrice: 420, comment: 'An ninh lương thực là chủ đề sống còn, định giá P/E hấp dẫn dưới 12x.' },
      { analystFirm: 'Resource Research', verdict: 'MUA', targetPrice: 350, comment: 'Cổ tức tiền mặt dồi dào, vị thế số 1 châu Âu.' },
    ],
  },
  {
    id: 'c17',
    ticker: 'LITHIUM-HYP',
    name: 'Nordic Battery Materials',
    sector: 'Khai khoáng & Vật liệu',
    marketCapCategory: 'Small Cap',
    description: 'Dự án khai thác quặng lithium và tinh chế hóa chất pin xe điện thế hệ mới với kế hoạch xây dựng siêu nhà máy xanh.',
    products: ['Lithium hydroxide tinh khiết (Giai đoạn quy hoạch)', 'Nghiên cứu thu hồi pin đã qua sử dụng'],
    competitiveMoat: 'Không có. Mỏ quặng còn nằm trên giấy, hàm lượng quặng thấp và chi phí xây dựng hạ tầng ban đầu ước tính khổng lồ.',
    risks: ['Trễ tiến độ cấp phép bảo vệ môi trường', 'Giá lithium thế giới giảm sâu do nguồn cung giá rẻ từ Nam Mỹ', 'Pha loãng cổ phiếu liên miên'],
    managementSummary: 'Ban lãnh đạo chuyên về tiếp thị kêu gọi vốn đầu tư, đưa ra các mốc thời gian thiếu thực tế.',
    archetype: 'OVERHYPED_BUBBLE',
    realWorldCounterpart: 'Northvolt / Cơn sốt lithium xe điện',
    buffettRationale: 'Bong bóng đầu cơ điển hình theo trào lưu xe điện. Doanh nghiệp không có lợi thế chi phí sản xuất và đốt sạch vốn của cổ đông.',
    historicalMonthlyPrices: [
      25, 28, 33, 40, 50, 65, 82, 105, 128, 115, 95, 75,            // Năm 1 (Đầu cơ nóng đỉnh điểm)
      60, 48, 36, 26, 18, 14, 11, 9.0, 7.5, 6.2, 5.0, 4.2,          // Năm 2 (Xì hơi bong bóng)
      3.8, 3.4, 3.0, 2.7, 2.4, 2.2, 2.0, 1.8, 1.7, 1.5, 1.4, 1.3,  // Năm 3
      1.2, 1.1, 1.0, 1.0, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.5,  // Năm 4
      0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1,  // Năm 5 (-99.6%)
    ],
    financials: [
      { year: 1, revenue: 120, netIncome: -480, netMargin: -400.0, roe: -32.0, debtToEquity: 0.15, freeCashFlow: -650, eps: -1.8, bookValuePerShare: 6.8, dividendPerShare: 0 },
      { year: 2, revenue: 80, netIncome: -890, netMargin: -1112.5, roe: -65.0, debtToEquity: 0.40, freeCashFlow: -1100, eps: -3.2, bookValuePerShare: 3.8, dividendPerShare: 0 },
      { year: 3, revenue: 30, netIncome: -1250, netMargin: -4166.7, roe: -140.0, debtToEquity: 1.50, freeCashFlow: -1350, eps: -4.5, bookValuePerShare: 1.2, dividendPerShare: 0 },
      { year: 4, revenue: 0, netIncome: -1500, netMargin: -9999.0, roe: -320.0, debtToEquity: 6.20, freeCashFlow: -1580, eps: -5.2, bookValuePerShare: 0.3, dividendPerShare: 0 },
      { year: 5, revenue: 0, netIncome: -1700, netMargin: -9999.0, roe: -850.0, debtToEquity: 25.0, freeCashFlow: -1750, eps: -5.8, bookValuePerShare: 0.05, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'EV Revolution Daily', verdict: 'MUA MẠNH', targetPrice: 160, comment: 'Cơn khát vàng trắng lithium, cơ hội x5 tài khoản!' },
      { analystFirm: 'Mining Reality Check', verdict: 'BÁN MẠNH', targetPrice: 0.8, comment: 'Hàm lượng quặng quá thấp, chi phí chế biến cao gấp 3 lần thị trường.' },
    ],
  },
  {
    id: 'c18',
    ticker: 'SVALBARD-MIN',
    name: 'Svalbard Hydro-Metals',
    sector: 'Khai khoáng & Vật liệu',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp luyện nhôm và kim loại nhẹ bằng nguồn điện thủy điện sạch 100%, cung cấp cho ngành công nghiệp ô tô và hàng không vũ trụ.',
    products: ['Nhôm thanh nguyên chất phát thải thấp', 'Hợp kim nhôm siêu nhẹ ô tô'],
    competitiveMoat: 'Hợp đồng mua điện thủy điện giá siêu rẻ thời hạn 40 năm, giúp nhôm của công ty có lượng khí thải carbon thấp nhất thế giới.',
    risks: ['Tính chu kỳ mạnh mẽ của giá nhôm sàn LME', 'Nhu cầu suy giảm từ ngành sản xuất ô tô'],
    managementSummary: 'Quản trị chu kỳ xuất sắc: tích trữ tiền mặt lúc giá hàng hóa cao để sống khỏe lúc giá kim loại chạm đáy.',
    archetype: 'CYCLICAL',
    realWorldCounterpart: 'Norsk Hydro ASA (Na Uy) - Tượng đài luyện nhôm xanh',
    buffettRationale: 'Cổ phiếu chu kỳ điển hình. Nếu mua đúng lúc chu kỳ chạm đáy với định giá hợp lý, nhà đầu tư sẽ gặt hái thành quả lớn; nhưng không phải cổ phiếu để "mua và quên đi mãi mãi".',
    historicalMonthlyPrices: [
      65, 68, 72, 75, 78, 82, 85, 83, 80, 77, 73, 69,              // Năm 1
      64, 55, 46, 38, 34, 38, 44, 52, 62, 74, 88, 102,             // Năm 2 (Chạm đáy sâu 34 rồi phục hồi vũ bão)
      115, 128, 140, 152, 165, 178, 190, 202, 215, 226, 238, 250,  // Năm 3
      245, 238, 230, 222, 215, 225, 236, 248, 260, 272, 285, 298,  // Năm 4
      310, 322, 335, 348, 360, 372, 385, 398, 412, 425, 440, 455,  // Năm 5 (+600%)
    ],
    financials: [
      { year: 1, revenue: 35000, netIncome: 3800, netMargin: 10.9, roe: 13.8, debtToEquity: 0.38, freeCashFlow: 3200, eps: 7.2, bookValuePerShare: 52, dividendPerShare: 4.0 },
      { year: 2, revenue: 26000, netIncome: 850, netMargin: 3.3, roe: 3.1, debtToEquity: 0.42, freeCashFlow: 600, eps: 1.6, bookValuePerShare: 53, dividendPerShare: 1.2 },
      { year: 3, revenue: 42000, netIncome: 6500, netMargin: 15.5, roe: 21.5, debtToEquity: 0.32, freeCashFlow: 5800, eps: 12.4, bookValuePerShare: 64, dividendPerShare: 8.0 },
      { year: 4, revenue: 51000, netIncome: 8800, netMargin: 17.3, roe: 24.8, debtToEquity: 0.25, freeCashFlow: 7900, eps: 16.8, bookValuePerShare: 78, dividendPerShare: 11.5 },
      { year: 5, revenue: 62000, netIncome: 11500, netMargin: 18.5, roe: 27.2, debtToEquity: 0.18, freeCashFlow: 10400, eps: 21.9, bookValuePerShare: 96, dividendPerShare: 15.0 },
    ],
    analystRatings: [
      { analystFirm: 'Commodity Cycle Alert', verdict: 'MUA', targetPrice: 280, comment: 'Lợi thế điện thủy điện giá rẻ vô địch, đón đầu chu kỳ phục hồi kim loại.' },
      { analystFirm: 'Industrial Metal Monitor', verdict: 'NẮM GIỮ', targetPrice: 220, comment: 'Biến động mạnh theo giá nhôm thế giới.' },
    ],
  },

  // ================= 8. BẤT ĐỘNG SẢN & HẠ TẦNG =================
  {
    id: 'c19',
    ticker: 'FJORD-LOGIS',
    name: 'Fjord Maritime Ports & Terminals',
    sector: 'Bất động sản & Hạ tầng',
    marketCapCategory: 'Large Cap',
    description: 'Doanh nghiệp vận hành độc quyền các cảng biển nước sâu và bến container chiến lược dọc bờ biển Bắc Âu kết nối luồng hàng hóa châu Âu.',
    products: ['Dịch vụ bốc dỡ container cảng biển', 'Kho bãi ngoại quan logistics', 'Dịch vụ hoa tiêu tàu biển'],
    competitiveMoat: 'Lợi thế vị trí độc quyền tự nhiên: không ai có thể đào thêm một cảng nước sâu mới cạnh bên; thu phí trên từng container qua cảng tương tự trạm thu phí đường cao tốc.',
    risks: ['Khối lượng thương mại quốc tế sụt giảm trong khủng hoảng', 'Yêu cầu hiện đại hóa cẩu bốc dỡ tự động'],
    managementSummary: 'Ban điều hành bảo thủ, duy trì dòng tiền tự do cực kỳ ổn định và chi trả cổ tức tăng đều đặn.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Cảng biển / BNSF Railway - Triết lý trạm thu phí độc quyền (Toll bridge)',
    buffettRationale: 'Buffett gọi những doanh nghiệp này là "Cầu thu phí" (Toll Bridge): bạn không thể xuất nhập khẩu hàng hóa mà không đi qua cây cầu của họ. Quyền lực định giá tuyệt đối!',
    historicalMonthlyPrices: [
      90, 92, 95, 98, 102, 105, 108, 107, 104, 101, 98, 95,          // Năm 1
      92, 85, 76, 68, 62, 66, 73, 82, 92, 104, 116, 128,            // Năm 2
      138, 149, 160, 172, 184, 196, 208, 220, 232, 245, 258, 270,  // Năm 3
      282, 295, 308, 320, 332, 345, 358, 370, 385, 400, 415, 430,  // Năm 4
      445, 460, 478, 495, 515, 535, 555, 575, 595, 615, 638, 665,  // Năm 5 (+638%)
    ],
    financials: [
      { year: 1, revenue: 16500, netIncome: 2850, netMargin: 17.3, roe: 18.5, debtToEquity: 0.35, freeCashFlow: 2650, eps: 11.2, bookValuePerShare: 62, dividendPerShare: 7.2 },
      { year: 2, revenue: 15200, netIncome: 2100, netMargin: 13.8, roe: 13.2, debtToEquity: 0.38, freeCashFlow: 1950, eps: 8.2, bookValuePerShare: 65, dividendPerShare: 5.8 },
      { year: 3, revenue: 19800, netIncome: 3950, netMargin: 19.9, roe: 22.8, debtToEquity: 0.30, freeCashFlow: 3750, eps: 15.5, bookValuePerShare: 76, dividendPerShare: 10.5 },
      { year: 4, revenue: 24500, netIncome: 5350, netMargin: 21.8, roe: 26.9, debtToEquity: 0.24, freeCashFlow: 5100, eps: 21.0, bookValuePerShare: 90, dividendPerShare: 14.5 },
      { year: 5, revenue: 30500, netIncome: 7100, netMargin: 23.3, roe: 29.5, debtToEquity: 0.18, freeCashFlow: 6800, eps: 27.8, bookValuePerShare: 108, dividendPerShare: 19.0 },
    ],
    analystRatings: [
      { analystFirm: 'Maritime & Infrastructure', verdict: 'MUA MẠNH', targetPrice: 400, comment: 'Cỗ máy thu phí độc quyền bờ biển, dòng tiền mặt bất khả chiến bại.' },
      { analystFirm: 'Transport Equity', verdict: 'MUA', targetPrice: 320, comment: 'Lợi thế vị trí địa lý độc tôn.' },
    ],
  },
  {
    id: 'c20',
    ticker: 'ENTRA-OFFICE',
    name: 'Nordic Prime Commercial Real Estate',
    sector: 'Bất động sản & Hạ tầng',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp sở hữu và quản lý các tòa nhà văn phòng tiêu chuẩn xanh tại trung tâm các thành phố lớn, cho các cơ quan chính phủ và tập đoàn đa quốc gia thuê.',
    products: ['Cho thuê cao ốc văn phòng hạng A', 'Bất động sản công nghệ cao cho viện nghiên cứu'],
    competitiveMoat: 'Hơn 65% khách thuê là cơ quan nhà nước và bộ ngành với hợp đồng 10-15 năm gắn liền chỉ số giá tiêu dùng (CPI).',
    risks: ['Lãi suất vay tăng làm giảm giá trị định giá tài sản ròng (NAV)', 'Xu hướng làm việc từ xa (Work from home)'],
    managementSummary: 'Ban điều hành chuyên nghiệp, cấu trúc nợ dài hạn cố định lãi suất để phòng vệ rủi ro biến động tiền tệ.',
    archetype: 'HIGH_DIVIDEND',
    realWorldCounterpart: 'Entra ASA (Na Uy) - Bất động sản công quyền',
    buffettRationale: 'Một nguồn thu nhập đều đặn, rủi ro khách bùng tiền gần như bằng 0 nhờ hợp đồng dài hạn với chính phủ.',
    historicalMonthlyPrices: [
      78, 79, 80, 81, 82, 83, 84, 83, 82, 81, 80, 79,              // Năm 1
      77, 71, 64, 57, 52, 55, 60, 66, 72, 78, 84, 89,              // Năm 2
      94, 98, 102, 106, 110, 114, 118, 122, 126, 130, 134, 138,    // Năm 3
      142, 145, 148, 152, 155, 158, 161, 164, 167, 170, 173, 176,  // Năm 4
      179, 183, 187, 191, 195, 199, 203, 207, 212, 216, 220, 225,  // Năm 5 (+188%, kèm 6.5%/năm cổ tức)
    ],
    financials: [
      { year: 1, revenue: 12500, netIncome: 2400, netMargin: 19.2, roe: 9.8, debtToEquity: 0.85, freeCashFlow: 2200, eps: 6.2, bookValuePerShare: 82, dividendPerShare: 5.5 },
      { year: 2, revenue: 12200, netIncome: 1850, netMargin: 15.2, roe: 7.2, debtToEquity: 0.90, freeCashFlow: 1750, eps: 4.8, bookValuePerShare: 80, dividendPerShare: 4.8 },
      { year: 3, revenue: 13800, netIncome: 2850, netMargin: 20.7, roe: 10.5, debtToEquity: 0.82, freeCashFlow: 2650, eps: 7.4, bookValuePerShare: 88, dividendPerShare: 6.2 },
      { year: 4, revenue: 15200, netIncome: 3450, netMargin: 22.7, roe: 11.9, debtToEquity: 0.76, freeCashFlow: 3200, eps: 9.0, bookValuePerShare: 96, dividendPerShare: 7.5 },
      { year: 5, revenue: 16800, netIncome: 4100, netMargin: 24.4, roe: 13.2, debtToEquity: 0.70, freeCashFlow: 3850, eps: 10.7, bookValuePerShare: 105, dividendPerShare: 9.0 },
    ],
    analystRatings: [
      { analystFirm: 'Real Estate Income', verdict: 'MUA', targetPrice: 160, comment: 'Dòng tiền thuê phòng thủ vững chắc từ khách hàng chính phủ.' },
      { analystFirm: 'Property Yields', verdict: 'NẮM GIỮ', targetPrice: 140, comment: 'Định giá hợp lý, cổ tức tiền mặt duy trì trên 6%.' },
    ],
  },
  {
    id: 'c21',
    ticker: 'BOREAL-AIR',
    name: 'Boreal Low-Cost Airways',
    sector: 'Bất động sản & Hạ tầng',
    marketCapCategory: 'Mid Cap',
    description: 'Hãng hàng không giá rẻ thế hệ mới, mở rộng ồ ạt các đường bay liên lục địa tầm xa bằng dàn máy bay thuê mua trả góp nợ cao.',
    products: ['Vé máy bay giá rẻ nội địa và châu Âu', 'Dịch vụ hành lý và đồ ăn cộng thêm'],
    competitiveMoat: 'Không có lợi thế cạnh tranh bền vững; khách hàng hàng không luôn chọn hãng rẻ nhất chỉ với một cú nhấp chuột.',
    risks: ['Khoản nợ thuê mua máy bay nghìn tỷ', 'Biến động giá nhiên liệu máy bay', 'Suy thoái kinh tế khiến hành khách hủy bỏ du lịch'],
    managementSummary: 'CEO theo đuổi tham vọng bành trướng quy mô đội bay bằng mọi giá, bỏ qua các nguyên tắc an toàn thanh khoản.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Norwegian Air Shuttle (NAS) - Cú vỡ nợ máy bay huyền thoại',
    buffettRationale: 'Buffett từng cảnh báo: "Nếu một nhà tư bản nhìn thấy anh em nhà Wright cất cánh, ông ta nên bắn hạ họ để cứu các thế hệ nhà đầu tư sau này". Hàng không là cỗ máy đốt vốn khủng khiếp nhất lịch sử.',
    historicalMonthlyPrices: [
      62, 60, 57, 53, 48, 43, 38, 33, 28, 24, 20, 16,              // Năm 1
      13, 9.5, 7.0, 5.2, 4.0, 3.2, 2.5, 2.0, 1.8, 1.5, 1.3, 1.1,    // Năm 2 (Vỡ nợ cơ cấu lại)
      1.0, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4,  // Năm 3
      0.4, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1,  // Năm 4
      0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05,// Năm 5 (-99.9%)
    ],
    financials: [
      { year: 1, revenue: 32000, netIncome: 650, netMargin: 2.0, roe: 4.8, debtToEquity: 6.80, freeCashFlow: -3500, eps: 1.2, bookValuePerShare: 25, dividendPerShare: 0 },
      { year: 2, revenue: 18000, netIncome: -6800, netMargin: -37.8, roe: -85.0, debtToEquity: 18.5, freeCashFlow: -7200, eps: -12.5, bookValuePerShare: 5, dividendPerShare: 0 },
      { year: 3, revenue: 12000, netIncome: -8900, netMargin: -74.2, roe: -240.0, debtToEquity: 55.0, freeCashFlow: -8500, eps: -16.2, bookValuePerShare: 0.8, dividendPerShare: 0 },
      { year: 4, revenue: 9500, netIncome: -9800, netMargin: -103.2, roe: -600.0, debtToEquity: 120.0, freeCashFlow: -9200, eps: -17.8, bookValuePerShare: 0.1, dividendPerShare: 0 },
      { year: 5, revenue: 7500, netIncome: -11000, netMargin: -146.7, roe: -1200.0, debtToEquity: 250.0, freeCashFlow: -10500, eps: -20.0, bookValuePerShare: 0.01, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Aviation Turnaround Spec', verdict: 'MUA', targetPrice: 15, comment: 'Vé máy bay rẻ sẽ bùng nổ trở lại, giá cổ phiếu đã chiết khấu 80%!' },
      { analystFirm: 'Credit Bankruptcy Advisory', verdict: 'BÁN MẠNH', targetPrice: 0.1, comment: 'Đống nợ không thể thanh toán, cổ đông hiện hữu sẽ bị pha loãng về 0.' },
    ],
  },
  {
    id: 'c22',
    ticker: 'OSLO-MEDIA',
    name: 'Boreal Digital Media & Classifieds',
    sector: 'Công nghệ & Bán dẫn',
    marketCapCategory: 'Mid Cap',
    description: 'Tập đoàn sở hữu mạng lưới các trang rao vặt bất động sản, xe hơi và việc làm trực tuyến số 1 tại khu vực Bắc Âu.',
    products: ['Cổng rao vặt bất động sản độc quyền', 'Nền tảng mua bán ô tô trực tuyến', 'Trang tin tức số thu phí thuê bao'],
    competitiveMoat: 'Hiệu ứng mạng lưới kép (Network Effect) bất khả chiến bại: Người bán đăng tin ở nơi có nhiều người mua nhất, và người mua chỉ tìm ở nơi có nhiều người bán nhất.',
    risks: ['Quy định kiểm soát vị thế độc quyền của ủy ban cạnh tranh', 'Chi phí đầu tư AI tìm kiếm'],
    managementSummary: 'Ban điều hành tiên phong chuyển đổi số hoàn toàn từ báo in sang trực tuyến, biên lợi nhuận EBITDA vượt 40%.',
    archetype: 'BUFFETT_VALUE',
    realWorldCounterpart: 'Schibsted ASA / Adevinta (Na Uy) - Vua rao vặt số',
    buffettRationale: 'Buffett từng mua tờ Buffalo Evening News vì nhận ra tờ báo độc quyền địa phương có quyền lực thu phí quảng cáo như một cây cầu độc quyền. Mô hình rao vặt số chính là bản nâng cấp hoàn hảo của ý tưởng này.',
    historicalMonthlyPrices: [
      85, 88, 92, 96, 100, 104, 108, 106, 102, 98, 94, 90,          // Năm 1
      86, 78, 69, 61, 56, 60, 68, 77, 88, 100, 114, 128,            // Năm 2
      138, 149, 161, 174, 187, 200, 214, 228, 242, 256, 270, 285,  // Năm 3
      298, 312, 326, 340, 355, 370, 385, 400, 415, 430, 445, 460,  // Năm 4
      478, 496, 515, 535, 555, 576, 598, 620, 642, 665, 688, 715,  // Năm 5 (+741%)
    ],
    financials: [
      { year: 1, revenue: 14000, netIncome: 2400, netMargin: 17.1, roe: 20.5, debtToEquity: 0.25, freeCashFlow: 2350, eps: 10.2, bookValuePerShare: 52, dividendPerShare: 6.0 },
      { year: 2, revenue: 13500, netIncome: 1950, netMargin: 14.4, roe: 15.8, debtToEquity: 0.28, freeCashFlow: 1850, eps: 8.3, bookValuePerShare: 56, dividendPerShare: 5.0 },
      { year: 3, revenue: 18200, netIncome: 3850, netMargin: 21.2, roe: 27.2, debtToEquity: 0.20, freeCashFlow: 3720, eps: 16.4, bookValuePerShare: 68, dividendPerShare: 10.2 },
      { year: 4, revenue: 23500, netIncome: 5600, netMargin: 23.8, roe: 32.5, debtToEquity: 0.14, freeCashFlow: 5400, eps: 23.8, bookValuePerShare: 84, dividendPerShare: 15.0 },
      { year: 5, revenue: 30200, netIncome: 7900, netMargin: 26.2, roe: 36.4, debtToEquity: 0.08, freeCashFlow: 7650, eps: 33.6, bookValuePerShare: 106, dividendPerShare: 21.5 },
    ],
    analystRatings: [
      { analystFirm: 'Digital Monopoly Watch', verdict: 'MUA MẠNH', targetPrice: 420, comment: 'Hiệu ứng mạng lưới của trang rao vặt là con hào không thể bị công phá.' },
      { analystFirm: 'European Internet Equity', verdict: 'MUA', targetPrice: 340, comment: 'Biên lợi nhuận ròng tăng liên tục, dòng tiền tự do cực khủng.' },
    ],
  },
  {
    id: 'c23',
    ticker: 'ARCTIC-BREW',
    name: 'Arctic Heritage Breweries',
    sector: 'Thủy sản & Tiêu dùng',
    marketCapCategory: 'Mid Cap',
    description: 'Hãng bia và đồ uống giải khát thủ công truyền thống hơn 150 năm tuổi, sở hữu độc quyền nguồn nước khoáng tự nhiên vùng băng tích.',
    products: ['Bia mạch nha vàng truyền thống', 'Nước giải khát vị quả mọng Bắc Âu', 'Nước khoáng có ga đóng chai thủy tinh'],
    competitiveMoat: 'Thương hiệu biểu tượng văn hóa địa phương, hệ thống phân phối phủ khắp các nhà hàng, quán bar và siêu thị với hợp đồng độc quyền.',
    risks: ['Thuế tiêu thụ đặc biệt đồ uống có cồn tăng', 'Xu hướng giới trẻ giảm tiêu thụ cồn'],
    managementSummary: 'Ban điều hành gia tộc thế hệ thứ 4, gìn giữ công thức truyền thống, nói không với việc vay nợ mở rộng ẩu.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Ringnes / Hansa Borg / Carlsberg - Vua đồ uống',
    buffettRationale: 'Buffett thích các doanh nghiệp bán những sản phẩm mà con người luôn yêu thích và tiêu thụ lặp đi lặp lại trong cả lúc vui lẫn lúc buồn.',
    historicalMonthlyPrices: [
      72, 73, 75, 76, 78, 80, 81, 80, 78, 77, 75, 73,              // Năm 1
      72, 68, 64, 60, 58, 61, 65, 70, 75, 80, 85, 90,              // Năm 2
      95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150,    // Năm 3
      154, 158, 162, 166, 170, 175, 180, 185, 190, 195, 200, 206,  // Năm 4
      212, 218, 224, 230, 236, 242, 250, 258, 266, 275, 284, 295,  // Năm 5 (+310%)
    ],
    financials: [
      { year: 1, revenue: 18500, netIncome: 2100, netMargin: 11.4, roe: 16.2, debtToEquity: 0.32, freeCashFlow: 1950, eps: 6.8, bookValuePerShare: 44, dividendPerShare: 4.8 },
      { year: 2, revenue: 17800, netIncome: 1800, netMargin: 10.1, roe: 13.5, debtToEquity: 0.30, freeCashFlow: 1650, eps: 5.8, bookValuePerShare: 46, dividendPerShare: 4.5 },
      { year: 3, revenue: 21500, netIncome: 2850, netMargin: 13.3, roe: 19.5, debtToEquity: 0.25, freeCashFlow: 2700, eps: 9.2, bookValuePerShare: 52, dividendPerShare: 6.8 },
      { year: 4, revenue: 25200, netIncome: 3600, netMargin: 14.3, roe: 22.0, debtToEquity: 0.20, freeCashFlow: 3450, eps: 11.6, bookValuePerShare: 60, dividendPerShare: 8.8 },
      { year: 5, revenue: 29800, netIncome: 4500, netMargin: 15.1, roe: 24.2, debtToEquity: 0.15, freeCashFlow: 4300, eps: 14.5, bookValuePerShare: 70, dividendPerShare: 11.2 },
    ],
    analystRatings: [
      { analystFirm: 'Beverage Equity', verdict: 'MUA', targetPrice: 180, comment: 'Lợi thế thương hiệu lịch sử và kênh phân phối nhà hàng vững chắc.' },
      { analystFirm: 'Consumer Defensives', verdict: 'MUA', targetPrice: 150, comment: 'Cổ tức tiền mặt an toàn, ít chịu ảnh hưởng từ suy thoái.' },
    ],
  },
  {
    id: 'c24',
    ticker: 'KRONA-PAPER',
    name: 'Nordic Forest & Newsprint',
    sector: 'Khai khoáng & Vật liệu',
    marketCapCategory: 'Mid Cap',
    description: 'Doanh nghiệp sở hữu các cánh rừng bạt ngàn và nhà máy sản xuất giấy in báo, bột giấy truyền thống cung cấp cho các nhà in châu Âu.',
    products: ['Giấy in báo cuộn lớn', 'Bột giấy nguyên sinh cho bao bì'],
    competitiveMoat: 'Sở hữu diện tích rừng trồng lớn, nhưng thị trường sản phẩm đầu ra (giấy in báo) đang suy thoái cơ cấu không thể đảo ngược.',
    risks: ['Sự suy tàn của báo giấy trước báo điện tử', 'Chi phí năng lượng sấy bột giấy đắt đỏ'],
    managementSummary: 'Ban lãnh đạo già cỗi, chậm chuyển đổi công năng sang vật liệu bao bì sinh học thay thế nhựa.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Norske Skog - Sự suy tàn của ngành giấy in báo',
    buffettRationale: 'Buffett từng cảnh báo: "Khi một ban lãnh đạo tài năng đối đầu với một ngành kinh doanh có danh tiếng xấu về kinh tế, danh tiếng của ngành sẽ là thứ chiến thắng". Giấy in báo là ngành đang hấp hối.',
    historicalMonthlyPrices: [
      52, 50, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21,              // Năm 1
      19, 16, 13, 10, 8.5, 7.8, 7.2, 6.8, 6.2, 5.8, 5.2, 4.8,      // Năm 2
      4.5, 4.1, 3.8, 3.5, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.1, 2.0,  // Năm 3
      1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.0, 1.0,  // Năm 4
      0.9, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4,  // Năm 5 (-99.2%)
    ],
    financials: [
      { year: 1, revenue: 16000, netIncome: 950, netMargin: 5.9, roe: 7.2, debtToEquity: 2.10, freeCashFlow: 350, eps: 2.4, bookValuePerShare: 38, dividendPerShare: 1.2 },
      { year: 2, revenue: 13200, netIncome: -1200, netMargin: -9.1, roe: -11.5, debtToEquity: 3.40, freeCashFlow: -650, eps: -3.0, bookValuePerShare: 28, dividendPerShare: 0 },
      { year: 3, revenue: 10500, netIncome: -2100, netMargin: -20.0, roe: -28.0, debtToEquity: 6.80, freeCashFlow: -1400, eps: -5.3, bookValuePerShare: 16, dividendPerShare: 0 },
      { year: 4, revenue: 8200, netIncome: -2800, netMargin: -34.1, roe: -65.0, debtToEquity: 18.0, freeCashFlow: -1950, eps: -7.0, bookValuePerShare: 6, dividendPerShare: 0 },
      { year: 5, revenue: 6100, netIncome: -3400, netMargin: -55.7, roe: -180.0, debtToEquity: 45.0, freeCashFlow: -2400, eps: -8.5, bookValuePerShare: 0.9, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Paper & Pulp Valuation', verdict: 'NẮM GIỮ', targetPrice: 10, comment: 'Định giá P/B dưới 0.3, giá trị rừng gỗ vẫn còn.' },
      { analystFirm: 'Digital Substitution', verdict: 'BÁN MẠNH', targetPrice: 0.8, comment: 'Báo giấy đang biến mất khỏi thế giới, nhà máy thua lỗ triền miên.' },
    ],
  },

  // ================= CÔNG TY MỚI THÊM (c25-c39) =================

  // ================= 1. NĂNG LƯỢNG & DẦU KHÍ (THÊM 2) =================
  {
    id: 'c25',
    ticker: 'POLAR-WIND',
    name: 'Polar Wind Dynamics',
    sector: 'Năng lượng & Dầu khí',
    marketCapCategory: 'Mid Cap',
    description: 'Nhà phát triển và vận hành các trang trại điện gió ngoài khơi tại vùng biển Bắc Cực, tận dụng gió ổn định và mạnh mẽ.',
    products: ['Tuabin gió ngoài khơi 15MW', 'Hệ thống lưu trữ năng lượng offshore', 'Dịch vụ bảo dưỡng gió offshore'],
    competitiveMoat: 'Giấy phép độc quyền phát triển tại các vùng biển gió mạnh nhất châu Âu, công nghệ lắp đặt tuabin sâu độc đáo.',
    risks: ['Chi phí bảo dưỡng ngoài khơi cực cao', 'Quy định cấp phép môi trường phức tạp', 'Phụ thuộc vào trợ giá điện'],
    managementSummary: 'Đội ngũ kỹ sư gió biển chuyên nghiệp, tập trung tối ưu chi phí vận hành và duy trì tỷ suất lợi nhuận ổn định.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Ørsted ASA (Đan Mạch) - Tượng đài điện gió offshore',
    buffettRationale: 'Buffett đang đầu tư mạnh vào năng lượng tái tạo thông qua Berkshire Hathaway Energy. Polar Wind là doanh nghiệp năng lượng sạch có lợi thế vị trí và dòng tiền ổn định.',
    historicalMonthlyPrices: [
      65, 67, 70, 73, 76, 79, 82, 80, 77, 74, 71, 68,              // Năm 1
      65, 60, 55, 52, 50, 54, 60, 68, 76, 85, 94, 102,             // Năm 2
      110, 118, 126, 134, 142, 150, 158, 166, 174, 182, 190, 198,  // Năm 3
      210, 222, 234, 246, 258, 270, 282, 294, 306, 318, 330, 342,  // Năm 4
      355, 368, 382, 396, 410, 424, 438, 452, 466, 480, 495, 510,  // Năm 5 (+685%)
    ],
    financials: [
      { year: 1, revenue: 8500, netIncome: 1200, netMargin: 14.1, roe: 15.8, debtToEquity: 0.65, freeCashFlow: 950, eps: 4.8, bookValuePerShare: 32, dividendPerShare: 2.5 },
      { year: 2, revenue: 9200, netIncome: 1050, netMargin: 11.4, roe: 13.2, debtToEquity: 0.62, freeCashFlow: 850, eps: 4.2, bookValuePerShare: 35, dividendPerShare: 2.2 },
      { year: 3, revenue: 12500, netIncome: 2100, netMargin: 16.8, roe: 22.5, debtToEquity: 0.55, freeCashFlow: 1850, eps: 8.4, bookValuePerShare: 42, dividendPerShare: 4.5 },
      { year: 4, revenue: 16800, netIncome: 3200, netMargin: 19.0, roe: 28.2, debtToEquity: 0.48, freeCashFlow: 2950, eps: 12.8, bookValuePerShare: 52, dividendPerShare: 7.2 },
      { year: 5, revenue: 22500, netIncome: 4800, netMargin: 21.3, roe: 32.5, debtToEquity: 0.40, freeCashFlow: 4450, eps: 19.2, bookValuePerShare: 68, dividendPerShare: 10.5 },
    ],
    analystRatings: [
      { analystFirm: 'Renewable Energy Focus', verdict: 'MUA MẠNH', targetPrice: 280, comment: 'Lợi thế vị trí gió offshore độc quyền, dòng tiền tăng trưởng đều đặn.' },
      { analystFirm: 'Utility Valuation', verdict: 'MUA', targetPrice: 220, comment: 'Cổ tức tăng trưởng, biên lợi nhuận cải thiện liên tục.' },
    ],
  },
  {
    id: 'c26',
    ticker: 'ARCTIC-GAS',
    name: 'Arctic Gas Logistics',
    sector: 'Năng lượng & Dầu khí',
    marketCapCategory: 'Small Cap',
    description: 'Công ty vận chuyển khí tự nhiên hóa lỏng (LNG) bằng tàu chuyên dụng từ vùng Bắc Cực sang thị trường châu Á.',
    products: ['Vận chuyển LNG đường biển', 'Kho bãi LNG trung chuyển', 'Mua bán khí đốt giao ngay'],
    competitiveMoat: 'Fleet tàu LNG đời mới nhưng cạnh tranh gay gắt với các hãng vận chuyển khí toàn cầu.',
    risks: ['Biến động giá LNG thế giới cực mạnh', 'Chi phí nhiên liệu tàu biển', 'Sự phụ thuộc vào hợp đồng dài hạn'],
    managementSummary: 'Ban điều hành tập trung vào thị trường giao ngay để tận dụng biến động giá, nhưng chấp nhận rủi ro cao.',
    archetype: 'CYCLICAL',
    realWorldCounterpart: 'Golar LNG / Höegh LNG - Vận chuyển LNG chu kỳ',
    buffettRationale: 'Cổ phiếu chu kỳ điển hình: khi giá LNG cao, công ty thu lợi khổng lồ; khi giá sụt giảm, tàu nằm bờ đốt tiền. Không phù hợp cho nhà đầu tư thụ động.',
    historicalMonthlyPrices: [
      42, 45, 48, 52, 56, 60, 58, 54, 50, 46, 42, 38,              // Năm 1
      34, 28, 22, 18, 15, 18, 24, 32, 42, 55, 70, 88,              // Năm 2 (Chu kỳ LNG cực mạnh)
      95, 102, 108, 112, 115, 118, 112, 105, 98, 92, 86, 80,       // Năm 3
      75, 70, 66, 62, 58, 62, 68, 75, 82, 90, 98, 106,             // Năm 4
      115, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196, 205,  // Năm 5 (+388%)
    ],
    financials: [
      { year: 1, revenue: 18500, netIncome: 2200, netMargin: 11.9, roe: 14.5, debtToEquity: 1.20, freeCashFlow: 1800, eps: 5.5, bookValuePerShare: 42, dividendPerShare: 3.0 },
      { year: 2, revenue: 28000, netIncome: 5200, netMargin: 18.6, roe: 28.5, debtToEquity: 0.95, freeCashFlow: 4800, eps: 13.0, bookValuePerShare: 52, dividendPerShare: 7.5 },
      { year: 3, revenue: 32500, netIncome: 4200, netMargin: 12.9, roe: 19.8, debtToEquity: 1.10, freeCashFlow: 3800, eps: 10.5, bookValuePerShare: 58, dividendPerShare: 6.0 },
      { year: 4, revenue: 29500, netIncome: 3100, netMargin: 10.5, roe: 14.2, debtToEquity: 1.25, freeCashFlow: 2700, eps: 7.8, bookValuePerShare: 62, dividendPerShare: 4.5 },
      { year: 5, revenue: 35000, netIncome: 5800, netMargin: 16.6, roe: 24.5, debtToEquity: 0.88, freeCashFlow: 5400, eps: 14.5, bookValuePerShare: 72, dividendPerShare: 9.0 },
    ],
    analystRatings: [
      { analystFirm: 'Shipping Cycle Analysis', verdict: 'MUA', targetPrice: 120, comment: 'Chu kỳ LNG đang ở giai đoạn phục hồi, vận tải biển hưởng lợi.' },
      { analystFirm: 'Energy Transport Watch', verdict: 'NẮM GIỮ', targetPrice: 95, comment: 'Biến động giá LNG quá mạnh, không phù hợp đầu tư thụ động.' },
    ],
  },

  // ================= 2. NGÂN HÀNG & TÀI CHÍNH (THÊM 2) =================
  {
    id: 'c27',
    ticker: 'NORDIC-ASSET',
    name: 'Nordic Asset Management',
    sector: 'Ngân hàng & Tài chính',
    marketCapCategory: 'Mid Cap',
    description: 'Công ty quản lý tài sản chuyên nghiệp phục vụ khách hàng cao cấp và quỹ hưu trí tổ chức.',
    products: ['Quỹ tương tự chỉ số ETF', 'Quỹ quản lý chuyên biệt', 'Dịch vụ tư vấn tài chính cá nhân'],
    competitiveMoat: 'Thương hiệu uy tín lâu năm, phí quản lý thấp nhờ quy mô tài sản lớn (AUM), mạng lưới khách hàng trung thành.',
    risks: ['Khách hàng rút vốn khi thị trường sụt giảm', 'Cạnh tranh từ các nền tảng robo-advisor giá rẻ', 'Quy định quản lý tài sản'],
    managementSummary: 'Ban điều hành kiên định với chiến lược đầu tư thụ động chi phí thấp, không chạy theo các sản phẩm thời vụ.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'KLP / Storebrand Asset Management - Quản lý tài sản Bắc Âu',
    buffettRationale: 'Buffett luôn tôn trọng những công ty quản lý tài sản có kỷ luật dài hạn, phí thấp và không khuyến khích khách hàng giao dịch liên tục.',
    historicalMonthlyPrices: [
      55, 57, 59, 61, 63, 65, 67, 65, 63, 61, 59, 57,              // Năm 1
      55, 51, 47, 44, 42, 45, 49, 54, 60, 66, 72, 78,              // Năm 2
      84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150,      // Năm 3
      156, 162, 168, 174, 180, 186, 192, 198, 204, 210, 216, 222,  // Năm 4
      228, 235, 242, 250, 258, 266, 274, 282, 290, 298, 306, 315,  // Năm 5 (+473%)
    ],
    financials: [
      { year: 1, revenue: 4800, netIncome: 1450, netMargin: 30.2, roe: 22.5, debtToEquity: 0.18, freeCashFlow: 1380, eps: 5.8, bookValuePerShare: 28, dividendPerShare: 3.5 },
      { year: 2, revenue: 5200, netIncome: 1320, netMargin: 25.4, roe: 19.8, debtToEquity: 0.20, freeCashFlow: 1250, eps: 5.2, bookValuePerShare: 30, dividendPerShare: 3.2 },
      { year: 3, revenue: 6800, netIncome: 2150, netMargin: 31.6, roe: 28.5, debtToEquity: 0.15, freeCashFlow: 2050, eps: 8.6, bookValuePerShare: 36, dividendPerShare: 5.2 },
      { year: 4, revenue: 8500, netIncome: 2850, netMargin: 33.5, roe: 32.2, debtToEquity: 0.12, freeCashFlow: 2750, eps: 11.4, bookValuePerShare: 42, dividendPerShare: 7.0 },
      { year: 5, revenue: 10800, netIncome: 3800, netMargin: 35.2, roe: 35.8, debtToEquity: 0.10, freeCashFlow: 3700, eps: 15.2, bookValuePerShare: 50, dividendPerShare: 9.5 },
    ],
    analystRatings: [
      { analystFirm: 'Wealth Management Review', verdict: 'MUA MẠNH', targetPrice: 200, comment: 'Mô hình quản lý tài sản quy mô lớn, biên lợi nhuận vượt trội.' },
      { analystFirm: 'Passive Investing Watch', verdict: 'MUA', targetPrice: 160, comment: 'Lợi thế quy mô tạo phí thấp, dòng tiền tăng trưởng đều đặn.' },
    ],
  },
  {
    id: 'c28',
    ticker: 'BALTIC-LEND',
    name: 'Baltic Microfinance',
    sector: 'Ngân hàng & Tài chính',
    marketCapCategory: 'Small Cap',
    description: 'Công ty tài chính vi mô cấp vốn cho doanh nghiệp nhỏ và vừa tại khu vực Baltic, chấp nhận rủi ro cao hơn.',
    products: ['Vay doanh nghiệp nhỏ', 'Cho thuê tài sản thiết bị', 'Tài trợ chuỗi cung ứng'],
    competitiveMoat: 'Mạng lưới quan hệ địa phương sâu rộng, hiểu rõ thị trường ngách mà ngân hàng lớn bỏ qua.',
    risks: ['Nợ xấu doanh nghiệp nhỏ cao', 'Phụ thuộc vào nền kinh tế địa phương', 'Chi phí vốn vay cao'],
    managementSummary: 'Ban điều hành chấp nhận rủi ro cao để đổi lấy lợi nhuận cao, nhưng kiểm soát chặt nợ xấu.',
    archetype: 'HIGH_DIVIDEND',
    realWorldCounterpart: 'Bluestep Bank / Resurs Bank - Tài chính tiêu dùng ngách',
    buffettRationale: 'Mặc dù có rủi ro, nhưng công ty quản lý tốt nợ xấu và trả cổ tức cao có thể là lựa chọn phòng thủ nếu định giá hợp lý.',
    historicalMonthlyPrices: [
      35, 36, 37, 38, 39, 40, 41, 40, 39, 38, 37, 36,              // Năm 1
      35, 32, 29, 27, 25, 27, 30, 34, 38, 42, 46, 50,              // Năm 2
      54, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98,              // Năm 3
      102, 106, 110, 114, 118, 122, 126, 130, 134, 138, 142, 146,  // Năm 4
      150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205,  // Năm 5 (+486%)
    ],
    financials: [
      { year: 1, revenue: 3800, netIncome: 720, netMargin: 18.9, roe: 14.2, debtToEquity: 2.80, freeCashFlow: 580, eps: 2.9, bookValuePerShare: 22, dividendPerShare: 2.0 },
      { year: 2, revenue: 4200, netIncome: 650, netMargin: 15.5, roe: 11.8, debtToEquity: 3.20, freeCashFlow: 520, eps: 2.6, bookValuePerShare: 24, dividendPerShare: 1.8 },
      { year: 3, revenue: 5500, netIncome: 1150, netMargin: 20.9, roe: 18.5, debtToEquity: 2.60, freeCashFlow: 980, eps: 4.6, bookValuePerShare: 28, dividendPerShare: 3.2 },
      { year: 4, revenue: 6800, netIncome: 1580, netMargin: 23.2, roe: 22.8, debtToEquity: 2.20, freeCashFlow: 1420, eps: 6.3, bookValuePerShare: 32, dividendPerShare: 4.5 },
      { year: 5, revenue: 8200, netIncome: 2050, netMargin: 25.0, roe: 26.5, debtToEquity: 1.85, freeCashFlow: 1880, eps: 8.2, bookValuePerShare: 38, dividendPerShare: 6.0 },
    ],
    analystRatings: [
      { analystFirm: 'SME Finance Focus', verdict: 'MUA', targetPrice: 120, comment: 'Thị trường ngách độc quyền, cổ tức tiền mặt hậu hĩnh.' },
      { analystFirm: 'Credit Risk Monitor', verdict: 'NẮM GIỮ', targetPrice: 95, comment: 'Rủi ro nợ xấu cao hơn ngân hàng truyền thống.' },
    ],
  },

  // ================= 3. THỦY SẢN & TIÊU DÙNG (THÊM 2) =================
  {
    id: 'c29',
    ticker: 'NORDIC-CO',
    name: 'Nordic Coffee Roasters',
    sector: 'Thủy sản & Tiêu dùng',
    marketCapCategory: 'Mid Cap',
    description: 'Hãng rang xay cà phê thương hiệu lâu đời, sở hữu các chuỗi quán cà phê và phân phối cà phê đóng gói siêu thị.',
    products: ['Cà phê rang xay đóng gói', 'Chuỗi quán cà phê Nordic Brew', 'Cà phê lon uống liền'],
    competitiveMoat: 'Thương hiệu quốc dân, hợp đồng độc quyền phân phối tại các chuỗi siêu thị lớn, bí quyết rang xay độc quyền.',
    risks: ['Biến động giá hạt cà phê thế giới', 'Cạnh tranh từ chuỗi cà phê quốc tế', 'Xu hướng giảm tiêu thụ caffeine'],
    managementSummary: 'Gia tộc thế hệ thứ 3 quản lý, kiên định với chất lượng sản phẩm và mở rộng chậm rãi nhưng chắc chắn.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Kaffehuset Friele / Löfbergs - Vua cà phê Bắc Âu',
    buffettRationale: 'Buffett thích các thương hiệu tiêu dùng có lòng trung thành cao, khách hàng mua lặp đi lặp lại hàng ngày.',
    historicalMonthlyPrices: [
      48, 50, 52, 54, 56, 58, 60, 58, 56, 54, 52, 50,              // Năm 1
      48, 45, 42, 40, 38, 41, 45, 50, 55, 60, 65, 70,              // Năm 2
      75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130,      // Năm 3
      135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190,  // Năm 4
      195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250,  // Năm 5 (+421%)
    ],
    financials: [
      { year: 1, revenue: 8800, netIncome: 980, netMargin: 11.1, roe: 15.2, debtToEquity: 0.28, freeCashFlow: 880, eps: 3.9, bookValuePerShare: 28, dividendPerShare: 2.5 },
      { year: 2, revenue: 9200, netIncome: 880, netMargin: 9.6, roe: 13.2, debtToEquity: 0.30, freeCashFlow: 780, eps: 3.5, bookValuePerShare: 30, dividendPerShare: 2.4 },
      { year: 3, revenue: 11500, netIncome: 1580, netMargin: 13.7, roe: 19.5, debtToEquity: 0.25, freeCashFlow: 1450, eps: 6.3, bookValuePerShare: 36, dividendPerShare: 4.0 },
      { year: 4, revenue: 14200, netIncome: 2150, netMargin: 15.1, roe: 23.2, debtToEquity: 0.20, freeCashFlow: 2020, eps: 8.6, bookValuePerShare: 42, dividendPerShare: 5.5 },
      { year: 5, revenue: 17500, netIncome: 2850, netMargin: 16.3, roe: 26.8, debtToEquity: 0.15, freeCashFlow: 2720, eps: 11.4, bookValuePerShare: 50, dividendPerShare: 7.5 },
    ],
    analystRatings: [
      { analystFirm: 'Beverage Brands Equity', verdict: 'MUA', targetPrice: 140, comment: 'Thương hiệu cà phê quốc dân, lòng trung thành khách hàng cao.' },
      { analystFirm: 'Consumer Defensives', verdict: 'MUA', targetPrice: 115, comment: 'Sản phẩm tiêu dùng hàng ngày, kháng suy thoái tốt.' },
    ],
  },
  {
    id: 'c30',
    ticker: 'FJORD-FOOD',
    name: 'Fjord Frozen Foods',
    sector: 'Thủy sản & Tiêu dùng',
    marketCapCategory: 'Small Cap',
    description: 'Nhà sản xuất thực phẩm đông lạnh bao gồm rau củ, hải sản và bữa ăn sẵn tiện lợi cho gia đình.',
    products: ['Rau củ đông lạnh', 'Hải sản nguyên liệu đông lạnh', 'Bữa ăn sẵn convenience'],
    competitiveMoat: 'Hệ thống kho lạnh lớn nhất khu vực, hợp đồng cung ứng dài hạn với chuỗi siêu thị giá rẻ.',
    risks: ['Biến động giá nguyên liệu nông sản', 'Cạnh tranh từ thực phẩm tươi', 'Chi phí năng lượng kho lạnh'],
    managementSummary: 'Tập trung tối ưu chi phí sản xuất và logistics, duy trì biên lợi nhuận mỏng nhưng quy mô lớn.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Findus / Iglo - Ngành thực phẩm đông lạnh',
    buffettRationale: 'Ngành thực phẩm đông lạnh có biên lợi nhuận cực mỏng, dễ bị cạnh tranh về giá. Chỉ những công ty có lợi thế quy mô mới sống sót.',
    historicalMonthlyPrices: [
      32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10,              // Năm 1
      9, 8, 7, 6.5, 6, 6.2, 6.5, 6.8, 7, 7.2, 7.4, 7.5,           // Năm 2
      7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7,    // Năm 3
      8.8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9,    // Năm 4
      10, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11, 11.1, // Năm 5 (-65%)
    ],
    financials: [
      { year: 1, revenue: 12500, netIncome: 380, netMargin: 3.0, roe: 5.2, debtToEquity: 1.85, freeCashFlow: 220, eps: 0.8, bookValuePerShare: 18, dividendPerShare: 0.5 },
      { year: 2, revenue: 11800, netIncome: -250, netMargin: -2.1, roe: -3.8, debtToEquity: 2.40, freeCashFlow: -180, eps: -0.5, bookValuePerShare: 15, dividendPerShare: 0 },
      { year: 3, revenue: 12200, netIncome: 120, netMargin: 1.0, roe: 1.8, debtToEquity: 2.80, freeCashFlow: 50, eps: 0.2, bookValuePerShare: 14, dividendPerShare: 0.1 },
      { year: 4, revenue: 12800, netIncome: 280, netMargin: 2.2, roe: 4.2, debtToEquity: 2.60, freeCashFlow: 180, eps: 0.6, bookValuePerShare: 15, dividendPerShare: 0.3 },
      { year: 5, revenue: 13500, netIncome: 420, netMargin: 3.1, roe: 6.2, debtToEquity: 2.40, freeCashFlow: 320, eps: 0.8, bookValuePerShare: 16, dividendPerShare: 0.5 },
    ],
    analystRatings: [
      { analystFirm: 'Food Processing Value', verdict: 'NẮM GIỮ', targetPrice: 15, comment: 'Hệ thống kho lạnh quy mô lớn, định giá P/B thấp.' },
      { analystFirm: 'Margin Compression Watch', verdict: 'BÁN', targetPrice: 8, comment: 'Biên lợi nhuận quá mỏng, không có lợi thế cạnh tranh.' },
    ],
  },

  // ================= 4. CÔNG NGHỆ & BÁN DẪN (THÊM 2) =================
  {
    id: 'c31',
    ticker: 'ARCTIC-CLOUD',
    name: 'Arctic Cloud Infrastructure',
    sector: 'Công nghệ & Bán dẫn',
    marketCapCategory: 'Mid Cap',
    description: 'Nhà cung cấp dịch vụ dữ liệu và cloud computing tận dụng khí hậu lạnh tự nhiên để giảm chi phí làm mát trung tâm dữ liệu.',
    products: ['Cloud computing doanh nghiệp', 'Lưu trữ dữ liệu lạnh tự nhiên', 'Dịch vụ AI training'],
    competitiveMoat: 'Chi phí điện và làm mát thấp nhất châu Âu nhờ khí hậu Bắc Cực, vị trí địa lý gần thị trường Bắc Âu.',
    risks: ['Cạnh tranh từ các gã khổng lồ cloud toàn cầu', 'Quy định dữ liệu EU', 'Đầu tư CAPEX lớn'],
    managementSummary: 'Đội ngũ kỹ sư hạ tầng chuyên nghiệp, tập trung vào thị trường doanh nghiệp Bắc Âu mà các đối thủ toàn cầu bỏ qua.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Green Mountain / Basefarm - Data Center lạnh tự nhiên',
    buffettRationale: 'Buffett thích các doanh nghiệp có lợi thế chi phí cạnh tranh bền vững. Chi phí làm mát thấp là lợi thế kinh tế thực sự.',
    historicalMonthlyPrices: [
      72, 75, 78, 82, 86, 90, 94, 91, 87, 83, 79, 75,              // Năm 1
      71, 65, 59, 54, 50, 55, 62, 70, 80, 90, 102, 115,            // Năm 2
      128, 142, 156, 170, 184, 198, 212, 226, 240, 254, 268, 282,  // Năm 3
      296, 310, 324, 338, 352, 366, 380, 394, 408, 422, 436, 450,  // Năm 4
      465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630,  // Năm 5 (+775%)
    ],
    financials: [
      { year: 1, revenue: 6500, netIncome: 950, netMargin: 14.6, roe: 16.8, debtToEquity: 0.45, freeCashFlow: 820, eps: 4.2, bookValuePerShare: 28, dividendPerShare: 2.2 },
      { year: 2, revenue: 7200, netIncome: 820, netMargin: 11.4, roe: 13.5, debtToEquity: 0.48, freeCashFlow: 700, eps: 3.6, bookValuePerShare: 30, dividendPerShare: 1.8 },
      { year: 3, revenue: 9800, netIncome: 1850, netMargin: 18.9, roe: 24.2, debtToEquity: 0.38, freeCashFlow: 1680, eps: 8.2, bookValuePerShare: 38, dividendPerShare: 4.5 },
      { year: 4, revenue: 13200, netIncome: 2850, netMargin: 21.6, roe: 30.5, debtToEquity: 0.30, freeCashFlow: 2650, eps: 12.6, bookValuePerShare: 48, dividendPerShare: 7.2 },
      { year: 5, revenue: 17800, netIncome: 4200, netMargin: 23.6, roe: 35.8, debtToEquity: 0.22, freeCashFlow: 3980, eps: 18.6, bookValuePerShare: 62, dividendPerShare: 10.5 },
    ],
    analystRatings: [
      { analystFirm: 'Cloud Infrastructure Nordic', verdict: 'MUA MẠNH', targetPrice: 320, comment: 'Lợi thế chi phí làm mát tự nhiên độc quyền, tăng trưởng cloud mạnh.' },
      { analystFirm: 'Data Center Valuation', verdict: 'MUA', targetPrice: 260, comment: 'Biên lợi nhuận cải thiện, thị trường ngách doanh nghiệp.' },
    ],
  },
  {
    id: 'c32',
    ticker: 'POLAR-AI',
    name: 'Polar AI Solutions',
    sector: 'Công nghệ & Bán dẫn',
    marketCapCategory: 'Small Cap',
    description: 'Startup phát triển giải pháp AI cho quy trình công nghiệp và tự động hóa nhà máy.',
    products: ['AI dự đoán bảo trì thiết bị', 'Tối ưu hóa năng lượng nhà máy', 'Phân tích thị giác công nghiệp'],
    competitiveMoat: 'Bằng sáng chế AI chuyên dụng ngách, nhưng thị trường quá nhỏ để các đối thủ lớn quan tâm.',
    risks: ['Chưa có lợi nhuận', 'Phụ thuộc vào vài khách hàng lớn', 'Cần vốn R&D liên tục'],
    managementSummary: 'Đội ngũ kỹ sư AI xuất sắc, nhưng thiếu kinh nghiệm thương mại và quản lý tài chính.',
    archetype: 'OVERHYPED_BUBBLE',
    realWorldCounterpart: 'Cơn sốt AI startup thời kỳ tiền rẻ',
    buffettRationale: 'Buffett luôn cảnh báo về các công ty "công nghệ" không có dòng tiền thực tế, chỉ sống nhờ vốn đầu tư mạo hiểm.',
    historicalMonthlyPrices: [
      18, 22, 28, 36, 48, 65, 88, 72, 58, 45, 35, 28,              // Năm 1 (Bơm thổi AI)
      22, 17, 13, 10, 8, 9, 11, 14, 18, 22, 26, 30,                // Năm 2 (Xì hơi)
      32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54,              // Năm 3
      56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78,              // Năm 4
      80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102,            // Năm 5 (+467% từ đáy)
    ],
    financials: [
      { year: 1, revenue: 850, netIncome: -680, netMargin: -80.0, roe: -28.5, debtToEquity: 0.12, freeCashFlow: -750, eps: -1.5, bookValuePerShare: 5.8, dividendPerShare: 0 },
      { year: 2, revenue: 1200, netIncome: -920, netMargin: -76.7, roe: -42.0, debtToEquity: 0.25, freeCashFlow: -1020, eps: -2.2, bookValuePerShare: 4.2, dividendPerShare: 0 },
      { year: 3, revenue: 1800, netIncome: -850, netMargin: -47.2, roe: -35.0, debtToEquity: 0.45, freeCashFlow: -950, eps: -2.0, bookValuePerShare: 3.8, dividendPerShare: 0 },
      { year: 4, revenue: 2500, netIncome: -420, netMargin: -16.8, roe: -18.5, debtToEquity: 0.65, freeCashFlow: -520, eps: -1.0, bookValuePerShare: 4.5, dividendPerShare: 0 },
      { year: 5, revenue: 3500, netIncome: 280, netMargin: 8.0, roe: 8.5, debtToEquity: 0.55, freeCashFlow: 150, eps: 0.6, bookValuePerShare: 5.8, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'AI Revolution Daily', verdict: 'MUA MẠNH', targetPrice: 80, comment: 'AI công nghiệp là tương lai, tiềm năng tăng trưởng vô hạn!' },
      { analystFirm: 'Tech Reality Check', verdict: 'BÁN', targetPrice: 25, comment: 'Chưa có lợi nhuận, khách hàng quá ít, rủi ro cao.' },
    ],
  },

  // ================= 5. Y TẾ & DƯỢC PHẨM (THÊM 2) =================
  {
    id: 'c33',
    ticker: 'NORDIC-VAC',
    name: 'Nordic Vaccine Innovations',
    sector: 'Y tế & Dược phẩm',
    marketCapCategory: 'Mid Cap',
    description: 'Công ty dược phẩm phát triển và sản xuất vắc-xin cho các bệnh truyền nhiễm nhiệt đới và vùng lạnh.',
    products: ['Vắc-xin cúm mùa', 'Vắc-xin bệnh hô hấp', 'Nghiên cứu vắc-xin mới'],
    competitiveMoat: 'Công nghệ sản xuất vắc-xin độc quyền, hợp đồng dài hạn với chính phủ Bắc Âu.',
    risks: ['Chu kỳ phát triển vắc-xin dài', 'Rủi ro thử nghiệm lâm sàng', 'Cạnh tranh từ Big Pharma'],
    managementSummary: 'Ban điều hành gồm chuyên gia dược phẩm và y tế công cộng, kiên định với Nghiên cứu & Phát triển.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'Valneva / Bavarian Nordic - Vắc-xin châu Âu',
    buffettRationale: 'Buffett hiểu rằng vắc-xin là sản phẩm thiết yếu cho sức khỏe cộng đồng, và công ty có công nghệ tốt sẽ có lợi thế bền vững.',
    historicalMonthlyPrices: [
      62, 65, 68, 72, 76, 80, 84, 81, 77, 73, 69, 65,              // Năm 1
      61, 56, 51, 47, 44, 48, 54, 62, 72, 82, 94, 106,             // Năm 2
      118, 130, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250,  // Năm 3
      262, 274, 286, 298, 310, 322, 334, 346, 358, 370, 382, 394,  // Năm 4
      406, 418, 430, 442, 454, 466, 478, 490, 502, 514, 526, 538,  // Năm 5 (+768%)
    ],
    financials: [
      { year: 1, revenue: 5200, netIncome: 680, netMargin: 13.1, roe: 14.8, debtToEquity: 0.28, freeCashFlow: 580, eps: 3.2, bookValuePerShare: 24, dividendPerShare: 1.8 },
      { year: 2, revenue: 5800, netIncome: 620, netMargin: 10.7, roe: 12.5, debtToEquity: 0.30, freeCashFlow: 520, eps: 2.9, bookValuePerShare: 26, dividendPerShare: 1.6 },
      { year: 3, revenue: 8500, netIncome: 1450, netMargin: 17.1, roe: 22.8, debtToEquity: 0.22, freeCashFlow: 1320, eps: 6.8, bookValuePerShare: 34, dividendPerShare: 4.0 },
      { year: 4, revenue: 11800, netIncome: 2250, netMargin: 19.1, roe: 28.5, debtToEquity: 0.18, freeCashFlow: 2080, eps: 10.5, bookValuePerShare: 44, dividendPerShare: 6.5 },
      { year: 5, revenue: 15800, netIncome: 3350, netMargin: 21.2, roe: 34.2, debtToEquity: 0.12, freeCashFlow: 3180, eps: 15.6, bookValuePerShare: 58, dividendPerShare: 9.5 },
    ],
    analystRatings: [
      { analystFirm: 'Pharma Vaccine Focus', verdict: 'MUA MẠNH', targetPrice: 300, comment: 'Công nghệ vắc-xin độc quyền, hợp đồng chính phủ ổn định.' },
      { analystFirm: 'Healthcare R&D Watch', verdict: 'MUA', targetPrice: 240, comment: 'Đường ống sản phẩm vắc-xin đầy triển vọng.' },
    ],
  },
  {
    id: 'c34',
    ticker: 'BALTIC-MED',
    name: 'Baltic Medical Devices',
    sector: 'Y tế & Dược phẩm',
    marketCapCategory: 'Small Cap',
    description: 'Nhà sản xuất thiết bị y tế tiêu dùng bao gồm máy đo huyết áp, máy đo đường huyết và dụng cụ phẫu thuật cơ bản.',
    products: ['Máy đo huyết áp tại nhà', 'Máy đo đường huyết', 'Dụng cụ phẫu thuật dùng một lần'],
    competitiveMoat: 'Giá thành thấp nhờ sản xuất quy mô lớn, nhưng không có công nghệ độc quyền.',
    risks: ['Cạnh tranh gay gắt từ Trung Quốc', 'Biên lợi nhuận mỏng', 'Quy định y tế khắt khe'],
    managementSummary: 'Tập trung tối ưu chi phí sản xuất và mở rộng thị trường Đông Âu.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Thiết bị y tế giá rẻ châu Á',
    buffettRationale: 'Ngành thiết bị y tế tiêu dùng giá rẻ là cuộc đua xuống đáy về giá. Không có lợi thế công nghệ, chỉ có biên lợi nhuận mỏng.',
    historicalMonthlyPrices: [
      28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6,               // Năm 1
      5, 4.5, 4, 3.5, 3, 3.2, 3.5, 3.8, 4, 4.2, 4.4, 4.5,          // Năm 2
      4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7,    // Năm 3
      5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9,    // Năm 4
      7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1,       // Năm 5 (-71%)
    ],
    financials: [
      { year: 1, revenue: 8500, netIncome: 280, netMargin: 3.3, roe: 4.8, debtToEquity: 1.65, freeCashFlow: 180, eps: 0.6, bookValuePerShare: 14, dividendPerShare: 0.3 },
      { year: 2, revenue: 7800, netIncome: -420, netMargin: -5.4, roe: -8.2, debtToEquity: 2.40, freeCashFlow: -280, eps: -0.9, bookValuePerShare: 10, dividendPerShare: 0 },
      { year: 3, revenue: 8200, netIncome: 85, netMargin: 1.0, roe: 1.5, debtToEquity: 2.80, freeCashFlow: 20, eps: 0.2, bookValuePerShare: 11, dividendPerShare: 0.1 },
      { year: 4, revenue: 8800, netIncome: 220, netMargin: 2.5, roe: 3.8, debtToEquity: 2.60, freeCashFlow: 150, eps: 0.5, bookValuePerShare: 12, dividendPerShare: 0.2 },
      { year: 5, revenue: 9500, netIncome: 350, netMargin: 3.7, roe: 5.8, debtToEquity: 2.40, freeCashFlow: 280, eps: 0.7, bookValuePerShare: 13, dividendPerShare: 0.3 },
    ],
    analystRatings: [
      { analystFirm: 'Medical Device Value', verdict: 'NẮM GIỮ', targetPrice: 12, comment: 'Định giá P/B thấp, quy mô sản xuất lớn.' },
      { analystFirm: 'Asian Competition Watch', verdict: 'BÁN', targetPrice: 6, comment: 'Không thể cạnh tranh giá với Trung Quốc.' },
    ],
  },

  // ================= 6. BÁN LẺ & THƯƠNG MẠI (THÊM 2) =================
  {
    id: 'c35',
    ticker: 'NORDIC-SPORT',
    name: 'Nordic Sports Retail',
    sector: 'Bán lẻ & Thương mại',
    marketCapCategory: 'Mid Cap',
    description: 'Chuỗi cửa hàng bán lẻ dụng cụ thể thao và dã ngoại với hơn 200 cửa hàng trên toàn Bắc Âu.',
    products: ['Dụng cụ thể thao mùa đông', 'Dụng cụ cắm trại', 'Quần áo thể thao chức năng'],
    competitiveMoat: 'Thương hiệu mạnh trong cộng đồng thể thao Bắc Âu, hợp đồng độc quyền với các hãng thể thao quốc tế.',
    risks: ['Phụ thuộc vào mùa', 'Cạnh tranh từ thương mại điện tử', 'Biến động giá nhập khẩu'],
    managementSummary: 'Ban điều hành đam mê thể thao, hiểu rõ khách hàng và duy trì trải nghiệm cửa hàng vượt trội.',
    archetype: 'CONSISTENT_COMPOUNDER',
    realWorldCounterpart: 'XXL Sport / Intersport - Chuỗi thể thao Bắc Âu',
    buffettRationale: 'Buffett thích các chuỗi bán lẻ có đam mê sản phẩm và hiểu rõ khách hàng. Trải nghiệm cửa hàng là lợi thế trước thương mại điện tử.',
    historicalMonthlyPrices: [
      58, 61, 64, 67, 70, 73, 76, 73, 70, 67, 64, 61,              // Năm 1
      58, 53, 48, 44, 40, 44, 50, 58, 66, 76, 86, 96,              // Năm 2
      106, 116, 126, 136, 146, 156, 166, 176, 186, 196, 206, 216,  // Năm 3
      226, 236, 246, 256, 266, 276, 286, 296, 306, 316, 326, 336,  // Năm 4
      346, 356, 366, 376, 386, 396, 406, 416, 426, 436, 446, 456,  // Năm 5 (+686%)
    ],
    financials: [
      { year: 1, revenue: 9500, netIncome: 980, netMargin: 10.3, roe: 14.5, debtToEquity: 0.38, freeCashFlow: 820, eps: 3.9, bookValuePerShare: 30, dividendPerShare: 2.2 },
      { year: 2, revenue: 10200, netIncome: 850, netMargin: 8.3, roe: 12.2, debtToEquity: 0.40, freeCashFlow: 700, eps: 3.4, bookValuePerShare: 32, dividendPerShare: 1.8 },
      { year: 3, revenue: 13500, netIncome: 1680, netMargin: 12.4, roe: 21.5, debtToEquity: 0.32, freeCashFlow: 1550, eps: 6.7, bookValuePerShare: 38, dividendPerShare: 4.0 },
      { year: 4, revenue: 17200, netIncome: 2450, netMargin: 14.2, roe: 27.2, debtToEquity: 0.25, freeCashFlow: 2280, eps: 9.8, bookValuePerShare: 46, dividendPerShare: 6.0 },
      { year: 5, revenue: 21500, netIncome: 3350, netMargin: 15.6, roe: 32.5, debtToEquity: 0.18, freeCashFlow: 3180, eps: 13.4, bookValuePerShare: 56, dividendPerShare: 8.5 },
    ],
    analystRatings: [
      { analystFirm: 'Specialty Retail Nordic', verdict: 'MUA MẠNH', targetPrice: 250, comment: 'Thương hiệu thể thao mạnh, trải nghiệm cửa hàng vượt trội.' },
      { analystFirm: 'Retail Sector Focus', verdict: 'MUA', targetPrice: 200, comment: 'Biên lợi nhuận cải thiện, mở rộng cửa hàng đều đặn.' },
    ],
  },
  {
    id: 'c36',
    ticker: 'BALTIC-TEX',
    name: 'Baltic Textile Mills',
    sector: 'Bán lẻ & Thương mại',
    marketCapCategory: 'Small Cap',
    description: 'Nhà máy dệt và may mặc truyền thống sản xuất quần áo công nhân và đồng phục học sinh.',
    products: ['Quần áo công nhân', 'Đồng phục học sinh', 'Vải dệt công nghiệp'],
    competitiveMoat: 'Không có lợi thế cạnh tranh, chỉ cạnh tranh về giá với các nhà máy dệt châu Á.',
    risks: ['Cạnh tranh giá từ châu Á', 'Chi phí lao động cao', 'Nhu cầu suy giảm'],
    managementSummary: 'Ban lãnh đạo già cỗi, chậm chuyển đổi sang sản phẩm giá trị gia tăng cao.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Sự suy thoái của ngành dệt may truyền thống',
    buffettRationale: 'Buffett từng đầu tư vào ngành dệt may (Berkshire Hathaway textile) và học bài học đắt giá: đây là ngành kinh tế tồi.',
    historicalMonthlyPrices: [
      22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1,                 // Năm 1
      0.8, 0.7, 0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 2
      0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 3
      0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 4
      0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 5 (-98%)
    ],
    financials: [
      { year: 1, revenue: 6500, netIncome: -180, netMargin: -2.8, roe: -4.2, debtToEquity: 2.85, freeCashFlow: -120, eps: -0.4, bookValuePerShare: 10, dividendPerShare: 0 },
      { year: 2, revenue: 5200, netIncome: -850, netMargin: -16.3, roe: -22.5, debtToEquity: 4.80, freeCashFlow: -650, eps: -1.9, bookValuePerShare: 6, dividendPerShare: 0 },
      { year: 3, revenue: 4200, netIncome: -1250, netMargin: -29.8, roe: -52.0, debtToEquity: 8.50, freeCashFlow: -980, eps: -2.8, bookValuePerShare: 2, dividendPerShare: 0 },
      { year: 4, revenue: 3500, netIncome: -1500, netMargin: -42.9, roe: -150.0, debtToEquity: 18.0, freeCashFlow: -1180, eps: -3.4, bookValuePerShare: 0.5, dividendPerShare: 0 },
      { year: 5, revenue: 2800, netIncome: -1650, netMargin: -58.9, roe: -450.0, debtToEquity: 45.0, freeCashFlow: -1280, eps: -3.7, bookValuePerShare: 0.1, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Old Industry Value', verdict: 'NẮM GIỮ', targetPrice: 2, comment: 'Định giá P/B cực thấp, có thể tái cơ cấu.' },
      { analystFirm: 'Textile Decline Watch', verdict: 'BÁN MẠNH', targetPrice: 0.2, comment: 'Ngành dệt may truyền thống đã chết, không thể cạnh tranh.' },
    ],
  },

  // ================= 7. KHAI KHOÁNG & VẬT LIỆU (THÊM 2) =================
  {
    id: 'c37',
    ticker: 'POLAR-COPPER',
    name: 'Polar Copper Mining',
    sector: 'Khai khoáng & Vật liệu',
    marketCapCategory: 'Mid Cap',
    description: 'Công ty khai thác quặng đồng tại vùng Bắc Cực với trữ lượng lớn và chi phí khai thác trung bình.',
    products: ['Quặng đồng tinh luyện', 'Đồng cathode', 'Bán sản phẩm phụ kim loại quý'],
    competitiveMoat: 'Trữ lượng quặng lớn, nhưng chi phí khai thác cao hơn các mỏ ở Chile/Peru.',
    risks: ['Biến động giá đồng thế giới cực mạnh', 'Chi phí khai thác vùng lạnh cao', 'Quy định môi trường'],
    managementSummary: 'Ban điều hành tập trung tối ưu chi phí và quản lý chu kỳ giá đồng.',
    archetype: 'CYCLICAL',
    realWorldCounterpart: 'Boliden / KGHM - Khai thác đồng chu kỳ',
    buffettRationale: 'Cổ phiếu chu kỳ điển hình: khi giá đồng cao, lợi nhuận khổng lồ; khi giá sụt, thua lỗ triền miên. Cần thời điểm mua bán chính xác.',
    historicalMonthlyPrices: [
      45, 48, 52, 56, 60, 64, 68, 65, 62, 58, 54, 50,              // Năm 1
      46, 40, 34, 28, 24, 28, 34, 42, 52, 64, 78, 94,              // Năm 2 (Chu kỳ đồng mạnh)
      108, 122, 136, 150, 164, 178, 192, 206, 220, 234, 248, 262,  // Năm 3
      276, 290, 304, 318, 332, 346, 360, 374, 388, 402, 416, 430,  // Năm 4
      444, 458, 472, 486, 500, 514, 528, 542, 556, 570, 584, 598,  // Năm 5 (+1229%)
    ],
    financials: [
      { year: 1, revenue: 18500, netIncome: 1850, netMargin: 10.0, roe: 12.5, debtToEquity: 0.85, freeCashFlow: 1500, eps: 4.6, bookValuePerShare: 40, dividendPerShare: 2.5 },
      { year: 2, revenue: 24500, netIncome: 4200, netMargin: 17.1, roe: 25.8, debtToEquity: 0.65, freeCashFlow: 3850, eps: 10.5, bookValuePerShare: 48, dividendPerShare: 6.0 },
      { year: 3, revenue: 32500, netIncome: 6800, netMargin: 20.9, roe: 35.2, debtToEquity: 0.45, freeCashFlow: 6450, eps: 17.0, bookValuePerShare: 62, dividendPerShare: 10.5 },
      { year: 4, revenue: 38500, netIncome: 8200, netMargin: 21.3, roe: 38.5, debtToEquity: 0.35, freeCashFlow: 7850, eps: 20.5, bookValuePerShare: 72, dividendPerShare: 13.0 },
      { year: 5, revenue: 42000, netIncome: 8800, netMargin: 21.0, roe: 36.8, debtToEquity: 0.30, freeCashFlow: 8450, eps: 22.0, bookValuePerShare: 82, dividendPerShare: 14.5 },
    ],
    analystRatings: [
      { analystFirm: 'Mining Cycle Alert', verdict: 'MUA', targetPrice: 280, comment: 'Chu kỳ đồng đang ở giai đoạn bùng nổ, Polar hưởng lợi.' },
      { analystFirm: 'Commodity Price Watch', verdict: 'NẮM GIỮ', targetPrice: 220, comment: 'Biến động giá đồng quá mạnh, không phù hợp thụ động.' },
    ],
  },
  {
    id: 'c38',
    ticker: 'NORDIC-STEEL',
    name: 'Nordic Steel Products',
    sector: 'Khai khoáng & Vật liệu',
    marketCapCategory: 'Small Cap',
    description: 'Nhà máy sản xuất thép đặc dụng cho công nghiệp xây dựng và đóng tàu từ phế liệu tái chế.',
    products: ['Thép đặc dụng xây dựng', 'Thép đóng tàu', 'Sản phẩm từ phế liệu tái chế'],
    competitiveMoat: 'Công nghệ luyện thép từ phế liệu, nhưng phụ thuộc vào giá phế liệu và năng lượng.',
    risks: ['Biến động giá phế liệu', 'Chi phí năng lượng cao', 'Cạnh tranh từ thép nhập khẩu'],
    managementSummary: 'Tập trung tối ưu chi phí năng lượng và nguồn phế liệu ổn định.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Ngành thép phế liệu margin mỏng',
    buffettRationale: 'Ngành thép là cuộc đua về quy mô và chi phí. Biên lợi nhuận mỏng, cạnh tranh gay gắt, không có hào kinh tế.',
    historicalMonthlyPrices: [
      18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1,                 // Năm 1
      0.8, 0.7, 0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 2
      0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 3
      0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 4
      0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4,  // Năm 5 (-98%)
    ],
    financials: [
      { year: 1, revenue: 8500, netIncome: -280, netMargin: -3.3, roe: -5.8, debtToEquity: 2.45, freeCashFlow: -180, eps: -0.6, bookValuePerShare: 12, dividendPerShare: 0 },
      { year: 2, revenue: 6800, netIncome: -950, netMargin: -14.0, roe: -22.5, debtToEquity: 4.80, freeCashFlow: -720, eps: -2.1, bookValuePerShare: 7, dividendPerShare: 0 },
      { year: 3, revenue: 5500, netIncome: -1350, netMargin: -24.5, roe: -52.0, debtToEquity: 8.50, freeCashFlow: -1050, eps: -3.0, bookValuePerShare: 2, dividendPerShare: 0 },
      { year: 4, revenue: 4500, netIncome: -1580, netMargin: -35.1, roe: -180.0, debtToEquity: 18.0, freeCashFlow: -1280, eps: -3.5, bookValuePerShare: 0.5, dividendPerShare: 0 },
      { year: 5, revenue: 3800, netIncome: -1750, netMargin: -46.1, roe: -450.0, debtToEquity: 45.0, freeCashFlow: -1380, eps: -3.9, bookValuePerShare: 0.1, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Steel Industry Value', verdict: 'NẮM GIỮ', targetPrice: 2, comment: 'Định giá P/B cực thấp, có thể tái cơ cấu.' },
      { analystFirm: 'Commodity Margin Watch', verdict: 'BÁN MẠNH', targetPrice: 0.3, comment: 'Biên lợi nhuận mỏng, cạnh tranh giá gay gắt.' },
    ],
  },

  // ================= 8. BẤT ĐỘNG SẢN & HẠ TẦNG (THÊM 2) =================
  {
    id: 'c39',
    ticker: 'NORDIC-LOG',
    name: 'Nordic Logistics Properties',
    sector: 'Bất động sản & Hạ tầng',
    marketCapCategory: 'Mid Cap',
    description: 'Công ty sở hữu và quản lý các kho bãi logistics và trung tâm phân phối gần các thành phố lớn.',
    products: ['Kho bãi logistics hạng A', 'Trung tâm phân phối', 'Cross-docking facilities'],
    competitiveMoat: 'Vị trí chiến lược gần các trục đường cao tốc và cảng biển, hợp đồng dài hạn với các nhà bán lẻ lớn.',
    risks: ['Lãi suất vay tăng', 'Xu hướng thương mại điện tử thay đổi', 'Rủi ro khách bùng tiền'],
    managementSummary: 'Ban điều hành chuyên nghiệp, tập trung vào khách hàng bán lẻ lớn và hợp đồng dài hạn.',
    archetype: 'HIGH_DIVIDEND',
    realWorldCounterpart: 'Catena / Logicenters - Logistics REIT',
    buffettRationale: 'Bất động sản logistics có vị trí tốt là tài sản phòng thủ tốt, đặc biệt với hợp đồng dài hạn và khách hàng chất lượng.',
    historicalMonthlyPrices: [
      68, 70, 72, 74, 76, 78, 80, 78, 76, 74, 72, 70,              // Năm 1
      68, 63, 58, 54, 50, 54, 60, 66, 72, 78, 84, 90,              // Năm 2
      96, 102, 108, 114, 120, 126, 132, 138, 144, 150, 156, 162,  // Năm 3
      168, 174, 180, 186, 192, 198, 204, 210, 216, 222, 228, 234,  // Năm 4
      240, 246, 252, 258, 264, 270, 276, 282, 288, 294, 300, 306,  // Năm 5 (+350%)
    ],
    financials: [
      { year: 1, revenue: 8500, netIncome: 1650, netMargin: 19.4, roe: 8.5, debtToEquity: 0.95, freeCashFlow: 1520, eps: 4.2, bookValuePerShare: 52, dividendPerShare: 3.8 },
      { year: 2, revenue: 8800, netIncome: 1420, netMargin: 16.1, roe: 7.2, debtToEquity: 1.00, freeCashFlow: 1300, eps: 3.6, bookValuePerShare: 54, dividendPerShare: 3.2 },
      { year: 3, revenue: 10800, netIncome: 2280, netMargin: 21.1, roe: 10.5, debtToEquity: 0.88, freeCashFlow: 2150, eps: 5.8, bookValuePerShare: 62, dividendPerShare: 5.2 },
      { year: 4, revenue: 12800, netIncome: 2950, netMargin: 23.0, roe: 12.8, debtToEquity: 0.78, freeCashFlow: 2820, eps: 7.5, bookValuePerShare: 72, dividendPerShare: 6.8 },
      { year: 5, revenue: 15200, netIncome: 3750, netMargin: 24.7, roe: 14.8, debtToEquity: 0.68, freeCashFlow: 3620, eps: 9.5, bookValuePerShare: 84, dividendPerShare: 8.5 },
    ],
    analystRatings: [
      { analystFirm: 'Logistics REIT Focus', verdict: 'MUA', targetPrice: 180, comment: 'Vị trí logistics chiến lược, cổ tức tiền mặt ổn định.' },
      { analystFirm: 'Property Yield Watch', verdict: 'MUA', targetPrice: 150, comment: 'Khách hàng chất lượng, hợp đồng dài hạn vững chắc.' },
    ],
  },
  {
    id: 'c40',
    ticker: 'ARCTIC-HOTEL',
    name: 'Arctic Hospitality Group',
    sector: 'Bất động sản & Hạ tầng',
    marketCapCategory: 'Small Cap',
    description: 'Chuỗi khách sạn và resort du lịch tại các điểm đến Bắc Cực nổi tiếng.',
    products: ['Khách sạn đô thị', 'Resort Bắc Cực', 'Dịch vụ du lịch mùa đông'],
    competitiveMoat: 'Vị trí độc quyền tại các điểm đến du lịch Bắc Cực, nhưng phụ thuộc hoàn toàn vào mùa du lịch.',
    risks: ['Tính mùa cực mạnh', 'Biến động giá nhiên liệu du lịch', 'Khủng hoảng du lịch toàn cầu'],
    managementSummary: 'Ban điều hành tập trung marketing du lịch mùa đông và tối ưu chi phí vận hành.',
    archetype: 'VALUE_TRAP',
    realWorldCounterpart: 'Nordic Hospitality - Khách sạn mùa đông',
    buffettRationale: 'Khách sạn là ngành kinh tế tồi: đòi hỏi vốn lớn, cạnh tranh gay gắt, không có hào kinh tế rõ rệt.',
    historicalMonthlyPrices: [
      35, 32, 28, 24, 20, 16, 12, 10, 8, 6, 4, 2,                 // Năm 1
      1.5, 1.2, 1, 0.8, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,   // Năm 2
      0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,   // Năm 3
      0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,   // Năm 4
      0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6,   // Năm 5 (-98%)
    ],
    financials: [
      { year: 1, revenue: 8500, netIncome: -420, netMargin: -4.9, roe: -6.8, debtToEquity: 2.85, freeCashFlow: -280, eps: -0.9, bookValuePerShare: 15, dividendPerShare: 0 },
      { year: 2, revenue: 6200, netIncome: -1150, netMargin: -18.5, roe: -28.5, debtToEquity: 5.20, freeCashFlow: -880, eps: -2.4, bookValuePerShare: 8, dividendPerShare: 0 },
      { year: 3, revenue: 4800, netIncome: -1450, netMargin: -30.2, roe: -52.0, debtToEquity: 9.50, freeCashFlow: -1150, eps: -3.0, bookValuePerShare: 2, dividendPerShare: 0 },
      { year: 4, revenue: 3800, netIncome: -1650, netMargin: -43.4, roe: -150.0, debtToEquity: 22.0, freeCashFlow: -1320, eps: -3.4, bookValuePerShare: 0.5, dividendPerShare: 0 },
      { year: 5, revenue: 3200, netIncome: -1780, netMargin: -55.6, roe: -450.0, debtToEquity: 55.0, freeCashFlow: -1420, eps: -3.7, bookValuePerShare: 0.1, dividendPerShare: 0 },
    ],
    analystRatings: [
      { analystFirm: 'Tourism Value Play', verdict: 'NẮM GIỮ', targetPrice: 3, comment: 'Định giá P/B cực thấp, du lịch Bắc Cực có tiềm năng.' },
      { analystFirm: 'Hospitality Decline Watch', verdict: 'BÁN MẠNH', targetPrice: 0.4, comment: 'Tính mùa quá mạnh, không thể tạo dòng tiền ổn định.' },
    ],
  },
];
