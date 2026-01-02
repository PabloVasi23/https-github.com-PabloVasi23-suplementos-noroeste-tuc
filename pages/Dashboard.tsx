import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { 
  Package, 
  DollarSign, 
  ExternalLink, 
  ArrowRight,
  TrendingUp,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { db } from '../db';

const Dashboard: React.FC = () => {
  const combos = db.getCombos();
  const links = db.getLinks();
  
  const activeCombosCount = combos.filter(c => c.active).length;
  const activeLinksCount = links.filter(l => l.active).length;
  const averagePrice = combos.length > 0 
    ? Math.round(combos.reduce((acc, c) => acc + c.price, 0) / combos.length) 
    : 0;

  return (
    <AdminLayout>
      <div className="py-2">
        <header className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 text-accent mb-2">
              <ShieldCheck size={16} />
              <span className="small fw-bold font-orbitron tracking-widest">SISTEMA SEGURO</span>
            </div>
            <h1 className="display-6 fw-black font-orbitron m-0 text-white">ESTADÍSTICAS</h1>
          </div>
          <Link to="/admin/combos" className="btn btn-primary-custom d-flex align-items-center gap-2 px-4 py-3">
            <Plus size={18} /> NUEVO PRODUCTO
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-futuristic p-4 border-start border-accent border-4">
              <div className="d-flex align-items-center justify-content-between mb-3 text-muted">
                <span className="small fw-bold font-orbitron">TOTAL COMBOS</span>
                <Package size={20} />
              </div>
              <div className="h2 fw-black m-0 font-orbitron text-white">{combos.length}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-futuristic p-4 border-start border-cyan border-4">
              <div className="d-flex align-items-center justify-content-between mb-3 text-muted">
                <span className="small fw-bold font-orbitron">ACTIVOS</span>
                <TrendingUp size={20} className="text-cyan" />
              </div>
              <div className="h2 fw-black m-0 font-orbitron text-white">{activeCombosCount}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-futuristic p-4 border-start border-accent border-4">
              <div className="d-flex align-items-center justify-content-between mb-3 text-muted">
                <span className="small fw-bold font-orbitron">PROM. PRECIO</span>
                <DollarSign size={20} />
              </div>
              <div className="h2 fw-black m-0 font-orbitron text-white">${averagePrice.toLocaleString('es-AR')}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card-futuristic p-4 border-start border-white border-opacity-25 border-4">
              <div className="d-flex align-items-center justify-content-between mb-3 text-muted">
                <span className="small fw-bold font-orbitron">LINKS</span>
                <ExternalLink size={20} />
              </div>
              <div className="h2 fw-black m-0 font-orbitron text-white">{activeLinksCount}</div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <Link to="/admin/combos" className="card-futuristic text-decoration-none p-4 d-block group h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <div className="bg-accent bg-opacity-10 p-4 rounded-3 text-accent border border-accent border-opacity-20">
                    <Package size={32} />
                  </div>
                  <div>
                    <h3 className="h5 fw-bold text-white m-0 font-orbitron">PRODUCTOS</h3>
                    <p className="text-muted small m-0 mt-1">Gestión de catálogo y stock.</p>
                  </div>
                </div>
                <ArrowRight className="text-muted group-hover-translate-x transition-all" />
              </div>
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/admin/links" className="card-futuristic text-decoration-none p-4 d-block group h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <div className="bg-cyan bg-opacity-10 p-4 rounded-3 text-cyan border border-cyan border-opacity-20">
                    <ExternalLink size={32} />
                  </div>
                  <div>
                    <h3 className="h5 fw-bold text-white m-0 font-orbitron">LINKS EXTERNOS</h3>
                    <p className="text-muted small m-0 mt-1">Conexiones y redes sociales.</p>
                  </div>
                </div>
                <ArrowRight className="text-muted group-hover-translate-x transition-all" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Items */}
        <div className="card-futuristic overflow-hidden">
          <div className="card-header bg-black bg-opacity-30 py-4 px-4 d-flex justify-content-between align-items-center border-bottom border-white border-opacity-5">
            <h5 className="m-0 fw-bold font-orbitron text-white" style={{ fontSize: '0.9rem' }}>ÚLTIMOS AGREGADOS</h5>
            <Link to="/admin/combos" className="btn btn-sm btn-outline-custom px-3">VER TODOS</Link>
          </div>
          <div className="table-responsive">
            <table className="table table-dark table-hover m-0 align-middle">
              <thead>
                <tr className="border-bottom border-white border-opacity-5">
                  <th className="px-4 py-3 text-muted small fw-bold font-orbitron">PRODUCTO</th>
                  <th className="px-4 py-3 text-muted small fw-bold font-orbitron text-center">PRECIO</th>
                  <th className="px-4 py-3 text-muted small fw-bold font-orbitron text-end">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {combos.slice(0, 5).map((combo) => (
                  <tr key={combo.id} className="border-bottom border-white border-opacity-5">
                    <td className="px-4 py-3 d-flex align-items-center gap-3">
                      <img src={combo.image} alt="" className="rounded border border-white border-opacity-10" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                      <span className="fw-bold text-white">{combo.name}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-accent fw-bold font-orbitron">${combo.price.toLocaleString('es-AR')}</span>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <span className={`badge rounded-pill px-3 py-2 ${combo.active ? 'bg-accent bg-opacity-10 text-accent border border-accent border-opacity-20' : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20'}`}>
                        {combo.active ? 'ACTIVO' : 'INACTIVO'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;