import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// دالة لتنسيق التاريخ بالعربية
export function formatArabicDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// دالة لتنسيق الوقت بالعربية
export function formatArabicTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-DZ', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// دالة لتنسيق المبلغ بالدينار الجزائري
export function formatDZD(amount: number): string {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' دج';
}

// دالة لتوليد معرف فريد
export function generateId(prefix: string = ''): string {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// دالة للتأخير (sleep)
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// دالة للتحقق من صحة رقم الهاتف الجزائري
export function isValidAlgerianPhone(phone: string): boolean {
  // يقبل الأرقام التي تبدأ بـ 0 أو +213 أو 213
  const cleaned = phone.replace(/\s/g, '').replace(/^\+/, '');
  const regex = /^(0|213)[5-7]\d{8}$/;
  return regex.test(cleaned);
}

// دالة للتحقق من صحة البريد الإلكتروني
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// دالة للتحقق من قوة كلمة المرور
export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية', 'قوية جداً'];
  const colors = ['#C62828', '#C62828', '#F57C00', '#0D47A1', '#2E7D32', '#1B5E20'];

  return {
    score,
    label: labels[score] || labels[0],
    color: colors[score] || colors[0],
  };
}

// دالة لتقليص النص
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// دالة لحساب الفرق بين تاريخين بالأيام
export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// دالة للتحقق من انتهاء الصلاحية
export function isExpired(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
}

// دالة لتنسيق العداد التنازلي
export function formatCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
