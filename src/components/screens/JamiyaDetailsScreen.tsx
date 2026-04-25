import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  Wallet, 
  Users, 
  Calendar, 
  TrendingUp,
  Shield,
  CheckCircle,
  Info
} from 'lucide-react';
import { formatCurrency, getJamiyaStatusText } from '@/data/mockData';

export function JamiyaDetailsScreen() {
  const { selectedJamiya, currentUser, setCurrentScreen, setSelectedJamiya } = useStore();

  if (!selectedJamiya) {
    setCurrentScreen('dashboard');
    return null;
  }

  const handleBook = () => {
    if (!currentUser?.isVerified) {
      setCurrentScreen('kyc');
      return;
    }
    setCurrentScreen('booking');
  };

  const handleBack = () => {
    setSelectedJamiya(null);
    setCurrentScreen('dashboard');
  };

  const isFull = selectedJamiya.currentMembers >= selectedJamiya.maxMembers;
  const canJoin = selectedJamiya.status === 'open' && !isFull;
  const canRunSimulationFlow =
    selectedJamiya.status === 'completed' &&
    selectedJamiya.currentMembers === selectedJamiya.maxMembers;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-12">
        <button
          onClick={handleBack}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div 
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white'
            }}
          >
            {getJamiyaStatusText(selectedJamiya.status)}
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {selectedJamiya.name}
          </h1>
          <p className="text-white/80">{selectedJamiya.description}</p>
        </motion.div>
      </div>

      {/* المحتوى */}
      <div className="p-4 -mt-6 space-y-4">
        {/* بطاقة المعلومات الرئيسية */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#1B5E20]/5 rounded-xl">
              <Wallet className="w-6 h-6 text-[#1B5E20] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(selectedJamiya.monthlyAmount)}
              </p>
              <p className="text-sm text-gray-500">شهرياً</p>
            </div>
            
            <div className="text-center p-4 bg-[#0D47A1]/5 rounded-xl">
              <Calendar className="w-6 h-6 text-[#0D47A1] mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">
                {selectedJamiya.duration}
              </p>
              <p className="text-sm text-gray-500">شهر</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">الأعضاء</span>
              </div>
              <span className="font-bold">
                {selectedJamiya.currentMembers} / {selectedJamiya.maxMembers}
              </span>
            </div>
            
            {/* شريط التقدم */}
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${selectedJamiya.progress}%` }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-full bg-[#1B5E20] rounded-full"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1 text-center">
              {selectedJamiya.progress}% مكتمل
            </p>
          </div>
        </motion.div>

        {/* المميزات */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4">مميزات الجمعية</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2E7D32]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">ادخار منتظم</p>
                <p className="text-sm text-gray-500">ادخر مبلغاً ثابتاً كل شهر</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2E7D32]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">عائد مضمون</p>
                <p className="text-sm text-gray-500">احصل على مبلغ كبير في دورك</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2E7D32]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">أمان كامل</p>
                <p className="text-sm text-gray-500">نظام ضمان يحمي جميع الأعضاء</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* كيفية العمل */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4">كيفية العمل</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">احجز مكانك</p>
                <p className="text-sm text-gray-500">ادفع رسوم التفعيل واحجز مقعدك</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">ادفع شهرياً</p>
                <p className="text-sm text-gray-500">ادفع المبلغ الشهري في موعده</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1B5E20] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">استلم دورك</p>
                <p className="text-sm text-gray-500">احصل على المبلغ الكامل في دورك</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* معلومات إضافية */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#F57C00]/10 rounded-xl p-4 flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-[#F57C00] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#F57C00] mb-1">تنويه مهم</p>
            <p className="text-sm text-[#F57C00]/80">
              رسوم التفعيل {formatCurrency(2000)} غير قابلة للاسترجاع. 
              في حال عدم الدفع خلال 48 ساعة، سيتم إلغاء حجزك تلقائياً.
            </p>
          </div>
        </motion.div>

        {/* زر الحجز */}
        <div className="pt-4 pb-8">
          <motion.button
            onClick={() => {
              if (canRunSimulationFlow) {
                setCurrentScreen('cheque');
                return;
              }
              handleBook();
            }}
            disabled={!canJoin && !canRunSimulationFlow}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 ${
              canJoin || canRunSimulationFlow
                ? 'bg-[#1B5E20] text-white shadow-[#1B5E20]/30'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canRunSimulationFlow ? (
              <>
                <span>ابدأ محاكاة الشيك والالتزام</span>
                <ArrowRight className="w-5 h-5" />
              </>
            ) : canJoin ? (
              <>
                <span>احجز مكانك الآن</span>
                <ArrowRight className="w-5 h-5" />
              </>
            ) : isFull ? (
              <span>الجمعية مكتملة</span>
            ) : (
              <span>الجمعية غير متاحة</span>
            )}
          </motion.button>
          
          {!currentUser?.isVerified && canJoin && (
            <p className="text-center text-sm text-[#F57C00] mt-2">
              يجب توثيق حسابك أولاً للانضمام
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
