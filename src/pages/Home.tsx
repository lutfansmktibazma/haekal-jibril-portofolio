import { motion, useScroll, useTransform } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { Marquee } from '@/components/ui/Marquee';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster=""
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.85)' }}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.opacity = '0';
              }}
            >
              <source src="/src/assets/hero-section.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px 128px'
              }}
            />
          </motion.div>

          <motion.div
            className="relative h-full flex flex-col justify-end px-8 md:px-16 pb-24 md:pb-32"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="space-y-3 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Label dengan garis */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="w-6 h-px bg-white/50" />
                <span
                  className="text-[9px] md:text-[11px] font-light tracking-[0.3em] text-white/60 uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Photographer & Videographer
                </span>
              </motion.div>

              {/* Nama - animasi ketikan */}
              <div className="overflow-hidden">
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                  }}
                >
                  {Array.from("HAEKAL JIBRIL").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.01,
                        delay: 0.5 + i * 0.08,
                      }}
                      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>

              {/* Tagline - animasi ketikan */}
              <motion.p
                className="text-[9px] md:text-xs font-light tracking-[0.2em] text-white/60 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {Array.from(photographerInfo.tagline.toUpperCase()).map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.01,
                      delay: 1.6 + i * 0.05,
                    }}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </motion.div>
        </section>

        {/* Running Text Marquee */}
        <Marquee />

        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-light tracking-[0.3em] text-muted-foreground uppercase">
                    About
                  </span>
                  <h2 className="text-3xl md:text-5xl font-light tracking-wide leading-tight">
                    The Story <br />
                    <span className="text-muted-foreground">Behind the</span> <br />
                    Lens
                  </h2>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-foreground hover:text-muted-foreground transition-colors group mt-4"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="space-y-4 border-l border-border pl-8">
                  <p className="text-sm md:text-base font-light leading-relaxed text-muted-foreground">
                    {photographerInfo.biography.split('\n\n')[0]}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8 md:mb-12 px-6 md:px-8">
              <div className="space-y-1">
                <span className="text-[10px] font-light tracking-[0.3em] text-muted-foreground uppercase">
                  Work
                </span>
                <h2 className="text-2xl md:text-4xl font-light tracking-wide">
                  Featured Projects
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide pl-6 md:pl-8">
            <div className="flex gap-4 md:gap-6 w-max pr-6 md:pr-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="w-[75vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    aspectRatio="portrait"
                    showCategory={true}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll hint + View All mobile */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-between mt-6 px-6 md:px-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-muted-foreground/30" />
                <span className="text-[10px] font-light tracking-[0.3em] text-muted-foreground/50 uppercase">
                  Scroll to explore
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}