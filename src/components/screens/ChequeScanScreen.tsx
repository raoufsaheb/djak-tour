import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ChevronLeft, Banknote, AlertTriangle } from 'lucide-react';
import { CameraScanMock } from '@/components/common/CameraScanMock';

export function ChequeScanScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setCurrentScreen, selectedJamiya } = useStore();
  const [showCamera, setShowCamera] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  console.log(selectedJamiya);
  const handleCapture = () => {
    setShowCamera(false);
    setIsScanned(true);
    // حفظ حالة المسح
    setTimeout(() => {
      setCurrentScreen('engagement');
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
            title="تصوير الشيك"
            subtitle="تأكيد وسيلة الضمان"
            guideText="ضع الشيك ضمن الإطار وتأكد من وضوح جميع البيانات"
            frameColor="#1B5E20"
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
        <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setCurrentScreen('active_membership')}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">تأكيد وسيلة الضمان</h1>
          </div>
          <p className="text-white/70 text-sm">
            الخطوة 1 من 3 - شيك الضمان
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
                <div className="w-16 h-16 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Banknote className="w-8 h-8 text-[#1B5E20]" />
                </div>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                  شيك ضمان بدون تاريخ
                </h2>
                <p className="text-gray-500 text-center mb-6">
                  يُطلب تقديم شيك ضمان بدون تاريخ وبدون مبلغ، على أن يكون واضحًا وكامل البيانات، وذلك لاستخراج المعلومات البنكية اللازمة للتحقق.
                </p>

                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2E7D32] transition-colors flex items-center justify-center gap-2"
                >
                  <Banknote className="w-5 h-5" />
                  تصوير الشيك
                </button>
              </motion.div>

              {/* تحذير */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 text-sm font-medium mb-1">ملاحظة هامة</p>
                  <p className="text-amber-700 text-xs">
                    الشيك يستخدم كضمان فقط ولن يتم صرفه طالما كنت ملتزماً بالمساهمات الشهرية. سيتم إرجاع الشيك بعد اكتمال الجمعية.
                  </p>
                </div>
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
              <h2 className="text-xl font-bold text-gray-800 mb-2">تم استلام الشيك</h2>
              <p className="text-gray-500 mb-4">
                تم تصوير الشيك بنجاح وجاري المراجعة.
              </p>
              <p className="text-sm text-gray-400">سيتم الانتقال للخطوة التالية...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
