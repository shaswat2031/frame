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

  const [visionStage, setVisionStage] = useState(0); // 0: Init, 1: Scanning, 2: Calibrating, 3: Completed
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Start automated optical sequence
    const timers = [
      setTimeout(() => setVisionStage(1), 800),    // Start Scan
      setTimeout(() => setVisionStage(2), 2400),   // Calibrate
      setTimeout(() => setVisionStage(3), 3800)    // Crystallize
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-navy text-cream overflow-hidden">
      <Navbar />

      {/* AUTOMATED OPTICAL SEQUENCE OVERLAY */}
      <AnimatePresence>
        {visionStage < 3 && (
          <motion.div
            key="optical-overlay"
            exit={{ 
              opacity: 0,
              scale: 1.5,
              filter: "blur(40px)",
              transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] }
            }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy"
          >
            {/* Viewfinder & Optical HUD */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner Brackets */}
              <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-gold/30" />
              <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-gold/30" />
              <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-gold/30" />
              
              {/* Technical Data Streams */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-4">
                 {[...Array(4)].map((_, i) => (
                   <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 5, 0] }}
                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                    className="w-16 h-[1px] bg-gold/20" 
                   />
                 ))}
              </div>
            </div>

            {/* Background Branding (Focusing Title) */}
            <div className="relative flex items-center justify-center w-full">
              <motion.h1
                animate={{
                  filter: visionStage === 0 ? "blur(60px)" : visionStage === 1 ? "blur(30px)" : "blur(8px)",
                  scale: visionStage === 0 ? 0.8 : visionStage === 1 ? 0.95 : 1.1,
                  opacity: visionStage === 0 ? 0.05 : visionStage === 1 ? 0.15 : 0.3
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-[20vw] font-serif italic tracking-tighter text-gold select-none uppercase"
              >
                {brand.name}
              </motion.h1>

              {/* Central Lens Element */}
              <motion.div
                animate={{
                  scale: visionStage === 2 ? [1, 1.1, 1] : 1,
                  opacity: visionStage > 0 ? 1 : 0
                }}
                transition={{ duration: 1.5, repeat: visionStage === 2 ? Infinity : 0 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="relative w-[35vw] h-[35vw] flex items-center justify-center">
                  {/* Rotating Mechanical Rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-gold/10 rounded-full" 
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border border-gold/20 rounded-full border-dashed" 
                  />
                  
                  {/* The Precision Lens View */}
                  <motion.div
                    animate={{ 
                      backdropFilter: visionStage === 2 ? "blur(0px)" : "blur(10px)",
                      backgroundColor: visionStage === 2 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)"
                    }}
                    className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-gold/30 shadow-[0_0_50px_rgba(201,168,76,0.1)]"
                  >
                    <motion.h2 
                       animate={{ opacity: visionStage > 1 ? 1 : 0.3 }}
                       className="text-4xl md:text-6xl font-serif italic text-gold tracking-widest uppercase"
                    >
                      {brand.name}
                    </motion.h2>
                    
                    {/* Scanning Line */}
                    <motion.div 
                      animate={{ y: ["-150%", "150%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-[2px] bg-gold/40 shadow-[0_0_15px_#C9A84C]"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Status Feed */}
            <div className="mt-24 text-center">
              <div className="inline-flex flex-col items-center">
                <div className="flex items-center gap-4 mb-3">
                   <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-teal rounded-full shadow-[0_0_10px_#7ECAC3]" 
                   />
                   <span className="text-[10px] uppercase tracking-[0.6em] text-teal font-bold">
                    {visionStage === 0 ? "Initializing" : visionStage === 1 ? "Optical Scan" : "Phase Lock"}
                   </span>
                </div>
                
                <div className="h-1 w-64 bg-white/5 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: visionStage === 0 ? "20%" : visionStage === 1 ? "60%" : "100%" }}
                    className="h-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                  />
                </div>

                <div className="flex gap-12 font-mono text-[9px] text-gold/40 uppercase">
                  <div className="flex flex-col">
                    <span>Precision</span>
                    <span className="text-gold">99.8%</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Focus</span>
                    <span className="text-gold">Auto</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Index</span>
                    <span className="text-gold">1.74-HS</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVEALED CONTENT */}
      <motion.div 
        animate={{
          filter: visionStage < 3 ? 'blur(40px)' : 'blur(0px)',
          opacity: visionStage < 3 ? 0 : 1,
          scale: visionStage < 3 ? 1.1 : 1
        }}
        transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
        className="min-h-screen"
      >
        <section className="pt-40 pb-24 px-6">
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

            {/* Brand Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-navy-surface border border-white/5 rounded-[40px] p-8 hover:border-gold/30 transition-all cursor-pointer overflow-hidden relative"
                >
                  <div className="aspect-[4/3] bg-navy-deep rounded-3xl mb-8 overflow-hidden relative">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-40 h-1 bg-gold/50 rounded-full" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="text-xl font-serif tracking-widest mb-1">{brand.name} Style {i}0{i}</h3>
                      <p className="text-[10px] text-teal uppercase tracking-widest">Handcrafted Titanium</p>
                    </div>
                    <span className="text-gold font-mono">$480.00</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </motion.div>
    </main>
  );
}
