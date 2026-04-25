import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  Wallet, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  CreditCard
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/data/mockData';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export function ActiveMembershipScreen() {
  const { 
    currentUser, 
    getUserActiveMemberships, 
    makePayment, 
    setCurrentScreen,
    setError,
    error
  } = useStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null);

  if (!currentUser) {
    setCurrentScreen('login');
    return null;
  }

  const memberships = getUserActiveMemberships(currentUser.id);

  const handlePayment = async (membershipId: string) => {
    setIsProcessing(true);
    setSelectedMembership(membershipId);
    setError(null);

    // محاكاة معالجة الدفع
    await new Promise(resolve => setTimeout(resolve, 2000));

    makePayment(membershipId);
    setIsProcessing(false);
    setSelectedMembership(null);
  };

  if (memberships.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
      >
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Wallet className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">لا توجد عضويات نشطة</h1>
        <p className="text-gray-500 text-center mb-6">
          انضم إلى جمعية الآن وابدأ رحلة الادخار
        </p>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold"
        >
          استكشف الجمعيات
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>
        
        <h1 className="text-2xl font-bold text-white">عضوياتك النشطة</h1>
        <p className="text-white/80 mt-1">{memberships.length} جمعية نشطة</p>
      </div>

      {/* المحتوى */}
      <div className="p-4 space-y-4">
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        {memberships.map((membership, index) => (
          <motion.div
            key={membership.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm"
          >
            {/* رأس البطاقة */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800">{membership.jamiyaName}</h3>
                <p className="text-sm text-gray-500">
                  الدورة {membership.currentCycle} من {membership.totalCycles}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                membership.hasPaidThisCycle
                  ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                  : 'bg-[#F57C00]/10 text-[#F57C00]'
              }`}>
                {membership.hasPaidThisCycle ? 'تم الدفع' : 'في انتظار الدفع'}
              </div>
            </div>

            {/* معلومات الجمعية */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Wallet className="w-4 h-4" />
                  <span className="text-xs">المبلغ الشهري</span>
                </div>
                <p className="font-bold text-gray-800">
                  {formatCurrency(membership.monthlyAmount)}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">ترتيبك</span>
                </div>
                <p className="font-bold text-gray-800">
                  {membership.position}
                </p>
              </div>
            </div>

            {/* شريط التقدم */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">تقدم الجمعية</span>
                <span className="font-medium">
                  {Math.round((membership.currentCycle / membership.totalCycles) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(membership.currentCycle / membership.totalCycles) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="h-full bg-[#1B5E20] rounded-full"
                />
              </div>
            </div>

            {/* المستفيد الحالي */}
            <div className="bg-[#0D47A1]/5 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-[#0D47A1] mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">المستفيد الحالي</span>
              </div>
              <p className="font-bold text-gray-800">{membership.currentReceiverName}</p>
            </div>

            {/* موعد الدفع القادم */}
            {!membership.hasPaidThisCycle && (
              <div className="bg-[#F57C00]/10 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-[#F57C00] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">موعد الدفع القادم</span>
                </div>
                <p className="font-bold text-gray-800">
                  {formatDate(membership.nextPaymentDate)}
                </p>
              </div>
            )}

            {/* زر الدفع */}
            {!membership.hasPaidThisCycle && (
              <motion.button
                onClick={() => handlePayment(membership.id)}
                disabled={isProcessing && selectedMembership === membership.id}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#1B5E20] text-white py-3 rounded-xl font-bold shadow-lg shadow-[#1B5E20]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing && selectedMembership === membership.id ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>دفع الآن</span>
                  </>
                )}
              </motion.button>
            )}

            {membership.hasPaidThisCycle && (
              <div className="flex items-center justify-center gap-2 text-[#2E7D32] py-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">تم الدفع لهذا الشهر</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
