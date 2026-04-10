import { projects } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <>
      <SEOHead 
        title="Portfolio"
        description="Browse my complete photography portfolio featuring portraits, landscapes, editorial work, architecture, and documentary projects."
      />
      
      <div className="min-h-screen">
        {/* Minimal top spacing with project count */}
        <motion.div
          className="px-4 md:px-6 lg:px-12 pt-6 md:pt-12 pb-3 md:pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto flex items-baseline justify-between">
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-light">
              Selected Works
            </p>
            <p className="text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground/60 font-light">
              {projects.length} Projects
            </p>
          </div>
        </motion.div>

        {/* Portfolio Grid - edge-to-edge feel */}
        <section className="px-1 md:px-4 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <PortfolioGrid projects={projects} />
          </div>
        </section>
      </div>
    </>
  );
}
