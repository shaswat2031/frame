'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Helper components for beautiful editorial layouts
const BleedImage = ({ src, alt, caption }) => (
  <div className="w-full h-full relative bg-navy-surface flex flex-col justify-end p-8 border hover:border-gold/30 transition-colors duration-500 overflow-hidden group">
    {/* Simulated Image */}
    <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-30 grayscale group-hover:scale-105 transition-transform duration-[2s] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>
    <div className="relative z-10">
      <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase">{caption}</span>
      <h3 className="text-xl font-light text-cream tracking-widest mt-2">{alt}</h3>
    </div>
  </div>
);

const Paper = ({ children, className = '' }) => (
  <div className={`w-full h-full flex flex-col pt-16 px-16 pb-12 bg-[#F9F7F1] text-navy ${className}`}>
    {children}
  </div>
);

// ── 10 SHEET BOOK CONTENT ── (20 total faces)
const SHEETS = [
  // SHEET 0: COVER
  {
    id: 'cover',
    front: (
      <div className="w-full h-full p-8 flex flex-col justify-center items-center bg-navy text-cream border-l border-gold/30 shadow-[inset_15px_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-12 left-0 w-full flex justify-center">
          <span className="font-mono text-[8px] tracking-[0.4em] text-gold uppercase">Est. 1987</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif italic text-gold mb-8 text-center leading-[0.8] tracking-tighter relative z-10">
          JOURNAL <br/> OF SIGHT
        </h1>
        <div className="w-16 h-px bg-gold/50 mb-8 relative z-10" />
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-cream/60 relative z-10">
          Vol. IV — Masterworks
        </p>
        <div className="absolute bottom-12 left-0 w-full flex justify-center">
          <span className="font-mono text-[8px] tracking-[0.3em] text-cream/30 uppercase">Visio Luxury Optical</span>
        </div>
      </div>
    ),
    back: (
      <div className="w-full h-full p-16 flex flex-col justify-center bg-navy-surface text-cream/70 border-r border-black/20 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.6)]">
        <h2 className="font-serif italic text-3xl text-gold mb-8">Colophon</h2>
        <p className="font-mono text-[9px] tracking-[0.1em] leading-loose max-w-[250px]">
          Published by VISIO, Punjab.<br/><br/>
          Creative Direction: A. Vasquez.<br/>
          Photography: Studio Sterling.<br/>
          Typefaces: Cormorant Garamond, Inter Mono.<br/><br/>
          Printed on archival grade 120gsm matte.<br/>
          Limited Edition of 500.
        </p>
      </div>
    )
  },
  
  // SHEET 1: INTRO / INDEX
  {
    id: 'intro',
    front: (
      <Paper className="justify-between border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)]">
        <div>
          <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase">00 / Foreword</span>
          <h2 className="text-4xl font-serif italic text-navy mt-8 mb-8">Vision as Architecture.</h2>
          <p className="text-[11px] font-sans font-light leading-relaxed max-w-sm text-navy/80 columns-2 gap-8 text-justify">
            Eyewear is the ultimate intersection of medical necessity and aesthetic expression. It is the only architectural structure worn directly on the face. In this volume, we pull apart the seams of our manufacturing process. We look closely at the raw elements—titanium, Japanese acetate, 18k gold—and the hands that shape them.
          </p>
        </div>
        <div className="self-end font-mono text-[8px] text-navy/40">1</div>
      </Paper>
    ),
    back: (
      <div className="w-full h-full shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)] bg-[#F9F7F1]">
        <BleedImage src="" alt="THE FOUNDRY" caption="Fig 1. Titanium Press" />
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-cream/40">2</div>
      </div>
    )
  },

  // SHEET 2: TITANIUM
  {
    id: 'titanium',
    front: (
      <Paper className="border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)]">
        <div className="flex-1">
          <span className="font-mono text-[8px] tracking-[0.2em] text-teal uppercase">01 / Material Science</span>
          <h2 className="text-5xl font-light tracking-tight mt-6 mb-10 text-navy">THE TITANIUM <br/> REVOLUTION</h2>
          <div className="w-full h-px bg-navy/10 mb-10" />
          <ul className="space-y-6 font-mono text-[9px] tracking-[0.1em] text-navy/70">
            <li className="flex justify-between border-b border-navy/5 pb-2">
              <span>TENSILE STRENGTH</span> <span>834 MPa</span>
            </li>
            <li className="flex justify-between border-b border-navy/5 pb-2">
              <span>MASS</span> <span>18.4 GRAMS</span>
            </li>
            <li className="flex justify-between border-b border-navy/5 pb-2">
              <span>ALLOY</span> <span>BETA-TI 15-3-3-3</span>
            </li>
            <li className="flex justify-between border-b border-navy/5 pb-2">
              <span>HYPOALLERGENIC</span> <span>100% CERTIFIED</span>
            </li>
          </ul>
        </div>
        <div className="self-end font-mono text-[8px] text-navy/40">3</div>
      </Paper>
    ),
    back: (
      <Paper className="justify-center items-center shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)]">
        <h2 className="text-8xl font-serif italic text-navy/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap -rotate-90">
          AEROSPACE
        </h2>
        <div className="z-10 bg-navy p-12 text-center text-cream shadow-2xl relative">
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold" />
          <p className="font-serif italic text-2xl text-gold mb-4">&quot;Weightless presence.&quot;</p>
          <p className="font-mono text-[8px] tracking-[0.2em]">TITANIUM FORGE / OSAKA, JP</p>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-navy/40">4</div>
      </Paper>
    )
  },

  // SHEET 3: ACETATE
  {
    id: 'acetate',
    front: (
      <div className="w-full h-full shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)] bg-[#F9F7F1]">
        <BleedImage src="" alt="TARTARUGATO" caption="Fig 2. Italian Acetate Polishing" />
        <div className="absolute bottom-6 right-6 font-mono text-[8px] text-cream/40">5</div>
      </div>
    ),
    back: (
      <Paper className="shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)]">
        <div className="flex-1">
          <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase">02 / Craftsmanship</span>
          <h2 className="text-4xl font-serif italic text-navy mt-8 mb-8">The Cellulose Cellar.</h2>
          <p className="text-[11px] font-sans font-light leading-relaxed max-w-sm text-navy/80 text-justify">
            We cure our acetate for over 90 days. This slow-aging process allows the cotton-based polymer to settle, preventing warping over years of wear. The patterns are not printed; they are physically embedded through layers of colored sheets, resulting in a depth of tortoiseshell that cannot be counterfeited by injection molding.
          </p>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-navy/40">6</div>
      </Paper>
    )
  },

  // SHEET 4: LENS TECH
  {
    id: 'lenses',
    front: (
      <Paper className="border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top_right,rgba(42,191,175,0.08),transparent_50%)] pointer-events-none" />
        <div className="flex-1 relative z-10">
          <span className="font-mono text-[8px] tracking-[0.2em] text-teal uppercase">03 / Optic Engineering</span>
          <h2 className="text-5xl font-light tracking-tight mt-6 mb-8 text-navy">CLARITY <br/> DEFINED.</h2>
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="p-4 border border-navy/10">
              <span className="block font-mono text-[24px] text-navy mb-1">V.400</span>
              <span className="font-mono text-[7px] tracking-widest text-navy/50">UV BLOCKING</span>
            </div>
            <div className="p-4 border border-navy/10">
              <span className="block font-mono text-[24px] text-navy mb-1">AR-7</span>
              <span className="font-mono text-[7px] tracking-widest text-navy/50">ANTI-REFLECTIVE</span>
            </div>
            <div className="p-4 border border-navy/10">
              <span className="block font-mono text-[24px] text-navy mb-1">99%</span>
              <span className="font-mono text-[7px] tracking-widest text-navy/50">POLARIZED EFFICIENCY</span>
            </div>
            <div className="p-4 border border-navy/10 bg-navy text-cream">
              <span className="block font-mono text-[24px] text-gold mb-1">ZEISS</span>
              <span className="font-mono text-[7px] tracking-widest text-cream/50">LENS PARTNER</span>
            </div>
          </div>
        </div>
        <div className="self-end font-mono text-[8px] text-navy/40 relative z-10">7</div>
      </Paper>
    ),
    back: (
      <div className="w-full h-full shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)] bg-[#F9F7F1]">
        <BleedImage src="" alt="LIGHT REFRACTION" caption="Fig 3. AR-7 Coating Test" />
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-cream/40">8</div>
      </div>
    )
  },

  // SHEET 5: INTERVIEW
  {
    id: 'interview1',
    front: (
      <Paper className="border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)] justify-center bg-navy text-cream border-transparent">
        <div className="text-center space-y-6">
          <span className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase block">PERSPECTIVES</span>
          <h2 className="text-5xl font-serif italic leading-tight text-white">
            &quot;We do not sell frames. We engineer ways to see the world completely unimpeded.&quot;
          </h2>
          <div className="w-8 h-px bg-gold/50 mx-auto" />
          <span className="font-mono text-[9px] tracking-widest text-cream/40 uppercase block">The Founder&apos;s Dialogue</span>
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[8px] text-cream/40">9</div>
      </Paper>
    ),
    back: (
      <Paper className="shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)]">
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[8px] font-bold text-navy">VISIO:</span>
            <p className="text-[10px] font-sans text-navy/80 text-justify">Why restrict production to 500 units per collection?</p>
          </div>
          <div className="space-y-2 pl-4 border-l border-gold/50">
            <span className="font-mono text-[8px] font-bold text-gold">FD:</span>
            <p className="text-[10px] font-sans text-navy/80 text-justify">Because excellence does not scale indefinitely. When you push beyond 500 units, handmade processes turn into mechanical habits. We refuse to let machines dictate the polish of our acetate.</p>
          </div>
          
          <div className="space-y-2">
            <span className="font-mono text-[8px] font-bold text-navy">VISIO:</span>
            <p className="text-[10px] font-sans text-navy/80 text-justify">What makes the &quot;Architect&quot; series functionally different?</p>
          </div>
          <div className="space-y-2 pl-4 border-l border-gold/50">
            <span className="font-mono text-[8px] font-bold text-gold">FD:</span>
            <p className="text-[10px] font-sans text-navy/80 text-justify">We eliminated screws. Using a pure tension hinge system inspired by suspension bridges, the frame dynamically adapts to temporal lobes without loosening over time. It&apos;s living engineering.</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-navy/40">10</div>
      </Paper>
    )
  },

  // SHEET 6: VINTAGE ARCHIVE
  {
    id: 'vintage',
    front: (
      <Paper className="border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)] bg-[#EBE7E0]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none" />
        <div className="flex-1 relative z-10 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-32 border border-navy/20 mb-8 p-1">
            <div className="w-full h-full bg-navy/5 flex items-center justify-center">
               <span className="font-mono text-[6px] text-navy/30">1987 ARCHIVE</span>
            </div>
          </div>
          <h2 className="text-3xl font-serif italic text-navy/80 mb-4">The &apos;87 Aviator</h2>
          <p className="font-mono text-[8px] tracking-[0.2em] text-navy/50 max-w-[200px]">
            REDISCOVERED & REMASTERED FOR MODERN DURABILITY.
          </p>
        </div>
        <div className="self-end font-mono text-[8px] text-navy/40 relative z-10">11</div>
      </Paper>
    ),
    back: (
      <div className="w-full h-full shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)] bg-[#EBE7E0]">
        <BleedImage src="" alt="TIMELESS" caption="Fig 4. The 1987 Original Master" />
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-cream/40">12</div>
      </div>
    )
  },

  // SHEET 7: THE ATELIER
  {
    id: 'atelier',
    front: (
      <Paper className="border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)]">
        <div className="flex-1 grid grid-rows-2 gap-4">
          <div className="bg-navy-surface relative overflow-hidden group">
            <div className="absolute inset-0 bg-neutral-800 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-[2s]" />
            <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-cream">01 LASER CUTTING</div>
          </div>
          <div className="bg-navy-surface relative overflow-hidden group">
            <div className="absolute inset-0 bg-neutral-900 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-[2s]" />
            <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-cream">02 HAND POLISHING</div>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[8px] text-navy/40">13</div>
      </Paper>
    ),
    back: (
      <Paper className="shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)] items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-6">
          <span className="font-serif italic text-gold text-2xl">V</span>
        </div>
        <h2 className="text-2xl font-light text-navy tracking-widest mb-4">BESPOKE <br/> SERVICES</h2>
        <p className="font-mono text-[9px] tracking-[0.1em] text-navy/60 max-w-[200px] leading-loose">
          Beyond our standard collections, our atelier offers fully personalized sizing, custom acetate blending, and 18k solid gold hardware upon private request.
        </p>
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-navy/40">14</div>
      </Paper>
    )
  },

  // SHEET 8: GALLERY 
  {
    id: 'gallery',
    front: (
      <div className="w-full h-full shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)] bg-navy p-4 flex flex-col justify-between">
        <div className="w-full h-[48%] bg-navy-deep border border-gold/10 flex items-center justify-center">
          <span className="font-mono text-[8px] text-cream/20 tracking-widest">[ LOOKBOOK V.1 ]</span>
        </div>
        <div className="w-full h-[48%] bg-navy-deep border border-gold/10 flex items-center justify-center">
          <span className="font-mono text-[8px] text-cream/20 tracking-widest">[ LOOKBOOK V.2 ]</span>
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[8px] text-gold/40">15</div>
      </div>
    ),
    back: (
      <div className="w-full h-full shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06)] bg-navy border-r border-gold/10">
        <BleedImage src="" alt="AUTOMN/WINTER" caption="AW26 Campaign" />
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-cream/40">16</div>
      </div>
    )
  },

  // SHEET 9: BACK COVER
  {
    id: 'backcover',
    front: (
      <Paper className="border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06)] items-center justify-center text-center">
        <h2 className="font-serif text-5xl italic text-gold mb-12">Fin.</h2>
        <p className="font-mono text-[8px] tracking-[0.2em] text-navy/50 max-w-[200px] mb-8">
          Explore the full curated collection physically at our flagship or via our digital portal.
        </p>
        <button className="border border-gold text-gold px-10 py-4 font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-navy transition-colors duration-500">
          ENTER STORE
        </button>
        <div className="absolute bottom-6 right-6 font-mono text-[8px] text-navy/40">17</div>
      </Paper>
    ),
    back: (
      <div className="w-full h-full flex flex-col items-center justify-center bg-navy text-cream shadow-[inset_-15px_0_30px_rgba(0,0,0,0.8)] relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <span className="text-4xl font-serif text-gold tracking-[0.3em] font-light leading-none relative z-10">
          VISIO
        </span>
      </div>
    )
  }
];

export default function MagazinePage() {
  const [currentFlip, setCurrentFlip] = useState(0);

  const turnNext = () => {
    if (currentFlip < SHEETS.length) setCurrentFlip(c => c + 1);
  };

  const turnPrev = () => {
    if (currentFlip > 0) setCurrentFlip(c => c - 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      className="min-h-screen pt-40 pb-32 bg-navy text-cream flex flex-col items-center justify-center overflow-hidden transition-colors duration-700 relative"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-30 mix-blend-color-dodge">
        <div className="w-[80vw] h-[80vw] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_50%)] rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-32 w-full text-center z-0 pointer-events-none">
        <h1 className="text-[10vw] font-serif text-gold/5 italic whitespace-nowrap select-none tracking-tighter">
          EDITORIAL ARCHIVES
        </h1>
      </div>

      {/* ── ADVANCED 3D BOOK ENGINE ── */}
      <div className="relative w-full max-w-[900px] aspect-[16/11] perspective-[2500px] z-10 flex items-center justify-center mt-8 md:mt-16 group">
        
        {/* Soft interactive shadow under the book */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[92%] h-[92%] bg-black/50 blur-[40px] rounded-[20px] pointer-events-none transition-transform duration-1000 group-hover:scale-105" />

        {/* Dynamic Curved Spine Effect (Backdrop trick) */}
        <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-gradient-to-r from-black/80 via-navy-deep to-black/80 rounded-full blur-[2px] z-0 opacity-80" />

        {/* The Book Container */}
        <div className="relative w-[90%] h-full flex transform-style-3d">
          {SHEETS.map((sheet, index) => {
            const isFlipped = currentFlip > index;

            // Z-Index calculation is critical:
            // Right stack: lowest index = highest z-index (top page)
            // Left stack: lowest index = lowest z-index (bottom page)
            const zIndex = isFlipped ? index + 1 : SHEETS.length - index;

            // Introduce slight randomized rotation / displacement to mimic physical paper stack imperfection
            // Only visible on pages below the top ones.
            const randomRotation = (index % 2 === 0 ? 0.3 : -0.2) * (SHEETS.length - index) * 0.1;
            const yOffset = (index % 3 === 0 ? 2 : -1) * 0.4;

            return (
              <motion.div
                key={sheet.id}
                onClick={isFlipped ? turnPrev : turnNext}
                className="absolute top-0 left-1/2 w-1/2 h-full cursor-pointer"
                style={{
                  transformOrigin: '0% 50%',
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                  y: yOffset,
                }}
                initial={false}
                animate={{
                  rotateY: isFlipped ? -180 : randomRotation,
                  scale: isFlipped && index === currentFlip - 1 ? 1.01 : (!isFlipped && index === currentFlip ? 1.01 : 1),
                }}
                transition={{
                  duration: 1.6,
                  ease: [0.64, 0.04, 0.35, 1], // Very elegant ease function simulating physical weight
                  type: 'tween'
                }}
              >
                {/* ── FRONT FACE (Right Page) ── */}
                <div 
                  className="absolute inset-0 overflow-hidden bg-white"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow: !isFlipped ? '2px 0px 5px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {/* Subtle paper gradient/crease at the spine */}
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 via-black/5 to-transparent z-50 pointer-events-none mix-blend-multiply" />
                  {sheet.front}
                </div>

                {/* ── BACK FACE (Left Page, visible only when flipped) ── */}
                <div 
                  className="absolute inset-0 overflow-hidden bg-white"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    boxShadow: isFlipped ? '-2px 0px 5px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {/* Spine crease shadow mapped to the right edge since it's flipped */}
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 via-black/5 to-transparent z-50 pointer-events-none mix-blend-multiply" />
                  {sheet.back}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-16 flex items-center justify-center gap-16 z-20">
        <button 
          onClick={turnPrev}
          disabled={currentFlip === 0}
          className="group relative font-mono text-[10px] tracking-[0.3em] uppercase text-cream/70 hover:text-gold transition-colors disabled:opacity-30 disabled:hover:text-cream/70 p-4"
        >
          <span className="absolute left-0 w-0 h-[1px] bg-gold bottom-2 group-hover:w-full transition-all duration-300 pointer-events-none" />
          ← TURN BACK
        </button>
        
        {/* Pagination Dots */}
        <div className="flex gap-2 items-center">
          {SHEETS.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-all duration-500 ${i === currentFlip ? 'bg-gold scale-150' : 'bg-cream/20'}`} 
            />
          ))}
        </div>

        <button 
          onClick={turnNext}
          disabled={currentFlip === SHEETS.length}
          className="group relative font-mono text-[10px] tracking-[0.3em] uppercase text-cream/70 hover:text-gold transition-colors disabled:opacity-30 disabled:hover:text-cream/70 p-4"
        >
          <span className="absolute right-0 w-0 h-[1px] bg-gold bottom-2 group-hover:w-full transition-all duration-300 pointer-events-none" />
          READ ON →
        </button>
      </div>
      
      {/* High-fidelity instructions */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-6 font-mono text-[8px] tracking-[0.2em] text-cream/30 uppercase text-center w-full"
      >
        INTERACT WITH PAGES TO NAVIGATE THE ARCHIVE
      </motion.p>
    </motion.div>
  );
}
