
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  ExternalLink, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { db } from '../db';

const Dashboard: React.FC = () => {
  const combos = db.getCombos();
  const links = db.getLinks();
  
  const activeCombos = combos.filter(c => c.active).length;
  const activeLinks = links.filter(l => l.active).length;
  const averagePrice = combos.length > 0 
    ? Math.round(combos.reduce((acc, c) => acc + c.price, 0) / combos.length) 
    : 0;

  const stats = [
    { title: 'Total Combos', value: combos.length, icon: Package, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Links Activos', value: activeLinks, icon: ExternalLink, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Precio Promedio', value: `$${averagePrice.toLocaleString('es-AR')}`, icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Estado', value: 'Activo', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Control</h1>
          <p className="text-dark-muted">Resumen general de tu tienda de suplementos.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-dark-card border border-dark-border p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-dark-muted">{stat.title}</p>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/combos" className="bg-dark-card border border-dark-border p-8 rounded-3xl hover:border-primary/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <Package className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Gestionar Combos</h3>
                  <p className="text-dark-muted text-sm">Crea, edita o elimina tus ofertas</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-dark-muted group-hover:text-primary transition-all group-hover:translate-x-2" />
            </div>
          </Link>

          <Link to="/admin/links" className="bg-dark-card border border-dark-border p-8 rounded-3xl hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <ExternalLink className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Gestionar Links</h3>
                  <p className="text-dark-muted text-sm">Conecta otras aplicaciones</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-dark-muted group-hover:text-blue-400 transition-all group-hover:translate-x-2" />
            </div>
          </Link>
        </div>

        {/* Recent Items */}
        <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-dark-border flex items-center justify-between">
            <h3 className="font-bold text-white">Combos Recientes</h3>
            <Link to="/admin/combos" className="text-primary text-sm font-medium hover:underline">Ver todos</Link>
          </div>
          <div className="divide-y divide-dark-border">
            {combos.slice(0, 5).map((combo) => (
              <div key={combo.id} className="px-8 py-4 flex items-center justify-between hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-dark-bg rounded-lg overflow-hidden border border-dark-border">
                    <img src={combo.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{combo.name}</h4>
                    <p className="text-[10px] text-dark-muted uppercase tracking-tighter">${combo.price.toLocaleString('es-AR')}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${combo.active ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                  {combo.active ? 'Activo' : 'Inactivo'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
