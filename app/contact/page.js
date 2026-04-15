'use client';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen pt-32 pb-32 bg-navy text-cream transition-colors duration-700"
    >
      <main className="container mx-auto px-6">
        <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-gold/20 pb-12">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gold">PRIVATE CONCIERGE</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter">
              AWAITING <br /><span className="italic font-serif text-gold">INQUIRIES.</span>
            </motion.h1>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl font-light tracking-widest mb-6">FLAGSHIP BOUTIQUE</h2>
              <div className="font-mono text-[10px] tracking-[0.2em] text-cream/60 space-y-3 uppercase">
                <p className="text-cream">Sector 17, High Street</p>
                <p>Chandigarh, Punjab 160017</p>
                <p>India</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light tracking-widest mb-6">COMMUNICATION</h2>
              <div className="font-mono text-[10px] tracking-[0.2em] text-cream/60 space-y-3 uppercase">
                <p>E: <a href="mailto:concierge@EYELOVEYOU.com" className="text-gold hover:text-cream transition-colors">concierge@EYELOVEYOU.com</a></p>
                <p>T: <span className="text-cream">+91 98765 43210</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light tracking-widest mb-6">HOURS OF OPERATION</h2>
              <div className="font-mono text-[10px] tracking-[0.2em] text-cream/60 space-y-3 uppercase">
                <p>MON - SAT: <span className="text-cream">10:00 AM — 08:00 PM</span></p>
                <p>SUNDAY: <span className="text-cream">BY INVITATION ONLY</span></p>
              </div>
            </div>

            <button className="border border-gold px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-mono text-gold hover:bg-gold hover:text-navy transition-all duration-300">
              BOOK PRIVATE FITTING
            </button>
          </div>

          {/* Minimalist Form */}
          <div className="bg-navy-surface p-12 border border-gold/10">
            <h2 className="text-2xl font-serif italic text-gold mb-8">Initiate Dialogue</h2>
            <form className="space-y-8 font-mono text-[10px] tracking-[0.2em] uppercase">
              <div className="flex flex-col space-y-2">
                <label className="text-cream/50">IDENTITY</label>
                <input type="text" className="bg-transparent border-b border-gold/20 pb-3 outline-none focus:border-gold transition-colors text-cream text-base" placeholder="JOHN DOE" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-cream/50">TRANSMISSION (EMAIL)</label>
                <input type="email" className="bg-transparent border-b border-gold/20 pb-3 outline-none focus:border-gold transition-colors text-cream text-base" placeholder="JOHN@EXAMPLE.COM" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-cream/50">SUBJECT</label>
                <select className="bg-transparent border-b border-gold/20 pb-3 outline-none focus:border-gold transition-colors text-cream text-base appearance-none cursor-pointer">
                  <option className="bg-navy text-cream">GENERAL INQUIRY</option>
                  <option className="bg-navy text-cream">PRODUCT SOURCING</option>
                  <option className="bg-navy text-cream">AFTERSALES SUPPORT</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-cream/50">DISCOURSE</label>
                <textarea rows="4" className="bg-transparent border-b border-gold/20 pb-3 outline-none focus:border-gold transition-colors text-cream text-base resize-none" placeholder="YOUR MESSAGE..."></textarea>
              </div>
              <button type="submit" className="w-full bg-gold text-navy py-4 font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow duration-300">
                DISPATCH MESSAGE
              </button>
            </form>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
