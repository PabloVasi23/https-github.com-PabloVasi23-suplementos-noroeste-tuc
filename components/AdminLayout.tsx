
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
    { name: 'Combos', href: '/admin/combos', icon: Package },
    { name: 'Links Externos', href: '/admin/links', icon: LinkIcon },
  ];

  const handleLogout = () => {
    db.logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-dark-border transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <Dumbbell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-none">Admin</h1>
                <p className="text-[10px] text-dark-muted">SuplementosTuc</p>
              </div>
            </div>
            <button className="lg:hidden text-dark-muted hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-dark-muted hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-dark-border mt-4">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-muted hover:bg-white/5 hover:text-white transition-all">
                <Home className="w-5 h-5" />
                <span className="font-medium text-sm">Ver Sitio Público</span>
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-dark-border">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="bg-dark-card/50 backdrop-blur-md border-b border-dark-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button className="lg:hidden text-dark-muted hover:text-white" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold text-white">
                {navigation.find(n => n.href === location.pathname)?.name || 'Panel de Control'}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">{config.brand.name}</p>
              <p className="text-xs text-dark-muted">Modo Administrador</p>
            </div>
          </div>
        </header>
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
