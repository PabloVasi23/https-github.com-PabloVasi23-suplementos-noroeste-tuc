
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Dumbbell, Loader2, ArrowLeft } from 'lucide-react';
import { db } from '../db';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const success = db.login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Usuario o contraseña incorrectos');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/20">
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-orbitron text-white">Panel Admin</h1>
            <p className="text-dark-muted text-sm mt-2">SuplementosNoroesteTuc</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-dark-border text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary transition-all"
                  placeholder="Tu usuario"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-dark-border text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary transition-all"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-black font-bold rounded-2xl transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-dark-border text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-dark-muted hover:text-white transition-all flex items-center justify-center gap-2 mx-auto text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-dark-muted text-[10px] uppercase tracking-widest">
          Área restringida a personal autorizado
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
