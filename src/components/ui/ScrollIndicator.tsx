import { motion } from 'framer-motion';

/**
 * Animated scroll indicator - minimal line style
 */
export function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      aria-label="Scroll to content"
    >
      {/* Garis animasi turun */}
      <div className="relative w-[1px] h-16 bg-white/20 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-white"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ height: '50%' }}
        />
      </div>
    </motion.button>
  );
}