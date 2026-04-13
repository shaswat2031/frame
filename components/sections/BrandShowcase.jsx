'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const brands = [
  { slug: "ray-ban", name: "Ray-Ban", origin: "Milan, Italy", count: "142 styles", size: "large", gradient: "from-red-900/10 to-transparent" },
  { slug: "oakley", name: "Oakley", origin: "California, USA", count: "89 styles", size: "small", gradient: "from-orange-900/10 to-transparent" },
  { slug: "gucci", name: "Gucci", origin: "Florence, Italy", count: "112 styles", size: "small", gradient: "from-green-900/10 to-transparent" },
  { slug: "prada", name: "Prada", origin: "Milan, Italy", count: "76 styles", size: "small", gradient: "from-gold/10 to-transparent" },
  { slug: "versace", name: "Versace", origin: "Reggio Calabria, Italy", count: "94 styles", size: "small", gradient: "from-gold/20 to-transparent" },
  { slug: "tom-ford", name: "Tom Ford", origin: "Austin, USA", count: "65 styles", size: "small", gradient: "from-stone-900/10 to-transparent" },
  { slug: "carrera", name: "Carrera", origin: "Verona, Italy", count: "54 styles", size: "small", gradient: "from-blue-900/10 to-transparent" },
];

export default function BrandShowcase() {
  return (
    <section className="py-24 bg-navy">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-teal uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">The Global Collection</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight italic text-cream">Shop By Heritage</h2>
          </div>
          <Link href="/collections" className="text-gold uppercase tracking-widest text-[10px] border-b border-gold/30 pb-2 hover:border-gold transition-all">
            Explore All Brands →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[800px]">
          {/* Main Large Card */}
          <BrandCard
            data={brands[0]}
            className="md:col-span-2 md:row-span-2 h-[400px] md:h-full"
          />

          <BrandCard data={brands[1]} className="h-[250px] md:h-full" />
          <BrandCard data={brands[2]} className="h-[250px] md:h-full" />

          {/* Bottom Row */}
          <BrandCard data={brands[3]} className="h-[250px] md:h-full" />
          <BrandCard data={brands[4]} className="h-[250px] md:h-full" />
          <BrandCard data={brands[5]} className="h-[250px] md:h-full" />
          <BrandCard data={brands[6]} className="h-[250px] md:h-full" />
        </div>
      </div>
    </section>
  );
}

function BrandCard({ data, className }) {
  return (
    <Link href={`/brand/${data.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative group rounded-3xl overflow-hidden bg-navy-surface border border-gold/5 cursor-pointer h-full ${className}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

        {/* Abstract Optical Graphics */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:scale-125">
          <div className="w-64 h-64 border border-cream rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute w-40 h-40 border border-gold rounded-full" />
        </div>

        <div className="absolute bottom-0 left-0 p-10 w-full z-10">
          <span className="text-[8px] uppercase tracking-widest text-teal font-bold mb-2 block">{data.origin}</span>
          <h3 className="text-3xl md:text-4xl font-serif text-cream italic tracking-tight group-hover:text-gold transition-colors">{data.name}</h3>
          <div className="w-0 group-hover:w-16 h-[1px] bg-gold mt-4 transition-all duration-500" />
          <p className="text-cream/30 text-[9px] uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
            Discover {data.count}
          </p>
        </div>

        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500 rounded-3xl pointer-events-none" />
      </motion.div>
    </Link>
  );
}
