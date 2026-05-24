import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ChevronLeft, FileText, Info } from 'lucide-react';
import { CameraScanMock } from '@/components/common/CameraScanMock';

export function CreateGroupFicheScreen() {
  const { draftGroup, setDraftGroup, setCurrentScreen } = useStore();
  const [showCamera, setShowCamera] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  if (!draftGroup?.name) {
    setCurrentScreen('create_jamiya');
    return null;
  }

  const handleCapture = () => {
    setShowCamera(false);
    setIsScanned(true);
    setDraftGroup({ ficheUploaded: true });
    setTimeout(() => {
      setCurrentScreen('create_group_payment');
    }, 1500);
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
            onCancel={() => setShowCamera(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 pb-8"
      >
        <div className="bg-gradient-to-br from-[#0D47A1] to-[#1565C0] p-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setCurrentScreen('create_jamiya')}
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">رفع Fiche de paie</h1>
          </div>
          <p className="text-white/70 text-sm">الخطوة 2 من 4 — {draftGroup.name}</p>
        </div>

        <div className="p-4">
          {!isScanned ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-16 h-16 bg-[#0D47A1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#0D47A1]" />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                كشف الراتب (Fiche de paie)
              </h2>
              <p className="text-gray-500 text-center mb-6 text-sm">
                يرجى تصوير كشف الراتب للتحقق من قدرتك على إدارة هذا الغروب
              </p>

              <div className="bg-[#0D47A1]/5 rounded-xl p-4 space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#0D47A1] flex-shrink-0 mt-0.5" />
                  <span>الاسم الكامل والراتب الصافي واضحان</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#0D47A1] flex-shrink-0 mt-0.5" />
                  <span>تاريخ حديث للكشف</span>
                </div>
              </div>

              <button
                onClick={() => setShowCamera(true)}
                className="w-full bg-[#0D47A1] text-white py-4 rounded-xl font-bold text-lg"
              >
                تصوير كشف الراتب
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">تم رفع الملف</h2>
              <p className="text-gray-500 text-sm">جاري الانتقال لدفع رسوم الاشتراك...</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
