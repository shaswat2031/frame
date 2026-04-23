'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/components/providers/CartProvider';
import { useWishlist } from '@/components/providers/WishlistProvider';
import SearchOverlay from '@/components/ui/SearchOverlay';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut } from 'lucide-react';

const navLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories' },
  { name: 'Magazine', href: '/magazine' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
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

  // Do not render navbar on admin pages - moved AFTER hooks to follow Rules of Hooks
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
        }`}
    >
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group relative z-10 shrink-0">
          <motion.span 
            className="text-lg sm:text-2xl font-serif tracking-[0.2em] sm:tracking-[0.4em] font-black leading-none transition-colors"
            style={{ color: '#D4AF37' }}
          >
            EYELOVEYOU
          </motion.span>
          <div className="hidden sm:flex items-center gap-2 mt-1.5">
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
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 shrink-0">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="transition-colors hover:scale-110 text-gold"
          >
            <Search className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.5px]" />
          </button>
          
          {session?.user?.role === 'ADMIN' && (
            <Link 
              href="/admin" 
              className="px-3 py-1.5 border border-gold/30 rounded-sm text-[9px] font-mono tracking-[0.2em] uppercase text-gold hover:bg-gold hover:text-navy transition-all hidden md:block"
            >
              Admin Portal
            </Link>
          )}

          <Link 
            href={session ? "/profile" : "/login"}
            className="transition-colors hover:scale-110 text-gold"
          >
            <User className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.5px]" />
          </Link>

          {session && (
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="transition-colors hover:scale-110 text-gold hidden sm:block"
              title="Logout"
            >
              <LogOut className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.5px]" />
            </button>
          )}

          <Link
            href="/wishlist"
            className="transition-colors relative hover:scale-110 hidden sm:block"
            style={{ color: '#D4AF37' }}
          >
            <Heart className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.5px]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[8px] font-black w-[12px] h-[12px] rounded-full flex items-center justify-center border border-navy">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button 
            className="transition-colors relative hover:scale-110"
            onClick={() => setIsCartOpen(true)}
            style={{ color: '#D4AF37' }}
          >
            <ShoppingCart className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.5px]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] font-black w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] rounded-full flex items-center justify-center border border-navy shadow-lg">
                {cartCount}
              </span>
            )}
          </button>


          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden hover:scale-110 transition-transform ml-1"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ color: '#D4AF37' }}
          >
            <Menu className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-navy z-[60] flex flex-col p-6 sm:p-8"
          >
            <div className="flex justify-between items-center bg-navy pb-4 border-b border-gold/10">
              <span className="font-serif text-gold tracking-[0.2em] sm:tracking-[0.3em] font-black text-lg sm:text-xl">EYELOVEYOU</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-gold p-2 bg-gold/10 rounded-full hover:bg-gold hover:text-navy transition-all"
              >
                <X size={24} strokeWidth={2.5} />
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

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
