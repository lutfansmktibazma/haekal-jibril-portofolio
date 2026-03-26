import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Camera, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug } from '@/data/projects';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { cn } from '@/lib/utils';
import type { ProjectImage } from '@/types';

function GalleryImage({ image, onClick, index }: { image: ProjectImage; onClick: () => void; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-sm cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-all duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'group-hover:scale-105'
          )}
          loading={index < 4 ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />
      
      <div className="min-h-screen">
        {/* Hero Image - shorter on mobile */}
        <motion.div
          className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </motion.div>

        {/* Project Info */}
        <section className="max-w-4xl mx-auto px-5 md:px-8 py-8 md:py-16">
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground font-light">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 md:size-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-1.5 capitalize">
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
                {project.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 md:size-4" />
                      <span>{project.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <p className="text-base md:text-xl font-light leading-relaxed text-foreground">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2 md:pt-4">
              {project.camera && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-light tracking-wide uppercase text-muted-foreground">
                    <Camera className="size-3.5" />
                    <span>Camera</span>
                  </div>
                  <p className="text-sm md:text-base font-light text-foreground">{project.camera}</p>
                </div>
              )}
              {project.client && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-light tracking-wide uppercase text-muted-foreground">
                    <User className="size-3.5" />
                    <span>Client</span>
                  </div>
                  <p className="text-sm md:text-base font-light text-foreground">{project.client}</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Image Gallery - 2 col grid, all square for clean layout */}
        <section className="py-8 md:py-16 px-1 md:px-4">
          <div className="grid grid-cols-2 gap-1 md:gap-3 max-w-6xl mx-auto">
            {project.images.map((image, index) => (
              <GalleryImage
                key={image.id}
                image={image}
                onClick={() => openLightbox(index)}
                index={index}
              />
            ))}
          </div>
        </section>

        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
