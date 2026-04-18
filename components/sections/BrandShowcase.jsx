'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const brands = [
  {
    slug: "ray-ban",
    name: "Ray-Ban",
    origin: "Milan, Italy",
    year: "1937",
    count: 142,
    image: "/brands/rayban.png",
    accent: "#C41E3A",
  },
  {
    slug: "oakley",
    name: "Oakley",
    origin: "California, USA",
    year: "1975",
    count: 89,
    image: "/brands/oakley.png",
    accent: "#F26F21",
  },
  {
    slug: "gucci",
    name: "Gucci",
    origin: "Florence, Italy",
    year: "1921",
    count: 112,
    image: "/brands/gucci.png",
    accent: "#00A86B",
  },
  {
    slug: "prada",
    name: "Prada",
    origin: "Milan, Italy",
    year: "1913",
    count: 76,
    image: "/brands/prada.png",
    accent: "#C9A84C",
  },
  {
    slug: "versace",
    name: "Versace",
    origin: "Reggio Calabria, Italy",
    year: "1978",
    count: 94,
    image: "/brands/versace.png",
    accent: "#FFD700",
  },
  {
    slug: "tom-ford",
    name: "Tom Ford",
    origin: "Austin, USA",
    year: "2005",
    count: 65,
    image: "/brands/tomford.png",
    accent: "#8B7355",
  },
  {
    slug: "carrera",
    name: "Carrera",
    origin: "Verona, Italy",
    year: "1956",
    count: 54,
    image: "/brands/carrera.png",
    accent: "#1E90FF",
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-px bg-gold/40" />
              <span className="text-teal uppercase tracking-[0.5em] text-[9px] font-bold">By Heritage</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight text-cream leading-[0.95]">
              Curated<br />
              <span className="italic text-gold">Maisons</span>
            </h2>
          </div>

          <Link
            href="/collections"
            className="group flex items-center gap-3 text-gold/60 hover:text-gold transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">All Brands</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[280px]">
          {/* Hero Card — Ray-Ban */}
          <BrandCard
            data={brands[0]}
            className="md:col-span-7 md:row-span-2"
            isHero
          />

          {/* Oakley */}
          <BrandCard
            data={brands[1]}
            className="md:col-span-5"
          />

          {/* Gucci */}
          <BrandCard
            data={brands[2]}
            className="md:col-span-5"
          />

          {/* Bottom Row — 4 equal cards */}
          <BrandCard data={brands[3]} className="md:col-span-3" />
          <BrandCard data={brands[4]} className="md:col-span-3" />
          <BrandCard data={brands[5]} className="md:col-span-3" />
          <BrandCard data={brands[6]} className="md:col-span-3" />
        </div>

        {/* Bottom Stat Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 py-6 border-t border-b border-gold/10">
          {[
            { label: 'Brands', value: '7' },
            { label: 'Collections', value: '632' },
            { label: 'Countries', value: '3' },
            { label: 'Since', value: '1913' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-serif text-gold">{stat.value}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-cream/30">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCard({ data, className = '', isHero = false }) {
  return (
    <Link href={`/brand/${data.slug}`} className={`block ${className}`}>
      <motion.div
        whileHover="hover"
        initial="rest"
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
        style={{ minHeight: isHero ? '560px' : '280px' }}
      >
        {/* Background Image */}
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={isHero ? '60vw' : '30vw'}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
          style={{
            background: `linear-gradient(135deg, ${data.accent}15 0%, transparent 60%)`,
          }}
        />

        {/* Accent highlight line at the top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] z-20 origin-left"
          style={{ backgroundColor: data.accent }}
          variants={{
            rest: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Year Badge */}
        <div className="absolute top-5 right-5 z-20">
          <span className="text-[9px] font-mono tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
            EST. {data.year}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          {/* Origin */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-1.5 h-1.5 rounded-full opacity-60"
              style={{ backgroundColor: data.accent }}
            />
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-mono">
              {data.origin}
            </span>
          </div>

          {/* Brand Name */}
          <h3
            className={`font-serif text-white group-hover:text-white transition-colors tracking-tight leading-none ${
              isHero ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'
            }`}
          >
            {data.name}
          </h3>

          {/* Expandable footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 group-hover:border-white/20 transition-colors">
            <span className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
              {data.count} Styles
            </span>

            <motion.div
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ color: data.accent }}
            >
              <span>Explore</span>
              <motion.span
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Subtle inner border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-all duration-500 z-20 pointer-events-none" />
      </motion.div>
    </Link>
  );
}
