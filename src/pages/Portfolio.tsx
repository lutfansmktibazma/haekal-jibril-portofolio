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
        {/* Hero Section */}
        <section className="relative py-16 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-3">
                Portfolio
              </h1>
              <p className="text-base md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                A curated collection of photography spanning diverse subjects and styles
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-8 md:py-16 px-1 md:px-4">
          <PortfolioGrid projects={projects} />
        </section>

        <div className="h-16 md:h-24" />
      </div>
    </>
  );
}
