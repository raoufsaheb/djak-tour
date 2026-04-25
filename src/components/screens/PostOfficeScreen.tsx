import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  Building2, 
  CheckCircle, 
  Info
} from 'lucide-react';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SuccessMessage } from '@/components/common/ErrorMessage';

export function PostOfficeScreen() {
  const { 
    selectedBooking, 
    confirmBooking, 
    setCurrentScreen, 
    setError, 
    error,
    setSuccessMessage,
    successMessage
  } = useStore();
  
  const [postOfficeNumber, setPostOfficeNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedBooking) {
    setCurrentScreen('dashboard');
    return null;
  }

  const handleSubmit = async () => {
    setIsProcessing(true);
    setError(null);

    // محاكاة التحقق
    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = confirmBooking(postOfficeNumber);

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setCurrentScreen('dashboard');
      }, 2000);
    }

    setIsProcessing(false);
  };

  const handleBack = () => {
    setCurrentScreen('payment_success');
  };

  // أمثلة على أرقام صالحة
  const validExamples = [
    'POST-2025-ALGR-0001',
    'POST-2025-ORAN-0002',
    'POST-2025-CONST-0003',
    'POST-2025-ANNABA-0004',
  ];

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-[#2E7D32] rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          تم التحقق بنجاح!
        </h1>

        <p className="text-gray-500 text-center mb-8">
          تم تأكيد انضمامك للجمعية
        </p>

        <motion.div
          className="w-8 h-8 border-2 border-[#1B5E20] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    );
  }

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
        
        <h1 className="text-2xl font-bold text-white">التحقق من البريد</h1>
        <p className="text-white/80 mt-1">أدخل رقم معاملة البريد</p>
      </div>

      {/* المحتوى */}
      <div className="flex-1 p-4 space-y-4">
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        {successMessage && (
          <div className="mb-4">
            <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />
          </div>
        )}

        {/* أيقونة البريد */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-6"
        >
          <div className="w-20 h-20 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-[#1B5E20]" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            أدخل رقم المعاملة
          </h2>
          <p className="text-gray-500">
            الرقم الموجود في إيصال الدفع من مكتب البريد
          </p>
        </motion.div>

        {/* حقل الإدخال */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5"
        >
          <label className="block text-gray-700 font-medium mb-2">
            رقم معاملة البريد
          </label>
          <input
            type="text"
            value={postOfficeNumber}
            onChange={(e) => setPostOfficeNumber(e.target.value.toUpperCase())}
            placeholder="POST-2025-ALGR-0001"
            className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-center font-mono text-lg tracking-wider"
            dir="ltr"
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
            الصيغة: POST-YYYY-XXXX-NNNN
          </p>
        </motion.div>

        {/* أمثلة */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-xl p-4"
        >
          <p className="text-sm font-medium text-gray-700 mb-2">أمثلة على أرقام صالحة:</p>
          <div className="space-y-1">
            {validExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setPostOfficeNumber(example)}
                className="block w-full text-left px-3 py-2 bg-white rounded-lg text-sm font-mono text-gray-600 hover:bg-[#1B5E20]/5 hover:text-[#1B5E20] transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>

        {/* معلومات */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0D47A1]/10 rounded-xl p-4 flex items-start gap-3"
        >
          <Info className="w-5 h-5 text-[#0D47A1] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#0D47A1] mb-1">كيف تحصل على الرقم؟</p>
            <p className="text-sm text-[#0D47A1]/80">
              اذهب إلى أقرب مكتب بريد، ادفع رسوم التفعيل، واحصل على الإيصال الذي يحتوي على رقم المعاملة.
            </p>
          </div>
        </motion.div>
      </div>

      {/* زر التأكيد */}
      <div className="p-4 bg-white border-t border-gray-100">
        <motion.button
          onClick={handleSubmit}
          disabled={isProcessing || postOfficeNumber.length < 10}
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
              <span>تحقق</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
