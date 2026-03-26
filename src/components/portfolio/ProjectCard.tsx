import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const ratio = aspectRatio || 'landscape';
  
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
      >
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          
          <motion.img
            src={project.coverImage}
            alt={project.title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out',
              isLoaded ? 'opacity-100' : 'opacity-0',
              'group-hover:scale-110'
            )}
            loading={index < 6 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
            md:from-black/90 md:via-black/30 md:to-black/10
            md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
            
            {/* Content container */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
              {/* Title & info */}
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-sm md:text-xl font-light tracking-wide 
                    md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  <motion.div 
                    className="hidden md:flex items-center justify-center size-8 rounded-full bg-white/20 backdrop-blur-sm
                      opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"
                  >
                    <ArrowUpRight className="size-4 text-white" />
                  </motion.div>
                </div>
                {showCategory && (
                  <div className="hidden md:flex items-center gap-3 text-xs text-white/70 font-light tracking-widest uppercase
                    translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    <span>{project.category}</span>
                    <span className="text-white/30">—</span>
                    <span>{project.year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
