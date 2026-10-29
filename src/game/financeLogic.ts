/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company, Holding, StockArchetype, Transaction, BuffettAnalysisResult } from '../types';

export const TRANSACTION_FEE_RATE = 0.002; // 0.2% phí giao dịch mô phỏng thực tế

// Tỷ giá quy đổi tham chiếu: 1 USD ≈ 10 Kr (Krone Bắc Âu) | 1 Kr ≈ 2.500 VNĐ
export const KR_TO_USD_RATE = 0.1; // 10 Kr = 1 USD
export const KR_TO_VND_RATE = 2500; // 1 Kr = 2.500 VNĐ

/**
 * Quy đổi Kr sang USD
 */
export function krToUsd(krAmount: number): number {
  return Math.round(krAmount * KR_TO_USD_RATE * 100) / 100;
}

/**
 * Quy đổi Kr sang VNĐ
 */
export function krToVnd(krAmount: number): number {
  return Math.round(krAmount * KR_TO_VND_RATE);
}

/**
 * Định dạng tiền tệ kép (Kr và USD tương đương)
 */
export function formatCurrencyDual(krAmount: number, showUsd: boolean = true): string {
  const krStr = formatCurrency(krAmount);
  if (!showUsd) return krStr;
  const usdVal = krToUsd(krAmount);
  const usdStr = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(usdVal));
  return `${krStr} (~$${usdStr})`;
}

/**
 * Chuyển số tháng (1 - 60) thành định dạng "Năm X - Tháng Y"
 */
export function formatMonthYear(month: number): string {
  const m = Math.max(1, Math.min(60, Math.floor(month)));
  const year = Math.floor((m - 1) / 12) + 1;
  const monthInYear = ((m - 1) % 12) + 1;
  return `Năm ${year} - Tháng ${monthInYear}`;
}

/**
 * Định dạng tiền tệ (Kr - Krone Bắc Âu)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount)) + ' Kr';
}

/**
 * Định dạng phần trăm (+/-)
 */
export function formatPercent(percent: number, showSign: boolean = true): string {
  const sign = showSign && percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

/**
 * Tính toán phí giao dịch
 */
export function calculateTradeFee(shares: number, price: number, rate: number = TRANSACTION_FEE_RATE): number {
  if (shares <= 0 || price <= 0) return 0;
  return Math.round(shares * price * rate * 100) / 100;
}

/**
 * Kiểm tra tính hợp lệ trước khi đặt lệnh Mua
 */
export function validateBuyOrder(
  cash: number,
  shares: number,
  price: number,
  rate: number = TRANSACTION_FEE_RATE
): { isValid: boolean; error?: string; totalRequired: number; fee: number } {
  if (!Number.isInteger(shares) || shares <= 0) {
    return {
      isValid: false,
      error: 'Số lượng cổ phiếu mua phải là số nguyên dương lớn hơn 0.',
      totalRequired: 0,
      fee: 0,
    };
  }

  if (price <= 0 || isNaN(price)) {
    return {
      isValid: false,
      error: 'Giá cổ phiếu không hợp lệ.',
      totalRequired: 0,
      fee: 0,
    };
  }

  const grossAmount = shares * price;
  const fee = calculateTradeFee(shares, price, rate);
  const totalRequired = grossAmount + fee;

  if (totalRequired > cash + 0.0001) {
    return {
      isValid: false,
      error: `Số dư tiền mặt không đủ. Cần ${formatCurrency(totalRequired)} (đã gồm phí ${formatCurrency(fee)}), bạn chỉ có ${formatCurrency(cash)}.`,
      totalRequired,
      fee,
    };
  }

  return { isValid: true, totalRequired, fee };
}

/**
 * Kiểm tra tính hợp lệ trước khi đặt lệnh Bán
 */
export function validateSellOrder(
  holdingShares: number,
  sharesToSell: number,
  price: number,
  rate: number = TRANSACTION_FEE_RATE
): { isValid: boolean; error?: string; grossAmount: number; fee: number; netProceeds: number } {
  if (!Number.isInteger(sharesToSell) || sharesToSell <= 0) {
    return {
      isValid: false,
      error: 'Số lượng cổ phiếu bán phải là số nguyên dương lớn hơn 0.',
      grossAmount: 0,
      fee: 0,
      netProceeds: 0,
    };
  }

  if (sharesToSell > holdingShares) {
    return {
      isValid: false,
      error: `Không thể bán quá số lượng đang nắm giữ (${holdingShares} cổ phiếu).`,
      grossAmount: 0,
      fee: 0,
      netProceeds: 0,
    };
  }

  if (price <= 0 || isNaN(price)) {
    return {
      isValid: false,
      error: 'Giá cổ phiếu không hợp lệ.',
      grossAmount: 0,
      fee: 0,
      netProceeds: 0,
    };
  }

  const grossAmount = sharesToSell * price;
  const fee = calculateTradeFee(sharesToSell, price, rate);
  const netProceeds = Math.max(0, grossAmount - fee);

  return { isValid: true, grossAmount, fee, netProceeds };
}

/**
 * Thực thi lệnh Mua với logic chuẩn xác
 */
export function executeBuyOrder(
  cash: number,
  portfolio: Record<string, Holding>,
  ticker: string,
  companyName: string,
  shares: number,
  price: number,
  currentMonth: number
): {
  newCash: number;
  newPortfolio: Record<string, Holding>;
  transaction: Transaction;
} {
  const validation = validateBuyOrder(cash, shares, price);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Lệnh mua không hợp lệ');
  }

  const { fee, totalRequired } = validation;
  const newCash = Math.round((cash - totalRequired) * 100) / 100;

  const existing = portfolio[ticker];
  const newPortfolio = { ...portfolio };

  if (existing) {
    const totalShares = existing.shares + shares;
    const addedCost = shares * price;
    const totalCost = existing.totalCost + addedCost;
    const averagePrice = Math.round((totalCost / totalShares) * 100) / 100;

    newPortfolio[ticker] = {
      ticker,
      companyName,
      shares: totalShares,
      averagePrice,
      totalCost,
    };
  } else {
    newPortfolio[ticker] = {
      ticker,
      companyName,
      shares,
      averagePrice: price,
      totalCost: shares * price,
    };
  }

  const transaction: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    month: currentMonth,
    dateStr: formatMonthYear(currentMonth),
    ticker,
    companyName,
    type: 'BUY',
    shares,
    price,
    totalAmount: shares * price,
    fee,
    timestamp: Date.now(),
  };

  return { newCash, newPortfolio, transaction };
}

/**
 * Thực thi lệnh Bán với logic chuẩn xác
 */
export function executeSellOrder(
  cash: number,
  portfolio: Record<string, Holding>,
  ticker: string,
  companyName: string,
  sharesToSell: number,
  price: number,
  currentMonth: number
): {
  newCash: number;
  newPortfolio: Record<string, Holding>;
  transaction: Transaction;
  realizedPL: number;
} {
  const existing = portfolio[ticker];
  const currentShares = existing ? existing.shares : 0;
  const validation = validateSellOrder(currentShares, sharesToSell, price);

  if (!validation.isValid) {
    throw new Error(validation.error || 'Lệnh bán không hợp lệ');
  }

  const { fee, netProceeds } = validation;
  const newCash = Math.round((cash + netProceeds) * 100) / 100;

  const costOfSoldShares = existing.averagePrice * sharesToSell;
  const realizedPL = Math.round((sharesToSell * price - costOfSoldShares - fee) * 100) / 100;

  const newPortfolio = { ...portfolio };
  const remainingShares = existing.shares - sharesToSell;

  if (remainingShares === 0) {
    delete newPortfolio[ticker];
  } else {
    const remainingCost = Math.round(existing.averagePrice * remainingShares * 100) / 100;
    newPortfolio[ticker] = {
      ...existing,
      shares: remainingShares,
      totalCost: remainingCost,
    };
  }

  const transaction: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    month: currentMonth,
    dateStr: formatMonthYear(currentMonth),
    ticker,
    companyName,
    type: 'SELL',
    shares: sharesToSell,
    price,
    totalAmount: sharesToSell * price,
    fee,
    timestamp: Date.now(),
  };

  return { newCash, newPortfolio, transaction, realizedPL };
}

/**
 * Tính tổng giá trị danh mục cổ phiếu tại thời điểm hiện tại
 */
export function calculatePortfolioValue(
  portfolio: Record<string, Holding>,
  currentPrices: Record<string, number>
): number {
  return Object.values(portfolio).reduce((sum, holding) => {
    const price = currentPrices[holding.ticker] ?? holding.averagePrice;
    return sum + holding.shares * price;
  }, 0);
}

/**
 * Lãi lỗ của từng vị thế đang nắm giữ
 */
export function calculateHoldingPL(
  holding: Holding,
  currentPrice: number
): { profitAmount: number; profitPercent: number; currentValue: number } {
  const currentValue = holding.shares * currentPrice;
  const profitAmount = currentValue - holding.totalCost;
  const profitPercent = holding.totalCost > 0 ? (profitAmount / holding.totalCost) * 100 : 0;
  return { profitAmount, profitPercent, currentValue };
}

/**
 * Lãi lỗ tổng thể toàn bộ tài khoản
 */
export function calculateTotalAccountStats(
  initialCapital: number,
  cash: number,
  portfolioValue: number
): {
  totalNetWorth: number;
  totalProfitAmount: number;
  totalProfitPercent: number;
} {
  const totalNetWorth = cash + portfolioValue;
  const totalProfitAmount = totalNetWorth - initialCapital;
  const totalProfitPercent = initialCapital > 0 ? (totalProfitAmount / initialCapital) * 100 : 0;

  return {
    totalNetWorth: Math.round(totalNetWorth * 100) / 100,
    totalProfitAmount: Math.round(totalProfitAmount * 100) / 100,
    totalProfitPercent: Math.round(totalProfitPercent * 100) / 100,
  };
}

/**
 * Tính chỉ số thị trường chuẩn (Benchmark Index)
 * Dựa trên bình quân gia quyền/tổng hợp giá của tất cả các cổ phiếu qua từng tháng
 */
export function calculateBenchmarkIndex(
  companies: Company[],
  month: number,
  baseValue: number = 1000
): { currentIndex: number; totalReturnPercent: number } {
  if (companies.length === 0) return { currentIndex: baseValue, totalReturnPercent: 0 };

  const mIndex = Math.max(0, Math.min(59, month - 1));

  let initialSum = 0;
  let currentSum = 0;

  for (const c of companies) {
    initialSum += c.historicalMonthlyPrices[0] || 1;
    currentSum += c.historicalMonthlyPrices[mIndex] || 1;
  }

  const ratio = currentSum / initialSum;
  const currentIndex = Math.round(baseValue * ratio * 10) / 10;
  const totalReturnPercent = Math.round((ratio - 1) * 10000) / 100;

  return { currentIndex, totalReturnPercent };
}

/**
 * Phân tích và chấm điểm phong cách đầu tư theo Warren Buffett khi kết thúc
 */
export function analyzeBuffettStyle(
  initialCapital: number,
  finalNetWorth: number,
  transactions: Transaction[],
  portfolio: Record<string, Holding>,
  companies: Company[]
): BuffettAnalysisResult {
  const companyMap = new Map<string, Company>();
  companies.forEach((c) => companyMap.set(c.ticker, c));

  const totalReturnPercent = ((finalNetWorth - initialCapital) / initialCapital) * 100;
  const numTrades = transactions.length;

  // Tính tỷ trọng cổ phiếu chất lượng Buffett (Moat / High ROE)
  let buffettValueExposure = 0;
  let bubbleExposure = 0;
  let valueTrapExposure = 0;
  let totalTradedVolume = 0;

  for (const tx of transactions) {
    const comp = companyMap.get(tx.ticker);
    totalTradedVolume += tx.totalAmount;
    if (comp) {
      if (comp.archetype === 'BUFFETT_VALUE') {
        buffettValueExposure += tx.totalAmount;
      } else if (comp.archetype === 'OVERHYPED_BUBBLE') {
        bubbleExposure += tx.totalAmount;
      } else if (comp.archetype === 'VALUE_TRAP') {
        valueTrapExposure += tx.totalAmount;
      }
    }
  }

  // Điểm kiên nhẫn & vòng quay (Buffett coi trọng việc nắm giữ dài hạn)
  // Nếu trade quá nhiều (lướt sóng liên tục > 40 lần trong 5 năm) -> điểm kiên nhẫn giảm
  let patienceScore = 80;
  if (numTrades <= 15) patienceScore = 95;
  else if (numTrades <= 30) patienceScore = 85;
  else if (numTrades <= 50) patienceScore = 65;
  else patienceScore = 40;

  // Điểm tập trung vào Hào kinh tế (Moat)
  let moatScore = 50;
  if (totalTradedVolume > 0) {
    const buffettRatio = buffettValueExposure / totalTradedVolume;
    const bubbleRatio = bubbleExposure / totalTradedVolume;
    const trapRatio = valueTrapExposure / totalTradedVolume;

    moatScore = Math.min(100, Math.max(10, Math.round(buffettRatio * 80 + 30 - bubbleRatio * 40 - trapRatio * 30)));
  }

  // Điểm Biên độ an toàn (Margin of Safety)
  let marginOfSafetyScore = 60;
  if (totalReturnPercent > 60) marginOfSafetyScore = 90;
  else if (totalReturnPercent > 20) marginOfSafetyScore = 75;
  else if (totalReturnPercent > 0) marginOfSafetyScore = 60;
  else marginOfSafetyScore = 35;

  const totalScore = Math.round(moatScore * 0.4 + patienceScore * 0.3 + marginOfSafetyScore * 0.3);

  let title = 'Nhà Quan Sát Thận Trọng';
  let critique = '';

  if (totalScore >= 85 && totalReturnPercent >= 40) {
    title = 'Bậc Thầy Đầu Tư Giá Trị (Tinh Thần Buffett)';
    critique =
      'Tuyệt vời! Bạn thể hiện sự kiên định hiếm có: chọn đúng những công ty có hào kinh tế bền vững, ROE cao và giữ vững tâm lý trước biến động thị trường. Bạn không bị cuốn vào những cổ phiếu bong bóng và biết cách tích lũy tài sản dài hạn.';
  } else if (bubbleExposure > totalTradedVolume * 0.35) {
    title = 'Nhà Đầu Cơ FOMO & Theo Đuổi Tin Đồn';
    critique =
      'Bạn bị hấp dẫn bởi những cổ phiếu có tin tức hào nhoáng và tăng nóng ngắn hạn. Mặc dù có những thời điểm tài khoản tăng nhanh, nhưng khi bong bóng xì hơi, tổn thất là khó tránh khỏi. Buffett luôn nhắc nhở: Hãy sợ hãi khi người khác tham lam.';
  } else if (valueTrapExposure > totalTradedVolume * 0.35) {
    title = 'Người Bắt Đáy Dính "Bẫy Giá Rẻ"';
    critique =
      'Bạn nhìn thấy chỉ số P/E hoặc P/B thấp và nghĩ rằng mình mua được món hời, nhưng thực chất doanh nghiệp đó đang suy thoái nội tại và ôm nợ lớn. Nhớ rằng: Thà mua một công ty tuyệt vời với giá hợp lý còn hơn mua một công ty tồi với giá rẻ mạt.';
  } else if (numTrades > 45) {
    title = 'Nhà Giao Dịch Năng Động (Lướt Sóng)';
    critique =
      'Bạn mua bán rất thường xuyên. Phí giao dịch và việc cố đoán đỉnh đáy thị trường đã làm giảm hiệu suất sinh lời kép. Buffett từng nói: Thị trường là cỗ máy chuyển tiền từ người thiếu kiên nhẫn sang người kiên nhẫn.';
  } else if (totalReturnPercent > 20) {
    title = 'Nhà Tích Sản Bền Vững';
    critique =
      'Bạn có chiến lược cân bằng, quản trị rủi ro tốt và bảo toàn vốn thành công qua các chu kỳ khủng hoảng. Hãy trau dồi thêm kỹ năng phát hiện Hào kinh tế sâu hơn để tối ưu hóa lợi nhuận.';
  } else {
    title = 'Nhà Thực Nghiệm Thị Trường';
    critique =
      'Bạn đã trải qua đầy đủ các cung bậc của thị trường thực tế: từ hưng phấn đến khủng hoảng tín dụng. Đây là bài học quý giá nhất để rèn luyện tâm lý và kỷ luật định giá doanh nghiệp.';
  }

  const adviceList: string[] = [
    'Quy tắc số 1: Không bao giờ để mất tiền. Quy tắc số 2: Không bao giờ quên Quy tắc số 1.',
    'Chỉ đầu tư vào những doanh nghiệp mà bạn hiểu rõ và có lợi thế cạnh tranh khó bị sao chép (Hào kinh tế).',
    'Biến động giá ngắn hạn không phản ánh giá trị thực của doanh nghiệp; hãy xem cổ phiếu như một phần quyền sở hữu công ty.',
    'Kiên nhẫn là đức tính tối thượng: Lợi nhuận lớn nhất đến từ việc ngồi yên để lãi kép phát huy tác dụng.',
  ];

  return {
    score: Math.min(100, Math.max(10, totalScore)),
    title,
    critique,
    moatFocusScore: moatScore,
    patienceScore,
    marginOfSafetyScore,
    turnoverRating: numTrades < 15 ? 'Thấp (Rất kiên nhẫn)' : numTrades < 35 ? 'Trung bình' : 'Cao (Nhiều giao dịch)',
    adviceList,
  };
}
