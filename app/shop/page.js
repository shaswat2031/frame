'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// ── PRODUCTS DATA ──
const products = [
  { id: 'VIS-001', name: 'THE ARCHITECT', price: '$450', details: 'TITANIUM / OPTICAL', stock: 'LIMITED', image: '/products/architect.png' },
  { id: 'VIS-002', name: 'V-PRO 01', price: '$520', details: 'CARBON / SUN', stock: 'IN STOCK', image: '/products/vpro01.png' },
  { id: 'VIS-003', name: 'LUMINA', price: '$480', details: 'ACETATE / OPTICAL', stock: 'IN STOCK', image: '/products/lumina.png' },
  { id: 'VIS-004', name: 'ECLIPSE', price: '$590', details: 'TITANIUM / POLARIZED', stock: 'BACKORDER' },
  { id: 'VIS-005', name: 'HORIZON', price: '$410', details: 'MIXED / OPTICAL', stock: 'IN STOCK' },
  { id: 'VIS-006', name: 'AURA', price: '$550', details: 'GOLD PLATE / SUN', stock: 'LIMITED' },
  { id: 'VIS-007', name: 'NEXUS', price: '$490', details: 'CARBON / OPTICAL', stock: 'IN STOCK' },
  { id: 'VIS-008', name: 'QUANTUM', price: '$610', details: 'TITANIUM / SUN', stock: 'WAITLIST' },
];

export default function ShopPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen relative pt-32 pb-32 bg-navy text-cream"
    >
      <main className="w-full">
        {/* ── SHOP HERO ── */}
        <section className="container mx-auto px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gold/20 pb-12 transition-colors duration-500">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3"
              >
                <span className="w-8 h-px bg-gold" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gold">
                  DISCOVER THE COLLECTION
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter"
              >
                CURATED <br />
                <span className="italic font-serif text-gold">MASTERPIECES.</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-[10px] tracking-[0.2em] space-y-2 uppercase text-right text-cream/50"
            >
              <p>Total Assets: {products.length < 10 ? `0${products.length}` : products.length}</p>
              <p>Edition: V4.A</p>
              <p>Status: Global Disp</p>
            </motion.div>
          </div>
        </section>

        {/* ── ALERTS / TICKER (OPTIONAL SHOP WIDE) ── */}
        <div className="border-y border-gold/20 py-3 mb-24 overflow-hidden relative bg-gold/5 transition-colors duration-500">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap items-center font-mono text-[9px] tracking-[0.4em] uppercase text-cream/70"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="mx-10">COMPLIMENTARY GLOBAL SHIPPING ON ALL ORDERS OVER $400 <span className="mx-10 text-gold">◆</span> ACUITY CERTIFIED LENSES <span className="mx-10 text-gold">◆</span></span>
            ))}
          </motion.div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col"
              >
                <Link href={`/shop/${product.id}`} className="cursor-pointer">
                  {/* Product Image Area */}
                  <div 
                    className="relative aspect-[3/4] w-full mb-6 overflow-hidden bg-navy-surface transition-colors duration-500"
                  >
                    <div className="absolute inset-0 border border-gold/10 transition-all duration-500 z-10 group-hover:border-gold/40" />
                    
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-transparent transition-colors duration-500 z-20 group-hover:border-gold" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent transition-colors duration-500 z-20 group-hover:border-gold" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-transparent transition-colors duration-500 z-20 group-hover:border-gold" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-transparent transition-colors duration-500 z-20 group-hover:border-gold" />
                    
                    {/* Placeholder for Product Image */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <span className="text-cream/20 font-mono text-[10px] tracking-[0.2em]">[ {product.id} ] {/* RENDER_SHOT_01 */}</span>
                      )}
                    </div>

                    {/* Stock Badge */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <span 
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          product.stock === 'IN STOCK' ? 'bg-teal' : 
                          (product.stock === 'LIMITED' ? 'bg-gold' : 'bg-transparent border border-cream/50')
                        }`} 
                      />
                      <span className="text-[8px] font-mono tracking-[0.2em] text-cream/70 bg-navy/40 backdrop-blur-sm px-2 py-0.5">{product.stock}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 backdrop-blur-[2px]">
                      <span 
                        className="px-8 py-3 text-[10px] tracking-[0.2em] font-mono border border-gold text-gold bg-navy transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                      >
                        VIEW PIECE
                      </span>
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-light tracking-wide group-hover:text-gold transition-colors">{product.name}</h3>
                      <p className="font-mono text-[10px] tracking-[0.15em] text-cream/60">
                        {product.id} {'//'} {product.details}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-serif italic text-gold">{product.price}</span>
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
