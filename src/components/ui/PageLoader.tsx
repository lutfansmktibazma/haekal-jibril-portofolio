import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { photographerInfo } from '@/data/photographer';

interface PageLoaderProps {
  onComplete?: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase text-center"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {photographerInfo.name}
            </motion.h1>
          </div>

          <motion.div
            className="mt-6 h-px bg-foreground/30"
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />

          <motion.p
            className="mt-4 text-[10px] font-light tracking-[0.4em] text-muted-foreground uppercase text-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {photographerInfo.tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}