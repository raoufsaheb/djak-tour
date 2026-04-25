# إدارة الحالة

هذا المجلد يحتوي على إدارة الحالة للتطبيق باستخدام Zustand.

## الملفات

- `useStore.ts` - المتجر الرئيسي
- `index.ts` - تصدير المتجر

## البنية

```typescript
interface AppState {
  // المستخدم الحالي
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // البيانات
  users: User[];
  jamiyas: Jamiya[];
  bookings: Booking[];
  activeMemberships: ActiveMembership[];
  transactions: Transaction[];
  notifications: Notification[];
  
  // التنقل
  currentScreen: ScreenType;
  selectedJamiya: Jamiya | null;
  selectedBooking: Booking | null;
  
  // الحالة
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}
```

## الإجراءات

### المستخدمين

- `login(phone, password)` - تسجيل الدخول
- `logout()` - تسجيل الخروج
- `registerUser(data)` - إنشاء حساب
- `verifyOTP(code)` - التحقق من OTP
- `updateKYC(idCard, selfie)` - تحديث KYC

### الجمعيات

- `getAvailableJamiyas()` - الجمعيات المتاحة
- `getJamiyaById(id)` - جمعية محددة
- `getUserJamiyas(userId)` - جمعيات المستخدم

### الحجوزات

- `createBooking(jamiyaId, method)` - إنشاء حجز
- `confirmBooking(postOfficeNumber)` - تأكيد الحجز
- `cancelBooking(bookingId)` - إلغاء الحجز
- `checkBookingExpiry()` - التحقق من الصلاحية

### العضويات

- `getUserActiveMemberships(userId)` - العضويات النشطة
- `makePayment(membershipId)` - دفع مساهمة

### المعاملات

- `getUserTransactions(userId)` - معاملات المستخدم
- `getTransactionsByType(userId, type)` - فلترة حسب النوع

### الإشعارات

- `getUserNotifications(userId)` - إشعارات المستخدم
- `getUnreadNotifications(userId)` - الإشعارات غير المقروءة
- `markNotificationAsRead(notificationId)` - تعليم كمقروء
- `addNotification(notification)` - إضافة إشعار

### التنقل

- `setCurrentScreen(screen)` - تعيين الشاشة الحالية
- `goBack()` - الرجوع للشاشة السابقة

## Persist Middleware

```typescript
import { persist } from 'zustand/middleware';

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({ ... }),
    {
      name: 'jamiya-storage',
      partialize: (state) => ({ ... }),
    }
  )
);
```

## الاستخدام

```typescript
import { useStore } from '@/store';

const MyComponent = () => {
  const { currentUser, login, setCurrentScreen } = useStore();
  
  return (
    <div>
      <p>مرحباً {currentUser?.fullName}</p>
      <button onClick={() => setCurrentScreen('profile')}>
        الملف الشخصي
      </button>
    </div>
  );
};
```

## Selectors

```typescript
// اختيار جزء محدد من الحالة
const userName = useStore(state => state.currentUser?.fullName);

// اختيار متعدد
const { jamiyas, getAvailableJamiyas } = useStore(
  state => ({ 
    jamiyas: state.jamiyas,
    getAvailableJamiyas: state.getAvailableJamiyas 
  })
);
```
