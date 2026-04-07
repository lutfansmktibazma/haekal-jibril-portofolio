import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { useRef } from 'react';

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name}, ${photographerInfo.tagline}. ${photographerInfo.biography.split('\n\n')[0]}`}
        image={photographerInfo.portraitImage}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-8 md:py-12 px-6 lg:px-8 border-b border-border overflow-hidden">
          <motion.div className="max-w-4xl mx-auto text-center space-y-2" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-2">
                About
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground font-light tracking-wide">
                Photographer & Visual Storyteller
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Portrait and Biography */}
        <section className="py-12 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Portrait Image */}
              <motion.div
                className="space-y-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.85)' }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  >
                    <source src="/src/assets/about.mp4" type="video/mp4" />
                  </video>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {photographerInfo.socialLinks.instagram && (
                    <a
                      href={photographerInfo.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="size-5" />
                    </a>
                  )}
                  {photographerInfo.socialLinks.facebook && (
                    <a
                      href={photographerInfo.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="size-5" />
                    </a>
                  )}
                  {photographerInfo.socialLinks.linkedin && (
                    <a
                      href={photographerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Biography and Info */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-light tracking-wide">
                    {photographerInfo.name}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                    {photographerInfo.tagline}
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm md:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-4 space-y-2">
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Email: </span>
                    <a
                      href={`mailto:${photographerInfo.email}`}
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {photographerInfo.email}
                    </a>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Location: </span>
                    <span className="text-foreground">{photographerInfo.location}</span>
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
