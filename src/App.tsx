/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameState, SectorType } from './types';
import { COMPANIES } from './data/marketData';
import { NEWS_DATABASE } from './data/newsData';
import {
  executeBuyOrder,
  executeSellOrder,
  calculatePortfolioValue,
  calculateTotalAccountStats,
  calculateBenchmarkIndex,
  analyzeBuffettStyle,
  formatMonthYear,
} from './game/financeLogic';

import { Navbar } from './components/Navbar';
import { StartScreen } from './components/StartScreen';
import { MarketView } from './components/MarketView';
import { PortfolioView } from './components/PortfolioView';
import { NewsView } from './components/NewsView';
import { HistoryView } from './components/HistoryView';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { BuffettGuideModal } from './components/BuffettGuideModal';
import { SummaryModal } from './components/SummaryModal';
import { CurrencyConverterModal } from './components/CurrencyConverterModal';
import { DictionaryModal } from './components/DictionaryModal';

import { Store, Briefcase, Newspaper, History, BookOpen, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'buffett_way_game_state_v1';

export default function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showConverter, setShowConverter] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio' | 'news' | 'history'>('market');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Initialize from LocalStorage or URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');

    if (autostart === '1') {
      const defaultState: GameState = {
        playerName: 'Nhà Đầu Tư Giá Trị (Demo)',
        currentMonth: 1,
        cash: 50000,
        initialCapital: 50000,
        portfolio: {},
        transactions: [],
        interestedSectors: ['Thủy sản & Tiêu dùng', 'Ngân hàng & Tài chính'],
        gameEnded: false,
        activeTab: 'market',
        selectedCompanyId: null,
        watchlist: [],
      };
      setGameState(defaultState);
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.currentMonth) {
          // Migration: add watchlist if it doesn't exist
          if (!parsed.watchlist) {
            parsed.watchlist = [];
          }
          setGameState(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved game state', e);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (gameState) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      } catch (e) {
        console.warn('Failed to save state to localStorage', e);
      }
    }
  }, [gameState]);

  // Keyboard shortcuts - ESC to close modals, M/P/N/H for tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        if (selectedCompanyId) {
          setSelectedCompanyId(null);
        } else if (showGuide) {
          setShowGuide(false);
        } else if (showSummary) {
          setShowSummary(false);
        } else if (showConverter) {
          setShowConverter(false);
        } else if (showDictionary) {
          setShowDictionary(false);
        } else if (showResetConfirm) {
          setShowResetConfirm(false);
        }
      } else if (e.key === 'm' || e.key === 'M') {
        setActiveTab('market');
      } else if (e.key === 'p' || e.key === 'P') {
        setActiveTab('portfolio');
      } else if (e.key === 'n' || e.key === 'N') {
        setActiveTab('news');
      } else if (e.key === 'h' || e.key === 'H') {
        setActiveTab('history');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCompanyId, showGuide, showSummary, showConverter, showDictionary, showResetConfirm]);

  // Handle Start New Game
  const handleStartGame = (name: string, capital: number, sectors: SectorType[]) => {
    const newState: GameState = {
      playerName: name,
      currentMonth: 1,
      cash: capital,
      initialCapital: capital,
      portfolio: {},
      transactions: [],
      interestedSectors: sectors,
      gameEnded: false,
      activeTab: 'market',
      selectedCompanyId: null,
      watchlist: [],
    };
    setGameState(newState);
  };

  // Trigger in-app Reset confirmation modal (no window.confirm, safe in iframe)
  const handleResetGame = () => {
    setShowResetConfirm(true);
  };

  // Perform actual reset
  const handleConfirmReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (typeof window !== 'undefined' && window.history) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (e) {
      console.warn('Failed to remove storage', e);
    }
    setGameState(null);
    setSelectedCompanyId(null);
    setShowSummary(false);
    setShowResetConfirm(false);
  };

  // If game is not started, show StartScreen
  if (!gameState) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  // Current Price Map for month mIndex
  const mIndex = Math.max(0, Math.min(59, gameState.currentMonth - 1));
  const currentPrices: Record<string, number> = {};
  COMPANIES.forEach((c) => {
    currentPrices[c.ticker] = c.historicalMonthlyPrices[mIndex] || 1;
  });

  const portfolioValue = calculatePortfolioValue(gameState.portfolio, currentPrices);
  const accountStats = calculateTotalAccountStats(gameState.initialCapital, gameState.cash, portfolioValue);
  const benchmarkStats = calculateBenchmarkIndex(COMPANIES, gameState.currentMonth);

  // Check unread news for the current month
  const currentMonthNews = NEWS_DATABASE.filter((n) => n.month === gameState.currentMonth);

  // Next Month Action
  const handleNextMonth = () => {
    if (gameState.currentMonth >= 60) {
      setShowSummary(true);
      return;
    }

    const nextMonth = gameState.currentMonth + 1;
    const isEnding = nextMonth === 60;

    setGameState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentMonth: nextMonth,
        gameEnded: isEnding,
      };
    });

    if (isEnding) {
      setShowSummary(true);
    }
  };

  // Advance by N months
  const handleAdvanceMonths = (count: number) => {
    const nextMonth = Math.min(60, gameState.currentMonth + count);
    const isEnding = nextMonth === 60;

    setGameState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentMonth: nextMonth,
        gameEnded: isEnding,
      };
    });

    if (isEnding) {
      setShowSummary(true);
    }
  };

  // Buy Order
  const handleBuy = (shares: number) => {
    if (!selectedCompanyId) return;
    const company = COMPANIES.find((c) => c.id === selectedCompanyId);
    if (!company) return;

    const price = company.historicalMonthlyPrices[mIndex] || 1;

    try {
      const result = executeBuyOrder(
        gameState.cash,
        gameState.portfolio,
        company.ticker,
        company.name,
        shares,
        price,
        gameState.currentMonth
      );

      setGameState((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          cash: result.newCash,
          portfolio: result.newPortfolio,
          transactions: [result.transaction, ...prev.transactions],
        };
      });
    } catch (e: any) {
      console.error('Lệnh mua thất bại:', e.message);
    }
  };

  // Sell Order
  const handleSell = (shares: number) => {
    if (!selectedCompanyId) return;
    const company = COMPANIES.find((c) => c.id === selectedCompanyId);
    if (!company) return;

    const price = company.historicalMonthlyPrices[mIndex] || 1;

    try {
      const result = executeSellOrder(
        gameState.cash,
        gameState.portfolio,
        company.ticker,
        company.name,
        shares,
        price,
        gameState.currentMonth
      );

      setGameState((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          cash: result.newCash,
          portfolio: result.newPortfolio,
          transactions: [result.transaction, ...prev.transactions],
        };
      });
    } catch (e: any) {
      console.error('Lệnh bán thất bại:', e.message);
    }
  };

  // Toggle Watchlist
  const handleToggleWatchlist = (companyId: string) => {
    setGameState((prev) => {
      if (!prev) return null;
      const isInWatchlist = prev.watchlist.includes(companyId);
      const newWatchlist = isInWatchlist
        ? prev.watchlist.filter((id) => id !== companyId)
        : [...prev.watchlist, companyId];
      return {
        ...prev,
        watchlist: newWatchlist,
      };
    });
  };

  // Selected company object
  const selectedCompany = selectedCompanyId ? COMPANIES.find((c) => c.id === selectedCompanyId) : null;
  const selectedHolding = selectedCompany ? gameState.portfolio[selectedCompany.ticker] : undefined;
  const selectedCompanyNews = selectedCompany
    ? NEWS_DATABASE.filter(
        (n) => n.ticker === selectedCompany.ticker && n.month <= gameState.currentMonth
      ).sort((a, b) => b.month - a.month)
    : [];
  const selectedCompanyTransactions = selectedCompany
    ? gameState.transactions.filter((t) => t.ticker === selectedCompany.ticker).sort((a, b) => b.timestamp - a.timestamp)
    : [];

  // End Game Buffett Analysis
  const buffettAnalysis = analyzeBuffettStyle(
    gameState.initialCapital,
    accountStats.totalNetWorth,
    gameState.transactions,
    gameState.portfolio,
    COMPANIES
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar HUD */}
      <Navbar
        gameState={gameState}
        portfolioValue={portfolioValue}
        totalNetWorth={accountStats.totalNetWorth}
        totalProfitAmount={accountStats.totalProfitAmount}
        totalProfitPercent={accountStats.totalProfitPercent}
        onNextMonth={handleNextMonth}
        onAdvanceMonths={handleAdvanceMonths}
        onOpenGuide={() => setShowGuide(true)}
        onOpenDictionary={() => setShowDictionary(true)}
        onOpenConverter={() => setShowConverter(true)}
        onEndGameEarly={() => setShowSummary(true)}
        onResetGame={handleResetGame}
        unreadNewsCount={currentMonthNews.length}
      />

      {/* Main Tab Navigation */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('market')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'market'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Phím tắt: M"
            >
              <Store className="w-4 h-4" />
              <span>Thị Trường</span>
              <span className="text-[10px] opacity-50 bg-slate-950/30 px-1 rounded">M</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap relative ${
                activeTab === 'portfolio'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Phím tắt: P"
            >
              <Briefcase className="w-4 h-4" />
              <span>Danh Mục Của Tôi</span>
              {Object.keys(gameState.portfolio).length > 0 && (
                <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full">
                  {Object.keys(gameState.portfolio).length}
                </span>
              )}
              <span className="text-[10px] opacity-50 bg-slate-950/30 px-1 rounded">P</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap relative ${
                activeTab === 'news'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Phím tắt: N"
            >
              <Newspaper className="w-4 h-4" />
              <span>Bản Tin & Vĩ Mô</span>
              {currentMonthNews.length > 0 && (
                <span className="bg-rose-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full animate-pulse">
                  Mới
                </span>
              )}
              <span className="text-[10px] opacity-50 bg-slate-950/30 px-1 rounded">N</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Phím tắt: H"
            >
              <History className="w-4 h-4" />
              <span>Lịch Sử Giao Dịch</span>
              <span className="text-[10px] opacity-50 bg-slate-950/30 px-1 rounded">H</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* Month Advance Banner if new news */}
        {currentMonthNews.length > 0 && activeTab !== 'news' && (
          <div className="mb-5 bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-blue-500 text-slate-950 rounded font-bold text-[10px]">TIN MỚI</span>
              <span className="text-slate-200 font-medium truncate max-w-xl">
                {currentMonthNews[0].title}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('news')}
              className="text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap cursor-pointer text-xs"
            >
              Đọc bản tin &rarr;
            </button>
          </div>
        )}

        {/* Active Tab View */}
        {activeTab === 'market' && (
          <MarketView
            companies={COMPANIES}
            currentMonth={gameState.currentMonth}
            benchmarkIndex={benchmarkStats.currentIndex}
            benchmarkReturnPercent={benchmarkStats.totalReturnPercent}
            onSelectCompany={(id) => setSelectedCompanyId(id)}
            userInterestedSectors={gameState.interestedSectors}
            onOpenDictionary={() => setShowDictionary(true)}
            onOpenConverter={() => setShowConverter(true)}
            watchlist={gameState.watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioView
            portfolio={gameState.portfolio}
            companies={COMPANIES}
            currentMonth={gameState.currentMonth}
            cash={gameState.cash}
            initialCapital={gameState.initialCapital}
            onSelectCompany={(id) => setSelectedCompanyId(id)}
          />
        )}

        {activeTab === 'news' && (
          <NewsView
            newsList={NEWS_DATABASE}
            currentMonth={gameState.currentMonth}
            onSelectCompanyByTicker={(ticker) => {
              const comp = COMPANIES.find((c) => c.ticker === ticker);
              if (comp) setSelectedCompanyId(comp.id);
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView transactions={gameState.transactions} />
        )}
      </main>

      {/* Company Detail & Trading Modal */}
      {selectedCompany && selectedCompanyId && (
        <CompanyDetailModal
          company={selectedCompany}
          currentMonth={gameState.currentMonth}
          cash={gameState.cash}
          holding={selectedHolding}
          companyNews={selectedCompanyNews}
          companyTransactions={selectedCompanyTransactions}
          onClose={() => setSelectedCompanyId(null)}
          onBuy={handleBuy}
          onSell={handleSell}
          isWatched={gameState.watchlist.includes(selectedCompanyId)}
          onToggleWatchlist={() => handleToggleWatchlist(selectedCompanyId)}
        />
      )}

      {/* Currency Converter Modal */}
      {showConverter && (
        <CurrencyConverterModal
          currentCash={gameState.cash}
          totalNetWorth={accountStats.totalNetWorth}
          onClose={() => setShowConverter(false)}
        />
      )}

      {/* Beginner F0 Dictionary Modal */}
      {showDictionary && <DictionaryModal onClose={() => setShowDictionary(false)} />}

      {/* Buffett Principles Guide Modal */}
      {showGuide && <BuffettGuideModal onClose={() => setShowGuide(false)} />}

      {/* Endgame Summary Modal */}
      {showSummary && (
        <SummaryModal
          gameState={gameState}
          finalNetWorth={accountStats.totalNetWorth}
          companies={COMPANIES}
          benchmarkReturnPercent={benchmarkStats.totalReturnPercent}
          analysis={buffettAnalysis}
          onRestart={handleResetGame}
          onClose={() => setShowSummary(false)}
        />
      )}

      {/* In-App Reset Confirmation Modal (Replaces window.confirm for iframe compatibility) */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Xác Nhận Chơi Lại Ván Mới</h3>
                <p className="text-xs text-slate-400">Làm mới dữ liệu & quay về vạch xuất phát</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              Bạn có chắc chắn muốn xóa toàn bộ tiến trình đầu tư hiện tại để bắt đầu lại từ <strong className="text-emerald-400">Năm 1 - Tháng 1</strong> không?
              <br /><br />
              <span className="text-slate-400">
                Lưu ý: Danh mục cổ phiếu đang nắm giữ, số dư tiền mặt và nhật ký giao dịch của bạn sẽ được đặt lại theo mức vốn ban đầu mới.
              </span>
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Hủy bỏ / Tiếp tục chơi
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xác Nhận Chơi Lại</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
