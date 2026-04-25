import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  Shield,
  Wallet,
  LogOut,
  ChevronLeft,
  Edit3,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { formatCurrency, getKYCStatusText, getIncomeLevelText } from '@/data/mockData';

export function ProfileScreen() {
  const { currentUser, logout, setCurrentScreen } = useStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!currentUser) {
    setCurrentScreen('login');
    return null;
  }

  const handleLogout = () => {
    logout();
    setCurrentScreen('login');
  };

  const getKYCIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-[#2E7D32]" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-[#F57C00]" />;
      default:
        return <AlertCircle className="w-5 h-5 text-[#C62828]" />;
    }
  };

  const getKYCColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-[#2E7D32] bg-[#2E7D32]/10';
      case 'pending':
        return 'text-[#F57C00] bg-[#F57C00]/10';
      default:
        return 'text-[#C62828] bg-[#C62828]/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="text-white/80 hover:text-white flex items-center gap-1"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>
          <h1 className="text-xl font-bold text-white">حسابي</h1>
          <button className="text-white/80 hover:text-white">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* معلومات المستخدم */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {currentUser.fullName.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{currentUser.fullName}</h2>
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mt-2 ${getKYCColor(currentUser.kycStatus)}`}>
              {getKYCIcon(currentUser.kycStatus)}
              <span>{getKYCStatusText(currentUser.kycStatus)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-4 -mt-6 space-y-4">
        {/* بطاقة الإجمالي */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#1B5E20]" />
            </div>
            <span className="text-gray-600">إجمالي الادخار</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(currentUser.totalSavings)}
          </p>
        </motion.div>

        {/* معلومات الاتصال */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4">معلومات الاتصال</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">رقم الهاتف</p>
                <p className="font-medium text-gray-800" dir="ltr">
                  {currentUser.phone}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-medium text-gray-800" dir="ltr">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* معلومات إضافية */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4">معلومات إضافية</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">مستوى الدخل</p>
                <p className="font-medium text-gray-800">
                  {getIncomeLevelText(currentUser.incomeLevel)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">حالة الحساب</p>
                <p className="font-medium text-gray-800">
                  {currentUser.isVerified ? 'موثق' : 'غير موثق'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* الإعدادات */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl overflow-hidden"
        >
          <button
            onClick={() => currentUser.kycStatus !== 'verified' && setCurrentScreen('kyc')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#1B5E20]" />
              </div>
              <span className="font-medium text-gray-800">التحقق من الهوية</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${
                currentUser.kycStatus === 'verified' ? 'text-[#2E7D32]' : 'text-[#F57C00]'
              }`}>
                {getKYCStatusText(currentUser.kycStatus)}
              </span>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </motion.div>

        {/* تسجيل الخروج */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full bg-[#C62828]/10 text-[#C62828] py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </motion.div>
      </div>

      {/* تأكيد تسجيل الخروج */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
          >
            <div className="w-16 h-16 bg-[#C62828]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-[#C62828]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              تسجيل الخروج
            </h3>
            <p className="text-gray-500 text-center mb-6">
              هل أنت متأكد من رغبتك في تسجيل الخروج؟
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-[#C62828] text-white rounded-xl font-bold"
              >
                تسجيل الخروج
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
