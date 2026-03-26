import { motion } from 'framer-motion';

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
  const duplicated = [...jobs, ...jobs];

  return (
    <div className="relative overflow-hidden border-y border-border bg-accent/30 py-4">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((job, i) => (
          <span
            key={i}
            className="text-sm md:text-base font-light tracking-widest uppercase text-muted-foreground flex items-center gap-8"
          >
            {job}
            <span className="text-border">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
