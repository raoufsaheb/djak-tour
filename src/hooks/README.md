# Hooks مخصصة

هذا المجلد يحتوي على Hooks مخصصة للتطبيق.

## الملفات

- `useCountdown.ts` - عداد تنازلي
- `index.ts` - تصدير الـ Hooks

## useCountdown

Hook للعداد التنازلي.

### الاستخدام

```typescript
import { useCountdown } from '@/hooks';

const MyComponent = () => {
  const { 
    seconds, 
    isRunning, 
    isComplete, 
    formatted,
    start, 
    pause, 
    reset 
  } = useCountdown({
    initialSeconds: 60,
    onComplete: () => console.log('انتهى!'),
    autoStart: true,
  });

  return (
    <div>
      <p>الوقت المتبقي: {formatted}</p>
      <button onClick={start}>بدء</button>
      <button onClick={pause}>إيقاف</button>
      <button onClick={reset}>إعادة</button>
    </div>
  );
};
```

### الخيارات

| الخيار | النوع | الوصف |
|--------|-------|-------|
| initialSeconds | number | الوقت الأولي بالثواني |
| onComplete | () => void | دالة تُنفذ عند الانتهاء |
| autoStart | boolean | بدء تلقائي |

### القيم المُعادة

| القيمة | النوع | الوصف |
|--------|-------|-------|
| seconds | number | الثواني المتبقية |
| isRunning | boolean | هل العداد يعمل |
| isComplete | boolean | هل انتهى العداد |
| formatted | string | الوقت منسق (HH:MM:SS) |
| start | () => void | بدء العداد |
| pause | () => void | إيقاف العداد |
| reset | (newSeconds?: number) => void | إعادة تعيين |

## useBookingExpiry

Hook لحساب وقت انتهاء الحجز (48 ساعة).

### الاستخدام

```typescript
import { useBookingExpiry } from '@/hooks';

const MyComponent = ({ booking }) => {
  const { isExpired, formatted, percentage } = useBookingExpiry(booking.expiresAt);

  return (
    <div>
      {isExpired ? (
        <p>انتهى الحجز</p>
      ) : (
        <>
          <p>الوقت المتبقي: {formatted}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
};
```

### القيم المُعادة

| القيمة | النوع | الوصف |
|--------|-------|-------|
| isExpired | boolean | هل انتهى الحجز |
| formatted | string | الوقت المتبقي |
| percentage | number | نسبة الوقت المتبقي |

## إنشاء Hook جديد

```typescript
// hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export const useMyHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // منطق الـ Hook
  }, []);
  
  return { value, setValue };
};
```

ثم صدّره في `index.ts`:

```typescript
export { useMyHook } from './useMyHook';
```
