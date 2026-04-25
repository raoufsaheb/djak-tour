import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { CheckCircle, Clock, ArrowRight, Building2 } from 'lucide-react';

export function PaymentSuccessScreen() {
  const { selectedBooking, setCurrentScreen } = useStore();
  const [countdown, setCountdown] = useState(48 * 60 * 60); // 48 ساعة بالثواني

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    setCurrentScreen('post_office');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
    >
      {/* أيقونة النجاح */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-[#2E7D32] rounded-full flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
      </motion.div>

      {/* عنوان النجاح */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-800 mb-2"
      >
        تم الدفع بنجاح!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 text-center mb-8"
      >
        تم تأكيد حجزك في {selectedBooking?.jamiyaName}
      </motion.p>

      {/* العداد التنازلي */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 w-full max-w-sm mb-6 shadow-lg"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#F57C00]" />
          <span className="text-gray-600">الوقت المتبقي للتحقق</span>
        </div>
        
        <div className="text-center">
          <p className="text-4xl font-bold text-[#F57C00] font-mono">
            {formatCountdown(countdown)}
          </p>
          <p className="text-sm text-gray-400 mt-2">ساعة : دقيقة : ثانية</p>
        </div>
      </motion.div>

      {/* خطوات التحقق */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-5 w-full max-w-sm mb-6"
      >
        <h3 className="font-bold text-gray-800 mb-4">خطوات التحقق</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#2E7D32] text-white rounded-full flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">الدفع</p>
              <p className="text-sm text-gray-500">تم بنجاح</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F57C00] text-white rounded-full flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">التحقق من البريد</p>
              <p className="text-sm text-gray-500">مطلوب خلال 48 ساعة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-400">الانضمام للجمعية</p>
              <p className="text-sm text-gray-400">بعد التحقق</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* زر الاستمرار */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={handleContinue}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-sm bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1B5E20]/30 flex items-center justify-center gap-2"
      >
        <span>إدخال رقم البريد</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* رجوع للرئيسية */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setCurrentScreen('dashboard')}
        className="mt-4 text-gray-500 font-medium"
      >
        الذهاب للوحة التحكم
      </motion.button>
    </motion.div>
  );
}
