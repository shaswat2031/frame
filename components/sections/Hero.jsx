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
      <>
        SEE THE <br />
        <span className="italic font-serif text-gold-gradient">UNSEEN.</span>
      </>
    ),
    description: "Engineering the perfect balance between architectural precision and timeless editorial aesthetics. Explore our curated selection of global masterpieces."
  },
  {
    title: (
      <>
        CRAFTING <br />
        <span className="italic font-serif text-gold-gradient">LEGENDS.</span>
      </>
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
    }, 4000); // Change image every 4 seconds
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Premium Luxury Eyewear Background"
              fill
              priority
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
            <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-medium">
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
                <h1 className="text-7xl md:text-9xl font-light text-cream leading-[0.9] tracking-tighter mb-6">
                  {heroContent[currentImageIndex].title}
                </h1>
                <p className="text-cream/60 text-lg md:text-xl font-light max-w-lg leading-relaxed border-l border-gold/20 pl-6">
                  {heroContent[currentImageIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4">
            <button
              data-cursor="DISCOVER"
              className="relative group overflow-hidden bg-gold text-navy px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 hover:shadow-[0_20px_40px_rgba(166,138,59,0.3)] hover:-translate-y-1"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">Explore Collection</span>
              <div className="absolute inset-0 bg-cream translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </button>
            <Link
              href="/try-on"
              data-cursor="VIRTUAL"
              className="group border border-cream/20 text-cream px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:border-gold transition-all duration-500 flex items-center gap-3"
            >
              Virtual Try-On
              <span className="w-2 h-2 rounded-full bg-gold group-hover:animate-pulse" />
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div variants={itemVariants}
            className="flex items-center space-x-16 pt-10"
          >
            {[
              { num: '3.5k', label: 'Curated Frames' },
              { num: '24hr', label: 'Global Dispatch' },
              { num: '100%', label: 'Precision Fit' },
            ].map((s) => (
              <div key={s.label} className="group cursor-default">
                <span className="block text-2xl font-light text-cream group-hover:text-gold transition-colors duration-300">{s.num}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold/60">{s.label}</span>
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
          <div className="absolute inset-0 border border-gold/10 rounded-[40px] rotate-3 scale-95" />
          <div className="absolute inset-0 border border-teal/10 rounded-[40px] -rotate-3 scale-105" />

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
            className="w-full h-full relative z-10 rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 via-transparent to-gold/10 pointer-events-none z-20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[currentImageIndex]}
                  alt="Eyewear Portrait"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
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