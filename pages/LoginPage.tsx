import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Activity, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
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
        setError('Acceso denegado. Verificá tus credenciales.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black px-3">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-admin w-100 shadow-lg" 
        style={{ maxWidth: '400px' }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-5">
            <div className="d-inline-flex p-3 rounded-circle bg-accent bg-opacity-10 mb-4 border border-accent border-opacity-20">
              <Activity size={32} className="text-accent" />
            </div>
            <h1 className="h4 fw-bold text-white m-0 font-orbitron">Acceso Admin</h1>
            <p className="text-secondary small mt-2">Ingresá para gestionar tu tienda</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold mb-2">Usuario</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="form-control form-control-pro ps-5"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej: pablovasi23"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold mb-2">Contraseña</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="form-control form-control-pro ps-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="alert bg-danger bg-opacity-10 border-0 text-danger text-center small mb-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-action w-100 py-3 mb-4"
            >
              {loading ? <Loader2 size={20} className="spinner-border spinner-border-sm" /> : (
                <span className="d-flex align-items-center justify-content-center gap-2">
                   Entrar al Panel <ShieldCheck size={18} />
                </span>
              )}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn btn-link text-secondary text-decoration-none w-100 small d-flex align-items-center justify-content-center gap-2">
            <ArrowLeft size={14} /> Volver a la web
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;