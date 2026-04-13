'use client';
import { motion } from 'framer-motion';

export default function Magazine() {
  return (
    <section className="py-24 bg-navy-deep border-y border-gold/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-teal uppercase tracking-[0.4em] text-[9px] mb-2 block">The Lookbook</span>
            <h2 className="text-5xl md:text-7xl font-serif text-cream italic">The Editorial</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-navy-surface to-navy overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511499767390-a739039759d4?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/10 transition-colors" />
              
              <div className="absolute bottom-0 left-0 p-12 w-full bg-gradient-to-t from-navy to-transparent">
                <span className="bg-gold text-navy px-3 py-1 text-[9px] uppercase tracking-widest font-bold inline-block mb-4">Style Guide</span>
                <h3 className="text-4xl md:text-5xl font-serif text-cream leading-tight max-w-2xl">
                  Framing Your Identity: The Art of Luxury Spectacles
                </h3>
              </div>
            </div>
          </div>

          {/* Side Articles */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <SideArticle 
              tag="Eye Health" 
              title="Beyond Vision: The Science of Blue Light and Digital Fatigue" 
              image="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=400"
            />
            <SideArticle 
              tag="Brand Spotlight" 
              title="Cartier: The Legacy of the Panthère Silhouette" 
              image="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SideArticle({ tag, title, image }) {
  return (
    <div className="group cursor-pointer flex gap-6">
      <div className="w-1/3 aspect-square bg-navy-surface overflow-hidden shrink-0">
        <div 
          className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-teal text-[9px] uppercase tracking-widest font-bold mb-2">{tag}</span>
        <h4 className="text-lg font-serif text-cream group-hover:text-gold transition-colors line-clamp-2">
          {title}
        </h4>
      </div>
    </div>
  );
}
