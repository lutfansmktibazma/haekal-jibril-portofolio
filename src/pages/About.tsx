import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Linkedin, Facebook, ArrowUpRight } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { useRef } from 'react';
import { TypewriterText } from '@/components/ui/TypewriterText';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name}, ${photographerInfo.tagline}. ${photographerInfo.biography.split('\n\n')[0]}`}
        image={photographerInfo.portraitImage}
      />

      <div className="min-h-screen" ref={containerRef}>
        {/* Full-width cinematic video section */}
        <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            >
              <source src="/src/assets/about.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Name overlay at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-8 md:pb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-extralight tracking-tight">
                {photographerInfo.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-light tracking-[0.3em] uppercase mt-2 md:mt-4">
                {photographerInfo.tagline}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Biography section - editorial style */}
        <section className="px-6 lg:px-12 py-16 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              {/* Left column - label */}
              <motion.div
                className="md:col-span-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-light">
                  Biography
                </p>
                <Separator className="mt-4 w-12" />
              </motion.div>

              {/* Right column - biography text */}
              <motion.div
                className="md:col-span-9 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                  <TypewriterText
                    key={index}
                    text={paragraph}
                    speed={8}
                    delay={index * 800}
                    className="text-base md:text-xl lg:text-2xl font-extralight leading-relaxed text-foreground/80"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Details section */}
        <section className="px-6 lg:px-12 pb-16 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-3">
                <motion.p
                  className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Details
                </motion.p>
                <Separator className="mt-4 w-12" />
              </div>

              <motion.div
                className="md:col-span-9"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                  {/* Location */}
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Location</p>
                    <p className="text-lg md:text-xl font-extralight">{photographerInfo.location}</p>
                  </div>

                  {/* Education */}
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Education</p>
                    <p className="text-lg md:text-xl font-extralight">{photographerInfo.education}</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Email</p>
                    <a
                      href={`mailto:${photographerInfo.email}`}
                      className="text-lg md:text-xl font-extralight hover:text-muted-foreground transition-colors inline-flex items-center gap-2 group"
                    >
                      {photographerInfo.email}
                      <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>

                  {/* Availability */}
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Status</p>
                    <p className="text-lg md:text-xl font-extralight">{photographerInfo.availability}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-4">
                    {photographerInfo.socialLinks.instagram && (
                      <a
                        href={photographerInfo.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light hover:text-foreground transition-colors flex items-center gap-2"
                      >
                        <Instagram className="size-4" />
                        Instagram
                      </a>
                    )}
                    {photographerInfo.socialLinks.facebook && (
                      <a
                        href={photographerInfo.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light hover:text-foreground transition-colors flex items-center gap-2"
                      >
                        <Facebook className="size-4" />
                        Facebook
                      </a>
                    )}
                    {photographerInfo.socialLinks.linkedin && (
                      <a
                        href={photographerInfo.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light hover:text-foreground transition-colors flex items-center gap-2"
                      >
                        <Linkedin className="size-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
