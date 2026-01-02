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
  User,
  ExternalLink
} from 'lucide-react';
import { db } from '../db';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="d-flex min-vh-100 bg-black">
      {/* Sidebar Desktop */}
      <aside className="d-none d-lg-flex flex-column border-end border-white border-opacity-5 bg-black sticky-top h-100vh" style={{ width: '260px', minWidth: '260px', height: '100vh' }}>
        <div className="p-4 mb-4">
          <div className="brand-title h5 m-0 text-accent font-orbitron fw-black tracking-tighter">ELITE ADMIN</div>
        </div>

        <nav className="flex-grow-1 px-3">
          {navigation.map((item) => {
            const active = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link mb-2 ${active ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-top border-white border-opacity-5">
          <Link to="/" className="sidebar-link mb-2">
            <Home size={20} />
            <span>Ver Web Pública</span>
          </Link>
          <button onClick={handleLogout} className="btn btn-link sidebar-link text-danger w-100 border-0 text-start">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu (Off-canvas) */}
      <div className={`position-fixed top-0 start-0 w-100 h-100 z-index-1050 bg-black transition-all ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ transition: '0.3s' }}>
        <div className="d-flex flex-column h-100 p-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="brand-title h5 m-0 text-accent font-orbitron fw-black">ELITE ADMIN</div>
            <button className="btn text-white p-0" onClick={() => setSidebarOpen(false)}>
              <X size={32} />
            </button>
          </div>
          <nav className="flex-grow-1">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`d-flex align-items-center gap-3 py-3 text-decoration-none h4 fw-bold ${active ? 'text-accent' : 'text-white'}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={24} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-top border-white border-opacity-10">
            <button onClick={handleLogout} className="btn btn-link text-danger text-decoration-none h5 fw-bold p-0 d-flex align-items-center gap-3">
              <LogOut size={24} /> Salir del Panel
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 overflow-hidden">
        <header className="navbar border-bottom border-white border-opacity-5 px-4 py-3 bg-black sticky-top z-index-1020">
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
            <button className="btn text-white d-lg-none p-0" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div className="text-end d-none d-sm-block">
                <p className="text-white small fw-bold m-0" style={{ fontSize: '0.75rem' }}>Administrador</p>
                <p className="text-secondary m-0" style={{ fontSize: '0.65rem' }}>P. Vasi • Online</p>
              </div>
              <div className="rounded-circle bg-accent bg-opacity-10 border border-accent border-opacity-20 d-flex align-items-center justify-content-center text-accent" style={{ width: '40px', height: '40px' }}>
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 p-3 p-md-5 bg-black" style={{ background: 'radial-gradient(circle at top right, #111827 0%, #000 100%)' }}>
          <div className="container-fluid p-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;