'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Webcam from 'react-webcam';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Layers, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const FRAMES = [
  { id: 'aviator', name: 'Golden Aviator', color: '#d4af37', style: 'High Fashion', type: 'Titanium' },
  { id: 'wayfarer', name: 'Eclipse Onyx', color: '#1a1a1a', style: 'Classic Editorial', type: 'Acetate' },
  { id: 'clubmaster', name: 'Estate Ivory', color: '#fef3e2', style: 'Retro Luxury', type: 'Hybrid' },
  { id: 'round', name: 'Soho Round', color: '#8b4513', style: 'Artistic', type: 'Tortoise' },
  { id: 'shield', name: 'Future Shield', color: '#00ced1', style: 'Avant-Garde', type: 'Crystal' },
  { id: 'cat-eye', name: 'Milanese Cat', color: '#ff69b4', style: 'Elle Vogue', type: 'Petal' },
  { id: 'square', name: 'Wall St. Square', color: '#2f4f4f', style: 'Executive', type: 'Steel' },
  { id: 'rimless', name: 'Ghost Rimless', color: '#c0c0c0', style: 'Minimalist', type: 'Optical' },
  { id: 'oversized', name: 'Grand Palais', color: '#4b0082', style: 'Runway', type: 'Royal' },
  { id: 'hexagon', name: 'Geometric Hex', color: '#ffd700', style: 'Modernist', type: 'Brushed' }
];

export default function TryOnPage() {
  const [detector, setDetector] = useState(null);
  const [activeFrame, setActiveFrame] = useState(FRAMES[0]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [modelStatus, setModelStatus] = useState("Initializing Engine...");
  const webcamRef = useRef(null);
  const smoothPos = useRef({ x: 0, y: 0, width: 0, angle: 0 });
  const [facePosition, setFacePosition] = useState(null);

  const SMOOTH_FACTOR = 0.45;

  // Initialize Detector with Multi-Backend Preparation
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const loadModel = async () => {
      try {
        setModelStatus("Preparing GPU...");
        // Essential pre-flight for many environments
        await tf.setBackend('webgl');
        await tf.ready();
        
        setModelStatus("Syncing Biometrics...");
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4',
        };
        const newDetector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        setDetector(newDetector);
        setModelStatus("Engine Active");
      } catch (error) {
        console.error("Biometric Engine Fault:", error);
        if (retryCount < maxRetries) {
          retryCount++;
          setModelStatus(`Retrying (${retryCount}/${maxRetries})...`);
          setTimeout(loadModel, 2000);
        } else {
          setModelStatus("Sensor Failure - Please Refresh");
        }
      }
    };
    loadModel();
  }, []);

  // Perspective-Aware Coordinate Mapping
  const detect = async () => {
    if (!detector || !webcamRef.current || !webcamRef.current.video) return;
    
    const video = webcamRef.current.video;
    if (video.readyState !== 4) {
      if (detector) requestAnimationFrame(detect);
      return;
    }

    try {
      const { clientWidth, clientHeight, videoWidth, videoHeight } = video;
      // Using MediaPipe Runtime provides higher precision
      const faces = await detector.estimateFaces(video, { flipHorizontal: false });

      if (faces && faces.length > 0) {
        const face = faces[0];
        
        const scale = Math.max(clientWidth / videoWidth, clientHeight / videoHeight);
        const offsetX = (videoWidth * scale - clientWidth) / 2;
        const offsetY = (videoHeight * scale - clientHeight) / 2;

        const leftEye = face.keypoints[33];
        const rightEye = face.keypoints[263];
        const midPoint = face.keypoints[168];

        if (leftEye && rightEye && midPoint) {
          const dx = (rightEye.x - leftEye.x) * scale;
          const dy = (rightEye.y - leftEye.y) * scale;
          const targetWidth = dx * 2.6; 
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          const targetX = clientWidth - (midPoint.x * scale - offsetX);
          const targetY = (midPoint.y * scale - offsetY) - 12;

          // Apply Exponential Moving Average Smoothing
          smoothPos.current = {
            x: smoothPos.current.x + (targetX - smoothPos.current.x) * SMOOTH_FACTOR,
            y: smoothPos.current.y + (targetY - smoothPos.current.y) * SMOOTH_FACTOR,
            width: smoothPos.current.width + (targetWidth - smoothPos.current.width) * SMOOTH_FACTOR,
            angle: smoothPos.current.angle + ((-targetAngle) - smoothPos.current.angle) * SMOOTH_FACTOR
          };

          setFacePosition({ ...smoothPos.current });
        }
      } else {
        // Option: fade out frames if face lost
        // setFacePosition(null); 
      }
    } catch (err) {
      console.error("Tracking Error:", err);
    }
    requestAnimationFrame(detect);
  };

  useEffect(() => {
    if (detector && isCameraReady) {
      detect();
    }
  }, [detector, isCameraReady]);

  return (
    <main className="min-h-screen bg-[#05070a] text-cream">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-[10px] uppercase tracking-widest mb-12 group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back to Boutique
          </Link>

          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <span className="text-teal uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">AR Experience</span>
              <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight mb-4">Mirror of Discovery</h1>
              <p className="text-cream/40 text-xs leading-relaxed max-w-sm">
                Utilizing real-time biometric mapping to explore the CHASHAMA aesthetic on your own features.
              </p>
            </div>
            
            <div className="flex bg-navy-deep p-2 rounded-2xl border border-gold/10">
               <div className="flex items-center gap-3 px-6 py-3 border-r border-gold/10">
                 <ShieldCheck className={`transition-all duration-500 ${facePosition ? 'text-teal' : 'text-white/20'}`} size={16} />
                 <span className={`text-[10px] uppercase tracking-widest font-bold transition-all ${facePosition ? 'text-teal' : 'text-cream/40'}`}>
                   {facePosition ? 'Analysis Locked' : (detector ? 'Scanning Sphere...' : 'Booting Sensor...')}
                 </span>
               </div>
               <div className="flex items-center gap-3 px-6 py-3">
                 <div className="text-[10px] uppercase tracking-widest text-gold font-bold">{modelStatus}</div>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 relative aspect-video bg-navy-deep rounded-[40px] border border-white/5 overflow-hidden shadow-2xl group">
               {!isCameraReady && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#05070a]">
                   <div className="w-20 h-20 border border-gold/30 rounded-full animate-ping mb-8" />
                   <p className="text-gold font-serif italic tracking-widest">{modelStatus}</p>
                 </div>
               )}

               <Webcam
                ref={webcamRef}
                autoPlay
                muted
                mirrored={true}
                onUserMedia={() => setIsCameraReady(true)}
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000"
                videoConstraints={{ facingMode: "user", width: 1280, height: 720 }}
               />

               {facePosition && (
                 <div 
                   className="absolute pointer-events-none z-40 transition-all duration-75"
                   style={{
                     left: `${facePosition.x}px`,
                     top: `${facePosition.y}px`,
                     width: `${facePosition.width}px`,
                     transform: `translate(-50%, -50%) rotate(${facePosition.angle}deg)`,
                   }}
                 >
                   <FrameOverlay id={activeFrame.id} color={activeFrame.color} />
                 </div>
               )}

               <div className="absolute top-8 left-8 flex items-center gap-4 z-40">
                  <div className="bg-navy-deep/80 backdrop-blur-md px-4 py-2 rounded-full border border-gold/20 flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${facePosition ? 'bg-teal' : 'bg-red-500'}`} />
                    <span className="text-[8px] font-mono tracking-widest uppercase text-cream">
                      {facePosition ? 'Live Track Active' : 'Calibrating Optic...'}
                    </span>
                  </div>
               </div>

               <div className="absolute bottom-8 right-8 z-40">
                  <button className="bg-gold text-navy p-4 rounded-full shadow-lg hover:rotate-180 transition-transform duration-500">
                    <RefreshCw size={20} />
                  </button>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-navy-surface/30 backdrop-blur-xl border border-white/5 p-8 rounded-[40px] max-h-[650px] overflow-y-auto custom-scrollbar">
                <header className="mb-8 border-b border-white/5 pb-4">
                  <h4 className="text-xs uppercase tracking-[0.4em] text-gold font-bold">Catalogue</h4>
                  <p className="text-[10px] text-cream/30 italic">10 Handcrafted Artifacts Available</p>
                </header>

                <div className="space-y-4">
                  {FRAMES.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setActiveFrame(frame)}
                      className={`w-full group relative p-6 rounded-3xl border text-left transition-all overflow-hidden ${
                        activeFrame.id === frame.id ? 'border-gold bg-gold/5' : 'border-white/5 hover:border-gold/30'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-serif text-lg tracking-widest uppercase mb-1">{frame.name}</h5>
                          <span className="text-[9px] uppercase tracking-widest text-teal font-bold">{frame.style}</span>
                        </div>
                        <div 
                          className="w-10 h-10 rounded-full border border-white/20"
                          style={{ backgroundColor: frame.color }}
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-mono">{frame.type} Chassis</span>
                        <span className="text-[8px] font-mono">Series 08/24</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {activeFrame && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={activeFrame.id}
                  className="bg-gold p-8 rounded-[40px] text-navy shadow-xl"
                >
                   <div className="flex justify-between items-start mb-6">
                     <Camera size={24} />
                     <button className="text-[10px] uppercase font-bold tracking-widest underline">Book Test Drive</button>
                   </div>
                   <h3 className="text-3xl font-serif italic mb-2">{activeFrame.name}</h3>
                   <p className="text-[10px] uppercase font-semibold leading-relaxed mb-6 opacity-70">
                     A masterpiece of architectural optics, designed for the discerning individual.
                   </p>
                   <div className="flex gap-4">
                      <div className="px-4 py-2 bg-navy/10 rounded-full text-[8px] font-bold">100% UV Protection</div>
                      <div className="px-4 py-2 bg-navy/10 rounded-full text-[8px] font-bold">Titanium Core</div>
                   </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212, 175, 55, 0.5); }
      `}} />
    </main>
  );
}

// Advanced Frame Overlay Component with Premium SVG Details
function FrameOverlay({ id, color }) {
  // Define a gold gradient for metallic frames
  const isMetallic = color === '#d4af37' || color === '#c0c0c0' || color === '#ffd700';
  
  return (
    <div className="w-full relative group">
      <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
        <defs>
          <linearGradient id="metal-shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="lens-glint">
             <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* LENSES (Shared for most) */}
        <g opacity="0.15">
          <path d="M65 80C65 50 90 45 130 45H230C250 45 265 55 265 80V120C265 150 240 165 200 165H100C75 165 65 150 65 120V80Z" fill="white" />
          <path d="M335 80C335 55 350 45 370 45H470C510 45 535 50 535 80V120C535 150 525 165 500 165H400C360 165 335 150 335 120V80Z" fill="white" />
          {/* Subtle Glint Line */}
          <path d="M80 60L120 100" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#lens-glint)" />
          <path d="M350 60L390 100" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#lens-glint)" />
        </g>

        {/* FRAME HULL */}
        {id === 'aviator' && (
          <g>
            <path 
              d="M50 80C50 40 80 30 130 30H230C260 30 280 50 280 80V120C280 160 250 180 200 180H100C50 180 50 140 50 120V80Z" 
              stroke={isMetallic ? "url(#metal-shine)" : color} 
              strokeWidth="4" 
            />
            <path 
              d="M320 80C320 50 340 30 370 30H470C520 30 550 40 550 80V120C550 140 550 180 500 180H400C350 180 320 160 320 120V80Z" 
              stroke={isMetallic ? "url(#metal-shine)" : color} 
              strokeWidth="4" 
            />
            {/* Bridge Bars - Premium Detail */}
            <path d="M280 60H320" stroke={color} strokeWidth="3" />
            <path d="M280 85C280 85 295 75 300 75C305 75 320 85 320 85" stroke={color} strokeWidth="2" />
          </g>
        )}

        {id === 'wayfarer' && (
          <g>
            <path 
              d="M40 40H260V130C260 160 220 180 150 180H70C40 180 40 160 40 130V40Z" 
              fill={color} 
              fillOpacity="0.9"
            />
            <path 
              d="M340 40H560V130C560 160 520 180 450 180H370C340 180 340 160 340 130V40Z" 
              fill={color} 
              fillOpacity="0.9"
            />
            {/* Massive Bridge */}
            <path d="M260 50H340" stroke={color} strokeWidth="15" />
            {/* Corner Decorative Dots */}
            <circle cx="55" cy="55" r="2" fill="white" fillOpacity="0.5" />
            <circle cx="545" cy="55" r="2" fill="white" fillOpacity="0.5" />
          </g>
        )}

        {id === 'clubmaster' && (
           <g>
              {/* Heavy Brow Line */}
              <path d="M40 40C40 40 100 30 260 45L260 70C150 60 40 60 40 60V40Z" fill={color} />
              <path d="M560 40C560 40 500 30 340 45L340 70C450 60 560 60 560 60V40Z" fill={color} />
              {/* Thin Bottom Wire */}
              <path d="M40 60V120C40 160 100 180 150 180C200 180 260 160 260 120" stroke="silver" strokeWidth="2" />
              <path d="M340 120C340 160 400 180 450 180C500 180 560 160 560 120V60" stroke="silver" strokeWidth="2" />
              <path d="M260 55H340" stroke="silver" strokeWidth="4" />
           </g>
        )}

        {id === 'round' && (
           <g>
              <circle cx="150" cy="100" r="85" stroke={isMetallic ? "url(#metal-shine)" : color} strokeWidth="5" />
              <circle cx="450" cy="100" r="85" stroke={isMetallic ? "url(#metal-shine)" : color} strokeWidth="5" />
              {/* High Arched Bridge */}
              <path d="M235 90C235 90 260 60 300 60C340 60 365 90 365 90" stroke={color} strokeWidth="3" />
           </g>
        )}

        {id === 'cat-eye' && (
           <g>
              <path d="M40 70C40 40 300 35 265 110C245 150 150 180 100 140C60 110 40 70 40 70Z" fill={color} />
              <path d="M560 70C560 40 300 35 335 110C355 150 450 180 500 140C540 110 560 70 560 70Z" fill={color} />
              <path d="M265 80H335" stroke={color} strokeWidth="8" />
           </g>
        )}

        {/* Universal Hinge Pins (Advanced Accent) */}
        <g opacity="0.6">
           <rect x="35" y="75" width="10" height="2" rx="1" fill="white" />
           <rect x="555" y="75" width="10" height="2" rx="1" fill="white" />
        </g>
      </svg>

      {/* Optical HUD Data Sync */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
         <div className="w-1 h-1 bg-teal rounded-full animate-ping" />
         <span className="text-[6px] font-mono text-teal tracking-[0.3em] uppercase">Tracking PhaseLock</span>
      </div>
    </div>
  );
}
