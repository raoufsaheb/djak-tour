import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { 
  ArrowRight, 
  Bell, 
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  CheckCheck
} from 'lucide-react';
import { formatDate, formatTime } from '@/data/mockData';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-[#2E7D32]" />;
    case 'warning':
      return <Clock className="w-5 h-5 text-[#F57C00]" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-[#C62828]" />;
    case 'info':
    default:
      return <Info className="w-5 h-5 text-[#0D47A1]" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-[#2E7D32]/10 border-[#2E7D32]/20';
    case 'warning':
      return 'bg-[#F57C00]/10 border-[#F57C00]/20';
    case 'error':
      return 'bg-[#C62828]/10 border-[#C62828]/20';
    case 'info':
    default:
      return 'bg-[#0D47A1]/10 border-[#0D47A1]/20';
  }
};

export function NotificationsScreen() {
  const { 
    currentUser, 
    getUserNotifications, 
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotifications,
    setCurrentScreen 
  } = useStore();

  if (!currentUser) {
    setCurrentScreen('login');
    return null;
  }

  const notifications = getUserNotifications(currentUser.id);
  const unreadCount = getUnreadNotifications(currentUser.id).length;

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead(currentUser.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pb-24"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="text-white/80 hover:text-white flex items-center gap-1"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>
          <h1 className="text-xl font-bold text-white">الإشعارات</h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-white/80 hover:text-white flex items-center gap-1"
            >
              <CheckCheck className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ملخص */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">عندك</p>
              <p className="text-white text-xl font-bold">
                {unreadCount} إشعارات جديدة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة الإشعارات */}
      <div className="p-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => markNotificationAsRead(notification.id)}
              className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                notification.isRead
                  ? 'bg-white border-gray-100'
                  : getNotificationColor(notification.type)
              }`}
            >
              {!notification.isRead && (
                <div className="absolute top-4 left-4 w-2 h-2 bg-[#1B5E20] rounded-full" />
              )}
              
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  notification.isRead ? 'bg-gray-100' : 'bg-white/50'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 pr-2">
                  <p className={`font-bold ${
                    notification.isRead ? 'text-gray-700' : 'text-gray-800'
                  }`}>
                    {notification.title}
                  </p>
                  <p className={`text-sm mt-1 ${
                    notification.isRead ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatDate(notification.createdAt)} - {formatTime(notification.createdAt)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500">لا توجد إشعارات</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
