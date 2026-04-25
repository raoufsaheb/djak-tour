import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Shield, ArrowRight, RefreshCw } from 'lucide-react';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export function OTPScreen() {
  const { verifyOTP, setCurrentScreen, setError, error, currentUser } = useStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // عداد التنازلي
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // التركيز على أول حقل
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // الانتقال للحقل التالي
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // التحقق التلقائي عند اكتمال الرمز
    if (index === 5 && value) {
      const code = [...newOtp.slice(0, 5), value].join('');
      if (code.length === 6) {
        handleVerify(code);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    setError(null);

    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isValid = verifyOTP(code);

    if (isValid) {
      setCurrentScreen('kyc');
    } else {
      setError('رمز التحقق غير صحيح');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }

    setIsLoading(false);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // إظهار رسالة نجاح
    // يمكن إضافة toast هنا
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  // تنسيق رقم الهاتف
  const formatPhone = (phone: string) => {
    if (!phone) return '';
    const masked = phone.slice(-4).padStart(phone.length, '*');
    return masked;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-12">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mt-4">
          التحقق من الهاتف
        </h1>
        <p className="text-white/80 text-center mt-2">
          أدخل رمز التحقق المرسل إلى
        </p>
        <p className="text-white text-center font-medium" dir="ltr">
          {formatPhone(currentUser?.phone || '')}
        </p>
      </div>

      {/* المحتوى */}
      <div className="flex-1 p-6 -mt-6 bg-white rounded-t-3xl">
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* حقول OTP */}
        <div className="flex justify-center gap-2 mb-8">
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isLoading}
              className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all ${
                digit
                  ? 'border-[#1B5E20] bg-[#1B5E20]/5 text-[#1B5E20]'
                  : 'border-gray-200 bg-gray-50 text-gray-800'
              } focus:outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20`}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>

        {/* عداد إعادة الإرسال */}
        <div className="text-center mb-8">
          {!canResend ? (
            <p className="text-gray-500">
              إعادة إرسال الرمز بعد{' '}
              <span className="text-[#F57C00] font-bold">
                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="flex items-center justify-center gap-2 text-[#0D47A1] font-medium mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة إرسال الرمز</span>
            </button>
          )}
        </div>

        {/* الرمز التجريبي */}
        <div className="p-4 bg-[#1B5E20]/5 rounded-xl mb-6">
          <p className="text-sm text-gray-600 text-center">
            الرمز التجريبي: <span className="font-bold text-[#1B5E20]">123456</span>
          </p>
        </div>

        {/* زر التحقق */}
        <motion.button
          onClick={handleSubmit}
          disabled={isLoading || otp.some(d => !d)}
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
              <span>تحقق</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* رجوع */}
        <button
          onClick={() => setCurrentScreen('register')}
          className="w-full mt-4 text-gray-500 font-medium"
        >
          تغيير رقم الهاتف
        </button>
      </div>
    </motion.div>
  );
}
