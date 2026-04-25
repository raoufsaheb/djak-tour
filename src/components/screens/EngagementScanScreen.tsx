import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ChevronLeft, FileSignature, Info, AlertTriangle, FileCheck } from 'lucide-react';
import { CameraScanMock } from '@/components/common/CameraScanMock';

export function EngagementScanScreen() {
  const { setCurrentScreen } = useStore();
  const [showCamera, setShowCamera] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleCapture = () => {
    setShowCamera(false);
    setIsScanned(true);
    setTimeout(() => {
      setCurrentScreen('sorting');
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
            title="تصوير وثيقة الالتزام"
            subtitle="Engagement"
            guideText="ضع وثيقة الالتزام الموقعة ضمن الإطار"
            frameColor="#C62828"
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
        <div className="bg-gradient-to-br from-[#C62828] to-[#D32F2F] p-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setCurrentScreen('cheque')}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">توقيع الالتزام</h1>
          </div>
          <p className="text-white/70 text-sm">
            الخطوة 2 من 3 - وثيقة الالتزام
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
                <div className="w-16 h-16 bg-[#C62828]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSignature className="w-8 h-8 text-[#C62828]" />
                </div>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                  وثيقة الالتزام (Engagement)
                </h2>
                <p className="text-gray-500 text-center mb-6">
                  يرجى توقيع وثيقة الالتزام وتصويرها. هذه الوثيقة تؤكد التزامك بالمساهمات الشهرية.
                </p>

                {/* محتوى الوثيقة */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="w-5 h-5 text-[#C62828]" />
                    <h3 className="font-bold text-gray-800 text-sm">محتويات الوثيقة:</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>أنا الموقع أدناه، أقر وأتعهد بما يلي:</p>
                    <ol className="space-y-1 mr-4 list-decimal">
                      <li>الالتزام بالمساهمة الشهرية المحددة في موعدها</li>
                      <li>عدم الانسحاب من الجمعية إلا بموافقة الجميع</li>
                      <li>استلام الدور في التاريخ المحدد</li>
                      <li>تحمل المسؤولية في حالة التأخر أو الامتناع</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-[#C62828]/5 rounded-xl p-4 space-y-3 mb-6">
                  <h3 className="font-bold text-[#C62828] text-sm">متطلبات الوثيقة:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
                      <span>توقيعك الخاص على الوثيقة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
                      <span>الاسم الكامل واضحاً</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
                      <span>تاريخ التوقيع</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
                      <span>تأكد من وضوح التوقيع</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full bg-[#C62828] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#D32F2F] transition-colors flex items-center justify-center gap-2"
                >
                  <FileSignature className="w-5 h-5" />
                  تصوير وثيقة الالتزام
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
                  <p className="text-amber-800 text-sm font-medium mb-1">إلتزام قانوني</p>
                  <p className="text-amber-700 text-xs">
                    وثيقة الالتزام وثيقة قانونية ملزمة. في حالة الإخلال بالتزاماتك، يحق للمنصة اتخاذ الإجراءات القانونية المناسبة.
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
              <h2 className="text-xl font-bold text-gray-800 mb-2">تم استلام الوثيقة</h2>
              <p className="text-gray-500 mb-4">
                تم تصوير وثيقة الالتزام بنجاح.
              </p>
              <p className="text-sm text-gray-400">جاري الانتقال لمرحلة الفرز...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
