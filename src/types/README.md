# أنواع TypeScript

هذا المجلد يحتوي على جميع أنواع TypeScript للتطبيق.

## الملفات

- `index.ts` - جميع الأنواع

## الأنواع الرئيسية

### المستخدم (User)

```typescript
interface User {
  id: string;
  phone: string;
  email: string;
  password: string;
  fullName: string;
  incomeLevel: IncomeLevel;
  kycStatus: KYCStatus;
  totalSavings: number;
  createdAt: string;
  isVerified: boolean;
}
```

### الجمعية (Jamiya)

```typescript
interface Jamiya {
  id: string;
  name: string;
  monthlyAmount: number;
  duration: number;
  maxMembers: number;
  currentMembers: number;
  status: JamiyaStatus;
  members: JamiyaMember[];
}
```

### الحجز (Booking)

```typescript
interface Booking {
  id: string;
  userId: string;
  jamiyaId: string;
  status: BookingStatus;
  activationFee: number;
  expiresAt: string;
}
```

### العضوية النشطة (ActiveMembership)

```typescript
interface ActiveMembership {
  id: string;
  userId: string;
  jamiyaId: string;
  monthlyAmount: number;
  position: number;
  currentCycle: number;
  totalCycles: number;
  nextPaymentDate: string;
}
```

### العملية (Transaction)

```typescript
interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: PaymentStatus;
  date: string;
  description: string;
}
```

### الإشعار (Notification)

```typescript
interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}
```

## الأنواع المشتقة

### حالات

- `KYCStatus`: 'unverified' | 'pending' | 'verified'
- `JamiyaStatus`: 'open' | 'guarantee_month' | 'active' | 'completed'
- `BookingStatus`: 'pending' | 'confirmed' | 'expired' | 'cancelled'
- `PaymentStatus`: 'pending' | 'completed' | 'failed'
- `TransactionType`: 'contribution' | 'receiving' | 'fee' | 'refund'

### مستويات

- `IncomeLevel`: 'low' | 'medium' | 'high' | 'very_high'

### شاشات

- `ScreenType`: 15 نوع من الشاشات

## الثوابت

```typescript
INCOME_LEVELS = {
  low: { min: 0, max: 50000, label: 'أقل من 50,000 دج' },
  medium: { min: 50000, max: 100000, label: '50,000 - 100,000 دج' },
  high: { min: 100000, max: 200000, label: '100,000 - 200,000 دج' },
  very_high: { min: 200000, max: Infinity, label: '200,000+ دج' },
};

ACTIVATION_FEE = 2000;
BOOKING_EXPIRY = 48 * 60 * 60 * 1000;
MOCK_OTP_CODE = '123456';
```
