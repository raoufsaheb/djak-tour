import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ArrowRight, Globe, EyeOff, Users, Wallet, CheckCircle, Clock } from 'lucide-react';
import { formatCurrency } from '@/data/mockData';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function CreateGroupPublishScreen() {
  const {
    draftGroup,
    currentUser,
    createJamiya,
    clearDraftGroup,
    setCurrentScreen,
  } = useStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  if (!draftGroup?.paymentCompleted) {
    setCurrentScreen('create_group_payment');
    return null;
  }

  const submitGroup = async (asDraft: boolean) => {
    if (!currentUser) return;
    setIsPublishing(true);
    setShowReviewDialog(false);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    createJamiya({
      name: draftGroup.name,
      monthlyAmount: draftGroup.monthlyAmount,
      maxMembers: draftGroup.maxMembers,
      duration: draftGroup.duration,
      description: draftGroup.description || `غروب ${draftGroup.name}`,
      incomeLevel: currentUser.incomeLevel,
      status: 'under_review',
    });

    setIsPublishing(false);
    setPublished(asDraft);
    clearDraftGroup();
  };

  if (published) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-sm">
          <div className="w-20 h-20 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#2E7D32]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {published ? 'تم حفظ المسودة' : 'تم إرسال الطلب'}
          </h2>
          <p className="text-gray-500 mb-6">
            {published
              ? 'تم حفظ غروبك كمسودة. يمكنك إكمال النشر لاحقاً من الصفحة الرئيسية.'
              : 'غروبك قيد المراجعة وسيتم نشره عند الموافقة من الإدارة. سيتم إشعارك عند القبول.'}
          </p>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-[#1B5E20] text-white py-3 rounded-xl font-bold"
          >
            العودة للرئيسية
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pb-8"
    >
      <div className="bg-gradient-to-br from-[#7C4DFF] to-[#651FFF] p-6 pb-8">
        <button
          onClick={() => setCurrentScreen('create_group_payment')}
          className="text-white/80 hover:text-white flex items-center gap-1 mb-4"
        >
          <ArrowRight className="w-5 h-5" />
          <span>رجوع</span>
        </button>
        <h1 className="text-2xl font-bold text-white">نشر الغروب</h1>
        <p className="text-white/80 mt-1">الخطوة 4 من 4</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">ملخص نهائي</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">اسم الغروب</p>
                <p className="font-bold">{draftGroup.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">السعر الشهري</p>
                <p className="font-bold">{formatCurrency(draftGroup.monthlyAmount)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">عدد الأشخاص</p>
                <p className="font-bold">{draftGroup.maxMembers} عضو</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm text-center px-2">
          عند النشر، يمر الغروب بمراجعة الإدارة قبل ظهوره للجميع.
        </p>

        <button
          onClick={() => setShowReviewDialog(true)}
          disabled={isPublishing}
          className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Globe className="w-5 h-5" />
          <span>نشر الغروب</span>
        </button>

        <button
          onClick={() => submitGroup(true)}
          disabled={isPublishing}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <EyeOff className="w-5 h-5" />
          <span>حفظ كمسودة (بدون نشر)</span>
        </button>
      </div>

      <AlertDialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <AlertDialogContent className="max-w-sm rounded-2xl" dir="rtl">
          <AlertDialogHeader className="text-right sm:text-right">
            <div className="w-14 h-14 bg-[#F57C00]/10 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-7 h-7 text-[#F57C00]" />
            </div>
            <AlertDialogTitle className="text-xl font-bold">
              الغروب قيد المراجعة
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base leading-relaxed">
              تم استلام طلب نشر غروب «{draftGroup.name}». الغروب قيد المراجعة
              وسيتم نشره عند الموافقة من الإدارة. سيتم إشعارك فور القبول.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => submitGroup(false)}
              className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] rounded-xl font-bold"
            >
              حسناً، فهمت
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
