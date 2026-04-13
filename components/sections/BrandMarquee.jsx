'use client';
import { motion } from 'framer-motion';

const brands = [
  'Ray-Ban', 'Oakley', 'Cartier', 'Tom Ford', 'Persol', 'Prada',
  'Lindberg', 'Silhouette', 'Dior', 'Gucci', 'Lafont', 'Maui Jim'
];

export default function BrandMarquee() {
  return (
    <div className="bg-navy-surface py-8 border-y border-gold/10 overflow-hidden group">
      <div className="container mx-auto px-6 flex items-center mb-4">
        <span className="text-[9px] uppercase tracking-[0.3em] text-teal font-bold mr-4">Official Stockist</span>
        <div className="h-[1px] flex-grow bg-gold/10" />
      </div>
      
      <div className="flex select-none overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap min-w-full items-center">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center px-12">
              <span className="text-cream/40 text-xl md:text-2xl font-serif tracking-widest uppercase hover:text-gold transition-colors duration-500 cursor-default">
                {brand}
              </span>
              <span className="mx-12 text-gold opacity-30">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
