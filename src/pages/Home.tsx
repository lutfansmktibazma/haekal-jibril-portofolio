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
import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const heroRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Auto scroll - berhenti hanya pas di-touch/klik
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animFrame: number;
    const speed = 0.5;

    const autoScroll = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animFrame = requestAnimationFrame(autoScroll);
    };

    animFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animFrame);
  }, [isPaused]);

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
            className="relative h-full flex flex-col justify-end px-8 md:px-16 pb-32 md:pb-40"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="space-y-3 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Label */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
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

              {/* Tagline - fade */}
              <motion.p
                className="text-[9px] md:text-xs font-light tracking-[0.2em] text-white/60 uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                {photographerInfo.tagline.toUpperCase()}
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
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

              {/* Kiri */}
              <div className="space-y-4">
                <ScrollReveal>
                  <span className="text-[10px] font-light tracking-[0.3em] text-muted-foreground uppercase">
                    About
                  </span>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <h2 className="text-3xl md:text-5xl font-light tracking-wide leading-tight">
                    The Story <br />
                    <span className="text-muted-foreground">Behind the</span> <br />
                    Lens
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-foreground hover:text-muted-foreground transition-colors group mt-4"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </ScrollReveal>
              </div>

              {/* Kanan */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-4 border-l border-border pl-8">
                  <p className="text-sm md:text-base font-light leading-relaxed text-muted-foreground">
                    {Array.from(photographerInfo.biography.split('\n\n')[0]).map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.01,
                          delay: i * 0.008,
                        }}
                        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </p>
                </div>
              </ScrollReveal>

            </div>
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
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Carousel - auto scroll, berhenti pas touch/klik */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide pl-6 md:pl-8"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
          >
            <div className="flex gap-4 md:gap-6 w-max pr-6 md:pr-8">
              {[...featuredProjects, ...featuredProjects].map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="w-[75vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0"
                >
                  <ProjectCard
                    project={project}
                    aspectRatio="portrait"
                    showCategory={true}
                    index={index % featuredProjects.length}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Swipe hint */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center mt-2 px-6 md:px-8">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-[1px] bg-muted-foreground/20 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-muted-foreground"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: '50%' }}
                  />
                </div>
                <span className="text-[10px] font-light tracking-[0.3em] text-muted-foreground/50 uppercase">
                  Swipe to explore
                </span>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}