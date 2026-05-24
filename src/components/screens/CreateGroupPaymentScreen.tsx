import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ArrowRight, Building2, CheckCircle, Shield } from 'lucide-react';
import { formatCurrency, CREATE_GROUP_FEE } from '@/data/mockData';

export function CreateGroupPaymentScreen() {
  const { draftGroup, setDraftGroup, setCurrentScreen } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!draftGroup?.ficheUploaded) {
    setCurrentScreen('create_group_fiche');
    return null;
  }

  const handlePay = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDraftGroup({ paymentCompleted: true });
    setIsProcessing(false);
    setCurrentScreen('create_group_publish');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6">
        <button
          onClick={() => setCurrentScreen('create_group_fiche')}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>
        <h1 className="text-2xl font-bold text-white">دفع رسوم الاشتراك</h1>
        <p className="text-white/80 mt-1">الخطوة 3 من 4 — {draftGroup.name}</p>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div className="bg-white rounded-xl p-5">
          <h3 className="font-bold text-gray-800 mb-4">ملخص الغروب</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">الاسم</span>
              <span className="font-medium">{draftGroup.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">السعر الشهري</span>
              <span className="font-medium">{formatCurrency(draftGroup.monthlyAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">عدد الأشخاص</span>
              <span className="font-medium">{draftGroup.maxMembers}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="font-bold text-gray-800">رسوم الإنشاء</span>
              <span className="font-bold text-[#1B5E20]">{formatCurrency(CREATE_GROUP_FEE)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h3 className="font-bold text-gray-800 mb-3">طريقة الدفع</h3>
          <div className="w-full p-4 rounded-xl border-2 border-[#1B5E20] bg-[#1B5E20]/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1B5E20] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-right">
              <p className="font-bold text-gray-800">حساب بريدي (CCP)</p>
              <p className="text-sm text-gray-500">الدفع عبر مكتب البريد</p>
            </div>
            <CheckCircle className="w-6 h-6 text-[#1B5E20]" />
          </div>
        </div>

        <div className="bg-[#1B5E20]/5 rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#1B5E20] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#1B5E20]/90">دفع آمن ومشفّر</p>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <motion.div
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            <>
              <span>دفع {formatCurrency(CREATE_GROUP_FEE)}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
