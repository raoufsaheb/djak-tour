import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ArrowRight, QrCode, AlertTriangle } from 'lucide-react';

export function CompletedGroupQRScreen() {
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
      className="min-h-screen bg-gray-50 pb-8"
    >
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-8">
        <button
          onClick={() => setCurrentScreen('jamiya_details')}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>
        <h1 className="text-2xl font-bold text-white">رمز التحقق</h1>
        <p className="text-white/80 mt-1">{selectedJamiya.name}</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-20 h-20 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-10 h-10 text-[#1B5E20]" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">QR Code</h2>

          <div className="w-56 h-56 mx-auto rounded-2xl border-2 border-dashed border-[#1B5E20]/40 bg-gray-50 flex items-center justify-center">
            <img src="/images.png" alt="QR Placeholder" className="w-24 h-24 opacity-50" />
          </div>
        </div>

        <div className="bg-[#F57C00]/10 rounded-xl p-4 border border-[#F57C00]/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F57C00] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#F57C00] font-medium">
            يجب التوجه إلى أقرب بريد قبل 48 ساعة لاستخراج وثيقة الالتزام، ولن تسترجع أموال حجزك في حالة انتهاء المدة.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('cheque')}
          className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2E7D32] transition-colors"
        >
          متابعة العملية
        </button>
      </div>
    </motion.div>
  );
}
