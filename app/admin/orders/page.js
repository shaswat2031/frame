'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  QrCode, 
  FileText, 
  MoreVertical,
  CheckCircle2,
  Clock,
  Package,
  Truck
} from 'lucide-react';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

// Mock Data - In a real app, this would be fetched from MongoDB
const mockOrders = [
  { id: 'ORD-7721', user: 'Julian Voss', total: '$890.00', status: 'PROCESSING', date: 'APR 12, 2024', items: 2 },
  { id: 'ORD-7719', user: 'Elena Wright', total: '$450.00', status: 'SHIPPED', date: 'APR 11, 2024', items: 1 },
  { id: 'ORD-7692', user: 'Marcus Chen', total: '$1,240.00', status: 'DELIVERED', date: 'APR 09, 2024', items: 3 },
  { id: 'ORD-7685', user: 'Sarah Miller', total: '$520.00', status: 'PENDING', date: 'APR 08, 2024', items: 1 },
];

const statusStyles = {
  PENDING: 'text-gold border-gold/20 bg-gold/5',
  PROCESSING: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  SHIPPED: 'text-teal border-teal/20 bg-teal/5',
  DELIVERED: 'text-cream/40 border-cream/10 bg-cream/5',
};

export default function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const generateQRCode = async (orderId) => {
    try {
      const url = await QRCode.toDataURL(`https://frame.luxury/track/${orderId}`);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR-${orderId}.png`;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFont("courier");
    doc.setFontSize(22);
    doc.text("FRAME LUXURY", 20, 30);
    doc.setFontSize(10);
    doc.text(`INVOICE: ${order.id}`, 20, 45);
    doc.text(`DATE: ${order.date}`, 20, 50);
    doc.text(`CUSTOMER: ${order.user}`, 20, 60);
    doc.text("------------------------------------------", 20, 70);
    doc.text("ITEM                    QTY      PRICE", 20, 80);
    doc.text("ARCHITECT FRAME-V.01    01       $450.00", 20, 90);
    doc.text("------------------------------------------", 20, 100);
    doc.text(`TOTAL: ${order.total}`, 20, 110);
    doc.text("THANK YOU FOR YOUR PATRONAGE.", 20, 130);
    doc.save(`Invoice-${order.id}.pdf`);
  };

  return (
    <AdminLayout>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light tracking-tighter">Order <span className="italic font-serif text-gold">Registry.</span></h1>
          <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mt-2">Logistics & Fullfilment Portal</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH ASSETS..." 
              className="bg-navy-surface border border-gold/10 px-12 py-3 font-mono text-[10px] tracking-widest outline-none focus:border-gold/30 transition-all w-64"
            />
          </div>
          <button className="px-6 py-3 border border-gold/10 font-mono text-[10px] tracking-widest uppercase hover:bg-gold/5 transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Filter
          </button>
        </div>
      </header>

      <div className="bg-navy-surface border border-gold/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gold/10 font-mono text-[8px] tracking-[0.3em] text-cream/30 uppercase">
              <th className="p-6 font-normal">Tracking ID</th>
              <th className="p-6 font-normal">Client</th>
              <th className="p-6 font-normal">Payload</th>
              <th className="p-6 font-normal">Value</th>
              <th className="p-6 font-normal">Status</th>
              <th className="p-6 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {orders.map((order, i) => (
              <motion.tr 
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-gold/[0.02] transition-colors"
              >
                <td className="p-6 text-xs font-mono tracking-widest text-gold">{order.id}</td>
                <td className="p-6 text-sm font-light">{order.user}</td>
                <td className="p-6 text-xs font-mono text-cream/40 uppercase">{order.items} UNITS</td>
                <td className="p-6 text-sm font-serif italic text-gold">{order.total}</td>
                <td className="p-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full border text-[8px] font-mono tracking-widest uppercase ${statusStyles[order.status]}`}>
                    {order.status}
                  </div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => generateQRCode(order.id)}
                      title="Generate Tracking QR"
                      className="p-2 border border-gold/10 hover:border-gold/40 text-cream/40 hover:text-gold transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => downloadInvoice(order)}
                      title="Export Invoice PDF"
                      className="p-2 border border-gold/10 hover:border-gold/40 text-cream/40 hover:text-gold transition-all"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gold/10 hover:border-gold/40 text-cream/40 hover:text-gold transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between items-center font-mono text-[9px] text-cream/30 uppercase tracking-widest">
        <span>Showing {orders.length} operational orders</span>
        <div className="flex gap-4">
          <button className="hover:text-gold transition-colors">Prev</button>
          <span className="text-gold">1</span>
          <button className="hover:text-gold transition-colors">Next</button>
        </div>
      </div>
    </AdminLayout>
  );
}
