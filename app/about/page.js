'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen pt-32 pb-32 bg-navy text-cream transition-colors duration-700"
    >
      <main className="container mx-auto px-6">
        <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gold/20 pb-12">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gold">OUR HERITAGE</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter">
              LEGACY OF <br /><span className="italic font-serif text-gold">VISION.</span>
            </motion.h1>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 relative aspect-[3/4] bg-navy-surface border border-gold/10 p-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-cream/30 font-mono text-[10px] tracking-[0.2em]">[ 1987 FOUNDRY PHOTO ]</span>
            </div>
            {/* Decals */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-cream/40">ARCHIVE: PNJ-87</div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-gold/50" />
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif italic text-gold">From Punjab to the World</h2>
              <p className="text-lg text-cream/80 font-light leading-relaxed">
                Founded in 1987, Eyeconic began as a singular vision in the heart of Punjab. Our mission was never merely to correct sight, but to elevate it. Eyewear is humanity's most intimate accessory—it alters perception, and in turn, how the world perceives you.
              </p>
            </div>
            
            <div className="w-full h-px bg-gold/10" />

            <div className="space-y-6">
              <h2 className="text-3xl font-serif italic text-gold">Craftsmanship Over Mass Production</h2>
              <p className="text-lg text-cream/80 font-light leading-relaxed">
                We believe in the enduring value of proper engineering. Every joint, every hinge, and every lacquer finish is curated with an obsessive attention to detail. Partnering with elite atoliers across Europe and Japan, we bridge the gap between architectural precision and timeless haute couture.
              </p>
            </div>

            <div className="flex gap-16 pt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-gold">
              <div>
                <span className="block text-3xl font-light text-cream mb-2 pl-2 border-l border-gold">39+</span>
                Years Mastered
              </div>
              <div>
                <span className="block text-3xl font-light text-cream mb-2 pl-2 border-l border-gold">100k</span>
                Acquired Frames
              </div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
