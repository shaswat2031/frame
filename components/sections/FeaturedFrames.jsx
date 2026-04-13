'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TryOnModal from '@/components/ui/TryOnModal';

const filters = ['All', 'Men', 'Women', 'Kids', 'Sport', 'Luxury'];

const products = [
  { brand: 'RAY-BAN', name: 'Aviator Classic', price: '21,500', oldPrice: '24,000', category: 'Men' },
  { brand: 'TOM FORD', name: 'Fausto Squared', price: '45,000', oldPrice: '52,000', category: 'Luxury' },
  { brand: 'OAKLEY', name: 'Holbrook Prizm', price: '18,200', category: 'Sport' },
  { brand: 'CARTIER', name: 'Panthère de Cartier', price: '125,000', category: 'Luxury' },
  { brand: 'PRADA', name: 'PR 17WS Rectangular', price: '32,400', oldPrice: '38,000', category: 'Women' },
  { brand: 'GUCCI', name: 'GG0062S Aviator', price: '38,900', category: 'Luxury' },
];

export default function FeaturedFrames() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-cream font-serif">New Arrivals</h2>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gold border-gold text-navy' 
                    : 'border-gold/20 text-cream/50 hover:border-gold/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.filter(p => activeFilter === 'All' || p.category === activeFilter).map((product, i) => (
            <motion.div
              layout
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-navy-surface border border-gold/5 overflow-hidden flex items-center justify-center p-12">
                {/* Product Placeholder UI */}
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] flex items-center justify-center">
                  <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                    <path d="M20 60C20 40 40 30 60 30H90C110 30 120 40 120 60V70C120 90 110 100 90 100H60C40 100 20 90 20 70V60Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M120 50C120 50 130 40 150 40C170 40 180 50 180 50" stroke="currentColor" strokeWidth="2" />
                    <path d="M180 60C180 40 200 30 220 30H250C270 30 280 40 280 60V70C280 90 270 100 250 100H220C200 100 180 90 180 70V60Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="bg-cream text-navy px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-colors"
                  >
                    Try Virtually
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-2 relative">
                <span className="text-[10px] uppercase tracking-[0.2em] text-teal font-bold">{product.brand}</span>
                <h3 className="text-xl font-serif text-cream">{product.name}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-gold font-accent tracking-wider">Rs. {product.price}</span>
                  {product.oldPrice && (
                    <span className="text-cream/30 text-sm line-through">Rs. {product.oldPrice}</span>
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
