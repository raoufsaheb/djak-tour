import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  Wallet, 
  TrendingUp,
  TrendingDown,
  Receipt,
  Filter,
  Download
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/data/mockData';

const transactionTypes = {
  all: 'الكل',
  contribution: 'مساهمات',
  receiving: 'استلام',
  fee: 'رسوم',
  refund: 'استرداد',
};

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'contribution':
      return <TrendingDown className="w-5 h-5 text-[#C62828]" />;
    case 'receiving':
      return <TrendingUp className="w-5 h-5 text-[#2E7D32]" />;
    case 'fee':
      return <Receipt className="w-5 h-5 text-[#F57C00]" />;
    case 'refund':
      return <Wallet className="w-5 h-5 text-[#0D47A1]" />;
    default:
      return <Wallet className="w-5 h-5 text-gray-500" />;
  }
};

const getTransactionColor = (type: string) => {
  switch (type) {
    case 'contribution':
      return 'text-[#C62828]';
    case 'receiving':
      return 'text-[#2E7D32]';
    case 'fee':
      return 'text-[#F57C00]';
    case 'refund':
      return 'text-[#0D47A1]';
    default:
      return 'text-gray-600';
  }
};

const getTransactionSign = (type: string) => {
  switch (type) {
    case 'contribution':
    case 'fee':
      return '-';
    case 'receiving':
    case 'refund':
      return '+';
    default:
      return '';
  }
};

export function TransactionsScreen() {
  const { currentUser, getUserTransactions, setCurrentScreen } = useStore();
  const [filter, setFilter] = useState<string>('all');
  const [showFilter, setShowFilter] = useState(false);

  if (!currentUser) {
    setCurrentScreen('login');
    return null;
  }

  let transactions = getUserTransactions(currentUser.id);
  
  if (filter !== 'all') {
    transactions = transactions.filter(t => t.type === filter);
  }

  // حساب الإجماليات
  const totalContributions = transactions
    .filter(t => t.type === 'contribution')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalReceived = transactions
    .filter(t => t.type === 'receiving')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="text-white/80 hover:text-white flex items-center gap-1"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>
          <h1 className="text-xl font-bold text-white">سجل المعاملات</h1>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-white/80 hover:text-white"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* ملخص */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">إجمالي المساهمات</p>
            <p className="text-white text-xl font-bold">
              {formatCurrency(totalContributions)}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/80 text-sm mb-1">إجمالي المستلم</p>
            <p className="text-white text-xl font-bold">
              {formatCurrency(totalReceived)}
            </p>
          </div>
        </div>
      </div>

      {/* فلتر */}
      {showFilter && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white border-b border-gray-100 p-4"
        >
          <div className="flex flex-wrap gap-2">
            {Object.entries(transactionTypes).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-[#1B5E20] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* قائمة المعاملات */}
      <div className="p-4 space-y-3">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  transaction.type === 'contribution' ? 'bg-[#C62828]/10' :
                  transaction.type === 'receiving' ? 'bg-[#2E7D32]/10' :
                  transaction.type === 'fee' ? 'bg-[#F57C00]/10' :
                  'bg-[#0D47A1]/10'
                }`}>
                  {getTransactionIcon(transaction.type)}
                </div>
                
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                
                <div className="text-left">
                  <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                    {getTransactionSign(transaction.type)}{formatCurrency(transaction.amount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed'
                      ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                      : transaction.status === 'pending'
                      ? 'bg-[#F57C00]/10 text-[#F57C00]'
                      : 'bg-[#C62828]/10 text-[#C62828]'
                  }`}>
                    {transaction.status === 'completed' ? 'مكتمل' :
                     transaction.status === 'pending' ? 'قيد المعالجة' : 'فاشل'}
                  </span>
                </div>
              </div>

              {transaction.receiptUrl && (
                <button className="mt-3 flex items-center gap-2 text-[#0D47A1] text-sm font-medium">
                  <Download className="w-4 h-4" />
                  <span>تحميل الإيصال</span>
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500">لا توجد معاملات</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
