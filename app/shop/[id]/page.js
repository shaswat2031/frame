'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { getMockProductById, getMockProducts } from '@/lib/mock-feed';
import { ChevronRight, Shield, Zap, RefreshCw, Layers } from 'lucide-react';

const products = getMockProducts();

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getMockProductById(id) || products[0];
  
  // Mock variants for better design
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium');
  
  // Synthetic gallery images (mixing actual product image with variations/placeholders)
  const images = useMemo(() => [
    product.image,
    // Using filtered versions or related unsplash images for variety
    `${product.image}&blur=10`,
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1400&q=80',
  ], [product.image]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="min-h-screen pt-40 pb-32 bg-navy text-cream overflow-hidden"
    >
      <main className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ── LEFT: IMAGE ARCHIVE ── */}
          <div className="lg:col-span-7 sticky top-40">
            <div className="relative">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] bg-navy-surface border border-gold/10 flex items-center justify-center overflow-hidden"
              >
                {/* Visual distortion/glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] z-10 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIdx}
                    initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {images[activeImageIdx] ? (
                      <Image 
                        src={images[activeImageIdx]} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-navy-deep">
                        <span className="font-mono text-[10px] tracking-[0.5em] text-gold/20">[ NO_SIG_DETECTED ]</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Technical HUD Overlays */}
                <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase bg-navy/60 backdrop-blur-md px-3 py-1 border border-gold/30">
                    {product.stockLabel || 'SECURE'}
                  </span>
                  <div className="h-px w-12 bg-gold/40" />
                </div>
                
                <div className="absolute bottom-8 left-8 z-20 font-mono text-[6px] text-gold/50 flex flex-col gap-1 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-teal animate-pulse rounded-full" />
                    <span>Optical Center: Calibrated</span>
                  </div>
                  <span>Axis: 180° / Sph: +0.25</span>
                </div>

                <div className="absolute bottom-8 right-8 z-20 font-mono text-[6px] text-gold/50 flex flex-col items-end gap-1 uppercase tracking-[0.2em]">
                  <span>V.UNIT: {product.id}</span>
                  <span>TIME: {new Date().toLocaleTimeString([], { hour12: false })}</span>
                </div>
              </motion.div>
              
              {/* Gallery Thumbs - Functional & Animated */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {images.map((img, i) => (
                  <motion.button 
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`aspect-square bg-navy-surface border transition-all duration-300 relative group overflow-hidden ${
                      activeImageIdx === i ? 'border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-gold/10 hover:border-gold/40'
                    }`}
                  >
                    <div className={`absolute inset-0 z-10 transition-opacity duration-300 ${activeImageIdx === i ? 'opacity-0' : 'opacity-40 group-hover:opacity-10 bg-navy'}`} />
                    <Image src={img} alt="thumb" fill className="object-cover" />
                    <div className="absolute bottom-1 right-1 z-20 font-mono text-[5px] text-gold/40">SHOT_0{i+1}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: SPECIFICATIONS ── */}
          <div className="lg:col-span-5 space-y-12">
            <header className="space-y-8">
              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase">{product.details || 'MASTERPIECE'}</span>
              </motion.div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center border border-gold/30 px-3 py-1 text-[8px] tracking-[0.2em] font-mono text-gold uppercase bg-gold/5">{product.brand}</span>
                  <span className="inline-flex items-center border border-cream/10 px-3 py-1 text-[8px] tracking-[0.2em] font-mono text-cream/40 uppercase bg-white/5">{product.category}</span>
                </div>
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.85] text-gold-gradient"
                >
                  {product.name}
                </motion.h1>
                <div className="flex items-baseline gap-6 mt-4">
                   <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-serif italic text-gold"
                  >
                    ${product.price}
                  </motion.p>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-cream/30 uppercase">Excl. Prescr. Lenses</span>
                </div>
              </div>
            </header>

            {/* Selection Controls */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-8 p-8 bg-navy-surface/50 border border-gold/10 backdrop-blur-md"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">Chassis Size</h3>
                  <span className="text-[10px] text-cream/30 font-mono">FIT_CALIB: {selectedSize.toUpperCase()}</span>
                </div>
                <div className="flex gap-3">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-3 text-[10px] tracking-[0.2em] font-mono border transition-all duration-300 ${
                        selectedSize === size 
                          ? 'border-gold bg-gold text-navy font-bold' 
                          : 'border-white/10 text-white/40 hover:border-gold/40'
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold text-navy py-5 font-mono text-[12px] font-bold tracking-[0.4em] uppercase transition-all duration-500 overflow-hidden relative group"
                >
                  <span className="relative z-10">ADD TO ARCHIVE</span>
                  <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-20" />
                </motion.button>
                <Link 
                  href={`/try-on?frame=${product.id}`}
                  className="w-full border border-gold/40 text-gold py-5 font-mono text-[10px] tracking-[0.4em] uppercase text-center hover:bg-gold/5 transition-colors"
                >
                  VIRTUAL TRY-ON
                </Link>
              </div>
            </motion.div>

            {/* Technical Specs Accordion-style layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase pb-4 border-b border-gold/10">Build Specs</h3>
                  <div className="space-y-5">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase">{spec.label}</span>
                        <span className="text-sm font-light tracking-wide text-cream/80">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase pb-4 border-b border-gold/10">Architecture</h3>
                  <ul className="space-y-4">
                    {product.features?.map((feature, i) => (
                      <li key={i} className="flex gap-3 text-[11px] font-light text-cream/50 leading-relaxed uppercase tracking-wider">
                        <span className="text-gold mt-1"><Layers size={10} /></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-6 py-10 border-y border-gold/10 font-mono text-[7px] tracking-[0.3em] text-cream/40 uppercase">
              <div className="flex flex-col items-center text-center gap-3">
                <Shield size={20} strokeWidth={1} className="text-gold/60" />
                <span>2 Year <br/> Global Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3 border-x border-gold/10">
                <Zap size={20} strokeWidth={1} className="text-gold/60" />
                <span>Express <br/> Archive Prep</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <RefreshCw size={20} strokeWidth={1} className="text-gold/60" />
                <span>30 Day <br/> Vision Period</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── RELATED SECTION ── */}
        <section className="mt-48 pt-24 border-t border-gold/10">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.85]">
              SIMILAR <br/>
              <span className="italic font-serif text-gold">COMPOSITIONS.</span>
            </h2>
            <Link href="/shop" className="group font-mono text-[11px] tracking-[0.4em] text-gold hover:text-cream transition-all flex items-center gap-4">
              VIEW ARCHIVE 
              <span className="p-2 border border-gold/20 rounded-full group-hover:border-gold group-hover:bg-gold group-hover:text-navy transition-all">
                <ChevronRight size={14} />
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link href={`/shop/${p.id}`} className="group flex flex-col">
                  <div className="aspect-[3/4] bg-navy-surface border border-gold/5 mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-gold/60 uppercase">{p.brand}</span>
                    <h3 className="text-2xl font-light tracking-tight group-hover:text-gold transition-colors">{p.name}</h3>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-mono text-[9px] tracking-[0.1em] text-cream/30 uppercase">{p.category}</span>
                      <span className="text-lg italic font-serif text-gold">${p.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
