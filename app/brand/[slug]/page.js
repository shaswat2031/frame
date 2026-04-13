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

  const [visionStage, setVisionStage] = useState(0); // 0: Extreme Blur, 1: Lens Applied, 2: Crystallized
  const [mounted, setMounted] = useState(false);
  const [activeLensIndex, setActiveLensIndex] = useState(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-navy text-cream overflow-hidden">
      <Navbar />

      {/* OPTICAL EXAMINATION OVERLAY */}
      <AnimatePresence mode="wait">
        {visionStage < 2 && (
          <motion.div
            key="optical-overlay"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 2,
              filter: "blur(20px)",
              transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
            }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy"
          >
            {/* Viewfinder Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-gold/20" />
              <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-gold/20" />
              <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-gold/20" />
              <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-gold/20" />
              
              {/* Vertical/Horizontal lines */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gold/10" />
              <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gold/10" />
            </div>

            {/* Blurry Background Text (Heritage Reveal) */}
            <div className="relative">
              <motion.h1
                animate={{
                  filter: visionStage === 0 ? "blur(40px)" : "blur(12px)",
                  scale: visionStage === 0 ? 0.9 : 1.1,
                  opacity: visionStage === 0 ? 0.1 : 0.3,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-[18vw] font-serif italic tracking-tighter text-gold/40 select-none uppercase text-center"
              >
                {brand.name}
              </motion.h1>

              {/* Focus Ring / Lens Effect */}
              <AnimatePresence>
                {visionStage === 1 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 3, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="w-[30vw] h-[30vw] border-4 border-gold/40 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 border border-gold/20 rounded-full animate-[spin_10s_linear_infinite]" />
                      <div className="w-full h-full bg-white/5 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center">
                         {/* Clear view through the lens */}
                         <h2 className="text-4xl font-serif italic text-gold">{brand.name}</h2>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interaction Panel */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-24 relative z-20 text-center max-w-2xl px-6"
            >
              <div className="mb-12 space-y-2">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[10px] uppercase tracking-[0.5em] text-teal font-bold block"
                >
                  {visionStage === 0 ? "Scanning Optical DNA" : "Index Alignment: OK"}
                </motion.span>
                <h3 className="text-gold/60 text-[10px] uppercase tracking-widest">
                  {visionStage === 0 ? "Select refractive index to initiate deep focus" : "Optimal clarity detected. Press to Crystallize."}
                </h3>
              </div>

              <div className="flex justify-center gap-8 mb-16">
                {[1.50, 1.67, 1.74].map((index, i) => (
                  <button
                    key={index}
                    onClick={() => {
                      setVisionStage(1);
                      setActiveLensIndex(index);
                    }}
                    className="group relative flex flex-col items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        activeLensIndex === index 
                        ? 'border-gold bg-gold/10' 
                        : 'border-gold/20 bg-white/5 hover:border-gold/50'
                      }`}
                    >
                      <span className={`text-xs font-mono ${activeLensIndex === index ? 'text-gold' : 'text-gold/40'}`}>
                        {index}
                      </span>
                    </motion.div>
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex flex-col items-center">
                         <div className="w-[1px] h-4 bg-gold/50" />
                         <span className="text-[8px] uppercase tracking-tighter text-gold">Apply Lens</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {visionStage === 1 && (
                <motion.button
                  key="crystallize-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 168, 76, 0.2)" }}
                  onClick={() => setVisionStage(2)}
                  className="bg-gold text-navy px-16 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] relative group overflow-hidden"
                >
                  <span className="relative z-10">Crystallize Heritage</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
              )}
            </motion.div>

            {/* Digital Data Stream (Technical Detail) */}
            <div className="absolute bottom-10 left-10 hidden lg:block font-mono text-[8px] text-gold/30 space-y-1">
               <p>REF_ID: {slug?.toUpperCase()}</p>
               <p>STATUS: {visionStage === 0 ? "CALIBRATING" : "LENS_LOCKED"}</p>
               <p>VERT_SYNC: ENABLED</p>
            </div>
            <div className="absolute bottom-10 right-10 hidden lg:block font-mono text-[8px] text-gold/30 text-right space-y-1">
               <p>ISO: 100</p>
               <p>F_STOP: f/1.8</p>
               <p>SHUTTER: 1/125s</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTUAL CONTENT (Revealed via focus shift) */}
      <motion.div 
        animate={{
          filter: visionStage < 2 ? 'blur(60px)' : 'blur(0px)',
          scale: visionStage < 2 ? 1.05 : 1,
          opacity: visionStage < 2 ? 0 : 1
        }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
        className="min-h-screen"
      >
        <section className="pt-40 pb-24 px-6">
          <div className="container mx-auto">
            <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-gold/10 pb-12">
              <div className="max-w-2xl">
                <span className="text-teal uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Official Partner</span>
                <motion.h1 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="text-7xl md:text-9xl font-serif italic tracking-tighter mb-8"
                >
                  {brand.name}
                </motion.h1>
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
                  
                  {/* Subtle hover background effect */}
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
