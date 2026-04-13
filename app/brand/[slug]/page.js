'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useParams } from 'next/navigation';

const BRANDS = {
  "ray-ban": { name: "Ray-Ban", logo: "RAY-BAN", bio: "Iconic timelessness since 1937." },
  "oakley": { name: "Oakley", origin: "Oakley", bio: "Performance-driven innovation for athletes." },
  "gucci": { name: "Gucci", logo: "GUCCI", bio: "Luxury defined by bold Italian heritage." },
  "prada": { name: "Prada", logo: "PRADA", bio: "Sophisticated minimalism from Milan." },
  "versace": { name: "Versace", logo: "VERSACE", bio: "Unapologetic glamour and architectural frames." },
  "tom-ford": { name: "Tom Ford", logo: "TOM FORD", bio: "The pinnacle of executive luxury." },
  "carrera": { name: "Carrera", logo: "CARRERA", bio: "Racing heritage infused with modern style." },
};

export default function BrandPage() {
  const { slug } = useParams();
  const brand = BRANDS[slug] || { name: slug.toUpperCase(), bio: "A legacy of precision." };

  const [visionStage, setVisionStage] = useState(0); // 0: Blurry, 1: Trying Lens, 2: Clear
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-navy text-cream">
      <Navbar />

      {/* UNIQUE TRANSITION OVERLAY */}
      <AnimatePresence>
        {visionStage < 2 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy transition-all duration-1000 ${visionStage === 0 ? 'backdrop-blur-[100px]' : ''}`}
          >
            {/* Blurry Brand Title */}
            <motion.h1
              animate={{
                filter: visionStage === 0 ? "blur(30px)" : "blur(8px)",
                scale: visionStage === 0 ? 0.8 : 1.1
              }}
              className="text-[15vw] font-serif italic tracking-tighter text-gold/20 select-none uppercase"
            >
              {brand.name}
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-12 text-center max-w-sm px-6"
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-teal font-bold mb-8">
                {visionStage === 0 ? "Select Optical Solution to Reveal Heritage" : "Testing Index Lens..."}
              </p>

              <div className="flex justify-center gap-6">
                {[1.50, 1.67, 1.74].map((index, i) => (
                  <button
                    key={index}
                    onClick={() => setVisionStage(1)}
                    onDoubleClick={() => setVisionStage(2)}
                    className="group flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-full border border-gold/30 group-hover:border-gold flex items-center justify-center bg-white/5 backdrop-blur-md transition-all">
                      <span className="text-[10px] font-mono text-gold opacity-60 group-hover:opacity-100">{index}</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-cream/40">Try Lens</span>
                  </button>
                ))}
              </div>

              {visionStage === 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setVisionStage(2)}
                  className="mt-16 bg-gold text-navy px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] animate-pulse"
                >
                  Crystallize Vision
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTUAL CONTENT (Revealed) */}
      <div className={`transition-all duration-1000 ${visionStage < 2 ? 'blur-[50px] pointer-events-none' : 'blur-0'}`}>
        <section className="pt-40 pb-24 px-6 min-h-screen">
          <div className="container mx-auto">
            <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-gold/10 pb-12">
              <div className="max-w-2xl">
                <span className="text-teal uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Official Partner</span>
                <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter mb-8">{brand.name}</h1>
                <p className="text-xl md:text-2xl font-light text-cream/70 leading-relaxed max-w-xl italic">
                  &quot;{brand.bio}&quot;
                </p>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Authored Inventory</div>
                <div className="text-4xl font-mono text-gold/60 tracking-tighter">OCT-2024 / VERIFIED</div>
              </div>
            </header>

            {/* Simulated Grid for Brand Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-navy-surface border border-white/5 rounded-[40px] p-8 hover:border-gold/30 transition-all cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-navy-deep rounded-3xl mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                      <div className="w-40 h-1 h-0.5 bg-gold/50 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif tracking-widest mb-1">{brand.name} Style {i}0{i}</h3>
                      <p className="text-[10px] text-teal uppercase tracking-widest">Handcrafted Titanium</p>
                    </div>
                    <span className="text-gold font-mono">$480.00</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}
