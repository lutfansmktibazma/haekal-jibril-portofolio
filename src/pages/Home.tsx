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
              poster="https://images.pexels.com/videos/2675516/free-video-2675516.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.opacity = '0';
              }}
            >
              <source src="https://videos.pexels.com/video-files/2675516/2675516-sd_960_540_24fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </motion.div>

          <motion.div className="relative h-full flex flex-col items-center justify-center px-6" style={{ opacity: heroOpacity }}>
            <motion.div
              className="text-center space-y-4 md:space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h1
                  className="text-4xl md:text-8xl lg:text-9xl font-extralight tracking-widest text-white"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {photographerInfo.name.toUpperCase()}
                </motion.h1>
              </motion.div>
              
              <motion.div className="overflow-hidden">
                <motion.p
                  className="text-lg md:text-2xl font-light tracking-wide text-white/90"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {photographerInfo.tagline}
                </motion.p>
              </motion.div>

              <motion.p
                className="text-sm md:text-lg font-light leading-relaxed text-white/70 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9 }}
              >
                {photographerInfo.heroIntroduction}
              </motion.p>
            </motion.div>

            <motion.div
              className="absolute bottom-12"
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
        <section className="py-16 md:py-32 px-6 lg:px-8 bg-warm-accent/30">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-light tracking-wide">
                  About My Work
                </h2>
                <div className="space-y-4 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                  <p>
                    {photographerInfo.biography.split('\n\n')[0]}
                  </p>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span>Learn More About Me</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 md:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4 px-6">
              <h2 className="text-3xl md:text-5xl font-light tracking-wide">
                Featured Projects
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-1 md:gap-4 px-1 md:px-0">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-12 md:mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-base md:text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
