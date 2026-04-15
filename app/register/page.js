'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'REGISTRATION FAILED');
      }

      toast.success('CLEARANCE GRANTED. PLEASE SIGN IN.', {
          style: {
            background: '#0A0E1A',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.2)',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
          },
      });
      
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      toast.error(error.message.toUpperCase(), {
          style: {
            background: '#0A0E1A',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.2)',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
          },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background Aesthetic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-navy-surface border border-gold/10 p-12 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div 
             initial={{ rotate: 45, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             transition={{ delay: 0.2, duration: 1 }}
             className="w-16 h-16 border border-gold/20 flex items-center justify-center mb-6"
          >
             <User className="w-6 h-6 text-gold" />
          </motion.div>
          <h1 className="text-3xl font-light tracking-tighter text-cream uppercase">Archive <span className="italic font-serif text-gold">Registry</span></h1>
          <p className="font-mono text-[9px] tracking-[0.4em] text-gold/40 uppercase mt-4">Frame Luxury Enrollment Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase ml-1">Full Identity / Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/20 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="E.G. JULIAN VOSS"
                className="w-full bg-navy border border-gold/10 px-12 py-4 font-mono text-[10px] tracking-[0.2em] text-cream outline-none focus:border-gold/30 transition-all placeholder:text-cream/10"
              />
            </div>
          </div>

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
                placeholder="••••••••••••••••"
                className="w-full bg-navy border border-gold/10 px-12 py-4 font-mono text-[10px] tracking-[0.2em] text-cream outline-none focus:border-gold/30 transition-all placeholder:text-cream/10"
              />
            </div>
          </div>

          <div className="pt-4 space-y-2">
             <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase ml-1">Clearance Level</label>
             <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, role: 'USER'})}
                  className={`py-3 font-mono text-[8px] border transition-all ${formData.role === 'USER' ? 'bg-gold text-navy border-gold' : 'border-gold/20 text-cream/40'}`}
                >
                  STANDARD
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, role: 'ADMIN'})}
                  className={`py-3 font-mono text-[8px] border transition-all flex items-center justify-center gap-2 ${formData.role === 'ADMIN' ? 'bg-gold text-navy border-gold' : 'border-gold/20 text-cream/40'}`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  ADMIN
                </button>
             </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 border border-gold text-gold font-mono text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 group relative overflow-hidden transition-all hover:bg-gold hover:text-navy hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] disabled:opacity-50 mt-4"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Confirm Enrollment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gold/5 flex flex-col items-center gap-4">
           <Link href="/login" className="font-mono text-[9px] tracking-[0.2em] text-cream/30 hover:text-gold transition-colors uppercase">
             Already Registered? Sign In
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
