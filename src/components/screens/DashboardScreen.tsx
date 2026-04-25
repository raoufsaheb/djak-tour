import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  Wallet, 
  Users, 
  TrendingUp, 
  Bell, 
  ChevronLeft,
  Shield,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';
import { formatCurrency, getJamiyaStatusText, getJamiyaStatusColor, getKYCStatusText } from '@/data/mockData';
import type { Jamiya } from '@/types';

export function DashboardScreen() {
  const { 
    currentUser, 
    getAvailableJamiyas, 
    getUserActiveMemberships,
    getUnreadNotifications,
    setCurrentScreen, 
    setSelectedJamiya 
  } = useStore();

  useEffect(() => {
    // التحقق من صلاحية الحجوزات
    // checkBookingExpiry();
  }, []);

  if (!currentUser) return null;

  const availableJamiyas = getAvailableJamiyas();
  const activeMemberships = getUserActiveMemberships(currentUser.id);
  const unreadCount = getUnreadNotifications(currentUser.id).length;

  const handleJamiyaClick = (jamiya: Jamiya) => {
    setSelectedJamiya(jamiya);
    setCurrentScreen('jamiya_details');
  };

  const handleCreateJamiya = () => {
    setCurrentScreen('create_jamiya');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {currentUser.fullName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-white/80 text-sm">مرحباً</p>
              <h2 className="text-white font-bold">{currentUser.fullName}</h2>
            </div>
          </div>
          <button 
            onClick={() => setCurrentScreen('notifications')}
            className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C62828] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* بطاقة الإجمالي */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#1B5E20]" />
              <span className="text-gray-600 text-sm">إجمالي الادخار</span>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              currentUser.kycStatus === 'verified'
                ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                : currentUser.kycStatus === 'pending'
                ? 'bg-[#F57C00]/10 text-[#F57C00]'
                : 'bg-[#C62828]/10 text-[#C62828]'
            }`}>
              {currentUser.kycStatus === 'verified' ? (
                <Shield className="w-3 h-3" />
              ) : currentUser.kycStatus === 'pending' ? (
                <Clock className="w-3 h-3" />
              ) : (
                <AlertCircle className="w-3 h-3" />
              )}
              <span>{getKYCStatusText(currentUser.kycStatus)}</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(currentUser.totalSavings)}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-[#2E7D32] text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
            <span className="text-gray-400 text-sm">من الشهر الماضي</span>
          </div>
        </motion.div>
      </div>

      {/* المحتوى */}
      <div className="p-4 space-y-6">
        {/* العضويات النشطة */}
        {activeMemberships.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">عضوياتك النشطة</h3>
              <button 
                onClick={() => setCurrentScreen('active_membership')}
                className="text-[#0D47A1] text-sm font-medium flex items-center gap-1"
              >
                <span>عرض الكل</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {activeMemberships.slice(0, 2).map((membership, index) => (
                <motion.div
                  key={membership.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setCurrentScreen('active_membership')}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800">{membership.jamiyaName}</h4>
                      <p className="text-sm text-gray-500">
                        الدورة {membership.currentCycle} من {membership.totalCycles}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[#1B5E20]">
                        {formatCurrency(membership.monthlyAmount)}
                      </p>
                      <p className="text-xs text-gray-400">شهرياً</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        membership.hasPaidThisCycle ? 'bg-[#2E7D32]' : 'bg-[#F57C00]'
                      }`} />
                      <span className={`text-sm ${
                        membership.hasPaidThisCycle ? 'text-[#2E7D32]' : 'text-[#F57C00]'
                      }`}>
                        {membership.hasPaidThisCycle ? 'تم الدفع' : 'في انتظار الدفع'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      ترتيبك: {membership.position}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* الجمعيات المتاحة */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">جمعيات متاحة لك</h3>
            <button className="text-[#0D47A1] text-sm font-medium flex items-center gap-1">
              <span>عرض الكل</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {availableJamiyas.length > 0 ? (
            <div className="space-y-3">
              {availableJamiyas.slice(0, 3).map((jamiya, index) => (
                <motion.div
                  key={jamiya.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => handleJamiyaClick(jamiya)}
                  className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800">{jamiya.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{jamiya.description}</p>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getJamiyaStatusColor(jamiya.status)}20`,
                        color: getJamiyaStatusColor(jamiya.status)
                      }}
                    >
                      {getJamiyaStatusText(jamiya.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Wallet className="w-4 h-4" />
                        <span>{formatCurrency(jamiya.monthlyAmount)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{jamiya.currentMembers}/{jamiya.maxMembers}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {jamiya.duration} أشهر
                    </span>
                  </div>

                  {/* شريط التقدم */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">نسبة الاكتمال</span>
                      <span className="font-medium">{jamiya.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${jamiya.progress}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="h-full bg-[#1B5E20] rounded-full"
                      />
                    </div>
                  </div>

                  {/* زر الحجز */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJamiyaClick(jamiya);
                    }}
                    className="w-full mt-3 bg-[#1B5E20] text-white py-2 rounded-lg font-medium text-sm hover:bg-[#2E7D32] transition-colors"
                  >
                    احجز مكانك
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">لا توجد جمعيات متاحة حالياً</p>
              <button 
                onClick={handleCreateJamiya}
                className="inline-flex items-center gap-2 text-[#0D47A1] font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>إنشاء جمعية جديدة</span>
              </button>
            </div>
          )}
        </section>

        {/* إحصائيات سريعة */}
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-4">إحصائياتك</h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-4"
            >
              <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#1B5E20]" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{activeMemberships.length}</p>
              <p className="text-sm text-gray-500">جمعيات نشطة</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-4"
            >
              <div className="w-10 h-10 bg-[#0D47A1]/10 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-[#0D47A1]" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(currentUser.totalSavings * 0.12)}
              </p>
              <p className="text-sm text-gray-500">العائد المتوقع</p>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
