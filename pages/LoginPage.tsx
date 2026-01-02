import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Activity, ArrowLeft, Loader2 } from 'lucide-react';
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

    // Simular latencia de red
    setTimeout(() => {
      const success = db.login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Acceso denegado: Credenciales inválidas');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black px-3"
      style={{ background: 'radial-gradient(circle at center, #0B0F14 0%, #000 100%)' }}>
      
      <div className="card card-futuristic w-100 shadow-2xl border-secondary border-opacity-20" style={{ maxWidth: '420px', background: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <div className="d-inline-flex p-3 rounded-circle mb-3 shadow" style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
              <Activity size={40} className="text-accent" />
            </div>
            <h1 className="h3 fw-black font-orbitron text-white m-0">CORE AUTH</h1>
            <p className="text-muted small mt-2 letter-spacing-1">SISTEMA DE GESTIÓN CENTRAL</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-muted small fw-bold">OPERADOR</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-muted">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ID Operador"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small fw-bold">PASSWORD</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-muted">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small border-0 bg-danger bg-opacity-10 text-danger text-center mb-4 font-orbitron" style={{ fontSize: '0.7rem' }}>
                {error.toUpperCase()}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary-custom w-100 py-3 rounded-2 mb-4 d-flex align-items-center justify-content-center gap-2 font-orbitron"
            >
              {loading ? <Loader2 size={18} className="spinner-border spinner-border-sm" /> : 'ACCEDER AL PANEL'}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn btn-link text-muted text-decoration-none w-100 small d-flex align-items-center justify-content-center gap-2 hover-accent transition-all">
            <ArrowLeft size={14} /> VOLVER AL SITIO PÚBLICO
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;