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
  Dumbbell,
  ChevronRight
} from 'lucide-react';
import { db } from '../db';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const config = db.getConfig();

  const navigation = [
    { name: 'DASHBOARD', href: '/admin', icon: LayoutDashboard },
    { name: 'PRODUCTOS', href: '/admin/combos', icon: Package },
    { name: 'LINKS', href: '/admin/links', icon: LinkIcon },
  ];

  const handleLogout = () => {
    db.logout();
    navigate('/admin/login');
  };

  return (
    <div className="d-flex min-vh-100 bg-black overflow-hidden text-white">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 top-0 start-0 bg-black bg-opacity-70 z-index-1020 d-lg-none"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`border-end border-white border-opacity-10 transition-all position-fixed position-lg-relative h-100 z-index-1030 bg-black ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} style={{ width: '280px', minWidth: '280px' }}>
        <div className="d-flex flex-column h-100">
          <div className="p-4 border-bottom border-white border-opacity-5 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="p-2 rounded-3 text-black bg-accent" style={{ background: 'var(--accent)' }}>
                <Dumbbell size={24} />
              </div>
              <h2 className="h5 fw-bold font-orbitron m-0 text-white tracking-wider">ELITE PANEL</h2>
            </div>
            <button className="btn btn-link text-white d-lg-none p-0" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow-1 p-3 overflow-auto mt-3">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link d-flex align-items-center justify-content-between p-3 rounded-2 mb-2 transition-all font-orbitron ${active ? 'bg-accent text-black shadow' : 'text-muted hover-bg-white-opacity'}`}
                  style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Icon size={18} />
                    <span className="fw-bold">{item.name}</span>
                  </div>
                  {active && <ChevronRight size={16} />}
                </Link>
              );
            })}
            
            <div className="mt-4 pt-4 border-top border-white border-opacity-5">
               <Link to="/" className="nav-link d-flex align-items-center gap-3 p-3 text-muted hover-bg-white-opacity rounded-2 font-orbitron" style={{ fontSize: '0.8rem' }}>
                <Home size={18} />
                <span className="fw-bold">VER SITIO WEB</span>
              </Link>
            </div>
          </nav>

          <div className="p-3 border-top border-white border-opacity-5">
            <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-3 rounded-2 fw-bold font-orbitron" style={{ fontSize: '0.8rem' }}>
              <LogOut size={16} /> CERRAR SESIÓN
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden bg-main">
        <header className="navbar navbar-dark bg-black border-bottom border-white border-opacity-5 px-4 py-3 sticky-top">
          <div className="container-fluid p-0">
            <button className="btn btn-link text-white d-lg-none p-0 me-3" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="ms-auto d-flex align-items-center gap-4">
              <div className="text-end d-none d-sm-block">
                <p className="text-white small fw-bold m-0 font-orbitron" style={{ fontSize: '0.7rem' }}>ADMINISTRADOR</p>
                <p className="text-accent m-0 fw-bold" style={{ fontSize: '0.6rem' }}>ONLINE • ENCRIPTADO</p>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-black bg-accent" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                PV
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto p-4 p-md-5" style={{ background: '#080c10' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;