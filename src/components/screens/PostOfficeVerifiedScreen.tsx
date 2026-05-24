import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function PostOfficeVerifiedScreen() {
  const { selectedJamiya, setCurrentScreen } = useStore();

  if (!selectedJamiya) {
    setCurrentScreen('dashboard');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-[#2E7D32]" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">تم التحقق بنجاح</h1>
        <p className="text-gray-600 mb-2">
          تم التحقق من ذهابك إلى البريد وتم قبول ملفك بالكامل.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          غروب: <span className="font-bold text-gray-800">{selectedJamiya.name}</span>
        </p>

        <button
          onClick={() => setCurrentScreen('sorting')}
          className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2E7D32] transition-colors flex items-center justify-center gap-2"
        >
          <span>الانتقال إلى مرحلة الفرز</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
