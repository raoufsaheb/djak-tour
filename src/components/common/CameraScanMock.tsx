import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCw, CheckCircle, ScanLine } from 'lucide-react';

interface CameraScanMockProps {
  title: string;
  subtitle?: string;
  guideText?: string;
  frameColor?: string;
  onCapture: () => void;
  onCancel: () => void;
}

export function CameraScanMock({
  title,
  subtitle = 'ضع المستند ضمن الإطار',
  guideText = 'تأكد من وضوح المستند والإضاءة الجيدة',
  frameColor = '#1B5E20',
  onCapture,
  onCancel,
}: CameraScanMockProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scanLineY, setScanLineY] = useState(0);

  // حركة خط المسح
  useEffect(() => {
    if (isCapturing) {
      const interval = setInterval(() => {
        setScanLineY((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isCapturing]);

  const handleCapture = () => {
    setIsCapturing(true);
    // محاكاة عملية المسح (2-3 ثواني)
    setTimeout(() => {
      setIsCapturing(false);
      setIsSuccess(true);
      // بعد عرض نجاح المسح
      setTimeout(() => {
        onCapture();
      }, 1500);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* شريط العنوان */}
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
        <button
          onClick={onCancel}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="text-center">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
        </div>
        <div className="w-10" />
      </div>

      {/* منطقة الكاميرا */}
      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              {/* خلفية الكاميرا الوهمية */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
                {/* تأثير حبيبات الكاميرا */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                {/* عناصر وهمية في الخلفية */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/10 text-6xl font-bold rotate-45 select-none">
                    CAMERA MOCK
                  </div>
                </div>
              </div>

              {/* إطار المسح */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-sm aspect-[3/4]">
                  {/* زوايا الإطار */}
                  <div
                    className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 rounded-tr-lg"
                    style={{ borderColor: frameColor }}
                  />
                  <div
                    className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 rounded-tl-lg"
                    style={{ borderColor: frameColor }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 rounded-br-lg"
                    style={{ borderColor: frameColor }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 rounded-bl-lg"
                    style={{ borderColor: frameColor }}
                  />

                  {/* خط المسح المتحرك */}
                  {isCapturing && (
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-lg"
                      style={{
                        top: `${scanLineY}%`,
                        boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)',
                      }}
                    >
                      <ScanLine className="w-6 h-6 text-green-400 absolute -right-8 -top-3" />
                    </motion.div>
                  )}

                  {/* نص التوجيه داخل الإطار */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera
                      className="w-16 h-16 mb-4"
                      style={{ color: `${frameColor}60` }}
                    />
                    <p className="text-white/60 text-center text-sm px-4">
                      {guideText}
                    </p>
                  </div>
                </div>
              </div>

              {/* شريط التلميح السفلي */}
              <div className="absolute bottom-32 left-0 right-0 text-center">
                <p className="text-white/50 text-xs">ضع المستند في إضاءة جيدة</p>
              </div>

              {/* زر الالتقاط */}
              <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
                <button
                  onClick={handleCapture}
                  disabled={isCapturing}
                  className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center disabled:opacity-50"
                >
                  <div
                    className="w-16 h-16 rounded-full transition-transform active:scale-90"
                    style={{ backgroundColor: frameColor }}
                  />
                  {isCapturing && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-green-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </button>
              </div>

              {/* تأثير فلاش عند الالتقاط */}
              <AnimatePresence>
                {isCapturing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* شاشة نجاح المسح */
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-2xl font-bold mb-2"
              >
                تم المسح بنجاح
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/60"
              >
                جاري معالجة المستند...
              </motion.p>

              {/* معاينة وهمية للمستند */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 w-48 h-64 bg-white rounded-lg shadow-2xl overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded" />
                  <RefreshCw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
