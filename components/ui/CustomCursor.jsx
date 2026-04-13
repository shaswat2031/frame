'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const SpecsIcon = ({ isHovering }) => (
  <motion.div
    animate={{
      scale: isHovering ? 1.1 : 1,
      rotate: isHovering ? 5 : 0,
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="relative flex items-center justify-center"
  >
    <svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gold filter drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]"
    >
      {/* Left Lens */}
      <motion.path
        d="M5 5C5 3.5 6.5 2.5 8.5 2.5H13C15 2.5 16.5 3.5 16.5 5.5V11C16.5 13 15 14.5 13 14.5H8.5C6.5 14.5 5 13 5 11V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{
          fill: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0)',
        }}
      />
      {/* Right Lens */}
      <motion.path
        d="M23.5 5.5C23.5 3.5 25 2.5 27 2.5H31.5C33.5 2.5 35 3.5 35 5V11C35 13 33.5 14.5 31.5 14.5H27C25 14.5 23.5 13 23.5 11V5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{
          fill: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0)',
        }}
      />
      {/* Bridge */}
      <path
        d="M16.5 7.5C16.5 7.5 18 5.5 20 5.5C22 5.5 23.5 7.5 23.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Decorative Temples */}
      <path d="M5 8.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 8.5H39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    
    {/* Shine effect on lenses */}
    <motion.div
      animate={{
        x: ['-100%', '200%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    >
      <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
    </motion.div>
  </motion.div>
);

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e) => {
      const target = e.target;
      const hoverable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('.hover-trigger') ||
                        window.getComputedStyle(target).cursor === 'pointer';
      
      if (hoverable) {
        setIsHovering(true);
        const text = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (text) setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const allElements = document.querySelectorAll('a, button, [role="button"]');
    allElements.forEach(el => el.style.cursor = 'none');

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99999]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <div className="relative flex flex-col items-center">
            <SpecsIcon isHovering={isHovering} />
            
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 px-2 py-0.5 bg-gold/10 backdrop-blur-md border border-gold/20 rounded text-[9px] font-sans font-bold text-gold tracking-[0.2em] uppercase whitespace-nowrap"
              >
                {cursorText}
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
