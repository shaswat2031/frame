'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Shield, 
  Clock, 
  Edit3, 
  UserX,
  CheckCircle2
} from 'lucide-react';

const mockUsers = [
  { id: 'USR-001', name: 'Julian Voss', email: 'voss@archive.com', role: 'USER', status: 'ACTIVE', joined: '12 JAN 2024' },
  { id: 'ADM-001', name: 'Mission Control', email: 'admin@frame.luxury', role: 'ADMIN', status: 'ACTIVE', joined: '14 APR 2024' },
  { id: 'USR-042', name: 'Elena Wright', email: 'elena.w@proton.me', role: 'USER', status: 'SUSPENDED', joined: '05 MAR 2024' },
  { id: 'USR-089', name: 'Marcus Chen', email: 'm.chen@tech.org', role: 'USER', status: 'ACTIVE', joined: '22 FEB 2024' },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  return (
    <AdminLayout>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tighter">Citizen <span className="italic font-serif text-gold">Manifest.</span></h1>
          <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mt-2">Identity & Access Governance</p>
        </div>
        <button className="px-8 py-4 border border-gold/10 text-gold font-mono text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gold hover:text-navy hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all flex items-center gap-3">
          <UserPlus className="w-4 h-4" />
          Authorize New Identity
        </button>
      </header>

      <div className="mb-8 flex gap-4">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/20 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH IDENTITIES..." 
              className="w-full bg-navy-surface border border-gold/5 px-12 py-4 font-mono text-[10px] tracking-widest outline-none focus:border-gold/20 transition-all"
            />
         </div>
      </div>

      <div className="bg-navy-surface border border-gold/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gold/10 font-mono text-[8px] tracking-[0.3em] text-cream/30 uppercase">
              <th className="p-6 font-normal">Registry ID</th>
              <th className="p-6 font-normal">Full Identity</th>
              <th className="p-6 font-normal">Clearance</th>
              <th className="p-6 font-normal">Operational Status</th>
              <th className="p-6 font-normal">Enrollment Date</th>
              <th className="p-6 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {users.map((user, i) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-gold/[0.01] transition-colors"
              >
                <td className="p-6">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gold/10 flex items-center justify-center bg-navy text-[10px] font-mono text-gold/40">
                         {user.name.charAt(0)}
                      </div>
                      <span className="text-xs font-mono tracking-widest text-gold">{user.id}</span>
                   </div>
                </td>
                <td className="p-6">
                   <div className="flex flex-col">
                      <span className="text-sm font-light text-cream">{user.name}</span>
                      <span className="text-[10px] font-mono text-cream/30 lowercase">{user.email}</span>
                   </div>
                </td>
                <td className="p-6">
                   <div className="flex items-center gap-2">
                      <Shield className={`w-3 h-3 ${user.role === 'ADMIN' ? 'text-gold' : 'text-cream/20'}`} />
                      <span className={`text-[9px] font-mono tracking-widest uppercase ${user.role === 'ADMIN' ? 'text-gold' : 'text-cream/40'}`}>
                         {user.role}
                      </span>
                   </div>
                </td>
                <td className="p-6">
                   <div className="flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${user.status === 'ACTIVE' ? 'bg-teal animate-pulse' : 'bg-red-400'}`} />
                      <span className={`text-[9px] font-mono tracking-widest uppercase ${user.status === 'ACTIVE' ? 'text-teal' : 'text-red-400'}`}>
                         {user.status}
                      </span>
                   </div>
                </td>
                <td className="p-6 text-[10px] font-mono text-cream/20 uppercase tracking-widest">{user.joined}</td>
                <td className="p-6 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 border border-gold/10 hover:border-gold/30 text-cream/30 hover:text-gold transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button className="p-2 border border-gold/10 hover:border-red-400/30 text-cream/30 hover:text-red-400 transition-all"><UserX className="w-3.5 h-3.5" /></button>
                      <button className="p-2 border border-gold/10 hover:border-gold/30 text-cream/30 hover:text-gold transition-all"><MoreVertical className="w-3.5 h-3.5" /></button>
                   </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-8 pt-8 border-t border-gold/5 flex justify-between items-center bg-gold/[0.01] px-6 py-4">
         <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
               <span className="font-mono text-[7px] tracking-[0.3em] text-gold/40 uppercase">Total Population</span>
               <span className="text-xl font-light text-cream">1,204 <span className="text-xs text-cream/20 font-mono italic">UNITS</span></span>
            </div>
            <div className="w-px h-8 bg-gold/10" />
            <div className="flex flex-col gap-1">
               <span className="font-mono text-[7px] tracking-[0.3em] text-teal/40 uppercase">Active Links</span>
               <span className="text-xl font-light text-teal">98.2%</span>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="px-6 py-2 border border-gold/5 font-mono text-[8px] tracking-[0.3em] text-cream/20 hover:text-gold hover:border-gold/20 transition-all uppercase">Export Manifest</button>
            <button className="px-6 py-2 border border-gold/5 font-mono text-[8px] tracking-[0.3em] text-cream/20 hover:text-gold hover:border-gold/20 transition-all uppercase">Identity Audit</button>
         </div>
      </footer>
    </AdminLayout>
  );
}
