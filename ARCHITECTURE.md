# معمارية التطبيق

## نظرة عامة

```
┌─────────────────────────────────────────────────────────────┐
│                        المستخدم                              │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Frontend (React)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Components │  │    Store    │  │      Services       │  │
│  │  (Screens)  │  │  (Zustand)  │  │   (Mock Services)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                  Local Storage                               │
│              (Persist with Zustand)                          │
└─────────────────────────────────────────────────────────────┘
```

## الهيكل التنظيمي

```
src/
├── components/
│   ├── screens/        # شاشات التطبيق (15 شاشة)
│   ├── common/         # مكونات مشتركة
│   └── ui/            # مكونات shadcn/ui (40+)
├── store/
│   └── useStore.ts    # إدارة الحالة المركزية
├── data/
│   └── mockData.ts    # البيانات الوهمية
├── types/
│   └── index.ts       # أنواع TypeScript
├── hooks/
│   └── useCountdown.ts # Hooks مخصصة
├── lib/
│   └── utils.ts       # دوال مساعدة
└── App.tsx            # المكون الرئيسي
```

## إدارة الحالة (State Management)

### Zustand Store

```typescript
interface AppState {
  // المستخدم
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
  
  // الإجراءات
  login: (phone: string, password: string) => boolean;
  registerUser: (data: Partial<User>) => User;
  createBooking: (jamiyaId: string, method: PaymentMethod) => Booking;
  // ... المزيد
}
```

### Persist Middleware

```typescript
import { persist } from 'zustand/middleware';

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({ ... }),
    { name: 'jamiya-storage' }
  )
);
```

## التنقل (Navigation)

### نظام الشاشات

```typescript
type ScreenType = 
  | 'splash'
  | 'login'
  | 'register'
  | 'otp'
  | 'kyc'
  | 'dashboard'
  | 'jamiya_details'
  | 'booking'
  | 'payment_success'
  | 'post_office'
  | 'active_membership'
  | 'transactions'
  | 'notifications'
  | 'profile'
  | 'completion';
```

### App.tsx

```tsx
function App() {
  const { currentScreen } = useStore();
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />;
      case 'login': return <LoginScreen />;
      // ... المزيد
    }
  };
  
  return (
    <div className="app-container">
      {renderScreen()}
      <BottomNav />
    </div>
  );
}
```

## البيانات

### الكيانات الرئيسية

```typescript
// المستخدم
interface User {
  id: string;
  phone: string;
  email: string;
  password: string;
  fullName: string;
  incomeLevel: IncomeLevel;
  kycStatus: KYCStatus;
  totalSavings: number;
}

// الجمعية
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

// الحجز
interface Booking {
  id: string;
  userId: string;
  jamiyaId: string;
  status: BookingStatus;
  activationFee: number;
  expiresAt: string;
}
```

### البيانات الوهمية

```typescript
// mockData.ts
export const mockUsers: User[] = [...];
export const mockJamiyas: Jamiya[] = [...];
export const mockTransactions: Transaction[] = [...];
```

## التصميم

### نظام الألوان

```css
:root {
  --primary-green: #1B5E20;
  --secondary-blue: #0D47A1;
  --warning-orange: #F57C00;
  --success-green: #2E7D32;
  --error-red: #C62828;
  --background-gray: #F5F7FA;
}
```

### المكونات

- **Tailwind CSS**: للتنسيق
- **shadcn/ui**: 40+ مكون جاهز
- **Framer Motion**: للرسوم المتحركة
- **Lucide React**: للأيقونات

## الأمان

### التحقق

1. **OTP**: رمز مؤقت للهاتف
2. **KYC**: تحقق من الهوية
3. **Session**: جلسات آمنة

### التخزين

```typescript
// LocalStorage (مشفر)
const storage = {
  users: encrypted,
  jamiyas: encrypted,
  // ...
};
```

## الأداء

### التحسينات

- **Code Splitting**: تقسيم الكود
- **Lazy Loading**: تحميل كسول
- **Memoization**: تذكر النتائج
- **Virtual List**: قوائم افتراضية

### المقاييس

| المقياس | الهدف |
|---------|-------|
| FCP | < 1.8s |
| LCP | < 2.5s |
| TTI | < 3.8s |
| CLS | < 0.1 |

## الاختبار

### أنواع الاختبارات

```
tests/
├── unit/              # اختبارات وحدوية
├── integration/       # اختبارات تكامل
└── e2e/              # اختبارات end-to-end
```

### الأدوات

- **Vitest**: للاختبارات الوحدوية
- **Cypress**: للاختبارات E2E
- **Testing Library**: لاختبار React

## النشر

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

## المستقبل

### التحسينات المخططة

1. **Backend حقيقي**: Node.js + PostgreSQL
2. **GraphQL**: بديل لـ REST
3. **Microservices**: تقسيم الخدمات
4. **CDN**: توزيع المحتوى
5. **Caching**: Redis

---

**آخر تحديث:** 2025-02-28
