import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  Users, 
  Wallet, 
  Calendar, 
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';
import type { IncomeLevel } from '@/types';

const INCOME_LEVELS: { value: IncomeLevel; label: string }[] = [
  { value: 'low', label: 'أقل من 50,000 دج' },
  { value: 'medium', label: '50,000 - 100,000 دج' },
  { value: 'high', label: '100,000 - 200,000 دج' },
  { value: 'very_high', label: '200,000+ دج' },
];

const DURATION_OPTIONS = [3, 4, 5, 6, 8, 10, 12];
const MEMBERS_OPTIONS = [3, 4, 5, 6, 8, 10, 12];

export function CreateJamiyaScreen() {
  const { currentUser, createJamiya, setCurrentScreen } = useStore();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    monthlyAmount: '',
    duration: 6,
    maxMembers: 6,
    incomeLevel: currentUser?.incomeLevel || 'medium',
    description: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'اسم الجمعية مطلوب';
    } else if (formData.name.length < 3) {
      newErrors.name = 'اسم الجمعية يجب أن يكون 3 أحرف على الأقل';
    }
    
    if (!formData.monthlyAmount) {
      newErrors.monthlyAmount = 'المبلغ الشهري مطلوب';
    } else {
      const amount = parseInt(formData.monthlyAmount);
      if (isNaN(amount) || amount < 1000) {
        newErrors.monthlyAmount = 'المبلغ يجب أن يكون 1000 دج على الأقل';
      } else if (amount > 500000) {
        newErrors.monthlyAmount = 'المبلغ يجب أن لا يتجاوز 500,000 دج';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'وصف الجمعية مطلوب';
    } else if (formData.description.length < 10) {
      newErrors.description = 'الوصف يجب أن يكون 10 أحرف على الأقل';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const jamiya = createJamiya({
      name: formData.name,
      monthlyAmount: parseInt(formData.monthlyAmount),
      duration: formData.duration,
      maxMembers: formData.maxMembers,
      incomeLevel: formData.incomeLevel,
      description: formData.description,
    });
    
    setIsSubmitting(false);
    
    if (jamiya) {
      setShowSuccess(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-[#7C4DFF]/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-[#7C4DFF]" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            تم إنشاء الجمعية!
          </h2>
          <p className="text-gray-500 mb-6">
            تم إنشاء جمعية "{formData.name}" بنجاح وهي الآن قيد المراجعة. سيتم إخطارك بمجرد الموافقة عليها.
          </p>
          
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-[#1B5E20] text-white py-3 rounded-xl font-medium hover:bg-[#2E7D32] transition-colors"
          >
            العودة للرئيسية
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
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
            onClick={handleBack}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">إنشاء جمعية جديدة</h1>
        </div>
        
        {/* مؤشر الخطوات */}
        <div className="flex items-center gap-2">
          <div className={`flex-1 h-2 rounded-full transition-colors ${
            step >= 1 ? 'bg-white' : 'bg-white/30'
          }`} />
          <div className={`flex-1 h-2 rounded-full transition-colors ${
            step >= 2 ? 'bg-white' : 'bg-white/30'
          }`} />
        </div>
        <p className="text-white/80 text-sm mt-2">
          الخطوة {step} من 2
        </p>
      </div>

      {/* النموذج */}
      <div className="p-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الجمعية
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="مثال: جمعية الأصدقاء"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none transition-all`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المبلغ الشهري (دج)
                </label>
                <div className="relative">
                  <Wallet className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.monthlyAmount}
                    onChange={(e) => {
                      setFormData({ ...formData, monthlyAmount: e.target.value });
                      if (errors.monthlyAmount) setErrors({ ...errors, monthlyAmount: '' });
                    }}
                    placeholder="مثال: 25000"
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
                      errors.monthlyAmount ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none transition-all`}
                  />
                </div>
                {errors.monthlyAmount && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.monthlyAmount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مدة الجمعية (شهور)
                </label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none transition-all appearance-none bg-white"
                  >
                    {DURATION_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d} أشهر</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد الأعضاء
                </label>
                <div className="relative">
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none transition-all appearance-none bg-white"
                  >
                    {MEMBERS_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m} أعضاء</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مستوى الدخل المناسب
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INCOME_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setFormData({ ...formData, incomeLevel: level.value })}
                      className={`p-3 rounded-xl border text-sm transition-all ${
                        formData.incomeLevel === level.value
                          ? 'border-[#1B5E20] bg-[#1B5E20]/10 text-[#1B5E20]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف الجمعية
                </label>
                <div className="relative">
                  <FileText className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (errors.description) setErrors({ ...errors, description: '' });
                    }}
                    placeholder="اكتب وصفاً مختصراً للجمعية وأهدافها..."
                    rows={4}
                    className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
                      errors.description ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none transition-all resize-none`}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* ملخص الجمعية */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-gray-800">ملخص الجمعية</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">الاسم:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المبلغ الشهري:</span>
                    <span className="font-medium">{parseInt(formData.monthlyAmount || '0').toLocaleString('ar-DZ')} دج</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المدة:</span>
                    <span className="font-medium">{formData.duration} أشهر</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">عدد الأعضاء:</span>
                    <span className="font-medium">{formData.maxMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المبلغ الإجمالي:</span>
                    <span className="font-medium text-[#1B5E20]">
                      {(parseInt(formData.monthlyAmount || '0') * formData.maxMembers).toLocaleString('ar-DZ')} دج
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#7C4DFF]/10 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#7C4DFF] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  بعد إنشاء الجمعية، ستكون في حالة "قيد المراجعة" حتى يتم التحقق من المعلومات والموافقة عليها.
                </p>
              </div>
            </div>
          )}

          {/* زر التالي */}
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="w-full mt-6 bg-[#1B5E20] text-white py-3 rounded-xl font-medium hover:bg-[#2E7D32] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <span>{step === 1 ? 'التالي' : 'إنشاء الجمعية'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
