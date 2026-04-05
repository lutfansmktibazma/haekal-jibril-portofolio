import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { photographerInfo } from '@/data/photographer';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isTransparent = location.pathname === '/' && !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'text-sm font-light tracking-widest transition-all duration-300',
              isTransparent
                ? 'text-white hover:text-white/80'
                : 'text-foreground hover:text-foreground/80'
            )}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {photographerInfo.name.toUpperCase()}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    "relative text-sm leading-7 font-light tracking-wide transition-colors duration-300 group",
                    isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/80"
                  )}
                >
                  {link.name}

                  {/* Hover underline */}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300",
                    isTransparent ? "bg-white/50" : "bg-foreground/40"
                  )} />

                  {/* Active underline */}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className={cn("absolute -bottom-1 left-0 right-0 h-px", isTransparent ? "bg-white" : "bg-foreground")}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'size-9',
                    isTransparent && 'text-white hover:bg-white/10'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-background/95 backdrop-blur-xl border-l border-border/50">
                <div className="flex flex-col h-full py-8 px-6">

                  {/* Logo di dalam menu */}
                  <p className="text-sm font-light tracking-widest text-muted-foreground uppercase mb-12">
                    {photographerInfo.name}
                  </p>

                  {/* Nav Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between py-4 border-b border-border/30 transition-colors duration-300 group",
                            location.pathname === link.path
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground/50 font-light tracking-widest">
                              0{index + 1}
                            </span>
                            <span className="text-2xl font-light tracking-wide">
                              {link.name}
                            </span>
                          </div>
                          <motion.span
                            className="text-muted-foreground/50 group-hover:text-foreground transition-colors"
                            animate={{ x: location.pathname === link.path ? 4 : 0 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Bottom info */}
                  <div className="mt-auto space-y-2">
                    <p className="text-xs text-muted-foreground/50 font-light tracking-widest uppercase">
                      {photographerInfo.tagline}
                    </p>
                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}