'use client';
import AdminLayout from '@/components/admin/AdminLayout';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, organic: 2400 },
  { name: 'Tue', sales: 3000, organic: 1398 },
  { name: 'Wed', sales: 2000, organic: 9800 },
  { name: 'Thu', sales: 2780, organic: 3908 },
  { name: 'Fri', sales: 1890, organic: 4800 },
  { name: 'Sat', sales: 2390, organic: 3800 },
  { name: 'Sun', sales: 3490, organic: 4300 },
];

const stats = [
  { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: DollarSign, trend: 'up' },
  { label: 'Active Sessions', value: '1,284', change: '+5.2%', icon: Users, trend: 'up' },
  { label: 'New Orders', value: '48', change: '-2.4%', icon: ShoppingCart, trend: 'down' },
  { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', icon: TrendingUp, trend: 'up' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tighter">Command <span className="italic font-serif text-gold">Center.</span></h1>
        <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase mt-2">Operational Analytics V.4.2</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-navy-surface border border-gold/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-12 h-12 text-gold" />
            </div>
            
            <div className="flex flex-col gap-1 relative z-10">
              <span className="font-mono text-[8px] tracking-[0.3em] text-cream/30 uppercase">{stat.label}</span>
              <span className="text-3xl font-light tracking-tight">{stat.value}</span>
              <div className={`mt-4 flex items-center gap-1 font-mono text-[9px] ${
                stat.trend === 'up' ? 'text-teal' : 'text-red-400'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
                <span className="text-cream/20 font-light ml-1">vs last interval</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-navy-surface border border-gold/5">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-light tracking-tight text-cream">Revenue Performance</h3>
              <p className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase">Global Acquisition Metrics</p>
            </div>
            <div className="flex gap-4">
              <button className="px-3 py-1 font-mono text-[8px] border border-gold/10 text-gold hover:bg-gold/5 transition-colors uppercase">Day</button>
              <button className="px-3 py-1 font-mono text-[8px] border border-gold text-navy bg-gold uppercase">Week</button>
              <button className="px-3 py-1 font-mono text-[8px] border border-gold/10 text-cream/40 hover:text-gold transition-colors uppercase">Month</button>
            </div>
          </div>
          
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4AF3710" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#D4AF3740" 
                  fontSize={8} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fontStyle: 'mono', letterSpacing: '2px' }}
                />
                <YAxis 
                  stroke="#D4AF3740" 
                  fontSize={8} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontStyle: 'mono' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A0E1A', 
                    border: '1px solid rgba(212,175,55,0.2)', 
                    fontSize: '10px',
                    fontFamily: 'monospace' 
                  }}
                  itemStyle={{ color: '#D4AF37' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#D4AF37" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-navy-surface border border-gold/5 flex flex-col">
          <h3 className="text-xl font-light tracking-tight text-cream mb-8">System Pulse</h3>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Database Health', value: '99.9%', status: 'nominal' },
              { label: 'API Latency', value: '124ms', status: 'optimal' },
              { label: 'Storage Usage', value: '42%', status: 'nominal' },
              { label: 'Traffic Load', value: 'Moderate', status: 'nominal' },
            ].map((pulse) => (
              <div key={pulse.label} className="flex justify-between items-end border-b border-gold/5 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] tracking-[0.2em] text-cream/40 uppercase">{pulse.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_8px_rgba(20,184,166,0.5)] animate-pulse" />
                    <span className="text-xs font-mono tracking-widest uppercase">{pulse.status}</span>
                  </div>
                </div>
                <span className="text-xl font-light text-gold">{pulse.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gold/5">
             <button className="w-full py-4 border border-gold/10 font-mono text-[9px] tracking-[0.3em] uppercase hover:bg-gold hover:text-navy transition-all duration-500">
               Generate System Report
             </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
