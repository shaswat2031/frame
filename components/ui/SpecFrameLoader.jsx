'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SpecFrameLoader() {
  const [isVisible, setIsVisible] = useState(true);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Extended the loading time slightly for the more complex animation
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1], delay: 0.2 }
          }}
          className="fixed inset-0 bg-[#05080a] z-[100] flex items-center justify-center flex-col overflow-hidden"
        >
          {/* Main Content Container */}
          <motion.div
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: {
                scale: 40,
                x: "20%", // Shift to center the left lens during the zoom
                opacity: 0,
                filter: "blur(5px)",
                transition: { duration: 1.5, ease: [0.7, 0, 0.3, 1] }
              }
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              transformOrigin: "30% 45%",
            }}
            className="relative flex flex-col items-center justify-center w-full h-full"
          >
            {/* The Specs Silhouette - Full Frame Dual Lens */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <svg
                width="400"
                height="160"
                viewBox="0 0 400 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gold"
              >
                {/* Detailed Dual-Lens Rims */}
                {/* Left Rim */}
                <path
                  d="M60 60C60 40 80 30 110 30H150C170 30 180 45 180 70V90C180 115 160 130 135 130H100C75 130 60 115 60 90V60Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                />
                {/* Right Rim */}
                <path
                  d="M220 70C220 45 230 30 250 30H290C320 30 340 40 340 60V90C340 115 325 130 300 130H265C240 130 220 115 220 90V70Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                />

                {/* Precision Bridge */}
                <path
                  d="M180 65C180 65 190 55 200 55C210 55 220 65 220 65"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                {/* Glass Lenses (Two distinct lenses) */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  transition={{ delay: 1, duration: 1 }}
                  d="M70 70C70 50 85 40 110 40H140C160 40 170 50 170 70V90C170 105 160 120 140 120H100C80 120 70 105 70 90V70Z"
                  fill="white"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  d="M230 70C230 50 240 40 260 40H290C315 40 330 50 330 70V90C330 105 320 120 300 120H260C240 120 230 105 230 90V70Z"
                  fill="white"
                />

                {/* Temples */}
                <path d="M60 65H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M340 65H390" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Shine Animation */}
              <motion.div
                initial={{ x: "-150%", skewX: -20 }}
                animate={{ x: "150%" }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Branding */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5 }
              }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-5xl font-serif text-gold tracking-[0.5em] font-light leading-none">
                EYECONIC
              </h1>
              <div className="flex items-center mt-4 space-x-4">
                <span className="h-[1px] w-8 bg-gold/30" />
                <span className="text-[10px] text-teal tracking-[0.4em] uppercase font-medium">EST. 1987</span>
                <span className="h-[1px] w-8 bg-gold/30" />
              </div>
            </motion.div>
          </motion.div>

          {/* Centered Optic Vignette on the Left Lens Path */}
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[110] pointer-events-none bg-[radial-gradient(circle_at_50%_45%,transparent_10%,rgba(5,8,10,0.8)_60%,#05080a_100%)]"
          />

          {/* Particle background for premium feel */}
          <div className="absolute inset-0 z-[-1] opacity-20">
            {isMounted && [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0
                }}
                animate={{
                  y: [null, "-20%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute w-1 h-1 bg-gold rounded-full"
              />
            ))}
          </div>


          {/* Progress Bar (Subtle) */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gold/10"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "linear" }}
              className="h-full bg-gold shadow-[0_0_10px_#d4af37]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

