import { motion } from 'framer-motion';
import { Home, Wallet, Bell, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import type { ScreenType } from '@/types';

interface NavItem {
  id: ScreenType;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'الرئيسية', icon: Home },
  { id: 'transactions', label: 'المعاملات', icon: Wallet },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'profile', label: 'حسابي', icon: User },
];

export function BottomNav() {
  const { currentScreen, setCurrentScreen, getUnreadNotifications, currentUser } = useStore();
  
  const unreadCount = currentUser 
    ? getUnreadNotifications(currentUser.id).length 
    : 0;

  const handleNavClick = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // لا تظهر شريط التنقل في بعض الشاشات
  const hiddenScreens: ScreenType[] = ['splash', 'login', 'register', 'otp', 'kyc', 'booking', 'payment', 'payment_success', 'post_office'];
  if (hiddenScreens.includes(currentScreen)) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-50"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive 
                  ? 'text-[#1B5E20]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.id === 'notifications' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C62828] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-[#1B5E20]' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1 h-1 bg-[#1B5E20] rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
