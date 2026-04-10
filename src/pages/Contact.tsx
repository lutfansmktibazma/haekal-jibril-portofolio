import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { ContactForm } from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description={`Get in touch with ${photographerInfo.name} for photography inquiries, collaborations, and project bookings.`}
      />

      <div className="min-h-screen">
        {/* Main Content - asymmetric layout */}
        <section className="px-6 lg:px-12 pt-8 md:pt-16 pb-16 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 lg:gap-20">

              {/* Left column - contact info */}
              <motion.div
                className="md:col-span-5 space-y-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-4">
                  <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-light">
                    Get in Touch
                  </p>
                  <Separator className="w-12" />
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1]">
                    Let's create<br />
                    something<br />
                    <span className="italic">together.</span>
                  </h1>
                </div>

                {/* Contact details */}
                <div className="space-y-6 pt-4">
                  <a
                    href={`mailto:${photographerInfo.email}`}
                    className="group flex items-start gap-4 hover:opacity-70 transition-opacity"
                  >
                    <Mail className="size-4 mt-1 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Email</p>
                      <p className="text-sm md:text-base font-light flex items-center gap-1">
                        {photographerInfo.email}
                        <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${photographerInfo.phone}`}
                    className="group flex items-start gap-4 hover:opacity-70 transition-opacity"
                  >
                    <Phone className="size-4 mt-1 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Phone</p>
                      <p className="text-sm md:text-base font-light flex items-center gap-1">
                        {photographerInfo.phone}
                        <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <MapPin className="size-4 mt-1 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-light">Location</p>
                      <p className="text-sm md:text-base font-light">{photographerInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Availability badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-light">
                    {photographerInfo.availability}
                  </span>
                </div>
              </motion.div>

              {/* Right column - form */}
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="md:pl-8 md:border-l border-border">
                  <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-light mb-8">
                    Send a Message
                  </p>
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}
