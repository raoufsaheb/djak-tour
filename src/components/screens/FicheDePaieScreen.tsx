import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ChevronLeft, FileText, Info } from 'lucide-react';
import { CameraScanMock } from '@/components/common/CameraScanMock';

export function FicheDePaieScreen() {
  const { setCurrentScreen } = useStore();
  const [showCamera, setShowCamera] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleCapture = () => {
    setShowCamera(false);
    setIsScanned(true);
    setTimeout(() => {
      setCurrentScreen('booking');
    }, 2000);
  };

  const handleCancel = () => {
    setShowCamera(false);
  };

  return (
    <>
      <AnimatePresence>
        {showCamera && (
          <CameraScanMock
            title="تصوير كشف الراتب"
            subtitle="Fiche de paie"
            guideText="ضع كشف الراتب ضمن الإطار وتأكد من وضوح الأرقام"
            frameColor="#0D47A1"
            onCapture={handleCapture}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 pb-8"
      >
        {/* الرأس */}
        <div className="bg-gradient-to-br from-[#0D47A1] to-[#1565C0] p-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setCurrentScreen('jamiya_details')}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">تأكيد الدخل</h1>
          </div>
          <p className="text-white/70 text-sm">
            الخطوة 2 من 2 - التحقق من الدخل
          </p>
        </div>

        <div className="p-4 space-y-4">
          {!isScanned ? (
            <>
              {/* شرح */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="w-16 h-16 bg-[#0D47A1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[#0D47A1]" />
                </div>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                  كشف الراتب (Fiche de paie)
                </h2>
                <p className="text-gray-500 text-center mb-6">
                  يرجى تصوير كشف الراتب الشهري للتحقق من قدرتك المالية على الالتزام بالمساهمات
                </p>

                <div className="bg-[#0D47A1]/5 rounded-xl p-4 space-y-3 mb-6">
                  <h3 className="font-bold text-[#0D47A1] text-sm">ما يجب أن يظهر في الكشف:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#0D47A1] flex-shrink-0 mt-0.5" />
                      <span>الاسم الكامل للموظف</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#0D47A1] flex-shrink-0 mt-0.5" />
                      <span>الراتب الصافي (Net à payer)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#0D47A1] flex-shrink-0 mt-0.5" />
                      <span>تاريخ إصدار الكشف</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#0D47A1] flex-shrink-0 mt-0.5" />
                      <span>ختم المؤسسة (إن وجد)</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full bg-[#0D47A1] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1565C0] transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  تصوير كشف الراتب
                </button>
              </motion.div>

              {/* معلومات إضافية */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-amber-50 rounded-xl p-4 border border-amber-200"
              >
                <p className="text-amber-800 text-sm text-center">
                  سيتم التحقق من كشف الراتب خلال 24 ساعة
                </p>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">تم إرسال المستند</h2>
              <p className="text-gray-500">
                الدخل مقبول. يمكنك الآن متابعة دفع مستحقات التسجيل.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
