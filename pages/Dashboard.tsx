
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
  ShieldCheck,
  Zap,
  // Fix: Added Link aliased as LinkIcon to resolve the missing reference error on line 138
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
          <span className="small fw-bold font-orbitron tracking-widest" style={{ fontSize: '0.65rem' }}>PANEL DE CONTROL</span>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h1 className="h2 fw-black text-white m-0">Resumen de Tienda</h1>
          <Link to="/admin/combos" className="btn btn-action">
            <Plus size={18} className="me-2" /> Nuevo Producto
          </Link>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold">PRODUCTOS</span>
              <div className="bg-accent bg-opacity-10 p-2 rounded-3 text-accent"><Package size={18} /></div>
            </div>
            <div className="h2 fw-bold m-0 font-orbitron">{combos.length}</div>
            <div className="mt-2 small text-secondary">
              <span className="text-accent fw-bold">{activeCombosCount}</span> activos en web
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold">PROM. PRECIO</span>
              <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary"><DollarSign size={18} /></div>
            </div>
            <div className="h2 fw-bold m-0 font-orbitron">${averagePrice.toLocaleString('es-AR')}</div>
            <div className="mt-2 small text-secondary">Basado en catálogo total</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold">ENLACES</span>
              <div className="bg-info bg-opacity-10 p-2 rounded-3 text-info"><ExternalLink size={18} /></div>
            </div>
            <div className="h2 fw-bold m-0 font-orbitron">{links.length}</div>
            <div className="mt-2 small text-secondary">Redes y servicios externos</div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card-admin p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-secondary small fw-bold">STATUS</span>
              <div className="bg-success bg-opacity-10 p-2 rounded-3 text-success"><Zap size={18} /></div>
            </div>
            <div className="h2 fw-bold m-0 font-orbitron text-success">ONLINE</div>
            <div className="mt-2 small text-secondary">Sincronizado con LocalStorage</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card-admin h-100">
            <div className="card-header bg-transparent border-bottom border-white border-opacity-5 p-4 d-flex justify-content-between align-items-center">
              <h5 className="m-0 fw-bold">Últimos Productos</h5>
              <Link to="/admin/combos" className="text-accent small text-decoration-none fw-bold">Gestionar Todo <ArrowRight size={14} /></Link>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover m-0 align-middle">
                <thead>
                  <tr className="border-bottom border-white border-opacity-5">
                    <th className="px-4 py-3 text-secondary small fw-bold">PRODUCTO</th>
                    <th className="px-4 py-3 text-secondary small fw-bold">PRECIO</th>
                    <th className="px-4 py-3 text-secondary small fw-bold text-end">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {combos.slice(0, 5).map((combo) => (
                    <tr key={combo.id} className="border-bottom border-white border-opacity-5">
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src={combo.image} alt="" className="rounded" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                          <span className="fw-bold">{combo.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-orbitron text-accent">${combo.price.toLocaleString('es-AR')}</td>
                      <td className="px-4 py-3 text-end">
                        <span className={`badge rounded-pill px-3 ${combo.active ? 'bg-accent bg-opacity-10 text-accent border border-accent border-opacity-20' : 'bg-danger bg-opacity-10 text-danger'}`}>
                          {combo.active ? 'ACTIVO' : 'PAUSADO'}
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
          <div className="card-admin p-4 h-100">
            <h5 className="fw-bold mb-4">Accesos Rápidos</h5>
            <div className="d-grid gap-3">
              <Link to="/admin/combos" className="btn btn-outline-secondary text-start p-3 d-flex align-items-center justify-content-between text-white border-white border-opacity-10">
                <div className="d-flex align-items-center gap-3">
                  <Package size={20} className="text-accent" />
                  <span>Editar Catálogo</span>
                </div>
                <ArrowRight size={16} />
              </Link>
              <Link to="/admin/links" className="btn btn-outline-secondary text-start p-3 d-flex align-items-center justify-content-between text-white border-white border-opacity-10">
                <div className="d-flex align-items-center gap-3">
                  <LinkIcon size={20} className="text-info" />
                  <span>Configurar Enlaces</span>
                </div>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5 p-4 bg-accent bg-opacity-5 border border-accent border-opacity-10 rounded-3">
              <h6 className="fw-bold text-accent mb-2">Consejo de Ventas</h6>
              <p className="small text-secondary m-0">Mantené tus fotos de productos actualizadas y de alta calidad para aumentar un 30% las conversiones.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
