import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";

export function Toast() {
  const { message } = useToast();

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="pointer-events-none absolute bottom-[calc(108px+env(safe-area-inset-bottom))] left-1/2 z-[70] w-[min(86%,320px)] -translate-x-1/2 rounded-full bg-[var(--color-secondary)] px-4 py-2.5 text-center text-[12px] text-[#f7efe4] shadow-lg"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
