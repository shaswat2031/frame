'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LensMachineDemo from '@/components/ui/LensMachineDemo';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 3.8, // Sync with the new loader's 3s wait + zoom transition
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-1.5 border border-teal/30 rounded-full text-[10px] text-teal uppercase tracking-[0.2em] bg-teal/5">
              / Premium Vision Care
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-light text-cream leading-tight">
              See The World
              <br />
              <span className="italic font-normal text-gold-gradient">Through Art</span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="text-cream/55 text-lg md:text-xl font-light max-w-md leading-relaxed">
            Curating the world&apos;s finest frames since 1987.
            Where precision meets personal expression.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <button
              data-cursor="EXPLORE"
              className="bg-gold text-navy px-8 py-4 text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform duration-300 shadow-[0_10px_30px_rgba(201,168,76,0.2)]"
            >
              Explore Collection →
            </button>
            <button
              data-cursor="TRY IT"
              className="border border-cream/20 text-cream px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-cream hover:text-navy transition-all duration-300"
            >
              Virtual Try-On
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center space-x-12 pt-8 border-t border-gold/10">
            <div>
              <span className="block text-3xl font-accent text-gold">120+</span>
              <span className="text-[10px] uppercase tracking-widest text-teal">Brands</span>
            </div>
            <div>
              <span className="block text-3xl font-accent text-gold">3,500+</span>
              <span className="text-[10px] uppercase tracking-widest text-teal">Frames</span>
            </div>
            <div>
              <span className="block text-3xl font-accent text-gold">25yr</span>
              <span className="text-[10px] uppercase tracking-widest text-teal">Legacy</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Interactive Lens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex justify-center lg:justify-end"
        >
          <LensMachineDemo />
        </motion.div>
      </div>

      {/* Decorative Parallax Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-teal/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
