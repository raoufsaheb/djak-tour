import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  Trophy, 
  Medal, 
  Star,
  Download,
  Share2,
  Home
} from 'lucide-react';
import { formatCurrency } from '@/data/mockData';

export function CompletionScreen() {
  const { currentUser, setCurrentScreen } = useStore();

  // بيانات الاحتفال (يمكن تمريرها كـ props)
  const celebrationData = {
    jamiyaName: 'الصندوق الكبير',
    totalAmount: 1200000,
    duration: 12,
    membersCount: 12,
    commitmentRate: 98,
  };

  useEffect(() => {
    // تأثير الاحتفال
    const timer = setTimeout(() => {
      // يمكن إضافة تأثيرات إضافية
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!currentUser) {
    setCurrentScreen('login');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* تأثيرات الخلفية */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: -10,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 10 : 800,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 text-center">
        {/* الكأس */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-16 h-16 text-[#FFD700]" />
          </motion.div>
        </motion.div>

        {/* العنوان */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-2"
        >
          مبروك! 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-lg mb-8"
        >
          اكتملت جمعية {celebrationData.jamiyaName} بنجاح
        </motion.p>

        {/* الإحصائيات */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-white/80 text-sm mb-1">المبلغ الكلي</p>
              <p className="text-white text-2xl font-bold">
                {formatCurrency(celebrationData.totalAmount)}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">المدة</p>
              <p className="text-white text-2xl font-bold">
                {celebrationData.duration} شهر
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">عدد الأعضاء</p>
              <p className="text-white text-2xl font-bold">
                {celebrationData.membersCount}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">نسبة الالتزام</p>
              <p className="text-white text-2xl font-bold">
                {celebrationData.commitmentRate}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* الشهادة */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Medal className="w-6 h-6 text-[#FFD700]" />
            <Star className="w-5 h-5 text-[#FFD700]" />
            <Medal className="w-6 h-6 text-[#FFD700]" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            شهادة إتمام الجمعية
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            تم منحك هذه الشهادة تقديراً لالتزامك وانتظامك في الدفع
          </p>
          <button className="flex items-center justify-center gap-2 text-[#0D47A1] font-medium mx-auto">
            <Download className="w-5 h-5" />
            <span>تحميل الشهادة</span>
          </button>
        </motion.div>

        {/* الأزرار */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3"
        >
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex-1 bg-white text-[#1B5E20] py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>الرئيسية</span>
          </button>
          <button
            onClick={() => {}}
            className="flex-1 bg-white/20 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span>مشاركة</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
