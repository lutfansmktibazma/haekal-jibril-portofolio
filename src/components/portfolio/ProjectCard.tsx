import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

export function ProjectCard({ 
  project, 
  aspectRatio, 
  showCategory = true,
  index = 0 
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isTapped, setIsTapped] = React.useState(false);
  const ref = React.useRef(null);
  const ratio = aspectRatio || 'landscape';

  // Parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
        onTouchStart={() => setIsTapped(true)}
        onTouchEnd={() => setTimeout(() => setIsTapped(false), 400)}
      >
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          
          {/* Parallax image */}
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out',
              isLoaded ? 'opacity-100' : 'opacity-0',
              'group-hover:scale-110 group-active:scale-110'
            )}
            style={{ y: imgY, scale: 1.15 }}
            loading={index < 6 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
            md:from-black/90 md:via-black/30 md:to-black/10
            md:opacity-0 md:group-hover:opacity-100 
            group-active:from-black/95 group-active:via-black/40
            transition-all duration-500">
            
            <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-6">
              <div className="space-y-0.5 md:space-y-2">
                <div className="flex items-center justify-between">
                  <motion.h3
                    className="text-white text-xs md:text-xl font-light tracking-wide
                      md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.div
                    className="hidden md:flex items-center justify-center size-8 rounded-full bg-white/20 backdrop-blur-sm
                      opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"
                  >
                    <ArrowUpRight className="size-4 text-white" />
                  </motion.div>
                </div>

                {showCategory && (
                  <motion.div
                    className="flex items-center gap-1.5 text-[8px] md:text-[10px] text-white/60 font-light tracking-[0.2em] uppercase
                      md:translate-y-4 md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-75"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
                  >
                    <span>{project.category}</span>
                    <span className="text-white/30">—</span>
                    <span>{project.year}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Shimmer effect pas di-tap */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, x: '-100%' }}
            animate={isTapped ? { opacity: 1, x: '100%' } : { opacity: 0, x: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }}
          />

          {/* Tap ripple */}
          <motion.div
            className="absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 transition-opacity duration-150"
          />
        </div>
      </Link>
    </motion.div>
  );
}