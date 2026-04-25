import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-[#C62828]/10 border border-[#C62828]/30 rounded-xl p-4 flex items-start gap-3"
    >
      <AlertCircle className="w-5 h-5 text-[#C62828] flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-[#C62828] text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-[#C62828]/60 hover:text-[#C62828] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

export function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 rounded-xl p-4 flex items-start gap-3"
    >
      <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-[#2E7D32] text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-[#2E7D32]/60 hover:text-[#2E7D32] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}
