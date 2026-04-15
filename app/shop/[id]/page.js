'use client';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const products = [
  { 
    id: 'VIS-001', 
    name: 'THE ARCHITECT', 
    price: '$450', 
    details: 'TITANIUM / OPTICAL', 
    stock: 'LIMITED',
    image: '/products/architect.png',
    description: 'A masterclass in structural minimalism. Inspired by brutalist 20th-century architecture, the Architect features a screwless tension-hinge system and a hand-polished beta-titanium chassis.',
    specs: [
      { label: 'Material', value: 'Beta-Titanium 15-3-3-3' },
      { label: 'Weight', value: '18.4 Grams' },
      { label: 'Lenses', value: 'Acuity Certified™ Clear' },
      { label: 'Hinge', value: 'Tension-Lock™ Helix' }
    ],
    features: [
      "Precision-engineered beta-titanium",
      "Screwless tension hinging system",
      "Signature 'Frame' branding on internal temple",
      "Adjustable silicon nose pads for custom fit"
    ]
  },
  { 
    id: 'VIS-002', 
    name: 'V-PRO 01', 
    price: '$520', 
    details: 'CARBON / SUN', 
    stock: 'IN STOCK',
    image: '/products/vpro01.png',
    description: 'High-velocity design for the modern vanguard. The V-PRO 01 utilizes woven carbon fiber layers for unparalleled rigidity and a weight-to-strength ratio that exceeds aerospace standards.',
    specs: [
      { label: 'Material', value: 'Aramid Carbon Fiber' },
      { label: 'Weight', value: '22.1 Grams' },
      { label: 'Lenses', value: 'Polarized Onyx' },
      { label: 'Coating', value: 'Anti-Hydrophobic' }
    ],
    features: [
      "Multi-layer aerospace-grade carbon fiber",
      "Polarized category 3 sun lenses",
      "Ultra-lightweight high-rigidity construction",
      "Internal anti-reflective coating"
    ]
  },
  { 
    id: 'VIS-003', 
    name: 'LUMINA', 
    price: '$480', 
    details: 'ACETATE / OPTICAL', 
    stock: 'IN STOCK',
    image: '/products/lumina.png',
    description: 'Warmth meets precision. Lumina is carved from a single block of vintage-aged Italian acetate, featuring embedded gold-wire cores for lifetime adjustability.',
    specs: [
      { label: 'Material', value: 'Mazzucchelli Acetate' },
      { label: 'Weight', value: '28.0 Grams' },
      { label: 'Finish', value: 'High-Gloss Hand Wax' },
      { label: 'Hardware', value: '18k Gold Plated' }
    ],
    features: [
      "Traditional rivets for maximum durability",
      "Exclusive Italian signature acetate",
      "Polished by hand for 48 hours",
      "Anatomically contoured bridge"
    ]
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-40 pb-32 bg-navy text-cream overflow-hidden"
    >
      <main className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* IMAGE AREA */}
          <div className="sticky top-40">
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] bg-navy-surface border border-gold/10 flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
              
              {product.image ? (
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="relative z-10 text-cream/20 font-mono text-[10px] tracking-[0.5em] rotate-90 whitespace-nowrap">
                  {product.id} {/* RENDER_SHOT_01 */}
                </div>
              )}

              <div className="absolute top-8 left-8 z-20">
                <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase bg-navy/50 backdrop-blur-md px-3 py-1 border border-gold/20">{product.stock}</span>
              </div>
              
              {/* Decorative technical markers */}
              <div className="absolute bottom-8 right-8 z-20 font-mono text-[6px] text-gold/40 flex flex-col items-end gap-1 uppercase">
                <span>COORD: 34.0522° N, 118.2437° W</span>
                <span>MODEL: PRTOTY-V.01</span>
              </div>
            </motion.div>
            
            {/* Gallery Thumbs */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-navy-surface border border-gold/5 flex items-center justify-center cursor-pointer hover:border-gold/30 transition-all duration-300 relative group overflow-hidden">
                  <span className="font-mono text-[6px] text-cream/30 group-hover:text-gold transition-colors">V.{i}</span>
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="space-y-16">
            <header className="space-y-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-px bg-gold" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase">{product.details}</span>
              </motion.div>
              
              <div className="space-y-2">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-8xl font-light tracking-tighter leading-none"
                >
                  {product.name}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-mono text-[10px] tracking-[0.2em] text-cream/40"
                >
                  SERIAL: {product.id} SKU-{product.id.split('-')[1]}
                </motion.div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-serif italic text-gold"
              >
                {product.price}
              </motion.p>
            </header>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">Description</h3>
                <p className="text-lg font-light leading-relaxed text-cream/80 max-w-xl">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-gold/10">
                <div className="space-y-6">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">Specifications</h3>
                  <div className="space-y-4">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase">{spec.label}</span>
                        <span className="text-sm font-light tracking-wide">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features?.map((feature, i) => (
                      <li key={i} className="flex gap-3 text-xs font-light text-cream/60 leading-relaxed">
                        <span className="text-gold">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-10"
            >
              <button className="flex-1 bg-gold text-navy py-6 font-mono text-[11px] font-bold tracking-[0.3em] uppercase hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1 active:scale-95 text-center">
                ADD TO ARCHIVE
              </button>
            </motion.div>

            {/* Availability Note */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-8 border-y border-gold/5 font-mono text-[8px] tracking-[0.3em] text-cream/30 uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>30 Day Returns</span>
              </div>
            </div>
          </div>

        </div>

        {/* RELATED SECTION */}
        <section className="mt-48 border-t border-gold/10 pt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-none">
              SIMILAR <br/>
              <span className="italic font-serif text-gold">COMPOSITIONS.</span>
            </h2>
            <Link href="/shop" className="group font-mono text-[10px] tracking-[0.3em] text-gold hover:text-cream transition-colors flex items-center gap-2">
              VIEW FULL ARCHIVE 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.filter(p => p.id !== product.id).slice(0, 3).map((p) => (
              <Link href={`/shop/${p.id}`} key={p.id} className="group flex flex-col">
                <div className="aspect-[4/5] bg-navy-surface border border-gold/5 mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center">
                     {p.image ? (
                       <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                     ) : (
                       <span className="text-cream/10 font-mono text-[8px] tracking-[0.5em]">[ {p.id} ]</span>
                     )}
                   </div>
                   <div className="absolute inset-0 bg-navy/20 group-hover:opacity-0 transition-opacity duration-500" />
                   <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                </div>
                <h3 className="text-2xl font-light tracking-tight group-hover:text-gold transition-colors">{p.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-cream/40 uppercase">{p.details}</span>
                  <span className="text-sm italic font-serif text-gold">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

    </motion.div>
  );
}
