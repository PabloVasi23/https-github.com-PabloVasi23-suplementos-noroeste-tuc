
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Link as LinkIcon, 
  LogOut, 
  Menu, 
  X, 
  Home,
  Dumbbell
} from 'lucide-react';
import { db } from '../db';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const config = db.getConfig();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Productos', href: '/admin/combos', icon: Package },
    { name: 'Links Externos', href: '/admin/links', icon: LinkIcon },
  ];

  const handleLogout = () => {
    db.logout();
    navigate('/admin/login');
  };

  return (
    <div className="d-flex min-vh-100 bg-black overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 top-0 start-0 bg-black bg-opacity-50 z-index-1020 d-lg-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`bg-dark border-end border-secondary border-opacity-25 transition-all position-fixed position-lg-relative h-100 z-index-1030 ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} style={{ width: '280px', minWidth: '280px' }}>
        <div className="d-flex flex-column h-100">
          <div className="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary-custom p-2 rounded-3 text-black">
                <Dumbbell size={24} />
              </div>
              <h2 className="h5 fw-bold font-orbitron m-0 text-white">ADMIN</h2>
            </div>
            <button className="btn btn-link text-secondary d-lg-none p-0" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow-1 p-3 overflow-auto">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link d-flex align-items-center gap-3 p-3 rounded-3 mb-2 transition-all ${active ? 'bg-primary-custom text-black' : 'text-secondary hover-bg-white-opacity'}`}
                >
                  <Icon size={20} />
                  <span className="fw-bold">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="mt-4 pt-4 border-top border-secondary border-opacity-25">
               <Link to="/" className="nav-link d-flex align-items-center gap-3 p-3 text-secondary hover-bg-white-opacity rounded-3">
                <Home size={20} />
                <span className="fw-bold">Ver Sitio Web</span>
              </Link>
            </div>
          </nav>

          <div className="p-3 border-top border-secondary border-opacity-25">
            <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-3 rounded-3 fw-bold">
              <LogOut size={18} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden" style={{ minWidth: 0 }}>
        {/* Header */}
        <header className="navbar navbar-dark bg-dark bg-opacity-50 border-bottom border-secondary border-opacity-25 px-4 py-3 sticky-top">
          <div className="container-fluid p-0">
            <button className="btn btn-link text-secondary d-lg-none p-0 me-3" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div className="text-end d-none d-sm-block">
                <p className="text-white small fw-bold m-0">{config.brand.name}</p>
                <p className="text-secondary m-0" style={{ fontSize: '0.65rem' }}>SESIÓN ACTIVA</p>
              </div>
              <div className="bg-primary-custom rounded-circle d-flex align-items-center justify-content-center fw-bold text-black" style={{ width: '40px', height: '40px' }}>
                PV
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 overflow-auto p-4 p-md-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
