import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Phone, Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, Users, ChevronDown } from 'lucide-react';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { INCOME_LEVELS } from '@/types';

export function RegisterScreen() {
  const { registerUser, setCurrentScreen, setError, error } = useStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    incomeLevel: 'medium' as keyof typeof INCOME_LEVELS,
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // التحقق من قوة كلمة المرور
  const getPasswordStrength = (password: string): { strength: number; text: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const texts = ['ضعيفة', 'متوسطة', 'جيدة', 'قوية'];
    return { strength, text: texts[strength - 1] || 'ضعيفة جداً' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateStep1 = () => {
    if (formData.phone.length !== 9) {
      setError('رقم الهاتف يجب أن يكون 9 أرقام');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('البريد الإلكتروني غير صالح');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError('كلمة المرور يجب أن تحتوي على حرف كبير');
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError('كلمة المرور يجب أن تحتوي على رقم');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.fullName.trim()) {
      setError('الاسم الكامل مطلوب');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('يجب الموافقة على الشروط والأحكام');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser = registerUser({
      phone: `+213${formData.phone}`,
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      incomeLevel: formData.incomeLevel,
    });

    if (newUser) {
      setCurrentScreen('otp');
    } else {
      setError('حدث خطأ أثناء إنشاء الحساب');
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    } else {
      setCurrentScreen('login');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            s === step
              ? 'bg-[#1B5E20] text-white'
              : s < step
              ? 'bg-[#2E7D32] text-white'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {s < step ? '✓' : s}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-8">
        <button
          onClick={handleBack}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">إنشاء حساب</h1>
            <p className="text-white/80 text-sm">خطوة {step} من 3</p>
          </div>
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex-1 p-6 -mt-4 bg-white rounded-t-3xl">
        {renderStepIndicator()}

        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </div>
        )}

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {step === 1 && (
            <>
              {/* رقم الهاتف */}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 9) })}
                    placeholder="550 12 34 56"
                    className="w-full pr-28 pl-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right"
                    dir="ltr"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* كلمة المرور */}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                
                {/* مؤشر قوة كلمة المرور */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.strength === 1
                              ? 'bg-[#C62828] w-1/4'
                              : passwordStrength.strength === 2
                              ? 'bg-[#F57C00] w-2/4'
                              : passwordStrength.strength === 3
                              ? 'bg-[#0D47A1] w-3/4'
                              : 'bg-[#2E7D32] w-full'
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{passwordStrength.text}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      8 أحرف على الأقل، حرف كبير، رقم
                    </p>
                  </div>
                )}
              </div>

              {/* تأكيد كلمة المرور */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="********"
                    className="w-full pr-12 pl-12 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-[#C62828] mt-1">كلمتا المرور غير متطابقتين</p>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* الاسم الكامل */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="أحمد محمد قادر"
                  className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right"
                />
              </div>

              {/* مستوى الدخل */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  مستوى الدخل الشهري
                </label>
                <div className="relative">
                  <select
                    value={formData.incomeLevel}
                    onChange={(e) => setFormData({ ...formData, incomeLevel: e.target.value as keyof typeof INCOME_LEVELS })}
                    className="w-full px-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-all text-right appearance-none"
                  >
                    {Object.entries(INCOME_LEVELS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* الموافقة على الشروط */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#1B5E20] focus:ring-[#1B5E20]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  أوافق على{' '}
                  <button type="button" className="text-[#0D47A1] hover:underline">
                    الشروط والأحكام
                  </button>{' '}
                  و{' '}
                  <button type="button" className="text-[#0D47A1] hover:underline">
                    سياسة الخصوصية
                  </button>
                </label>
              </div>
            </>
          )}
        </motion.div>

        {/* زر التالي */}
        <motion.button
          onClick={handleNext}
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1B5E20]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <motion.div
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              <span>{step === 3 ? 'إنشاء الحساب' : 'التالي'}</span>
              <ArrowLeft className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
