'use client';
import { motion } from 'framer-motion';

const categories = [
  { name: "Men's Eyeglasses", count: "248 styles", size: "large", gradient: "from-blue-900/20 to-navy" },
  { name: "Sunglasses", count: "512 styles", size: "small", gradient: "from-gold/10 to-navy" },
  { name: "Women's", count: "315 styles", size: "small", gradient: "from-purple-900/20 to-navy" },
  { name: "Sports & Safety", count: "84 styles", size: "small", gradient: "from-teal/10 to-navy" },
  { name: "Kids' Frames", count: "120 styles", size: "small", gradient: "from-orange-900/20 to-navy" },
  { name: "Blue Light", count: "95 styles", size: "small", gradient: "from-cyan-900/20 to-navy" },
  { name: "Luxury Collection", count: "64 styles", size: "small", gradient: "from-gold/20 to-navy" },
];

export default function Categories() {
  return (
    <section className="py-24 bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-cream">Shop By Category</h2>
            <div className="h-1 w-20 bg-gold mt-4" />
          </div>
          <button className="text-gold uppercase tracking-widest text-[10px] hover:mr-2 transition-all">
            View All Collection →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[800px]">
          {/* Main Large Card */}
          <CategoryCard 
            data={categories[0]} 
            className="md:col-span-2 md:row-span-2 h-[400px] md:h-full"
          />
          
          <CategoryCard data={categories[1]} className="h-[250px] md:h-full" />
          <CategoryCard data={categories[2]} className="h-[250px] md:h-full" />
          
          {/* Bottom Row */}
          <CategoryCard data={categories[3]} className="h-[250px] md:h-full" />
          <CategoryCard data={categories[4]} className="h-[250px] md:h-full" />
          <CategoryCard data={categories[5]} className="h-[250px] md:h-full" />
          <CategoryCard data={categories[6]} className="h-[250px] md:h-full" />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ data, className }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative group rounded-lg overflow-hidden bg-navy-surface border border-gold/5 cursor-pointer ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
      
      {/* Decorative SVG Wireframe */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
        <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cream">
          <path d="M40 50C40 40 50 35 60 35H80C90 35 100 40 100 50V55C100 65 90 70 80 70H60C50 70 40 65 40 55V50Z" stroke="currentColor" strokeWidth="1" />
          <path d="M100 50C100 50 110 45 120 45" stroke="currentColor" strokeWidth="1" />
          <path d="M120 50C120 40 130 35 140 35H160C170 35 180 40 180 50V55C180 65 170 70 160 70H140C130 70 120 65 120 55V50Z" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <h3 className="text-2xl font-serif text-cream mb-1">{data.name}</h3>
        <p className="text-teal text-[10px] uppercase tracking-widest">{data.count}</p>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 transition-colors duration-500 rounded-lg pointer-events-none" />
    </motion.div>
  );
}
