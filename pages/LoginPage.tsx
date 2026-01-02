
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Activity, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
// Fix: Added missing import for motion from framer-motion
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
        setError('ACCESO DENEGADO: CREDENCIALES INCORRECTAS');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black px-3 position-relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="position-absolute bg-accent opacity-5 rounded-circle blur-3xl" style={{ width: '400px', height: '400px', top: '-10%', left: '-5%', filter: 'blur(120px)' }}></div>
      <div className="position-absolute bg-cyan opacity-5 rounded-circle blur-3xl" style={{ width: '400px', height: '400px', bottom: '-10%', right: '-5%', filter: 'blur(120px)' }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-premium w-100 border-white border-opacity-10 shadow-2xl" 
        style={{ maxWidth: '440px', background: 'rgba(17, 24, 39, 0.8)' }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <div className="d-inline-flex p-4 rounded-circle mb-4 bg-accent bg-opacity-5 border border-accent border-opacity-20">
              <Activity size={48} className="text-accent" />
            </div>
            <h1 className="h3 fw-black font-orbitron text-white m-0">ELITE CORE</h1>
            <p className="text-muted small mt-2 fw-bold font-orbitron tracking-widest opacity-40">SISTEMA DE ADMINISTRACIÓN</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label text-accent small fw-black font-orbitron mb-2 tracking-widest">OPERADOR</label>
              <div className="input-group">
                <span className="input-group-text bg-black border-white border-opacity-10 text-muted px-3">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="form-control bg-black border-white border-opacity-10 text-white font-orbitron py-3 px-4"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ID USUARIO"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="form-label text-accent small fw-black font-orbitron mb-2 tracking-widest">PASSWORD</label>
              <div className="input-group">
                <span className="input-group-text bg-black border-white border-opacity-10 text-muted px-3">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="form-control bg-black border-white border-opacity-10 text-white font-orbitron py-3 px-4"
                  style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="alert bg-danger bg-opacity-10 border border-danger border-opacity-20 text-danger text-center mb-4 py-3 fw-bold font-orbitron" style={{ fontSize: '0.7rem' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-premium w-100 py-4 mb-4"
            >
              {loading ? <Loader2 size={24} className="spinner-border spinner-border-sm" /> : (
                <span className="d-flex align-items-center gap-2">
                   INICIAR SESIÓN <ShieldCheck size={20} />
                </span>
              )}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn btn-link text-muted text-decoration-none w-100 small d-flex align-items-center justify-content-center gap-2 hover-accent transition-all font-orbitron" style={{ fontSize: '0.7rem' }}>
            <ArrowLeft size={14} /> REGRESAR AL PORTAL PÚBLICO
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
