'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TryOnModal from '@/components/ui/TryOnModal';
import { useCart } from '@/components/providers/CartProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedFrames({ initialProducts = [] }) {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['All', ...new Set(initialProducts.map(p => p.category))];

  const filteredProducts = initialProducts.filter(p => activeFilter === 'All' || p.category === activeFilter);

  return (
    <section className="py-24 bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-cream font-serif tracking-tight">Archives</h2>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 sm:px-6 sm:py-2.5 text-[9px] sm:text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gold border-gold text-navy shadow-lg shadow-gold/20' 
                    : 'border-gold/20 text-cream/50 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {filteredProducts.map((product, i) => (
            <motion.div
              layout
              key={product.sku || product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-navy-surface border border-gold/5 overflow-hidden flex items-center justify-center p-4 md:p-12">
                
                {product.image ? (
                   <Image 
                     src={product.image} 
                     alt={product.name} 
                     fill 
                     className="object-contain p-4 md:p-8 transition-transform duration-700 group-hover:scale-110"
                   />
                ) : (
                  <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] flex items-center justify-center border border-gold/10">
                    <svg width="100%" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto text-gold/20 group-hover:text-gold/40 transition-colors duration-500 max-w-[240px]">
                      <path d="M20 60C20 40 40 30 60 30H90C110 30 120 40 120 60V70C120 90 110 100 90 100H60C40 100 20 90 20 70V60Z" stroke="currentColor" strokeWidth="2" />
                      <path d="M120 50C120 50 130 40 150 40C170 40 180 50 180 50" stroke="currentColor" strokeWidth="2" />
                      <path d="M180 60C180 40 200 30 220 30H250C270 30 280 40 280 60V70C280 90 270 100 250 100H220C200 100 180 90 180 70V60Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                )}

                {/* Hover Action */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 md:gap-3 items-center justify-center p-2">
                  <Link 
                    href={`/shop/${product.id || product.sku}`}
                    className="w-full max-w-[140px] md:max-w-[160px] bg-cream text-navy py-2 md:py-3 text-[8px] md:text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full max-w-[140px] md:max-w-[160px] border border-gold text-gold py-2 md:py-3 text-[8px] md:text-[10px] uppercase tracking-widest font-bold hover:bg-gold hover:text-navy transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>

              <div className="mt-4 md:mt-6 space-y-1.5 md:space-y-2 relative">
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-teal font-bold">{product.brand}</span>
                <h3 className="text-sm sm:text-base md:text-xl font-serif text-cream truncate">{product.name}</h3>
                <div className="flex flex-wrap items-center gap-1.5 md:gap-3">
                  <span className="text-[10px] sm:text-xs md:text-base text-gold font-accent tracking-wider font-extrabold">
                     {(!product.price || product.price <= 0) ? 'Price on Request' : `₹ ${product.price.toLocaleString()}`}
                  </span>
                  {product.oldPrice && product.oldPrice > 0 && (
                    <span className="text-cream/30 text-[8px] md:text-sm line-through">₹ {product.oldPrice?.toLocaleString()}</span>
                  )}
                </div>
                
                {/* Hover underline effect */}
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
       </div>

       <TryOnModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
       />
     </section>
  );
}

