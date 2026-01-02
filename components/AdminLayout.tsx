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
  ShieldCheck
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
    <div className="d-flex min-vh-100 bg-black">
      {/* Sidebar Desktop */}
      <aside className="d-none d-lg-flex flex-column border-end border-white border-opacity-10 bg-black sticky-top" style={{ width: '280px', height: '100vh' }}>
        <div className="p-4 mb-4">
          <div className="font-orbitron fw-black h5 m-0 text-white tracking-tighter">
            <span className="text-accent">TUC</span> ADMIN
          </div>
        </div>

        <nav className="flex-grow-1 px-3">
          {navigation.map((item) => {
            const active = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link mb-2 px-3 py-3 d-flex align-items-center gap-3 text-decoration-none fw-black small tracking-widest ${active ? 'bg-accent text-black' : 'text-secondary hover-white'}`}
                style={{ borderRadius: '2px' }}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-top border-white border-opacity-10">
          <Link to="/" className="sidebar-link mb-2 px-3 py-2 d-flex align-items-center gap-3 text-decoration-none text-secondary hover-white small fw-bold">
            <Home size={18} />
            <span>VER WEB</span>
          </Link>
          <button onClick={handleLogout} className="btn btn-link w-100 border-0 text-start text-danger d-flex align-items-center gap-3 px-3 py-2 text-decoration-none small fw-bold">
            <LogOut size={18} />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 overflow-hidden">
        <header className="navbar border-bottom border-white border-opacity-10 px-4 py-3 bg-black sticky-top z-index-1020">
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
            <button className="btn text-white d-lg-none p-0" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div className="text-end d-none d-sm-block">
                <p className="text-white small fw-black m-0 font-orbitron">P. VASI</p>
                <p className="text-accent m-0 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Operador_Nivel_Elite</p>
              </div>
              <div className="rounded-1 bg-accent p-2 text-black d-flex align-items-center justify-content-center">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow-1 p-3 p-md-5 bg-black">
          <div className="container-fluid p-0">
            {children}
          </div>
        </main>
      </div>
      
      {/* Estilos adicionales para hover */}
      <style>{`
        .hover-white:hover { color: #ffffff !important; background: rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
};

export default AdminLayout;