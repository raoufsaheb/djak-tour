import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Camera, User, CheckCircle, Clock, ArrowRight, ScanLine } from 'lucide-react';
import { CameraScanMock } from '@/components/common/CameraScanMock';

export function KYCScreen() {
  const { currentUser, updateKYC, setCurrentScreen } = useStore();
  const [step, setStep] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [idCardScanned, setIdCardScanned] = useState(false);
  const [selfieScanned, setSelfieScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleIdCardCapture = () => {
    setShowCamera(false);
    setIdCardScanned(true);
  };

  const handleSelfieCapture = () => {
    setShowCamera(false);
    setSelfieScanned(true);
  };

  const handleContinue = () => {
    if (step === 1 && idCardScanned) {
      // بعد مسح بطاقة الهوية، ننتقل لكشف الراتب أولاً ثم السيلفي
      setStep(2);
    } else if (step === 2 && selfieScanned) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    updateKYC('id_card_scanned', 'selfie_scanned');
    setIsProcessing(false);
    setIsComplete(true);
    setTimeout(() => {
      setCurrentScreen('fiche_paie');
    }, 2000);
  };

  const handleSkip = () => {
    setCurrentScreen('dashboard');
  };

  // إذا كان المستخدم موثق بالفعل
  if (currentUser?.kycStatus === 'verified') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-[#2E7D32]" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">الحساب موثق</h1>
        <p className="text-gray-500 text-center mb-8">تم التحقق من هويتك بنجاح</p>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold"
        >
          الذهاب للوحة التحكم
        </button>
      </motion.div>
    );
  }

  // إذا كان قيد المراجعة
  if (currentUser?.kycStatus === 'pending') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-[#F57C00]/10 rounded-full flex items-center justify-center mb-6"
        >
          <Clock className="w-12 h-12 text-[#F57C00]" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">قيد المراجعة</h1>
        <p className="text-gray-500 text-center mb-8">
          جاري مراجعة مستنداتك، سيتم إشعارك عند الانتهاء
        </p>
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="bg-[#1B5E20] text-white px-8 py-3 rounded-xl font-bold"
        >
          الذهاب للوحة التحكم
        </button>
      </motion.div>
    );
  }

  // إذا اكتمل التحقق
  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-[#2E7D32]" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">تم إرسال المستندات</h1>
        <p className="text-gray-500 text-center mb-8">
          جاري مراجعة مستنداتك، سيتم إشعارك عند الانتهاء
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
    <>
      <AnimatePresence>
        {showCamera && (
          <CameraScanMock
            title={step === 1 ? 'تصوير بطاقة التعريف' : 'التقاط صورة شخصية'}
            subtitle={step === 1 ? 'ID Card Scan' : 'Selfie Capture'}
            guideText={
              step === 1
                ? 'ضع بطاقة التعريف ضمن الإطار وتأكد من وضوح جميع البيانات'
                : 'ضع وجهك داخل الإطار وانظر مباشرة للكاميرا'
            }
            frameColor={step === 1 ? '#1B5E20' : '#0D47A1'}
            onCapture={step === 1 ? handleIdCardCapture : handleSelfieCapture}
            onCancel={() => setShowCamera(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white flex flex-col"
      >
        {/* الرأس */}
        <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-12">
          <h1 className="text-2xl font-bold text-white text-center">التحقق من الهوية</h1>
          <p className="text-white/80 text-center mt-2">
            خطوة {step} من 2
          </p>
        </div>

        {/* المحتوى */}
        <div className="flex-1 p-6 -mt-6 bg-white rounded-t-3xl">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ScanLine className="w-8 h-8 text-[#1B5E20]" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">بطاقة التعريف الوطنية</h2>
                <p className="text-gray-500 text-sm">
                  قم بتصوير بطاقة التعريف الوطنية باستخدام الكاميرا
                </p>
              </div>

              {/* منطقة المسح */}
              <div
                onClick={() => !idCardScanned && setShowCamera(true)}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  idCardScanned
                    ? 'border-[#1B5E20] bg-[#1B5E20]/5'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
              >
                {idCardScanned ? (
                  <div className="space-y-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-[#2E7D32]/20 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle className="w-8 h-8 text-[#2E7D32]" />
                    </motion.div>
                    <p className="text-[#2E7D32] font-medium">تم المسح بنجاح</p>
                    <p className="text-gray-400 text-xs">بطاقة التعريف الوطنية</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">اضغط للتصوير</p>
                      <p className="text-gray-400 text-sm mt-1">سيتم فتح الكاميرا</p>
                    </div>
                  </div>
                )}
              </div>

              {/* متطلبات الصورة */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">متطلبات المسح:</p>
                <ul className="space-y-1 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>صورة واضحة وغير مشوشة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>جميع الزوايا مرئية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>الإضاءة جيدة</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0D47A1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-[#0D47A1]" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">صورة شخصية (سيلفي)</h2>
                <p className="text-gray-500 text-sm">
                  قم بالتقاط صورة سيلفي واضحة لوجهك
                </p>
              </div>

              {/* منطقة المسح */}
              <div
                onClick={() => !selfieScanned && setShowCamera(true)}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  selfieScanned
                    ? 'border-[#0D47A1] bg-[#0D47A1]/5'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
              >
                {selfieScanned ? (
                  <div className="space-y-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-[#2E7D32]/20 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle className="w-8 h-8 text-[#2E7D32]" />
                    </motion.div>
                    <p className="text-[#2E7D32] font-medium">تم المسح بنجاح</p>
                    <p className="text-gray-400 text-xs">الصورة الشخصية</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">اضغط للتصوير</p>
                      <p className="text-gray-400 text-sm mt-1">سيتم فتح الكاميرا</p>
                    </div>
                  </div>
                )}
              </div>

              {/* متطلبات الصورة */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">متطلبات المسح:</p>
                <ul className="space-y-1 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>الوجه واضح ومضاء جيداً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>بدون نظارات شمسية</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                    <span>خلفية بسيطة</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* أزرار التنقل */}
          <div className="mt-8 space-y-3">
            <motion.button
              onClick={handleContinue}
              disabled={isProcessing || (step === 1 ? !idCardScanned : !selfieScanned)}
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
                  <span>{step === 1 ? 'التالي' : 'إرسال للمراجعة'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {step === 1 && (
              <button onClick={handleSkip} className="w-full text-gray-500 font-medium py-2">
                تخطي الآن
              </button>
            )}

            {step === 2 && (
              <button onClick={() => setStep(1)} className="w-full text-gray-500 font-medium py-2">
                رجوع
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
