import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Activity, ArrowLeft, Loader2, ShieldAlert } from 'lucide-react';
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
        setError('ACCESO DENEGADO: CREDENCIALES NO VÁLIDAS');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black px-3 position-relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="position-absolute bg-accent opacity-5 rounded-circle blur-3xl" style={{ width: '600px', height: '600px', top: '-20%', left: '-10%', filter: 'blur(150px)' }}></div>
      <div className="position-absolute w-100 h-100 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(0,255,136,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="card-futuristic w-100 border-accent border-opacity-20 shadow-lg" style={{ maxWidth: '440px', background: 'rgba(22, 27, 34, 0.95)' }}>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <div className="d-inline-flex p-4 rounded-circle mb-4 border-accent-soft shadow-inner">
              <Activity size={48} className="text-accent" />
            </div>
            <h1 className="h2 fw-black font-orbitron text-white m-0 tracking-tighter">SISTEMA ADMIN</h1>
            <p className="text-muted small mt-2 fw-bold font-orbitron tracking-widest opacity-60">INGRESO DE PERSONAL AUTORIZADO</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label text-accent small fw-black font-orbitron mb-2 tracking-widest">ID USUARIO</label>
              <div className="input-group">
                <span className="input-group-text bg-black border-white border-opacity-10 text-muted">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="form-control bg-black border-white border-opacity-10 text-white font-orbitron px-3 py-3"
                  style={{ fontSize: '0.8rem' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="form-label text-accent small fw-black font-orbitron mb-2 tracking-widest">CLAVE DE ACCESO</label>
              <div className="input-group">
                <span className="input-group-text bg-black border-white border-opacity-10 text-muted">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="form-control bg-black border-white border-opacity-10 text-white font-orbitron px-3 py-3"
                  style={{ fontSize: '0.8rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="alert bg-danger bg-opacity-10 border border-danger border-opacity-20 text-danger text-center mb-4 py-3 d-flex align-items-center justify-content-center gap-2 font-orbitron" style={{ fontSize: '0.7rem' }}>
                <ShieldAlert size={16} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary-custom w-100 py-4 rounded-3 mb-4 d-flex align-items-center justify-content-center gap-3 fs-5"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="spinner-border spinner-border-sm" /> 
                  <span className="ms-2">AUTENTICANDO...</span>
                </>
              ) : 'INICIAR SESIÓN'}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn btn-link text-muted text-decoration-none w-100 small d-flex align-items-center justify-content-center gap-2 hover-accent transition-all font-orbitron" style={{ fontSize: '0.7rem' }}>
            <ArrowLeft size={14} /> VOLVER AL PORTAL PÚBLICO
          </button>
        </div>
      </div>

      <div className="position-absolute bottom-0 w-100 p-4 text-center opacity-30">
        <p className="text-white small m-0 font-orbitron" style={{ fontSize: '0.6rem', letterSpacing: '4px' }}>ENCRYPTED END-TO-END • PROTECTED BY ELITE SECURE</p>
      </div>
    </div>
  );
};

export default LoginPage;