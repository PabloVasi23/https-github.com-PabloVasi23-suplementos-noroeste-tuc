
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { 
  Package, 
  DollarSign, 
  ExternalLink, 
  ArrowRight,
  TrendingUp,
  Plus
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
      <div className="py-4">
        <header className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h1 className="fw-bold font-orbitron m-0 text-white">DASHBOARD</h1>
            <p className="text-secondary mb-0">Gestión de stock y configuraciones.</p>
          </div>
          <Link to="/admin/combos" className="btn btn-primary-custom d-flex align-items-center gap-2 px-4 py-2">
            <Plus size={18} /> Nuevo Producto
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-dark p-4 shadow-sm border-0 border-start border-primary-custom border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-bold">Total Combos</span>
                <Package className="text-primary-custom" size={20} />
              </div>
              <div className="h2 fw-bold m-0">{combos.length}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-dark p-4 shadow-sm border-0 border-start border-info border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-bold">Combos Activos</span>
                <TrendingUp className="text-info" size={20} />
              </div>
              <div className="h2 fw-bold m-0">{activeCombosCount}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-dark p-4 shadow-sm border-0 border-start border-warning border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-bold">Precio Promedio</span>
                <DollarSign className="text-warning" size={20} />
              </div>
              <div className="h2 fw-bold m-0">${averagePrice.toLocaleString('es-AR')}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card card-dark p-4 shadow-sm border-0 border-start border-secondary border-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-bold">Links Externos</span>
                <ExternalLink className="text-secondary" size={20} />
              </div>
              <div className="h2 fw-bold m-0">{activeLinksCount}</div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <Link to="/admin/combos" className="card card-dark text-decoration-none p-4 hover-lift transition-all group border-primary-custom border-opacity-10">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-4">
                    <Package size={32} className="text-primary-custom" />
                  </div>
                  <div>
                    <h3 className="h5 fw-bold text-white m-0">Gestionar Productos</h3>
                    <p className="text-secondary small m-0">Crear, editar o desactivar combos.</p>
                  </div>
                </div>
                <ArrowRight className="text-secondary" />
              </div>
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/admin/links" className="card card-dark text-decoration-none p-4 hover-lift transition-all group border-secondary border-opacity-10">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <div className="bg-info bg-opacity-10 p-4 rounded-4">
                    <ExternalLink size={32} className="text-info" />
                  </div>
                  <div>
                    <h3 className="h5 fw-bold text-white m-0">Gestionar Links</h3>
                    <p className="text-secondary small m-0">Aplicaciones externas y redes.</p>
                  </div>
                </div>
                <ArrowRight className="text-secondary" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Items Table */}
        <div className="card card-dark overflow-hidden border-0 shadow">
          <div className="card-header bg-dark py-3 px-4 d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25">
            <h5 className="m-0 fw-bold">Últimos Productos Añadidos</h5>
            <Link to="/admin/combos" className="btn btn-sm btn-link text-primary-custom text-decoration-none">Ver todos</Link>
          </div>
          <div className="table-responsive">
            <table className="table table-dark table-hover m-0 align-middle">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-secondary small text-uppercase">Producto</th>
                  <th className="px-4 py-3 text-secondary small text-uppercase">Precio</th>
                  <th className="px-4 py-3 text-secondary small text-uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {combos.slice(0, 5).map((combo) => (
                  <tr key={combo.id}>
                    <td className="px-4 py-3 d-flex align-items-center gap-3">
                      <img src={combo.image} alt="" className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                      <span className="fw-bold">{combo.name}</span>
                    </td>
                    <td className="px-4 py-3 text-primary-custom fw-bold">${combo.price.toLocaleString('es-AR')}</td>
                    <td className="px-4 py-3">
                      <span className={`badge rounded-pill ${combo.active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                        {combo.active ? 'Activo' : 'Inactivo'}
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
