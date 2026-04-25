# المكونات

هذا المجلد يحتوي على جميع مكونات React للتطبيق.

## الهيكل

```
components/
├── screens/        # شاشات التطبيق (15)
├── common/         # مكونات مشتركة
└── ui/            # مكونات shadcn/ui (40+)
```

## الشاشات

| الشاشة | الملف | الوصف |
|--------|-------|-------|
| البداية | `SplashScreen.tsx` | شاشة الترحيب |
| الدخول | `LoginScreen.tsx` | تسجيل الدخول |
| التسجيل | `RegisterScreen.tsx` | إنشاء حساب |
| OTP | `OTPScreen.tsx` | التحقق من الهاتف |
| KYC | `KYCScreen.tsx` | التحقق من الهوية |
| الرئيسية | `DashboardScreen.tsx` | لوحة التحكم |
| تفاصيل الجمعية | `JamiyaDetailsScreen.tsx` | معلومات الجمعية |
| الحجز | `BookingScreen.tsx` | حجز مكان |
| نجاح الدفع | `PaymentSuccessScreen.tsx` | تأكيد الدفع |
| البريد | `PostOfficeScreen.tsx` | التحقق من البريد |
| العضوية | `ActiveMembershipScreen.tsx` | العضويات النشطة |
| المعاملات | `TransactionsScreen.tsx` | سجل المعاملات |
| الإشعارات | `NotificationsScreen.tsx` | قائمة الإشعارات |
| الملف الشخصي | `ProfileScreen.tsx` | معلومات المستخدم |
| الاكتمال | `CompletionScreen.tsx` | شاشة الاحتفال |

## المكونات المشتركة

| المكون | الملف | الوصف |
|--------|-------|-------|
| BottomNav | `BottomNav.tsx` | شريط التنقل السفلي |
| LoadingSpinner | `LoadingSpinner.tsx` | مؤشر التحميل |
| ErrorMessage | `ErrorMessage.tsx` | رسالة خطأ |
| SuccessMessage | `SuccessMessage.tsx` | رسالة نجاح |

## مكونات shadcn/ui

40+ مكون جاهز:
- Button
- Card
- Dialog
- Form
- Input
- Select
- Tabs
- Toast
- ... والمزيد

## الأنماط

### شاشة نموذجية

```tsx
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const MyScreen = () => {
  const { setCurrentScreen } = useStore();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* المحتوى */}
    </motion.div>
  );
};
```

### مكون نموذجي

```tsx
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return (
    <div className="p-4 bg-white rounded-xl">
      <h2>{title}</h2>
      <button onClick={onClick}>اضغط</button>
    </div>
  );
};
```

## الرسوم المتحركة

استخدام Framer Motion:

```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2 }}
>
  المحتوى
</motion.div>
```

## الأيقونات

استخدام Lucide React:

```tsx
import { Home, User, Settings } from 'lucide-react';

<Home className="w-6 h-6" />
```
