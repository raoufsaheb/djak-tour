import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { SortingLoader } from '@/components/common/SortingLoader';
import { CalendarView } from '@/components/common/CalendarView';
import type { CalendarMember } from '@/types';

interface SortedMember {
  name: string;
  userId: string;
  position: number;
}

export function SortingScreen() {
  const { setCurrentScreen, selectedJamiya } = useStore();
  const [isComplete, setIsComplete] = useState(false);
  const [sortedMembers, setSortedMembers] = useState<SortedMember[]>([]);

  // تحضير الأعضاء للفرز
  const membersForSorting = selectedJamiya
    ? selectedJamiya.members.map((m) => ({
        name: m.userName,
        userId: m.userId,
      }))
    : [
        { name: 'أحمد قادر', userId: 'user_1' },
        { name: 'فاطمة بن علي', userId: 'user_2' },
        { name: 'سارة مرابط', userId: 'user_6' },
        { name: 'محمد بوفية', userId: 'user_7' },
      ];

  const handleSortComplete = useCallback(
    (finalOrder: SortedMember[]) => {
      setSortedMembers(finalOrder);
      setIsComplete(true);
    },
    []
  );

  const handleCloseCalendar = () => {
    setCurrentScreen('dashboard');
  };

  // تحويل الأعضاء لصيغة CalendarMember
  const calendarMembers: CalendarMember[] = sortedMembers.map((m) => ({
    position: m.position,
    name: m.name,
    userId: m.userId,
    amount: selectedJamiya ? selectedJamiya.monthlyAmount * (selectedJamiya.maxMembers - 1) : 250000,
    isCurrentUser: m.userId === 'user_1',
  }));

  return (
    <AnimatePresence mode="wait">
      {!isComplete ? (
        <SortingLoader
          key="sorting"
          members={membersForSorting}
          onComplete={handleSortComplete}
        />
      ) : (
        <motion.div
          key="calendar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CalendarView
            members={calendarMembers}
            monthlyAmount={selectedJamiya?.monthlyAmount || 25000}
            jamiyaName={selectedJamiya?.name || 'جمعيتك'}
            onClose={handleCloseCalendar}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
