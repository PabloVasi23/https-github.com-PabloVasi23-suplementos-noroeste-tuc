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
        setError('Acceso denegado. Credenciales no autorizadas.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black px-3 position-relative">
      {/* Background Decor */}
      <div className="position-absolute top-0 start-0 p-4 opacity-20">
        <div className="font-orbitron fw-black text-accent h1 m-0">ADMIN_PORTAL</div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-admin w-100 shadow-lg border-accent border-opacity-30" 
        style={{ maxWidth: '420px', backgroundColor: '#0a0a0a' }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-5">
            <div className="d-inline-flex p-3 bg-accent text-black mb-4">
              <Activity size={32} />
            </div>
            <h1 className="h4 fw-black text-white m-0 font-orbitron text-uppercase tracking-tighter">Acceso de Operador</h1>
            <div className="separator-brand mx-auto"></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label text-accent small fw-black text-uppercase">ID Usuario</label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="form-control form-control-pro ps-5"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-accent small fw-black text-uppercase">Password</label>
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
              <div className="bg-danger bg-opacity-10 border border-danger border-opacity-20 text-danger text-center small mb-4 py-2 fw-bold uppercase">
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
                   INICIAR SESIÓN <ShieldCheck size={18} />
                </span>
              )}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn btn-link text-secondary text-decoration-none w-100 small d-flex align-items-center justify-content-center gap-2 hover-white">
            <ArrowLeft size={14} /> VOLVER AL PORTAL
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;