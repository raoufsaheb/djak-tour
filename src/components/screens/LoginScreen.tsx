import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Phone, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export function LoginScreen() {
  const { login, setCurrentScreen, setError, error } = useStore();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fullPhone = `+213${phone}`;
    const success = login(fullPhone, password);

    if (success) {
      setCurrentScreen('dashboard');
    } else {
      setError('رقم الهاتف أو كلمة المرور غير صحيحة');
    }

    setIsLoading(false);
  };

  const handleRegisterClick = () => {
    setCurrentScreen('register');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex flex-col"
    >
      {/* الرأس */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-6"
        >
          <img src="/logo.jpg" alt="DJAK-TOUR Logo" className="w-16 h-16 object-contain" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-2"
        >
          تسجيل الدخول
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80"
        >
          مرحباً بك مجدداً في DJAK-TOUR
        </motion.p>
      </div>

      {/* نموذج تسجيل الدخول */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        className="bg-white rounded-t-3xl p-6 pb-8"
      >
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* حقل رقم الهاتف */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              رقم الهاتف
            </label>
            <div className="relative">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+213</span>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                placeholder="550 12 34 56"
                className="w-full pr-28 pl-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right"
                dir="ltr"
              />
            </div>
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full pr-12 pl-12 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* رابط نسيت كلمة المرور */}
          <div className="text-left">
            <button
              type="button"
              className="text-[#0D47A1] text-sm font-medium hover:underline"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* زر تسجيل الدخول */}
          <motion.button
            type="submit"
            disabled={isLoading || !phone || !password}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1B5E20]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <>
                <span>تسجيل الدخول</span>
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* رابط إنشاء حساب */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ليس لديك حساب؟{' '}
            <button
              onClick={handleRegisterClick}
              className="text-[#1B5E20] font-bold hover:underline"
            >
              سجل الآن
            </button>
          </p>
        </div>

        {/* بيانات تجريبية */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 text-center mb-2">بيانات تجريبية للدخول:</p>
          <div className="text-xs text-gray-600 text-center">
            <p>رقم الهاتف: +213550123456</p>
            <p>كلمة المرور: Ahmed123!</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
