
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Dumbbell, ArrowLeft, Loader2 } from 'lucide-react';
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
    }, 800);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black px-3">
      <div className="card card-dark w-100 shadow-lg" style={{ maxWidth: '400px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <div className="bg-primary-custom d-inline-flex p-3 rounded-4 mb-3 shadow">
              <Dumbbell size={32} />
            </div>
            <h1 className="h3 fw-bold font-orbitron text-white m-0">ADMIN PANEL</h1>
            <p className="text-secondary small mt-2">SuplementosNoroesteTuc</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Usuario</label>
              <div className="input-group">
                <span className="input-group-text bg-black border-secondary border-opacity-25 text-secondary">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="form-control bg-black border-secondary border-opacity-25 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin_user"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text bg-black border-secondary border-opacity-25 text-secondary">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="form-control bg-black border-secondary border-opacity-25 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small border-0 bg-danger bg-opacity-10 text-danger text-center mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary-custom w-100 py-3 rounded-pill mb-4 d-flex align-items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="spinner-border spinner-border-sm" /> : 'Iniciar Sesión'}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="btn btn-link text-secondary text-decoration-none w-100 small d-flex align-items-center justify-content-center gap-2">
            <ArrowLeft size={14} /> Volver al sitio
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
