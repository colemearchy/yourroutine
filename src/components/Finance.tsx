import { useState } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTodayString, formatDate } from '../utils/date';
import { useTranslation } from '../i18n/useTranslation';

export const Finance = () => {
  const { stockTransactions, addStockTransaction, deleteStockTransaction, getStocksByDate } = useStore();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<'buy' | 'sell'>('buy');

  const handleAddTransaction = () => {
    // Validation
    if (!name.trim()) {
      alert(t('enterStockName'));
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      alert(t('enterQuantity'));
      return;
    }
    if (!price || Number(price) <= 0) {
      alert(t('enterPrice'));
      return;
    }

    const transaction = {
      date: selectedDate,
      ticker: ticker.trim() ? ticker.toUpperCase() : name.substring(0, 6).toUpperCase(),
      name,
      quantity: Number(quantity),
      price: Number(price),
      type,
    };

    addStockTransaction(transaction);

    // Clear form
    setTicker('');
    setName('');
    setQuantity('');
    setPrice('');
  };

  const todayTransactions = getStocksByDate(selectedDate);

  // 총 투자 금액 계산
  const totalInvestment = todayTransactions
    .filter((t) => t.type === 'buy')
    .reduce((sum, t) => sum + t.quantity * t.price, 0);

  const totalSales = todayTransactions
    .filter((t) => t.type === 'sell')
    .reduce((sum, t) => sum + t.quantity * t.price, 0);

  // 종목별 집계
  const stockSummary = stockTransactions.reduce((acc, transaction) => {
    const key = transaction.ticker;
    if (!acc[key]) {
      acc[key] = {
        ticker: transaction.ticker,
        name: transaction.name,
        totalQuantity: 0,
        totalInvested: 0,
      };
    }

    if (transaction.type === 'buy') {
      acc[key].totalQuantity += transaction.quantity;
      acc[key].totalInvested += transaction.quantity * transaction.price;
    } else {
      acc[key].totalQuantity -= transaction.quantity;
      acc[key].totalInvested -= transaction.quantity * transaction.price;
    }

    return acc;
  }, {} as Record<string, { ticker: string; name: string; totalQuantity: number; totalInvested: number }>);

  return (
    <div className="space-y-4">
      {/* Portfolio Summary */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-md p-4 text-white">
        <h3 className="text-lg font-semibold mb-3">{t('portfolioSummary')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">{t('holdingsCount')}</p>
            <p className="text-2xl font-bold">{Object.keys(stockSummary).filter(k => stockSummary[k].totalQuantity > 0).length}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">{t('totalInvestment')}</p>
            <p className="text-2xl font-bold">
              {Object.values(stockSummary)
                .reduce((sum, s) => sum + s.totalInvested, 0)
                .toLocaleString()}{t('currency')}
            </p>
          </div>
        </div>
      </div>

      {/* Add Transaction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">{t('addTransaction')}</h3>

        {/* Buy/Sell Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setType('buy')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              type === 'buy'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <TrendingUp size={20} />
            {t('buy')}
          </button>
          <button
            onClick={() => setType('sell')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              type === 'sell'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <TrendingDown size={20} />
            {t('sell')}
          </button>
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('date')}</label>
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Ticker and Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('stockName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('stockNamePlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('stockCode')} <span className="text-xs text-gray-500 dark:text-gray-400">({t('optional')})</span>
          </label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder={t('stockCodePlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('quantity')}</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={t('quantityPlaceholder')}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('priceInWon')}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t('pricePlaceholder')}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        <button
          onClick={handleAddTransaction}
          className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          {t('addTransaction')}
        </button>
      </div>

      {/* Today's Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          {formatDate(selectedDate, 'MM월 dd일')} {t('transactionHistory')}
        </h3>
        {todayTransactions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">{t('noTransactions')}</p>
        ) : (
          <div className="space-y-2">
            {todayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {transaction.type === 'buy' ? (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">{t('buy')}</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">{t('sell')}</span>
                    )}
                    <span className="font-medium text-gray-800 dark:text-gray-100">{transaction.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({transaction.ticker})</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {transaction.quantity}{t('shares')} @ {transaction.price.toLocaleString()}{t('currency')}
                    <span className="text-primary-600 dark:text-primary-400 font-medium ml-2">
                      = {(transaction.quantity * transaction.price).toLocaleString()}{t('currency')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteStockTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700 transition-colors ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{t('totalBuy')}:</span>
                <span className="font-medium text-red-600">{totalInvestment.toLocaleString()}{t('currency')}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-300">{t('totalSell')}:</span>
                <span className="font-medium text-blue-600">{totalSales.toLocaleString()}{t('currency')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Holdings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">{t('holdings')}</h3>
        {Object.keys(stockSummary).length === 0 ? (
          <p className="text-gray-400 text-center py-8">{t('noHoldings')}</p>
        ) : (
          <div className="space-y-2">
            {Object.values(stockSummary)
              .filter((stock) => stock.totalQuantity > 0)
              .map((stock) => (
                <div
                  key={stock.ticker}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800 dark:text-gray-100">{stock.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({stock.ticker})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{t('holdingQuantity')}: {stock.totalQuantity}{t('shares')}</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {t('averagePrice')}: {Math.round(stock.totalInvested / stock.totalQuantity).toLocaleString()}{t('currency')}
                    </span>
                  </div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                    {t('totalInvested')}: {stock.totalInvested.toLocaleString()}{t('currency')}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
