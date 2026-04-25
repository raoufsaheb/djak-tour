# الدوال المساعدة

هذا المجلد يحتوي على دوال مساعدة للتطبيق.

## الملفات

- `utils.ts` - الدوال المساعدة
- `index.ts` - تصدير الدوال

## الدوال المتاحة

### التنسيق

```typescript
// تنسيق التاريخ بالعربية
formatArabicDate(date: Date | string): string

// تنسيق الوقت بالعربية
formatArabicTime(date: Date | string): string

// تنسيق المبلغ بالدينار الجزائري
formatDZD(amount: number): string

// تنسيق العداد التنازلي
formatCountdown(seconds: number): string
```

### التحقق

```typescript
// التحقق من رقم الهاتف الجزائري
isValidAlgerianPhone(phone: string): boolean

// التحقق من البريد الإلكتروني
isValidEmail(email: string): boolean

// التحقق من قوة كلمة المرور
getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
}
```

### المساعدة

```typescript
// توليد معرف فريد
generateId(prefix?: string): string

// تأخير (sleep)
sleep(ms: number): Promise<void>

// تقطيع النص
truncateText(text: string, maxLength: number): string

// حساب الفرق بين تاريخين بالأيام
daysBetween(date1: Date | string, date2: Date | string): number

// التحقق من انتهاء الصلاحية
isExpired(date: Date | string): boolean
```

### Tailwind

```typescript
// دمج فئات Tailwind
cn(...inputs: ClassValue[]): string
```

## الاستخدام

```typescript
import { 
  formatDZD, 
  isValidAlgerianPhone,
  getPasswordStrength,
  cn 
} from '@/lib';

// تنسيق مبلغ
const formatted = formatDZD(10000); // "10,000 دج"

// التحقق من هاتف
const isValid = isValidAlgerianPhone('+213550123456'); // true

// قوة كلمة المرور
const strength = getPasswordStrength('Password123!');
// { score: 4, label: 'قوية', color: '#1B5E20' }

// دمج فئات Tailwind
const className = cn('btn', 'btn-primary', { 'btn-lg': isLarge });
```

## إضافة دالة جديدة

```typescript
// lib/utils.ts
export const myNewFunction = (param: string): string => {
  return param.toUpperCase();
};
```

ثم صدّرها في `index.ts`:

```typescript
export { myNewFunction } from './utils';
```
