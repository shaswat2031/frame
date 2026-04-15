'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  MessageSquare, 
  User, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  MoreHorizontal
} from 'lucide-react';

const mockTickets = [
  { id: 'TKT-042', user: 'Julian Voss', subject: 'Shipping Delay Inquiry', status: 'IN_PROGRESS', priority: 'MEDIUM', date: '2H AGO' },
  { id: 'TKT-039', user: 'Elena Wright', subject: 'Custom Prescription Request', status: 'OPEN', priority: 'HIGH', date: '5H AGO' },
  { id: 'TKT-035', user: 'Marcus Chen', subject: 'Quality Control Feedback', status: 'RESOLVED', priority: 'LOW', date: '1D AGO' },
];

const priorityColors = {
  LOW: 'bg-cream/10 text-cream/40',
  MEDIUM: 'bg-gold/10 text-gold',
  HIGH: 'bg-red-400/10 text-red-400',
  URGENT: 'bg-red-600/20 text-red-600',
};

export default function SupportTickets() {
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);

  return (
    <AdminLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tighter">Support <span className="italic font-serif text-gold">Hub.</span></h1>
        <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mt-2">Client Concierge & Dispatch</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-320px)]">
        {/* Ticket List */}
        <div className="lg:col-span-1 bg-navy-surface border border-gold/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gold/5 font-mono text-[8px] tracking-[0.3em] text-cream/30 uppercase">Active Inquiries</div>
          <div className="flex-1 overflow-y-auto divide-y divide-gold/5">
            {mockTickets.map((ticket) => (
              <button 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`w-full p-6 text-left transition-all relative ${
                  selectedTicket?.id === ticket.id ? 'bg-gold/[0.03] border-l-2 border-gold shadow-inner' : 'hover:bg-gold/[0.01]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-mono tracking-widest text-gold">{ticket.id}</span>
                   <span className={`px-2 py-0.5 rounded-full text-[7px] font-mono tracking-[0.2em] uppercase ${priorityColors[ticket.priority]}`}>
                      {ticket.priority}
                   </span>
                </div>
                <h3 className="text-sm font-light text-cream mb-1 truncate">{ticket.subject}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[10px] text-cream/40 font-light">{ticket.user}</span>
                  <span className="text-[8px] font-mono text-cream/20">{ticket.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Details / Chat */}
        <div className="lg:col-span-2 bg-navy-surface border border-gold/5 flex flex-col relative overflow-hidden">
          {selectedTicket ? (
            <>
              <div className="p-8 border-b border-gold/5 flex justify-between items-center bg-gold/[0.01]">
                <div>
                  <h2 className="text-2xl font-light tracking-tight text-cream">{selectedTicket.subject}</h2>
                  <div className="flex gap-4 mt-2">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase flex items-center gap-2">
                      <User className="w-3 h-3 text-gold" />
                      Client: <span className="text-gold">{selectedTicket.user}</span>
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gold" />
                      Opened: <span className="text-gold">APR 14, 2024</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="px-6 py-3 border border-gold/10 text-gold font-mono text-[10px] tracking-widest uppercase hover:bg-gold hover:text-navy transition-all">
                     Resolve Entry
                   </button>
                   <button className="p-3 border border-gold/10 text-cream/30 hover:text-gold transition-colors">
                     <MoreHorizontal className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-[url('/noise.png')] opacity-95">
                 {/* Internal Log Entry */}
                 <div className="flex flex-col items-center">
                    <span className="px-4 py-1 bg-gold/5 border border-gold/10 font-mono text-[7px] tracking-[0.4em] text-gold/60 uppercase">
                      Session Encrypted & Authenticated
                    </span>
                 </div>

                 {/* User Message */}
                 <div className="max-w-[80%] flex flex-col gap-2">
                    <div className="p-6 bg-navy border border-gold/10 font-light text-cream/80 leading-relaxed text-sm">
                       Greetings Mission Control. I am writing to inquire about the current location of my recent acquisition, Order ORD-7721. The operational status has been stuck at &apos;Processing&apos; for the last 48 hours. I require a tactical update on the logistics.
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-cream/30 uppercase px-1">JULIAN VOSS • 12:42 PM</span>
                 </div>

                 {/* System/Admin Message */}
                 <div className="max-w-[80%] ml-auto flex flex-col items-end gap-2">
                    <div className="p-6 bg-gold/10 border border-gold/20 font-light text-cream/90 leading-relaxed text-sm">
                       Understood, Julian. We are currently calibrating the final hand-polish on your Architect frame. Logistics suggests a 06:00 dispatch window tomorrow. You will receive a secure QR tracking payload upon clearance.
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-gold uppercase px-1">ARCHIVE DISPATCH • 12:50 PM • ✓ READ</span>
                 </div>
              </div>

              <div className="p-8 border-t border-gold/5 bg-navy/30">
                 <div className="flex gap-4">
                    <div className="flex-1 relative">
                       <input 
                         type="text" 
                         placeholder="TRANSMIT RESPONSE..." 
                         className="w-full bg-navy border border-gold/10 p-5 font-mono text-[10px] tracking-widest outline-none focus:border-gold/30 transition-all text-cream"
                       />
                       <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/30 hover:text-gold transition-colors">
                         <Send className="w-5 h-5" />
                       </button>
                    </div>
                    <button className="px-8 border border-gold/10 text-gold hover:bg-gold/5 transition-all">
                      <AlertCircle className="w-5 h-5" />
                    </button>
                 </div>
                 <div className="mt-4 flex gap-6 font-mono text-[7px] tracking-[0.3em] text-cream/20 uppercase">
                    <span>Press Ctrl+Enter to dispatch</span>
                    <span className="text-teal">System Operational</span>
                 </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-center items-center justify-center opacity-20 flex-col gap-4">
               <MessageSquare className="w-16 h-16 text-gold" />
               <span className="font-mono text-[10px] tracking-[0.5em] uppercase">No active frequency selected</span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
