'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        toast.error(result.error || 'INVALID CREDENTIALS', {
          style: {
            background: '#0A0E1A',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.2)',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
          },
        });
      } else {
        toast.success('AUTHENTICATION SUCCESSFUL', {
          style: {
            background: '#0A0E1A',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.2)',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
          },
        });
        router.push(callbackUrl);
      }
    } catch (error) {
       toast.error('COMMUNICATION ERROR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md bg-navy-surface border border-gold/10 p-12 relative z-10 shadow-2xl"
    >
      <div className="flex flex-col items-center mb-12">
        <motion.div 
           initial={{ rotate: -45, opacity: 0 }}
           animate={{ rotate: 0, opacity: 1 }}
           transition={{ delay: 0.2, duration: 1 }}
           className="w-16 h-16 border border-gold/20 flex items-center justify-center mb-6"
        >
           <Lock className="w-6 h-6 text-gold" />
        </motion.div>
        <h1 className="text-3xl font-light tracking-tighter text-cream uppercase">Secure <span className="italic font-serif text-gold">Access</span></h1>
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/40 uppercase mt-4">Frame Luxury Operational Portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase ml-1">Archive ID / Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/20 group-focus-within:text-gold transition-colors" />
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="OPERATOR@FRAME.LUXURY"
              className="w-full bg-navy border border-gold/10 px-12 py-4 font-mono text-[10px] tracking-[0.2em] text-cream outline-none focus:border-gold/30 transition-all placeholder:text-cream/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase ml-1">Security Payload / Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/20 group-focus-within:text-gold transition-colors" />
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••••••••"
              className="w-full bg-navy border border-gold/10 px-12 py-4 font-mono text-[10px] tracking-[0.2em] text-cream outline-none focus:border-gold/30 transition-all placeholder:text-cream/10"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-gold text-navy font-mono text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 group relative overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Initialize Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-gold/5 flex flex-col items-center gap-4">
         <Link href="/register" className="font-mono text-[9px] tracking-[0.2em] text-cream/30 hover:text-gold transition-colors uppercase">
           Request New Clearance
         </Link>
         <button className="font-mono text-[8px] tracking-[0.2em] text-cream/10 uppercase hover:text-red-400 transition-colors">
           Forgot Security Matrix?
         </button>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background Aesthetic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <Suspense fallback={<div className="text-gold font-mono text-[10px] tracking-[0.3em] uppercase">Initializing...</div>}>
        <LoginForm />
      </Suspense>
      
      <div className="absolute bottom-8 left-8 flex flex-col gap-1">
        <span className="font-mono text-[7px] tracking-[0.4em] text-cream/20 uppercase">PROTOCOL: SHA-256</span>
        <span className="font-mono text-[7px] tracking-[0.4em] text-cream/20 uppercase">STATUS: SECURE HANDSHAKE</span>
      </div>
    </div>
  );
}
