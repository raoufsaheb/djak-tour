import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Users, Calendar, ArrowDownUp } from 'lucide-react';

interface SortingLoaderProps {
  members: { name: string; userId: string }[];
  onComplete: (sortedMembers: { name: string; userId: string; position: number }[]) => void;
}

const STEPS = [
  { icon: Shuffle, text: 'جاري خلط الأسماء...' },
  { icon: ArrowDownUp, text: 'جاري تحديد الترتيب...' },
  { icon: Users, text: 'توزيع دورات الاستلام...' },
  { icon: Calendar, text: 'إعداد التقويم...' },
];

export function SortingLoader({ members, onComplete }: SortingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [shuffledNames, setShuffledNames] = useState<string[]>([]);

  useEffect(() => {
    // محاكاة خلط الأسماء
    const names = members.map((m) => m.name);
    setShuffledNames(names);

    const shuffleInterval = setInterval(() => {
      setShuffledNames((prev) => {
        const arr = [...prev];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      });
    }, 200);

    // تقدم الخطوات
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(shuffleInterval);
          clearInterval(stepInterval);
          // إنشاء الترتيب النهائي
          const finalOrder = arr
            .map((name, idx) => ({
              name,
              userId: members.find((m) => m.name === name)?.userId || '',
              position: idx + 1,
            }))
            .filter((m) => m.userId);
          setTimeout(() => onComplete(finalOrder), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    let arr = [...names];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return () => {
      clearInterval(shuffleInterval);
      clearInterval(stepInterval);
    };
  }, [members, onComplete]);

  const CurrentIcon = STEPS[currentStep]?.icon || Shuffle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-b from-[#0D47A1] to-[#1565C0] flex flex-col items-center justify-center p-6"
    >
      {/* عنوان */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <CurrentIcon className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          جاري تحديد ترتيب الاستلام...
        </h2>
        <p className="text-white/70">
          {STEPS[currentStep]?.text}
        </p>
      </motion.div>

      {/* خلط الأسماء */}
      <div className="w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <AnimatePresence mode="popLayout">
            {shuffledNames.slice(0, 5).map((name, idx) => (
              <motion.div
                key={name}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {idx + 1}
                </div>
                <span className="text-white font-medium">{name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* شريط التقدم */}
        <div className="space-y-2">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/60 text-center text-sm">
            الخطوة {currentStep + 1} من {STEPS.length}
          </p>
        </div>
      </div>

      {/* خطوات العملية */}
      <div className="flex items-center gap-2 mt-8">
        {STEPS.map((_step, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx <= currentStep ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
