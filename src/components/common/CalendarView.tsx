import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Wallet, Shield, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { formatCurrency } from '@/data/mockData';

interface CalendarMember {
  position: number;
  name: string;
  userId: string;
  amount: number;
  isGuarantee?: boolean;
  isCurrentUser?: boolean;
}

interface CalendarViewProps {
  members: CalendarMember[];
  monthlyAmount: number;
  jamiyaName: string;
  onClose: () => void;
}

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export function CalendarView({ members, monthlyAmount, jamiyaName, onClose }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(0);

  const getMonthName = (index: number) => {
    const now = new Date();
    const monthIndex = (now.getMonth() + index) % 12;
    const year = now.getFullYear() + Math.floor((now.getMonth() + index) / 12);
    return `${MONTHS_AR[monthIndex]} ${year}`;
  };

  const getMemberForMonth = (index: number): CalendarMember | undefined => {
    if (index === 0) {
      return {
        position: 0,
        name: 'حاجي ايناس',
        userId: 'guarantee',
        amount: monthlyAmount,
        isGuarantee: true,
        isCurrentUser: false,
      };
    }
    return members[index - 1];
  };

  const totalMonths = members.length + 1; // +1 لحاجي ايناس

  const handlePrev = () => {
    if (currentMonth > 0) setCurrentMonth(currentMonth - 1);
  };

  const handleNext = () => {
    if (currentMonth < totalMonths - 1) setCurrentMonth(currentMonth + 1);
  };

  const currentMember = getMemberForMonth(currentMonth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-gray-50 pb-8"
    >
      {/* الرأس */}
      <div className="bg-gradient-to-br from-[#0D47A1] to-[#1565C0] p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">تقويم الاستلام</h1>
          <div className="w-10" />
        </div>
        <p className="text-white/70 text-sm text-center">{jamiyaName}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* التنقل بين الأشهر */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrev}
              disabled={currentMonth === 0}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-500">الشهر {currentMonth + 1} من {totalMonths}</p>
              <h3 className="text-lg font-bold text-gray-800">{getMonthName(currentMonth)}</h3>
            </div>
            <button
              onClick={handleNext}
              disabled={currentMonth === totalMonths - 1}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* شريط التقدم */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0D47A1] rounded-full"
              animate={{ width: `${((currentMonth + 1) / totalMonths) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* بطاقة صاحب الدور */}
        {currentMember && (
          <motion.div
            key={currentMonth}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl p-6 shadow-sm ${
              currentMember.isGuarantee
                ? 'bg-gradient-to-br from-[#F57C00]/10 to-[#F57C00]/5 border border-[#F57C00]/20'
                : currentMember.isCurrentUser
                ? 'bg-gradient-to-br from-[#0D47A1]/10 to-[#0D47A1]/5 border border-[#0D47A1]/20'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  currentMember.isGuarantee
                    ? 'bg-[#F57C00]/20'
                    : currentMember.isCurrentUser
                    ? 'bg-[#0D47A1]/20'
                    : 'bg-gray-100'
                }`}
              >
                {currentMember.isGuarantee ? (
                  <Shield className="w-8 h-8 text-[#F57C00]" />
                ) : (
                  <User className={`w-8 h-8 ${currentMember.isCurrentUser ? 'text-[#0D47A1]' : 'text-gray-600'}`} />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {currentMember.isCurrentUser ? 'أنت' : currentMember.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {currentMember.isGuarantee ? (
                    <span className="text-[#F57C00] font-medium text-sm flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      حاجي ايناس
                    </span>
                  ) : (
                    <span className="text-[#0D47A1] font-medium text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      دور الاستلام رقم {currentMember.position}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {!currentMember.isGuarantee && (
              <div className="bg-white/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    مبلغ الاستلام
                  </span>
                  <span className="text-xl font-bold text-[#1B5E20]">
                    {formatCurrency(currentMember.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    موعد الاستلام
                  </span>
                  <span className="font-medium text-gray-800">
                    {getMonthName(currentMonth)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    عدد المساهمين
                  </span>
                  <span className="font-medium text-gray-800">
                    {members.length} أعضاء
                  </span>
                </div>
              </div>
            )}

            {currentMember.isGuarantee && (
              <div className="bg-white/80 rounded-xl p-4">
                <p className="text-gray-600 text-sm">
                  تم تحديد حاجي إيناس كأول مستفيد، وسيتم تحويل مجموع المساهمات إليها خلال هذا الشهر.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* نظرة عامة على الترتيب */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <h3 className="font-bold text-gray-800 mb-4">ترتيب الاستلام الكامل</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {/* حاجي ايناس */}
            <div
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                currentMonth === 0 ? 'bg-[#F57C00]/10 border border-[#F57C00]/20' : 'bg-gray-50'
              }`}
              onClick={() => setCurrentMonth(0)}
            >
              <div className="w-8 h-8 bg-[#F57C00]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#F57C00]">
                0
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">حاجي ايناس</p>
                <p className="text-xs text-gray-500">{getMonthName(0)}</p>
              </div>
              <Shield className="w-4 h-4 text-[#F57C00]" />
            </div>

            {/* الأعضاء */}
            {members.map((member, idx) => (
              <div
                key={member.userId}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  currentMonth === idx + 1
                    ? member.isCurrentUser
                      ? 'bg-[#0D47A1]/10 border border-[#0D47A1]/20'
                      : 'bg-green-50 border border-green-200'
                    : 'bg-gray-50'
                }`}
                onClick={() => setCurrentMonth(idx + 1)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    member.isCurrentUser
                      ? 'bg-[#0D47A1]/20 text-[#0D47A1]'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {member.position}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {member.isCurrentUser ? 'أنت' : member.name}
                  </p>
                  <p className="text-xs text-gray-500">{getMonthName(idx + 1)}</p>
                </div>
                <span className="text-sm font-medium text-[#1B5E20]">
                  {formatCurrency(member.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ملاحظة */}
        <div className="bg-[#0D47A1]/5 rounded-xl p-4 border border-[#0D47A1]/10">
          <p className="text-sm text-[#0D47A1] text-center">
            هذا الترتيب نهائي وتم تحديده بشكل عشوائي وعادل
          </p>
        </div>
      </div>
    </motion.div>
  );
}
