import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const jobs = [
  'Editorial Photography',
  'Commercial Shoots',
  'Portrait Sessions',
  'Landscape Photography',
  'Fashion Editorial',
  'Documentary Projects',
  'Architecture Photography',
  'Brand Campaigns',
  'Event Coverage',
  'Studio Sessions',
];

export function Marquee() {
  const isMobile = useIsMobile();
  const duplicated = [...jobs, ...jobs, ...jobs];

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-accent/20 py-5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap gap-6 md:gap-10"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: isMobile ? 8 : 15,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((job, i) => (
          <span
            key={i}
            className="text-xs md:text-sm font-light tracking-[0.2em] uppercase text-muted-foreground/80 flex items-center gap-6 md:gap-10"
          >
            {job}
            <span className="text-primary/40 text-lg">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
