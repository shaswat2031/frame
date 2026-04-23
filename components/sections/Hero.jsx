'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "/imagehero1.png",
  "/hero2.png"
];

const heroContent = [
  {
    title: (
      <span className="text-[#D4AF37] font-black uppercase" style={{ textShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.8)' }}>
        SEE THE <br />
        <span className="italic font-serif">UNSEEN.</span>
      </span>
    ),
    description: "Engineering the perfect balance between architectural precision and timeless editorial aesthetics. Explore our curated selection of global masterpieces."
  },
  {
    title: (
      <span className="text-[#D4AF37] font-black uppercase" style={{ textShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.8)' }}>
        CRAFTING <br />
        <span className="italic font-serif">LEGENDS.</span>
      </span>
    ),
    description: "Discover a collection where heritage meets innovation. Our frames are meticulously handcrafted for the modern visionary who demands excellence."
  }
];

export default function Hero() {
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500); // Change image every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] }
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-navy"
    >
      {/* ── BACKGROUND IMAGE WITH PARALLAX ── */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-navy z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy/30 z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Premium Luxury Eyewear Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* ── LEFT CONTENT ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8"
        >
          {/* Eyebrow pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-black">
              Established 1987 / Luxury Eyewear
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="space-y-4 min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-9xl font-black text-cream leading-[0.85] md:leading-[0.8] tracking-tighter mb-4 md:mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase">
                  {heroContent[currentImageIndex].title}
                </h1>
                <p className="text-cream/90 text-base sm:text-lg md:text-xl font-medium max-w-lg leading-relaxed border-l-2 border-gold/40 pl-4 md:pl-6 bg-navy/20 backdrop-blur-md py-2">
                  {heroContent[currentImageIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 w-full">
            <button
              data-cursor="DISCOVER"
              className="relative group overflow-hidden bg-gold text-navy px-8 py-4 md:px-10 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-500 hover:shadow-[0_20px_40px_rgba(166,138,59,0.3)] hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">Explore Collection</span>
              <div className="absolute inset-0 bg-cream translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </button>
            <Link
              href="/try-on"
              data-cursor="VIRTUAL"
              className="group border-2 border-cream/20 text-cream px-8 py-4 md:px-10 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black hover:border-gold transition-all duration-500 flex items-center justify-center gap-3 w-full sm:w-auto text-center"
            >
              Virtual Try-On
              <span className="w-2 h-2 rounded-full bg-gold group-hover:animate-pulse" />
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div variants={itemVariants}
            className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-4 sm:gap-12 md:gap-16 pt-8 md:pt-10 w-full"
          >
            {[
              { num: '3.5k', label: 'Curated Frames' },
              { num: '24hr', label: 'Global Dispatch' },
              { num: '100%', label: 'Precision Fit' },
            ].map((s) => (
              <div key={s.label} className="group cursor-default sm:w-auto text-center sm:text-left">
                <span className="block text-xl sm:text-2xl font-black text-cream group-hover:text-gold transition-colors duration-300">{s.num}</span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gold/80 font-bold whitespace-nowrap">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT VISUAL (FLOATING ELEMENT) ── */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:block lg:col-span-6 relative h-[600px]"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 border-2 border-gold/10 rounded-[40px] rotate-3 scale-95" />
          <div className="absolute inset-0 border-2 border-teal/10 rounded-[40px] -rotate-3 scale-105" />

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, -5, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-2 border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 via-transparent to-gold/20 pointer-events-none z-20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[currentImageIndex]}
                  alt="Eyewear Portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Precision HUD elements */}
          <div className="absolute top-10 left-10 z-30 font-mono text-[8px] text-teal/60 space-y-1">
            <p>SCAN_READY_001</p>
            <p>SYNC_STATUS: ACTIVE</p>
            <p>LATENCY: 4.2ms</p>
          </div>
          <div className="absolute bottom-10 right-10 z-30 font-mono text-[8px] text-gold/60 text-right space-y-1">
            <p>COORD: 34.0522° N</p>
            <p>REGION: GLOBAL_HUB</p>
            <p>VERSION: 4.0.2</p>
          </div>
        </motion.div>

      </div>

      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}