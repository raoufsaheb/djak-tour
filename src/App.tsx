import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

// الشاشات
import { SplashScreen } from '@/components/screens/SplashScreen';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { RegisterScreen } from '@/components/screens/RegisterScreen';
import { OTPScreen } from '@/components/screens/OTPScreen';
import { KYCScreen } from '@/components/screens/KYCScreen';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { JamiyaDetailsScreen } from '@/components/screens/JamiyaDetailsScreen';
import { BookingScreen } from '@/components/screens/BookingScreen';
import { PaymentSuccessScreen } from '@/components/screens/PaymentSuccessScreen';
import { PostOfficeScreen } from '@/components/screens/PostOfficeScreen';
import { ActiveMembershipScreen } from '@/components/screens/ActiveMembershipScreen';
import { TransactionsScreen } from '@/components/screens/TransactionsScreen';
import { NotificationsScreen } from '@/components/screens/NotificationsScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';
import { CompletionScreen } from '@/components/screens/CompletionScreen';
import { CreateJamiyaScreen } from '@/components/screens/CreateJamiyaScreen';
import { FicheDePaieScreen } from '@/components/screens/FicheDePaieScreen';
import { ChequeScanScreen } from '@/components/screens/ChequeScanScreen';
import { EngagementScanScreen } from '@/components/screens/EngagementScanScreen';
import { SortingScreen } from '@/components/screens/SortingScreen';

// المكونات المشتركة
import { BottomNav } from '@/components/common/BottomNav';
import { FullScreenLoader } from '@/components/common/LoadingSpinner';

function App() {
  const { 
    currentScreen, 
    isLoading, 
    checkBookingExpiry
  } = useStore();

  // التحقق من صلاحية الحجوزات بشكل دوري
  useEffect(() => {
    checkBookingExpiry();
    const interval = setInterval(() => {
      checkBookingExpiry();
    }, 60000); // كل دقيقة

    return () => clearInterval(interval);
  }, [checkBookingExpiry]);

  // عرض الشاشة المناسبة
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'otp':
        return <OTPScreen />;
      case 'kyc':
        return <KYCScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'jamiya_details':
        return <JamiyaDetailsScreen />;
      case 'booking':
        return <BookingScreen />;
      case 'payment_success':
        return <PaymentSuccessScreen />;
      case 'post_office':
        return <PostOfficeScreen />;
      case 'active_membership':
        return <ActiveMembershipScreen />;
      case 'payment_screen':
        return <ActiveMembershipScreen />;
      case 'transactions':
        return <TransactionsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'completion':
        return <CompletionScreen />;
      case 'create_jamiya':
        return <CreateJamiyaScreen />;
      case 'fiche_paie':
        return <FicheDePaieScreen />;
      case 'cheque':
        return <ChequeScanScreen />;
      case 'engagement':
        return <EngagementScanScreen />;
      case 'sorting':
        return <SortingScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="app-container" dir="rtl">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <FullScreenLoader key="loader" />
        ) : (
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen"
          >
            {renderScreen()}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* شريط التنقل السفلي */}
      <BottomNav />
    </div>
  );
}

export default App;
