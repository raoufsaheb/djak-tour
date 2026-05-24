import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ChevronLeft, Users, Wallet, AlertCircle, ArrowRight } from 'lucide-react';

const MEMBERS_OPTIONS = [3, 4, 5, 6, 8, 10, 12];

export function CreateJamiyaScreen() {
  const { setDraftGroup, setCurrentScreen } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    monthlyAmount: '',
    maxMembers: 6,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'اسم الغروب مطلوب';
    } else if (formData.name.length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.monthlyAmount) {
      newErrors.monthlyAmount = 'السعر مطلوب';
    } else {
      const amount = parseInt(formData.monthlyAmount);
      if (isNaN(amount) || amount < 1000) {
        newErrors.monthlyAmount = 'السعر يجب أن يكون 1000 دج على الأقل';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    setDraftGroup({
      name: formData.name.trim(),
      monthlyAmount: parseInt(formData.monthlyAmount),
      maxMembers: formData.maxMembers,
      duration: formData.maxMembers,
      description: '',
      ficheUploaded: false,
      paymentCompleted: false,
    });
    setCurrentScreen('create_group_fiche');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-8"
    >
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">إنشاء غروب جديد</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-white" />
          <div className="flex-1 h-2 rounded-full bg-white/30" />
          <div className="flex-1 h-2 rounded-full bg-white/30" />
          <div className="flex-1 h-2 rounded-full bg-white/30" />
        </div>
        <p className="text-white/80 text-sm mt-2">الخطوة 1 من 4 — معلومات الغروب</p>
      </div>

      <div className="p-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-6 shadow-sm space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الغروب</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="مثال: غروب الأصدقاء"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">السعر الشهري (دج)</label>
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
                } focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20 outline-none`}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأشخاص</label>
            <div className="relative">
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={formData.maxMembers}
                onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B5E20] outline-none appearance-none bg-white"
              >
                {MEMBERS_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m} أشخاص</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full mt-2 bg-[#1B5E20] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <span>التالي — رفع Fiche de paie</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
