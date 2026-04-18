'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import SearchOverlay from '@/components/ui/SearchOverlay';

const navLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    const updateBannerHeight = () => {
      const banner = document.querySelector('[data-banner]');
      setBannerHeight(banner ? banner.offsetHeight : 0);
    };

    updateBannerHeight();
    window.addEventListener('scroll', handleScroll);
    // Observe for visibility changes (like when the user closes the banner)
    const observer = new MutationObserver(updateBannerHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
        }`}
    >
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group relative">
          <motion.span 
            className="text-2xl font-serif tracking-[0.4em] font-black leading-none transition-colors"
            style={{ color: '#D4AF37' }}
          >
            EYELOVEYOU
          </motion.span>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="h-px w-4" style={{ backgroundColor: '#D4AF37' }} />
            <span className="text-[8px] uppercase tracking-[0.3em] font-black font-mono" style={{ color: '#D4AF37', opacity: 0.7 }}>
              Punjab Optical · Est. 1987
            </span>
          </div>
          {/* Subtle Logo Glow */}
          <div className="absolute -inset-4 bg-gold/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[#D4AF37] hover:text-[#FFD700] transition-colors text-sm uppercase tracking-widest font-black group px-1"
            >
              {link.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#D4AF37] origin-left shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="transition-colors hidden md:block"
            style={{ color: '#D4AF37' }}
          >
            <Search size={22} className="stroke-[2.5px]" />
          </button>
          <button 
            className="transition-colors relative"
            onClick={() => setIsCartOpen(true)}
            style={{ color: '#D4AF37' }}
          >
            <ShoppingCart size={22} className="stroke-[2.5px]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="hidden sm:block border-2 px-6 py-2.5 text-[10px] uppercase tracking-widest font-black transition-all duration-300"
            style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
          >
            Book Eye Test
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ color: '#D4AF37' }}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-navy z-[60] flex flex-col p-8 border-l border-gold/10"
          >
            <div className="flex justify-between items-center">
              <span className="font-serif text-gold tracking-widest text-xl">VISIO</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gold">
                <X size={32} />
              </button>
            </div>
            <div className="mt-12 flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-serif text-gold/70 hover:text-gold transition-colors flex items-center gap-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="w-6 h-px bg-gold/30" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-gold/20">
                <button className="w-full border-2 border-gold py-4 text-gold font-black uppercase tracking-widest text-sm shadow-xl">
                  Book Eye Test
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
