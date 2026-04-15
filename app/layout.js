import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/layout/SmoothScroll';
import NextAuthProvider from '@/components/providers/NextAuthProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
});

export const metadata = {
  title: 'EYELOVEYOU — Punjab Optical | Premium Eyewear',
  description: "Curating the world's finest frames since 1987. Where precision meets personal expression.",
};

import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="overflow-x-hidden antialiased">
        <SmoothScroll>
          <NextAuthProvider>
            <CustomCursor />
            <ThemeToggle />
            <Navbar />
            {children}
          </NextAuthProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
