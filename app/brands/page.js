'use client';
import { motion } from 'framer-motion';

const brands = [
  'CARTIER', 'TOM FORD', 'PRADA', 'GUCCI', 
  'LINDBERG', 'RAY-BAN', 'OAKLEY', 'SILHOUETTE',
  'MYKITA', 'OLIVER PEOPLES', 'DIOR', 'SAINT LAURENT'
];

export default function BrandsPage() {
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
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gold">OFFICIAL STOCKIST</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter">
              MAÎTRES <br /><span className="italic font-serif text-gold">LUNETIERS.</span>
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-mono text-[10px] tracking-[0.2em] uppercase text-right text-cream/50 space-y-2">
            <p>Partners: {brands.length}</p>
            <p>Auth: CERTIFIED 100%</p>
          </motion.div>
        </section>

        <section className="w-full">
          {brands.map((brand, idx) => (
            <motion.div 
              key={brand}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.7 }}
              className="group border-b border-gold/10 py-8 flex items-center justify-between cursor-pointer hover:bg-navy-surface transition-colors px-6 -mx-6"
            >
              <h2 className="text-4xl md:text-6xl font-light tracking-widest text-cream/60 group-hover:text-cream transition-colors duration-300">
                {brand}
              </h2>
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                EXPLORE →
              </span>
            </motion.div>
          ))}
        </section>
      </main>
    </motion.div>
  );
}
