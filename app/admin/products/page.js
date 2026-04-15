'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Image as ImageIcon,
  Box,
  Layers,
  ArrowRight
} from 'lucide-react';

const mockProducts = [
  { id: 'VIS-001', name: 'THE ARCHITECT', price: '$450', category: 'TITANIUM', stock: 12, status: 'LIMITED' },
  { id: 'VIS-002', name: 'V-PRO 01', price: '$520', category: 'CARBON', stock: 48, status: 'IN STOCK' },
  { id: 'VIS-003', name: 'LUMINA', price: '$480', category: 'ACETATE', stock: 24, status: 'IN STOCK' },
  { id: 'VIS-004', name: 'ECLIPSE', price: '$590', category: 'TITANIUM', stock: 0, status: 'RESTOCKING' },
];

export default function ProductManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);

  return (
    <AdminLayout>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tighter">Inventory <span className="italic font-serif text-gold">Vault.</span></h1>
          <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mt-2">Active Asset Management</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-gold text-navy font-mono text-[10px] font-bold tracking-[0.3em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center gap-3"
        >
          <Plus className="w-4 h-4" />
          Initialize New Asset
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-navy-surface border border-gold/5 overflow-hidden flex flex-col pt-8"
          >
            <div className="px-8 flex justify-between items-start mb-6">
               <div className="space-y-1">
                 <span className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">{product.category}</span>
                 <h3 className="text-xl font-light tracking-tight group-hover:text-gold transition-colors">{product.name}</h3>
               </div>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 border border-gold/10 hover:border-gold/30 text-cream/30 hover:text-gold transition-all"><Edit2 className="w-3 h-3" /></button>
                  <button className="p-2 border border-gold/10 hover:border-red-400/30 text-cream/30 hover:text-red-400 transition-all"><Trash2 className="w-3 h-3" /></button>
               </div>
            </div>

            <div className="relative aspect-square bg-navy/20 mx-8 mb-8 flex items-center justify-center border border-gold/5 group-hover:border-gold/20 transition-colors cursor-pointer overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
               <ImageIcon className="w-12 h-12 text-gold/10 group-hover:text-gold/20 transition-all duration-700 transform group-hover:scale-110" />
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <span className="font-mono text-[12px] text-gold">{product.price}</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
               </div>
            </div>

            <div className="mt-auto px-8 py-6 border-t border-gold/5 bg-gold/[0.01] flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-teal animate-pulse' : 'bg-red-400'}`} />
                  <span className="font-mono text-[8px] tracking-[0.2em] text-cream/50 uppercase">{product.stock} IN ARCHIVE</span>
               </div>
               <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase">{product.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-navy-surface border border-gold/20 p-12 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-gold hover:text-cream transition-colors font-mono text-[10px] tracking-widest px-4 py-2 border border-gold/10"
              >
                CLOSE [×]
              </button>

              <header className="mb-12">
                <h2 className="text-3xl font-light tracking-tighter">Initialize <span className="italic font-serif text-gold">Asset.</span></h2>
                <p className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase mt-2">New Entry Protocol V.4</p>
              </header>

              <form className="space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">Asset Name</label>
                       <input type="text" className="w-full bg-navy border border-gold/10 p-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/40 transition-all text-cream" placeholder="E.G. THE ARCHITECT" />
                    </div>
                    <div className="space-y-2">
                       <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">Category</label>
                       <select className="w-full bg-navy border border-gold/10 p-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/40 transition-all text-cream uppercase appearance-none cursor-pointer">
                          <option>Titanium</option>
                          <option>Carbon</option>
                          <option>Acetate</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">Description / Provenance</label>
                    <textarea className="w-full bg-navy border border-gold/10 p-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/40 transition-all text-cream min-h-[100px]" placeholder="SYSTEM LOG DATA..." />
                 </div>

                 <div className="grid grid-cols-3 gap-8">
                    <div className="space-y-2">
                       <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">Price (USD)</label>
                       <input type="number" className="w-full bg-navy border border-gold/10 p-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/40 transition-all text-cream" placeholder="450" />
                    </div>
                    <div className="space-y-2">
                       <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">Initial Stock</label>
                       <input type="number" className="w-full bg-navy border border-gold/10 p-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/40 transition-all text-cream" placeholder="24" />
                    </div>
                    <div className="space-y-2">
                       <label className="font-mono text-[8px] tracking-[0.3em] text-gold uppercase">Status</label>
                       <input type="text" className="w-full bg-navy border border-gold/10 p-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/40 transition-all text-cream" placeholder="IN STOCK" />
                    </div>
                 </div>

                 <div className="pt-8 flex gap-4">
                    <button className="flex-1 bg-gold text-navy py-5 font-mono text-[10px] font-bold tracking-[0.3em] uppercase hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all">
                      Communicate To Database
                    </button>
                    <button 
                       type="button"
                       onClick={() => setIsModalOpen(false)}
                       className="flex-1 border border-gold/10 text-cream/40 py-5 font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-gold/5 transition-all"
                    >
                      Abort Protocol
                    </button>
                 </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
