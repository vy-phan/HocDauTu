/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SectorType =
  | 'Năng lượng & Dầu khí'
  | 'Ngân hàng & Tài chính'
  | 'Công nghệ & Bán dẫn'
  | 'Thủy sản & Tiêu dùng'
  | 'Y tế & Dược phẩm'
  | 'Bán lẻ & Thương mại'
  | 'Khai khoáng & Vật liệu'
  | 'Bất động sản & Hạ tầng';

export type StockArchetype =
  | 'BUFFETT_VALUE'        // Công ty tốt, định giá rẻ, ROE cao, hào kinh tế bền vững
  | 'OVERHYPED_BUBBLE'     // Bong bóng đầu cơ: P/E cực cao, hype truyền thông, sau đó sụp đổ
  | 'VALUE_TRAP'           // Bẫy giá rẻ: P/E có vẻ rẻ nhưng nội tại suy tàn, nợ lớn
  | 'CONSISTENT_COMPOUNDER'// Tăng trưởng bền bỉ: chất lượng tốt, định giá hợp lý
  | 'HIGH_DIVIDEND'        // Cổ tức phòng thủ cao, dòng tiền ổn định
  | 'CYCLICAL';            // Cổ phiếu chu kỳ theo giá hàng hóa/vĩ mô

export interface FinancialYearData {
  year: number; // 1 to 5
  revenue: number; // Doanh thu (triệu Kr)
  netIncome: number; // Lợi nhuận ròng (triệu Kr)
  netMargin: number; // Biên lợi nhuận (%)
  roe: number; // Tỷ suất sinh lời trên vốn chủ sở hữu (%)
  debtToEquity: number; // Nợ / Vốn chủ sở hữu (lần)
  freeCashFlow: number; // Dòng tiền tự do (triệu Kr)
  eps: number; // Thu nhập trên mỗi cổ phiếu (Kr)
  bookValuePerShare: number; // Giá trị sổ sách mỗi cổ phiếu (Kr)
  dividendPerShare: number; // Cổ tức mỗi cổ phiếu (Kr)
}

export interface AnalystRating {
  analystFirm: string;
  verdict: 'MUA MẠNH' | 'MUA' | 'NẮM GIỮ' | 'BÁN' | 'BÁN MẠNH';
  targetPrice: number;
  comment: string;
}

export interface Company {
  id: string;
  ticker: string;
  name: string;
  sector: SectorType;
  marketCapCategory: 'Large Cap' | 'Mid Cap' | 'Small Cap';
  description: string;
  products: string[];
  competitiveMoat: string; // Mô tả lợi thế cạnh tranh
  risks: string[]; // Các rủi ro tiềm ẩn
  managementSummary: string; // Nhận định ban lãnh đạo
  
  // Dữ liệu tài chính qua các năm (1 - 5)
  financials: FinancialYearData[];
  
  // 60 tháng giá (chỉ số tháng từ 1 đến 60)
  historicalMonthlyPrices: number[];
  
  // Nhận định của chuyên gia
  analystRatings: AnalystRating[];
  
  // Dữ liệu ẩn chỉ mở khi kết thúc game (Vén màn sự thật)
  archetype: StockArchetype;
  buffettRationale: string; // Phân tích vì sao Buffett sẽ mua/tránh
  realWorldCounterpart: string; // Nguyên mẫu thực tế trên sàn Bắc Âu/Quốc tế
}

export interface NewsItem {
  id: string;
  month: number; // Xuất hiện vào tháng nào
  title: string;
  summary: string;
  content: string;
  category: 'Vĩ mô' | 'Ngành' | 'Doanh nghiệp';
  sector?: SectorType;
  ticker?: string;
  companyName?: string;
  isNoiseOrRumor?: boolean; // Tin đồn hoặc giật gân để rèn luyện tư duy
  disguisedRealEvent?: {
    eventName: string;
    description: string;
    realYear: string;
  };
}

export interface Holding {
  ticker: string;
  companyName: string;
  shares: number;
  averagePrice: number;
  totalCost: number;
}

export interface Transaction {
  id: string;
  month: number;
  dateStr: string; // "Năm X - Tháng Y"
  ticker: string;
  companyName: string;
  type: 'BUY' | 'SELL';
  shares: number;
  price: number;
  totalAmount: number;
  fee: number;
  timestamp: number;
}

export interface GameState {
  playerName: string;
  currentMonth: number; // 1 -> 60 (Năm 1 Tháng 1 đến Năm 5 Tháng 12)
  cash: number;
  initialCapital: number;
  portfolio: Record<string, Holding>;
  transactions: Transaction[];
  interestedSectors: SectorType[];
  gameEnded: boolean;
  activeTab: 'market' | 'company' | 'portfolio' | 'news' | 'history' | 'guide' | 'summary';
  selectedCompanyId: string | null;
  watchlist: string[]; // List of company IDs user is tracking (starred)
  savedAt?: number;
}

export interface BuffettAnalysisResult {
  score: number; // 0 - 100
  title: string; // Danh hiệu nhà đầu tư
  critique: string; // Đánh giá chi tiết phong cách
  moatFocusScore: number;
  patienceScore: number;
  marginOfSafetyScore: number;
  turnoverRating: string;
  bestTrade?: { ticker: string; profit: number };
  worstTrade?: { ticker: string; loss: number };
  adviceList: string[];
}
