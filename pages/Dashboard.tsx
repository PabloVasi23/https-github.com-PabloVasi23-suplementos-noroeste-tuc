import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { 
  Package, 
  DollarSign, 
  ExternalLink, 
  ArrowRight,
  Plus,
  ShieldCheck,
  Zap,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';
import { db } from '../db';

const Dashboard: React.FC = () => {
  const combos = db.getCombos();
  const links = db.getLinks();
  
  const activeCombosCount = combos.filter(c => c.active).length;
  const averagePrice = combos.length > 0 
    ? Math.round(combos.reduce((acc, c) => acc + c.price, 0) / combos.length) 
    : 0;

  return (
    <AdminLayout>
      <div className="mb-5">
        <div className="d-flex align-items-center gap-2 text-accent mb-2">
          <ShieldCheck size={16} />
          <span className="small fw-black font-orbitron tracking-widest" style={{ fontSize: '0.75rem' }}>SYSTEM_STATUS: SECURE</span>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h1 className="h2 fw-black text-white m-0 font-orbitron">RESUMEN OPERATIVO</h1>
          <Link to="/admin/combos" className="btn btn-action">
            <Plus size={18} /> NUEVO PRODUCTO
          </Link>
        </div>
        <div className="separator-brand mt-3"></div>
      </div>

      {/* Grid de KPIs */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4 border-accent border-opacity-10 bg-surface">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold uppercase tracking-widest">PRODUCTOS</span>
              <Package size={20} className="text-accent" />
            </div>
            <div className="h2 fw-black m-0 font-orbitron">{combos.length}</div>
            <div className="mt-2 small text-secondary">
              <span className="text-accent fw-bold">{activeCombosCount}</span> ONLINE
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4 border-accent border-opacity-10 bg-surface">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold uppercase tracking-widest">TICKET_AVG</span>
              <DollarSign size={20} className="text-accent" />
            </div>
            <div className="h2 fw-black m-0 font-orbitron">${averagePrice.toLocaleString('es-AR')}</div>
            <div className="mt-2 small text-secondary">PROMEDIO_CATALOGO</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4 border-accent border-opacity-10 bg-surface">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold uppercase tracking-widest">CONEXIONES</span>
              <ExternalLink size={20} className="text-accent" />
            </div>
            <div className="h2 fw-black m-0 font-orbitron">{links.length}</div>
            <div className="mt-2 small text-secondary">LINKS_EXTERNOS</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4 border-accent border-opacity-10 bg-surface">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold uppercase tracking-widest">INFRA</span>
              <Zap size={20} className="text-accent" />
            </div>
            <div className="h2 fw-black m-0 font-orbitron text-accent tracking-tighter">ONLINE</div>
            <div className="mt-2 small text-secondary">SYNC_MODE: LOCAL</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card-admin bg-surface">
            <div className="card-header border-bottom border-white border-opacity-10 p-4 d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-black text-uppercase small tracking-widest">Catálogo Reciente</h5>
              <Link to="/admin/combos" className="text-accent small text-decoration-none fw-black tracking-widest">GESTIONAR TODO <ArrowRight size={14} /></Link>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover m-0 align-middle">
                <thead>
                  <tr className="border-bottom border-white border-opacity-10">
                    <th className="px-4 py-3 text-secondary x-small uppercase">PRODUCTO</th>
                    <th className="px-4 py-3 text-secondary x-small uppercase">PRECIO</th>
                    <th className="px-4 py-3 text-secondary x-small uppercase text-end">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {combos.slice(0, 5).map((combo) => (
                    <tr key={combo.id} className="border-bottom border-white border-opacity-5">
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src={combo.image} alt="" className="rounded-1" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
                          <span className="fw-bold small">{combo.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-orbitron text-accent small">${combo.price.toLocaleString('es-AR')}</td>
                      <td className="px-4 py-3 text-end">
                        <span className={`badge rounded-1 px-3 py-2 ${combo.active ? 'bg-accent text-black fw-black' : 'bg-danger text-white'}`} style={{ fontSize: '0.6rem' }}>
                          {combo.active ? 'ACTIVE' : 'PAUSED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card-admin p-4 bg-surface h-100">
            <h5 className="fw-black text-uppercase small tracking-widest mb-4">ACCESOS_RÁPIDOS</h5>
            <div className="d-grid gap-3">
              <Link to="/admin/combos" className="btn btn-outline-brand text-start p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <Package size={20} />
                  <span>EDITAR CATÁLOGO</span>
                </div>
                <ArrowRight size={16} />
              </Link>
              <Link to="/admin/links" className="btn btn-outline-brand text-start p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <LinkIcon size={20} />
                  <span>ENLACES REDES</span>
                </div>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5 p-4 bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-1">
              <h6 className="fw-black text-accent mb-2 uppercase small">TECH_TIPS</h6>
              <p className="x-small text-secondary m-0">Actualiza los precios regularmente para mantener la competitividad en el mercado regional.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .x-small { font-size: 0.65rem; font-weight: 900; letter-spacing: 1px; }
      `}</style>
    </AdminLayout>
  );
};

export default Dashboard;