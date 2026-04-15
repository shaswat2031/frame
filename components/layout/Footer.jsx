'use client';
import Link from 'next/link';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const ArrowRightIcon = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-24 pb-12 border-t border-gold/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Col */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-gold tracking-[0.3em] font-light leading-none">
                EYELOVEYOU
              </span>
              <span className="text-[9px] uppercase tracking-widest text-teal mt-1">
                Punjab Optical · Est. 1987
              </span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-xs">
              Defining the cutting edge of luxury vision care for over three decades.
              The ultimate destination for premium eyewear.
            </p>
            <div className="flex space-x-6">
              {[InstagramIcon, FacebookIcon, XIcon].map((Icon, i) => (
                <Link key={i} href="#" className="text-gold opacity-50 hover:opacity-100 transition-opacity">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav Cols */}
          <FooterNav
            title="Shop"
            links={['Men\'s Frames', 'Women\'s Frames', 'Sunglasses', 'Luxury Brands', 'New Arrivals']}
          />
          <FooterNav
            title="Company"
            links={['Our Heritage', 'Eye Examination', 'Lens Experts', 'Store Locator', 'Careers']}
          />

          {/* Newsletter Col */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Join the Circle</h4>
            <p className="text-cream/40 text-sm">Subscribe to receive stylistic updates and vision health news.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-gold/20 py-4 text-[10px] uppercase tracking-widest text-cream focus:border-gold outline-none transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold group">
                <ArrowRightIcon size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-cream/30 uppercase tracking-[0.2em]">
            © 2026 EYELOVEYOU Punjab Optical. All Rights Reserved.
          </p>

          <div className="flex items-center space-x-8">
            {['Visa', 'Mastercard', 'Easypaisa', 'JazzCash'].map((method) => (
              <span key={method} className="text-[9px] text-cream/20 uppercase tracking-widest font-bold">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({ title, links }) {
  return (
    <div className="space-y-8">
      <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="text-cream/40 text-sm hover:text-gold transition-colors block">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
