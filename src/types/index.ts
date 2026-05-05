// أنواع البيانات الأساسية للتطبيق

// حالة التوثيق
export type KYCStatus = 'unverified' | 'pending' | 'verified';

// مستوى الدخل
export type IncomeLevel = 'low' | 'medium' | 'high' | 'very_high';

// حالة الجمعية
export type JamiyaStatus = 'open' | 'guarantee_month' | 'active' | 'completed' | 'under_review';

// حالة الحجز
export type BookingStatus = 'pending' | 'confirmed' | 'expired' | 'cancelled';

// حالة الدفع
export type PaymentStatus = 'pending' | 'completed' | 'failed';

// نوع العملية
export type TransactionType = 'contribution' | 'receiving' | 'fee' | 'refund';

// المستخدم
export interface User {
  id: string;
  phone: string;
  email: string;
  password: string;
  fullName: string;
  incomeLevel: IncomeLevel;
  kycStatus: KYCStatus;
  idCardImage?: string;
  selfieImage?: string;
  totalSavings: number;
  createdAt: string;
  isVerified: boolean;
}

// الجمعية
export interface Jamiya {
  id: string;
  name: string;
  monthlyAmount: number;
  duration: number; // عدد الأشهر
  maxMembers: number;
  currentMembers: number;
  status: JamiyaStatus;
  currentCycle: number;
  incomeLevel: IncomeLevel;
  progress: number; // نسبة التقدم (0-100)
  description: string;
  createdAt: string;
  members: JamiyaMember[];
}

// عضو الجمعية
export interface JamiyaMember {
  userId: string;
  userName: string;
  position: number; // ترتيب الاستلام
  hasReceived: boolean;
  receivedAt?: string;
  isCurrentReceiver: boolean;
}

// الحجز
export interface Booking {
  id: string;
  userId: string;
  jamiyaId: string;
  jamiyaName: string;
  status: BookingStatus;
  activationFee: number;
  paymentMethod: 'card' | 'ccp';
  postOfficeNumber?: string;
  createdAt: string;
  expiresAt: string;
  verifiedAt?: string;
}

// العضوية النشطة
export interface ActiveMembership {
  id: string;
  userId: string;
  jamiyaId: string;
  jamiyaName: string;
  monthlyAmount: number;
  position: number;
  currentCycle: number;
  totalCycles: number;
  nextPaymentDate: string;
  currentReceiverName: string;
  isCurrentReceiver: boolean;
  hasPaidThisCycle: boolean;
}

// العملية المالية
export interface Transaction {
  id: string;
  userId: string;
  jamiyaId?: string;
  jamiyaName?: string;
  type: TransactionType;
  amount: number;
  status: PaymentStatus;
  date: string;
  description: string;
  receiptUrl?: string;
}

// الإشعار
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

// حالة التطبيق
export interface AppState {
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
  
  // حالات الشاشات
  currentScreen: ScreenType;
  previousScreen: ScreenType | null;
  
  // التحميل والأخطاء
  isLoading: boolean;
  error: string | null;
  
  // الإجراءات
  setCurrentUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  setCurrentScreen: (screen: ScreenType) => void;
  goBack: () => void;
  
  // إدارة المستخدمين
  registerUser: (userData: Partial<User>) => User;
  verifyUser: (userId: string) => void;
  updateKYC: (userId: string, idCard: string, selfie: string) => void;
  
  // إدارة الجمعيات
  getAvailableJamiyas: (incomeLevel: IncomeLevel) => Jamiya[];
  getJamiyaById: (id: string) => Jamiya | undefined;
  joinJamiya: (userId: string, jamiyaId: string) => Booking;
  
  // إدارة الحجوزات
  confirmBooking: (bookingId: string, postOfficeNumber: string) => void;
  cancelBooking: (bookingId: string) => void;
  
  // إدارة المدفوعات
  makePayment: (membershipId: string) => Transaction;
  getTransactions: (userId: string) => Transaction[];
  
  // الإشعارات
  addNotification: (notification: Partial<Notification>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getUnreadNotifications: (userId: string) => Notification[];
  
  // التخزين المحلي
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetData: () => void;
}

// عضو التقويم
export interface CalendarMember {
  position: number;
  name: string;
  userId: string;
  amount: number;
  isGuarantee?: boolean;
  isCurrentUser?: boolean;
}

// أنواع الشاشات
export type ScreenType = 
  | 'splash'
  | 'login'
  | 'register'
  | 'otp'
  | 'kyc'
  | 'dashboard'
  | 'jamiya_details'
  | 'booking'
  | 'payment'
  | 'payment_success'
  | 'post_office'
  | 'active_membership'
  | 'payment_screen'
  | 'transactions'
  | 'notifications'
  | 'profile'
  | 'completion'
  | 'success'
  | 'error'
  | 'create_jamiya'
  | 'fiche_paie'
  | 'completed_group_qr'
  | 'cheque'
  | 'engagement'
  | 'sorting'
  | 'calendar_result';

// مستويات الدخل مع القيم
export const INCOME_LEVELS = {
  low: { min: 0, max: 50000, label: 'أقل من 50,000 دج' },
  medium: { min: 50000, max: 100000, label: '50,000 - 100,000 دج' },
  high: { min: 100000, max: 200000, label: '100,000 - 200,000 دج' },
  very_high: { min: 200000, max: Infinity, label: '200,000+ دج' },
};

// رسوم التفعيل
export const ACTIVATION_FEE = 2000;

// مدة صلاحية الحجز (48 ساعة بالملي ثانية)
export const BOOKING_EXPIRY = 48 * 60 * 60 * 1000;

// رمز OTP التجريبي
export const MOCK_OTP_CODE = '123456';

// أرقام البريد الصالحة
export const VALID_POST_OFFICE_PATTERNS = [
  /^POST-2025-ALGR-\d{4}$/,
  /^POST-2025-ORAN-\d{4}$/,
  /^POST-2025-CONST-\d{4}$/,
  /^POST-2025-ANNABA-\d{4}$/,
];
