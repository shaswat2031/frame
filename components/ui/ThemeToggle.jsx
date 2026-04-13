'use client';
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);
  const controls = useAnimation();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsLight(false);
      document.body.classList.add('dark-mode');
    } else {
      setIsLight(true);
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleTheme = async () => {
    // Pull animation
    await controls.start({
      y: 60,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    });

    const newIsLight = !isLight;
    setIsLight(newIsLight);

    if (newIsLight) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }

    // Release animation
    await controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    });
  };

  return (
    <div className="fixed top-0 right-12 z-[100] h-64 pointer-events-none">
      {/* The Rope */}
      <motion.div
        animate={controls}
        className="relative flex flex-col items-center pointer-events-auto cursor-pointer group"
        onClick={toggleTheme}
      >
        {/* String */}
        <div className="w-[2px] h-48 bg-gold/40 group-hover:bg-gold transition-colors relative">
          {/* Mechanical Detail at top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full border border-navy shadow-inner" />
        </div>

        {/* Pull Handle (Luxury Bead) */}
        <div className="relative -mt-2">
          {/* Outer Ring */}
          <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-navy shadow-2xl group-active:scale-95 transition-transform overflow-hidden">
            {/* Inner Bead */}
            <motion.div
              animate={{ rotate: isLight ? 180 : 0 }}
              className="w-6 h-6 rounded-full bg-gradient-to-tr from-gold to-gold-light shadow-lg flex items-center justify-center"
            >
              {/* Mode Icon (Subtle) */}
              <div className={`w-1 h-3 rounded-full ${isLight ? 'bg-navy' : 'bg-transparent'}`} />
              <div className={`w-3 h-1 rounded-full ${isLight ? 'bg-navy absolute' : 'bg-transparent'}`} />
            </motion.div>
          </div>

          {/* Label */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold bg-navy/80 px-3 py-1 rounded-full border border-gold/20 backdrop-blur-md">
              {isLight ? 'Pull for Night' : 'Pull for Day'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
