/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../game/financeLogic';
import { History, Search, ArrowUpRight, ArrowDownLeft, Receipt } from 'lucide-react';

interface HistoryViewProps {
  transactions: Transaction[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ transactions }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesType = filterType === 'ALL' || tx.type === filterType;
      const matchesSearch =
        tx.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const totalFeesPaid = transactions.reduce((sum, tx) => sum + tx.fee, 0);
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.totalAmount, 0);

  return (
    <div className="space-y-5">
      {/* Metrics bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Tổng số giao dịch</div>
          <div className="text-2xl font-black text-white mt-1">{transactions.length} lệnh</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {transactions.filter((t) => t.type === 'BUY').length} Mua • {transactions.filter((t) => t.type === 'SELL').length} Bán
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Tổng giá trị giao dịch</div>
          <div className="text-2xl font-black text-white mt-1">{formatCurrency(totalVolume)}</div>
          <div className="text-xs text-slate-500 mt-0.5">Khối lượng tích lũy</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold flex items-center justify-between">
            <span>Tổng phí giao dịch đã trả</span>
            <Receipt className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1">{formatCurrency(totalFeesPaid)}</div>
          <div className="text-xs text-slate-500 mt-0.5">Mức phí: 0.2% mỗi lượt</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo mã cổ phiếu hoặc tên công ty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['ALL', 'BUY', 'SELL'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type === 'ALL' ? 'Tất cả lệnh' : type === 'BUY' ? 'Lệnh Mua' : 'Lệnh Bán'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase text-slate-400 border-b border-slate-800 font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-3">Loại lệnh</th>
                <th className="py-3 px-3">Mã CP</th>
                <th className="py-3 px-3">Tên công ty</th>
                <th className="py-3 px-3 text-right">Số lượng</th>
                <th className="py-3 px-3 text-right">Giá khớp</th>
                <th className="py-3 px-3 text-right">Tổng giá trị</th>
                <th className="py-3 px-4 text-right">Phí (0.2%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-sans">
                    Chưa có giao dịch nào được ghi nhận.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isBuy = tx.type === 'BUY';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-sans text-xs text-slate-400">{tx.dateStr}</td>
                      <td className="py-3 px-3 font-sans">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded ${
                            isBuy
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {isBuy ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          {isBuy ? 'MUA' : 'BÁN'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-sans font-bold text-white">{tx.ticker}</td>
                      <td className="py-3 px-3 font-sans text-xs text-slate-300 truncate max-w-xs">
                        {tx.companyName}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-200">{tx.shares.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{formatCurrency(tx.price)}</td>
                      <td className="py-3 px-3 text-right font-bold text-white">
                        {formatCurrency(tx.totalAmount)}
                      </td>
                      <td className="py-3 px-4 text-right text-xs text-amber-400">
                        {formatCurrency(tx.fee)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
