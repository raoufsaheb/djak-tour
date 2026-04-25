import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Jamiya, 
  Booking, 
  ActiveMembership, 
  Transaction, 
  Notification,
  ScreenType,
  IncomeLevel,
  KYCStatus 
} from '@/types';
import { 
  mockUsers, 
  mockJamiyas, 
  mockBookings, 
  mockActiveMemberships, 
  mockTransactions, 
  mockNotifications,
  ACTIVATION_FEE,
  BOOKING_EXPIRY,
  VALID_POST_OFFICE_PATTERNS
} from '@/data/mockData';

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
  selectedJamiya: Jamiya | null;
  selectedBooking: Booking | null;
  
  // التحميل والأخطاء
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  
  // إعدادات
  language: string;
  theme: string;
}

export interface AppActions {
  // إدارة الشاشات
  setCurrentScreen: (screen: ScreenType) => void;
  goBack: () => void;
  setSelectedJamiya: (jamiya: Jamiya | null) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  
  // إدارة التحميل والأخطاء
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  clearMessages: () => void;
  
  // إدارة المستخدمين
  login: (phone: string, password: string) => boolean;
  logout: () => void;
  registerUser: (userData: Partial<User>) => User | null;
  verifyOTP: (code: string) => boolean;
  updateKYC: (idCardImage: string, selfieImage: string) => void;
  approveKYC: (userId: string) => void;
  
  // إدارة الجمعيات
  getAvailableJamiyas: () => Jamiya[];
  getJamiyaById: (id: string) => Jamiya | undefined;
  getUserJamiyas: (userId: string) => Jamiya[];
  createJamiya: (jamiyaData: Partial<Jamiya>) => Jamiya | null;
  
  // إدارة الحجوزات
  createBooking: (jamiyaId: string, paymentMethod: 'card' | 'ccp') => Booking | null;
  confirmBooking: (postOfficeNumber: string) => boolean;
  cancelBooking: (bookingId: string) => void;
  getUserBookings: (userId: string) => Booking[];
  checkBookingExpiry: () => void;
  
  // إدارة العضويات
  getUserActiveMemberships: (userId: string) => ActiveMembership[];
  makePayment: (membershipId: string) => Transaction | null;
  
  // إدارة العمليات
  getUserTransactions: (userId: string) => Transaction[];
  getTransactionsByType: (userId: string, type: string) => Transaction[];
  
  // إدارة الإشعارات
  getUserNotifications: (userId: string) => Notification[];
  getUnreadNotifications: (userId: string) => Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: (userId: string) => void;
  addNotification: (notification: Partial<Notification>) => void;
  
  // إعادة تعيين البيانات
  resetToMockData: () => void;
  clearAllData: () => void;
}

const initialState: AppState = {
  currentUser: null,
  isAuthenticated: false,
  users: [...mockUsers],
  jamiyas: [...mockJamiyas],
  bookings: [...mockBookings],
  activeMemberships: [...mockActiveMemberships],
  transactions: [...mockTransactions],
  notifications: [...mockNotifications],
  currentScreen: 'splash',
  previousScreen: null,
  selectedJamiya: null,
  selectedBooking: null,
  isLoading: false,
  error: null,
  successMessage: null,
  language: 'ar',
  theme: 'light',
};

export const useStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // إدارة الشاشات
      setCurrentScreen: (screen) => set((state) => ({
        previousScreen: state.currentScreen,
        currentScreen: screen,
      })),
      
      goBack: () => set((state) => ({
        currentScreen: state.previousScreen || 'dashboard',
        previousScreen: null,
      })),
      
      setSelectedJamiya: (jamiya) => set({ selectedJamiya: jamiya }),
      setSelectedBooking: (booking) => set({ selectedBooking: booking }),
      
      // إدارة التحميل والأخطاء
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setSuccessMessage: (message) => set({ successMessage: message }),
      clearMessages: () => set({ error: null, successMessage: null }),
      
      // إدارة المستخدمين
      login: (phone, password) => {
        const user = get().users.find(u => u.phone === phone && u.password === password);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({
        currentUser: null,
        isAuthenticated: false,
        currentScreen: 'login',
        previousScreen: null,
      }),
      
      registerUser: (userData) => {
        const newUser: User = {
          id: `user_${Date.now()}`,
          phone: userData.phone || '',
          email: userData.email || '',
          password: userData.password || '',
          fullName: userData.fullName || '',
          incomeLevel: (userData.incomeLevel as IncomeLevel) || 'medium',
          kycStatus: 'unverified',
          totalSavings: 0,
          createdAt: new Date().toISOString(),
          isVerified: false,
        };
        
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAuthenticated: true,
        }));
        
        return newUser;
      },
      
      verifyOTP: (code) => {
        // رمز OTP التجريبي: 123456
        return code === '123456';
      },
      
      updateKYC: (idCardImage, selfieImage) => {
        const { currentUser } = get();
        if (!currentUser) return;
        
        set((state) => ({
          users: state.users.map(u =>
            u.id === currentUser.id
              ? { ...u, idCardImage, selfieImage, kycStatus: 'pending' as KYCStatus }
              : u
          ),
          currentUser: { ...currentUser, idCardImage, selfieImage, kycStatus: 'pending' },
        }));
      },
      
      approveKYC: (userId) => {
        set((state) => ({
          users: state.users.map(u =>
            u.id === userId
              ? { ...u, kycStatus: 'verified' as KYCStatus, isVerified: true }
              : u
          ),
        }));
        
        const { currentUser } = get();
        if (currentUser?.id === userId) {
          set({
            currentUser: { ...currentUser, kycStatus: 'verified', isVerified: true },
          });
        }
      },
      
      // إدارة الجمعيات
      getAvailableJamiyas: () => {
        const { jamiyas } = get();
        // عرض الجمعيات المتاحة للانضمام + جمعية مكتملة مخصصة لمسار المحاكاة
        const simulationJamiyas = jamiyas.filter(j =>
          j.status === 'completed' &&
          j.currentMembers === j.maxMembers &&
          j.name === 'المستقبل الواعد'
        );

        const joinableJamiyas = jamiyas.filter(j =>
          (j.status === 'open' || j.status === 'guarantee_month') &&
          j.currentMembers < j.maxMembers
        );

        return [...simulationJamiyas, ...joinableJamiyas];
      },
      
      getJamiyaById: (id) => {
        return get().jamiyas.find(j => j.id === id);
      },
      
      getUserJamiyas: (userId) => {
        return get().jamiyas.filter(j => 
          j.members.some(m => m.userId === userId)
        );
      },
      
      createJamiya: (jamiyaData: Partial<Jamiya>) => {
        const { currentUser } = get();
        if (!currentUser) return null;
        
        const newJamiya: Jamiya = {
          id: `jamiya_${Date.now()}`,
          name: jamiyaData.name || 'جمعية جديدة',
          monthlyAmount: jamiyaData.monthlyAmount || 10000,
          duration: jamiyaData.duration || 6,
          maxMembers: jamiyaData.maxMembers || 6,
          currentMembers: 1,
          status: 'under_review',
          currentCycle: 0,
          incomeLevel: jamiyaData.incomeLevel || currentUser.incomeLevel,
          progress: Math.round((1 / (jamiyaData.maxMembers || 6)) * 100),
          description: jamiyaData.description || 'جمعية قيد المراجعة',
          createdAt: new Date().toISOString(),
          members: [
            {
              userId: currentUser.id,
              userName: currentUser.fullName,
              position: 1,
              hasReceived: false,
              isCurrentReceiver: false,
            }
          ],
        };
        
        set((state) => ({
          jamiyas: [...state.jamiyas, newJamiya],
        }));
        
        // إضافة إشعار
        get().addNotification({
          userId: currentUser.id,
          title: 'تم إنشاء الجمعية',
          message: `تم إنشاء جمعية "${newJamiya.name}" وهي الآن قيد المراجعة`,
          type: 'success',
        });
        
        return newJamiya;
      },
      
      // إدارة الحجوزات
      createBooking: (jamiyaId, paymentMethod) => {
        const { currentUser, jamiyas } = get();
        if (!currentUser) return null;
        
        const jamiya = jamiyas.find(j => j.id === jamiyaId);
        if (!jamiya) return null;
        
        // التحقق من عدم وجود حجز نشط
        const existingBooking = get().bookings.find(
          b => b.userId === currentUser.id && b.status === 'pending'
        );
        if (existingBooking) {
          set({ error: 'لديك حجز نشط بالفعل' });
          return null;
        }
        
        const newBooking: Booking = {
          id: `booking_${Date.now()}`,
          userId: currentUser.id,
          jamiyaId,
          jamiyaName: jamiya.name,
          status: 'pending',
          activationFee: ACTIVATION_FEE,
          paymentMethod,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + BOOKING_EXPIRY).toISOString(),
        };
        
        set((state) => ({
          bookings: [...state.bookings, newBooking],
          selectedBooking: newBooking,
        }));
        
        // إضافة إشعار
        get().addNotification({
          userId: currentUser.id,
          title: 'تم إنشاء الحجز',
          message: `تم إنشاء حجزك في ${jamiya.name} بنجاح`,
          type: 'success',
        });
        
        return newBooking;
      },
      
      confirmBooking: (postOfficeNumber) => {
        const { selectedBooking, currentUser } = get();
        if (!selectedBooking || !currentUser) return false;
        
        // التحقق من صيغة رقم البريد
        const isValid = VALID_POST_OFFICE_PATTERNS.some((pattern: RegExp) => 
          pattern.test(postOfficeNumber)
        );
        
        if (!isValid) {
          set({ error: 'رقم البريد غير صالح' });
          return false;
        }
        
        // تحديث الحجز
        set((state) => ({
          bookings: state.bookings.map(b =>
            b.id === selectedBooking.id
              ? { ...b, status: 'confirmed', postOfficeNumber, verifiedAt: new Date().toISOString() }
              : b
          ),
          selectedBooking: { ...selectedBooking, status: 'confirmed', postOfficeNumber },
        }));
        
        // إضافة العضوية النشطة
        const jamiya = get().jamiyas.find(j => j.id === selectedBooking.jamiyaId);
        if (jamiya) {
          const newMembership: ActiveMembership = {
            id: `membership_${Date.now()}`,
            userId: currentUser.id,
            jamiyaId: jamiya.id,
            jamiyaName: jamiya.name,
            monthlyAmount: jamiya.monthlyAmount,
            position: jamiya.currentMembers + 1,
            currentCycle: jamiya.currentCycle,
            totalCycles: jamiya.duration,
            nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            currentReceiverName: 'حاجي ايناس',
            isCurrentReceiver: false,
            hasPaidThisCycle: false,
          };
          
          set((state) => ({
            activeMemberships: [...state.activeMemberships, newMembership],
          }));
          
          // تحديث الجمعية
          set((state) => ({
            jamiyas: state.jamiyas.map(j =>
              j.id === jamiya.id
                ? { 
                    ...j, 
                    currentMembers: j.currentMembers + 1,
                    members: [...j.members, {
                      userId: currentUser.id,
                      userName: currentUser.fullName,
                      position: j.currentMembers + 1,
                      hasReceived: false,
                      isCurrentReceiver: false,
                    }]
                  }
                : j
            ),
          }));
        }
        
        // إضافة إشعار
        get().addNotification({
          userId: currentUser.id,
          title: 'تم تأكيد الحجز',
          message: `تم تأكيد حجزك في ${selectedBooking.jamiyaName} بنجاح`,
          type: 'success',
        });
        
        return true;
      },
      
      cancelBooking: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'cancelled' } : b
          ),
        }));
      },
      
      getUserBookings: (userId) => {
        return get().bookings.filter(b => b.userId === userId);
      },
      
      checkBookingExpiry: () => {
        const now = new Date().toISOString();
        set((state) => ({
          bookings: state.bookings.map(b => {
            if (b.status === 'pending' && b.expiresAt < now) {
              // إضافة إشعار انتهاء الحجز
              get().addNotification({
                userId: b.userId,
                title: 'انتهى الحجز',
                message: `للأسف، انتهت صلاحية حجزك في ${b.jamiyaName}`,
                type: 'error',
              });
              return { ...b, status: 'expired' };
            }
            return b;
          }),
        }));
      },
      
      // إدارة العضويات
      getUserActiveMemberships: (userId) => {
        return get().activeMemberships.filter(m => m.userId === userId);
      },
      
      makePayment: (membershipId) => {
        const { currentUser, activeMemberships } = get();
        if (!currentUser) return null;
        
        const membership = activeMemberships.find(m => m.id === membershipId);
        if (!membership) return null;
        
        const newTransaction: Transaction = {
          id: `trans_${Date.now()}`,
          userId: currentUser.id,
          jamiyaId: membership.jamiyaId,
          jamiyaName: membership.jamiyaName,
          type: 'contribution',
          amount: membership.monthlyAmount,
          status: 'completed',
          date: new Date().toISOString(),
          description: `مساهمة شهرية - ${membership.jamiyaName}`,
          receiptUrl: '#',
        };
        
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
          activeMemberships: state.activeMemberships.map(m =>
            m.id === membershipId
              ? { 
                  ...m, 
                  hasPaidThisCycle: true,
                  nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                }
              : m
          ),
        }));
        
        // تحديث إجمالي الادخار
        set((state) => ({
          users: state.users.map(u =>
            u.id === currentUser.id
              ? { ...u, totalSavings: u.totalSavings + membership.monthlyAmount }
              : u
          ),
          currentUser: {
            ...currentUser,
            totalSavings: currentUser.totalSavings + membership.monthlyAmount,
          },
        }));
        
        // إضافة إشعار
        get().addNotification({
          userId: currentUser.id,
          title: 'تم الدفع بنجاح',
          message: `تم دفع ${membership.monthlyAmount} دج لـ ${membership.jamiyaName}`,
          type: 'success',
        });
        
        return newTransaction;
      },
      
      // إدارة العمليات
      getUserTransactions: (userId) => {
        return get().transactions
          .filter(t => t.userId === userId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      
      getTransactionsByType: (userId, type) => {
        return get().transactions
          .filter(t => t.userId === userId && t.type === type)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      
      // إدارة الإشعارات
      getUserNotifications: (userId) => {
        return get().notifications
          .filter(n => n.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      
      getUnreadNotifications: (userId) => {
        return get().notifications
          .filter(n => n.userId === userId && !n.isRead)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      
      markNotificationAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === notificationId ? { ...n, isRead: true } : n
          ),
        }));
      },
      
      markAllNotificationsAsRead: (userId) => {
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.userId === userId ? { ...n, isRead: true } : n
          ),
        }));
      },
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          id: `notif_${Date.now()}`,
          userId: notification.userId || '',
          title: notification.title || '',
          message: notification.message || '',
          type: (notification.type as 'info' | 'success' | 'warning' | 'error') || 'info',
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },
      
      // إعادة تعيين البيانات
      resetToMockData: () => set({
        ...initialState,
        users: [...mockUsers],
        jamiyas: [...mockJamiyas],
        bookings: [...mockBookings],
        activeMemberships: [...mockActiveMemberships],
        transactions: [...mockTransactions],
        notifications: [...mockNotifications],
      }),
      
      clearAllData: () => set({
        ...initialState,
        users: [],
        jamiyas: [],
        bookings: [],
        activeMemberships: [],
        transactions: [],
        notifications: [],
      }),
    }),
    {
      name: 'jamiya-storage',
      partialize: (state) => ({
        users: state.users,
        jamiyas: state.jamiyas,
        bookings: state.bookings,
        activeMemberships: state.activeMemberships,
        transactions: state.transactions,
        notifications: state.notifications,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        language: state.language,
        theme: state.theme,
      }),
    }
  )
);

export default useStore;
