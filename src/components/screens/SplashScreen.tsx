import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SplashScreen() {
  const { setCurrentScreen, isAuthenticated } = useStore();

  useEffect(() => {
    // الانتقال بعد ثانيتين
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setCurrentScreen('dashboard');
      } else {
        setCurrentScreen('login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, setCurrentScreen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* دوائر خلفية متحركة */}
      <motion.div
        className="absolute w-96 h-96 rounded-full border border-white/10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-white/10"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-white/10"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-col items-center">
        {/* الشعار */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-8"
        >
          <motion.img
            src="/logo.jpg"
            alt="DJAK-TOUR Logo"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-20 h-20 object-contain"
          />
        </motion.div>

        {/* اسم التطبيق */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold text-white mb-4 tracking-wide"
        >
          DJAK-TOUR
        </motion.h1>

        {/* الشعار */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-white/90 font-medium"
        >
          جاك التور
        </motion.p>

        {/* مؤشر التحميل */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-2"
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>
      </div>

      {/* النص السفلي */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-white/60 text-sm"
      >
        DJAK-TOUR
      </motion.p>
    </motion.div>
  );
}
