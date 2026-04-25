import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  CreditCard, 
  Building2,
  Shield,
  CheckCircle,
  Info
} from 'lucide-react';
import { formatCurrency, ACTIVATION_FEE } from '@/data/mockData';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export function BookingScreen() {
  const { 
    selectedJamiya, 
    currentUser, 
    createBooking, 
    setCurrentScreen, 
    setSelectedBooking,
    setError, 
    error 
  } = useStore();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ccp'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedJamiya || !currentUser) {
    setCurrentScreen('dashboard');
    return null;
  }

  const handleConfirm = async () => {
    setIsProcessing(true);
    setError(null);

    // محاكاة معالجة الدفع (3 ثواني)
    await new Promise(resolve => setTimeout(resolve, 3000));

    const booking = createBooking(selectedJamiya.id, paymentMethod);
    
    if (booking) {
      setSelectedBooking(booking);
      setCurrentScreen('payment_success');
    }

    setIsProcessing(false);
  };

  const handleBack = () => {
    setCurrentScreen('jamiya_details');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6">
        <button
          onClick={handleBack}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>
        
        <h1 className="text-2xl font-bold text-white">تأكيد الحجز</h1>
        <p className="text-white/80 mt-1">{selectedJamiya.name}</p>
      </div>

      {/* المحتوى */}
      <div className="flex-1 p-4 space-y-4">
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* ملخص الحجز */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4">ملخص الحجز</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">اسم الجمعية</span>
              <span className="font-medium">{selectedJamiya.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">المبلغ الشهري</span>
              <span className="font-medium">{formatCurrency(selectedJamiya.monthlyAmount)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">المدة</span>
              <span className="font-medium">{selectedJamiya.duration} شهر</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">عدد الأعضاء</span>
              <span className="font-medium">{selectedJamiya.maxMembers}</span>
            </div>
            
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-bold">رسوم التفعيل</span>
                <span className="font-bold text-[#1B5E20]">{formatCurrency(ACTIVATION_FEE)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* طريقة الدفع */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4">طريقة الدفع</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#1B5E20] bg-[#1B5E20]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === 'card' ? 'bg-[#1B5E20]' : 'bg-gray-100'
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  paymentMethod === 'card' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div className="flex-1 text-right">
                <p className="font-bold text-gray-800">بطاقة بنكية</p>
                <p className="text-sm text-gray-500">Visa / MasterCard</p>
              </div>
              {paymentMethod === 'card' && (
                <CheckCircle className="w-6 h-6 text-[#1B5E20]" />
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('ccp')}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                paymentMethod === 'ccp'
                  ? 'border-[#1B5E20] bg-[#1B5E20]/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === 'ccp' ? 'bg-[#1B5E20]' : 'bg-gray-100'
              }`}>
                <Building2 className={`w-6 h-6 ${
                  paymentMethod === 'ccp' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <div className="flex-1 text-right">
                <p className="font-bold text-gray-800">حساب بريدي (CCP)</p>
                <p className="text-sm text-gray-500">الدفع عبر مكتب البريد</p>
              </div>
              {paymentMethod === 'ccp' && (
                <CheckCircle className="w-6 h-6 text-[#1B5E20]" />
              )}
            </button>
          </div>
        </motion.div>

        {/* معلومات الأمان */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1B5E20]/5 rounded-xl p-4 flex items-start gap-3"
        >
          <Shield className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#1B5E20] mb-1">دفع آمن</p>
            <p className="text-sm text-[#1B5E20]/80">
              جميع عمليات الدفع مشفرة وآمنة. لن يتم خصم أي مبلغ إضافي.
            </p>
          </div>
        </motion.div>

        {/* تحذير */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#F57C00]/10 rounded-xl p-4 flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-[#F57C00] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#F57C00] mb-1">تنويه مهم</p>
            <p className="text-sm text-[#F57C00]/80">
              رسوم التفعيل غير قابلة للاسترجاع. يجب إكمال التحقق خلال 48 ساعة.
            </p>
          </div>
        </motion.div>
      </div>

      {/* زر التأكيد */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">المبلغ الإجمالي</span>
          <span className="text-2xl font-bold text-[#1B5E20]">{formatCurrency(ACTIVATION_FEE)}</span>
        </div>
        
        <motion.button
          onClick={handleConfirm}
          disabled={isProcessing}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1B5E20]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <motion.div
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              <span>تأكيد ودفع</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
