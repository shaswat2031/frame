'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { slug: 'ray-ban', location: 'Milan, Italy', name: 'Ray-Ban', styles: 142, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'oakley', location: 'California, USA', name: 'Oakley', styles: 89, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'gucci', location: 'Florence, Italy', name: 'Gucci', styles: 112, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'prada', location: 'Milan, Italy', name: 'Prada', styles: 76, image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'versace', location: 'Reggio Calabria, Italy', name: 'Versace', styles: 94, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'tom-ford', location: 'Austin, USA', name: 'Tom Ford', styles: 65, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'carrera', location: 'Verona, Italy', name: 'Carrera', styles: 54, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1400&q=80' },
];

export default function BrandsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen pt-32 pb-32 bg-navy text-cream transition-colors duration-700"
    >
      <main className="container mx-auto px-6">
        <section className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gold/20 pb-12">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gold">By Heritage</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter">
              Buy Brand <br /><span className="italic font-serif text-gold">By Brand</span>
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-mono text-[10px] tracking-[0.2em] uppercase text-right text-cream/50 space-y-2">
            <p>Partners: {brands.length}</p>
            <Link href="/shop" className="text-gold hover:text-cream transition-colors">Explore All Brands →</Link>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((brand, idx) => (
            <Link key={brand.slug} href={`/brand/${brand.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.65 }}
                className="group border border-gold/10 hover:border-gold/35 bg-navy-surface/40 transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[16/6] overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
                </div>

                <div className="p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">{brand.location}</p>
                  <h2 className="mt-2 text-4xl font-light tracking-tight group-hover:text-gold transition-colors">{brand.name}</h2>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-gold">Discover {brand.styles} styles</p>
                </div>
              </motion.article>
            </Link>
          ))}
        </section>
      </main>
    </motion.div>
  );
}
