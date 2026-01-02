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
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { db } from '../db';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'DASHBOARD', href: '/admin', icon: LayoutDashboard },
    { name: 'PRODUCTOS', href: '/admin/combos', icon: Package },
    { name: 'ENLACES', href: '/admin/links', icon: LinkIcon },
  ];

  const handleLogout = () => {
    db.logout();
    navigate('/admin/login');
  };

  return (
    <div className="d-flex min-vh-100 bg-black overflow-hidden text-white">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 top-0 start-0 bg-black bg-opacity-80 z-index-1020 d-lg-none bg-blur"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`border-end border-white border-opacity-5 transition-all position-fixed position-lg-relative h-100 z-index-1030 bg-black ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} style={{ width: '280px', minWidth: '280px' }}>
        <div className="d-flex flex-column h-100">
          <div className="p-4 border-bottom border-white border-opacity-5 d-flex align-items-center justify-content-between">
            <div className="brand-title h5 m-0">ELITE CORE</div>
            <button className="btn btn-link text-white d-lg-none p-0" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow-1 p-3 mt-4">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link d-flex align-items-center justify-content-between p-3 rounded-4 mb-2 transition-all font-orbitron ${active ? 'bg-accent text-black fw-black shadow-lg' : 'text-muted hover-bg-white-opacity'}`}
                  style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight size={16} />}
                </Link>
              );
            })}
            
            <div className="mt-5 pt-4 border-top border-white border-opacity-5">
               <Link to="/" className="nav-link d-flex align-items-center gap-3 p-3 text-muted hover-text-white rounded-4 font-orbitron" style={{ fontSize: '0.8rem' }}>
                <Home size={18} />
                <span>IR A LA WEB</span>
              </Link>
            </div>
          </nav>

          <div className="p-4 border-top border-white border-opacity-5">
            <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-3 rounded-4 fw-bold font-orbitron" style={{ fontSize: '0.8rem' }}>
              <LogOut size={16} /> CERRAR PANEL
            </button>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden" style={{ background: '#080c10' }}>
        <header className="navbar navbar-dark bg-black border-bottom border-white border-opacity-5 px-4 py-3 sticky-top">
          <div className="container-fluid p-0">
            <button className="btn btn-link text-white d-lg-none p-0 me-3" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="ms-auto d-flex align-items-center gap-4">
              <div className="text-end d-none d-sm-block">
                <p className="text-accent small fw-black m-0 font-orbitron" style={{ fontSize: '0.65rem' }}>ADMINISTRADOR ACTIVADO</p>
                <p className="text-muted m-0 fw-bold" style={{ fontSize: '0.6rem' }}>TUC-NODE-01 // ENCRIPTADO</p>
              </div>
              <div className="rounded-4 d-flex align-items-center justify-content-center bg-white bg-opacity-5 border border-white border-opacity-10 text-accent" style={{ width: '45px', height: '45px' }}>
                <UserCheck size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 overflow-auto p-4 p-md-5">
          <div className="container-fluid p-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;