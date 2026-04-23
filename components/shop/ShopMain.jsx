'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/providers/CartProvider';
import { useWishlist } from '@/components/providers/WishlistProvider';
import { Search, SlidersHorizontal, X, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const formatPrice = (price) => {
  if (!price || price <= 0) return 'Price on Request';
  return `₹${price.toLocaleString('en-IN')}`;
};

function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    toast.success(`${product.name} added to bag`, {
       icon: '🛒',
       style: {
         borderRadius: '0px',
         background: '#0A0E1A',
         color: '#D4AF37',
         border: '1px solid rgba(212,175,55,0.2)',
         fontFamily: 'monospace',
         fontSize: '10px',
         letterSpacing: '0.1em'
       }
    });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * (index % 12), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full mb-4 sm:mb-6 overflow-hidden bg-navy-surface border border-gold/10 group-hover:border-gold/30 transition-all duration-500 rounded-sm">
        <Link href={`/shop/${product.id}`} className="absolute inset-0 z-10" />

        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 sm:p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gold/20 text-[8px] sm:text-[10px] font-mono tracking-[0.3em] uppercase">
            [ No_Signal ]
          </div>
        )}

        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
          <span className="font-mono text-[6px] sm:text-[8px] tracking-[0.2em] text-navy bg-gold px-1.5 py-0.5 uppercase font-black shadow-lg">
            {product.brand}
          </span>
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-2 sm:p-3 bg-navy-deep/60 backdrop-blur-md rounded-full border border-white/5 hover:border-gold/30 transition-all group-heart"
        >
          <Heart 
            size={16} 
            className={`transition-all duration-300 ${isLiked ? 'fill-gold text-gold scale-110' : 'text-white/40 group-heart-hover:text-gold'}`} 
          />
        </button>

        {/* HOVER ACTIONS (DESKTOP) */}
        <div className="absolute inset-0 bg-navy/80 opacity-0 lg:group-hover:opacity-100 hidden lg:flex flex-col items-center justify-center gap-4 transition-all duration-500 backdrop-blur-[2px] z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-full max-w-[160px] bg-gold text-navy py-3 font-mono text-[10px] font-black tracking-[0.4em] uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
          >
            {added ? 'ADDED TO BAG' : 'ADD TO BAG'}
          </motion.button>

          <Link
            href={`/shop/${product.id}`}
            className="w-full max-w-[160px] border border-gold/50 text-gold py-3 font-mono text-[10px] font-black tracking-[0.4em] uppercase hover:bg-gold hover:text-navy transition-all text-center"
          >
            VIEW DETAILS
          </Link>
        </div>

        {/* MOBILE ADD TO CART (SMALL BUTTON ON IMAGE) */}
        <div className="absolute bottom-2 left-2 right-2 flex lg:hidden z-20">
           <button 
              onClick={handleAddToCart}
              className="w-full bg-navy-deep/90 border border-gold/20 text-gold py-2 font-mono text-[8px] tracking-[0.2em] uppercase font-bold"
           >
              {added ? 'ADDED' : 'BUY NOW'}
           </button>
        </div>
        
        {/* PROGRESSIVE BORDER */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-gold w-0 lg:group-hover:w-full transition-all duration-700 ease-out z-30" />
      </div>

      <div className="space-y-1.5 px-1 sm:px-2">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
           <h3 className="text-sm sm:text-2xl font-serif text-cream italic tracking-tight leading-tight flex-1 line-clamp-1">{product.name}</h3>
           <span className="text-gold font-bold tracking-wider text-[10px] sm:text-sm whitespace-nowrap">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.2em] text-cream/30 uppercase">{product.category}</span>
          <div className="h-px flex-1 bg-gold/10" />
          <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.1em] text-cream/20 uppercase truncate max-w-[60px] sm:max-w-[100px]">{product.sku}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ShopMain({ initialProducts = [], brands = [], categories = [], sortOptions = [] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setCategory] = useState('ALL');
  const [activeBrand, setBrand] = useState('ALL');
  const [sortBy, setSort] = useState('newest');
  const [isFilterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...initialProducts];

    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        (p.name?.toLowerCase() || '').includes(q) ||
        (p.sku?.toLowerCase() || '').includes(q) ||
        (p.brand?.toLowerCase() || '').includes(q)
      );
    }

    if (activeCategory !== 'ALL') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (activeBrand !== 'ALL') {
      list = list.filter((p) => (typeof p.brand === 'string' ? p.brand : p.brand?.name) === activeBrand);
    }

    // Sort Logic
    if (sortBy === 'price_asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'name_asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return list;
  }, [initialProducts, query, activeCategory, activeBrand, sortBy]);

  const resetFilters = useCallback(() => {
    setQuery('');
    setCategory('ALL');
    setBrand('ALL');
    setSort('newest');
  }, []);

  return (
    <div className="min-h-screen bg-navy text-cream pt-24 sm:pt-32 pb-24 selection:bg-gold selection:text-navy">
      {/* ... (rest of the component) */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,18,30,0.8)_0%,rgba(5,10,18,1)_100%)] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -ml-px w-px h-full bg-gold/5 pointer-events-none hidden lg:block" />

      <main className="container mx-auto px-4 sm:px-6 max-w-[1400px] relative z-10">
        {/* HERO SECTION */}
        <header className="mb-12 sm:mb-20 space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-[8px] sm:text-xs font-mono tracking-[0.4em] uppercase text-gold/60"
          >
            <span className="w-8 sm:w-12 h-px bg-gold/30" />
            BEYOND WORTH ARCHIVE
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl sm:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85] text-cream"
            >
              CURATED <br />
              <span className="italic font-serif text-gold">MAISONS.</span>
            </motion.h1>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="flex items-center gap-4 sm:gap-8 lg:mb-4 pr-0 sm:pr-4"
            >
              <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-right leading-relaxed hidden sm:block">
                <span className="block text-gold/40">COLLECTION_V2.0</span>
                <span className="block text-cream/70 font-bold tracking-[0.5em]">{filtered.length} PIECES DETECTED</span>
              </div>
              <button 
                onClick={() => setFilterOpen(true)}
                className="bg-navy-surface border border-gold/20 p-4 sm:p-5 hover:border-gold/60 transition-all group shrink-0"
              >
                <SlidersHorizontal size={20} className="text-gold group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          </div>
        </header>

        {/* TOP FILTERS (DESKTOP) */}
        <div className="hidden lg:flex flex-wrap items-center gap-3 mb-16 border-y border-gold/10 py-8">
          {categories.map(cat => {
            const name = typeof cat === 'string' ? cat : cat.name;
            return (
              <button
                key={name}
                onClick={() => setCategory(name)}
                className={`px-8 py-3 text-[10px] font-mono tracking-[0.4em] uppercase transition-all duration-500 rounded-sm ${
                  activeCategory === name 
                  ? 'bg-gold text-navy font-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                  : 'text-cream/40 hover:text-gold hover:bg-gold/5'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-8 sm:mb-16 group">
          <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gold focus-within:text-gold transition-colors z-20" />
          <input
            type="text"
            placeholder="FILTER BY SKU, BRAND, OR COMPOSITION..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 sm:pl-16 pr-8 py-5 sm:py-6 bg-navy-deep border border-gold/20 focus:border-gold/60 focus:bg-navy-surface outline-none text-[10px] sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all shadow-xl placeholder:text-gold/40 text-cream relative z-10"
          />
          <div className="absolute bottom-0 left-0 h-px bg-gold w-0 group-focus-within:w-full transition-all duration-700 z-30" />
        </div>

        {/* GRID */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 sm:py-40 border border-dashed border-gold/10 bg-navy-surface/20 space-y-4 sm:space-y-6"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold/5 rounded-full flex items-center justify-center">
                <X size={24} className="text-gold/20" />
              </div>
              <p className="text-gold/40 font-mono tracking-[0.3em] sm:tracking-[0.5em] text-[8px] sm:text-[10px] uppercase">No archives match the signature</p>
              <button 
                onClick={resetFilters}
                className="text-gold border-b border-gold/30 pb-1 text-[8px] sm:text-[9px] font-mono tracking-[0.4em] uppercase hover:text-cream hover:border-cream transition-all"
              >
                Reset Search
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-12 gap-y-10 sm:gap-y-20"
            >
              {filtered.map((product, idx) => (
                <ProductCard
                  key={product.id || product.sku}
                  product={product}
                  index={idx}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* MOBILE FILTER SIDEBAR (WIP) */}

      {/* MOBILE FILTER SIDEBAR (WIP) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setFilterOpen(false)}
               className="fixed inset-0 bg-navy/90 backdrop-blur-md z-[100]"
            />
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               className="fixed right-0 top-0 bottom-0 w-full max-w-[350px] bg-navy-deep border-l border-gold/10 z-[101] p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-2xl font-serif italic text-gold">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="text-cream/50 hover:text-cream"><X size={24} /></button>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                   <h3 className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase">Sort By</h3>
                   <div className="flex flex-col gap-2">
                     {sortOptions.map(opt => (
                       <button 
                          key={opt.value}
                          onClick={() => { setSort(opt.value); setFilterOpen(false); }}
                          className={`text-left px-4 py-3 text-[10px] font-mono tracking-[0.2em] uppercase border ${sortBy === opt.value ? 'bg-gold text-navy border-gold' : 'border-gold/10 text-cream/40'}`}
                       >
                         {opt.label}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase">Brand Archive</h3>
                   <div className="flex flex-wrap gap-2">
                     {brands.map(b => {
                       const name = typeof b === 'string' ? b : b.name;
                       return (
                         <button 
                            key={name}
                            onClick={() => { setBrand(name); setFilterOpen(false); }}
                            className={`px-4 py-2 text-[8px] font-mono tracking-[0.2em] uppercase border ${activeBrand === name ? 'bg-gold text-navy border-gold' : 'border-gold/10 text-cream/40'}`}
                         >
                           {name}
                         </button>
                       );
                     })}
                   </div>
                </div>
              </div>

              <button 
                  onClick={() => { resetFilters(); setFilterOpen(false); }}
                  className="absolute bottom-10 left-10 right-10 py-4 border border-gold/20 text-gold font-mono text-[10px] tracking-[0.5em] uppercase hover:bg-gold/5"
              >
                Reset Archive
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
