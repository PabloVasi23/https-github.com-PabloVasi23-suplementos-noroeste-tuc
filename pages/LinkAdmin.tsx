import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Plus, Pencil, Trash2, X, Save, ExternalLink as ExtIcon, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { db } from '../db';
import { ExternalLink } from '../types';

const LinkAdmin: React.FC = () => {
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [editing, setEditing] = useState<ExternalLink | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLinks(db.getLinks());
  }, []);

  const filteredLinks = links.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('¿Seguro que querés eliminar este enlace del portal?')) {
      const current = db.getLinks().filter(l => l.id !== id);
      db.saveLinks(current);
      setLinks(db.getLinks());
    }
  };

  const openForm = (link?: ExternalLink) => {
    if (link) {
      setEditing(JSON.parse(JSON.stringify(link)));
      setIsNew(false);
    } else {
      setEditing({
        id: Date.now(),
        title: '',
        description: '',
        url: '',
        active: true,
        icon: 'ExternalLink',
        order: links.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setIsNew(true);
    }
  };

  const handleSave = () => {
    if (!editing) return;
    const current = db.getLinks();
    if (isNew) {
      db.saveLinks([...current, editing]);
    } else {
      const idx = current.findIndex(l => l.id === editing.id);
      if (idx !== -1) {
        current[idx] = editing;
        db.saveLinks(current);
      }
    }
    setLinks(db.getLinks());
    setEditing(null);
  };

  const moveOrder = (id: number, direction: 'up' | 'down') => {
    const current = [...links];
    const idx = current.findIndex(l => l.id === id);
    if (direction === 'up' && idx > 0) {
      [current[idx].order, current[idx-1].order] = [current[idx-1].order, current[idx].order];
    } else if (direction === 'down' && idx < current.length - 1) {
      [current[idx].order, current[idx+1].order] = [current[idx+1].order, current[idx].order];
    }
    db.saveLinks(current);
    setLinks(db.getLinks());
  };

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="h2 fw-black text-white mb-2 font-orbitron uppercase">Gestión de Comunidad</h1>
        <p className="text-secondary">Administrá los enlaces externos y recursos digitales que se muestran en la landing.</p>
        <div className="separator-brand mt-4"></div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-50">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              className="form-control form-control-pro ps-5" 
              placeholder="Buscar enlace..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-8 text-md-end">
          <button onClick={() => openForm()} className="btn btn-action w-100 w-md-auto">
            <Plus size={18} /> AÑADIR ENLACE
          </button>
        </div>
      </div>

      {/* Vista Desktop: Tabla Pro */}
      <div className="d-none d-lg-block card-admin overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover m-0 align-middle">
            <thead>
              <tr className="border-bottom border-white border-opacity-10">
                <th className="px-4 py-4 text-secondary x-small uppercase">ORDEN</th>
                <th className="px-4 py-4 text-secondary x-small uppercase">RECURSO / PORTAL</th>
                <th className="px-4 py-4 text-secondary x-small uppercase">URL DESTINO</th>
                <th className="px-4 py-4 text-secondary x-small uppercase">ESTADO</th>
                <th className="px-4 py-4 text-secondary x-small uppercase text-end">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link, idx) => (
                <tr key={link.id} className="border-bottom border-white border-opacity-5">
                  <td className="px-4 py-4">
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-black text-accent font-orbitron">{idx + 1}</span>
                      <div className="d-flex flex-column gap-1">
                        <button onClick={() => moveOrder(link.id, 'up')} disabled={idx === 0} className="btn p-0 text-secondary hover-accent transition-all opacity-50"><ArrowUp size={14} /></button>
                        <button onClick={() => moveOrder(link.id, 'down')} disabled={idx === links.length - 1} className="btn p-0 text-secondary hover-accent transition-all opacity-50"><ArrowDown size={14} /></button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="fw-black text-white text-uppercase tracking-widest">{link.title}</div>
                    <div className="text-secondary x-small opacity-50">{link.description}</div>
                  </td>
                  <td className="px-4 py-4">
                    <a href={link.url} target="_blank" rel="noreferrer" className="text-accent small text-decoration-none d-flex align-items-center gap-2">
                      LINK_EXT <ExtIcon size={12} />
                    </a>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`badge rounded-0 px-3 py-2 ${link.active ? 'bg-accent text-black fw-black' : 'bg-danger text-white'}`} style={{ fontSize: '0.6rem' }}>
                      {link.active ? 'PUBLICADO' : 'OCULTO'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button onClick={() => openForm(link)} className="btn btn-dark p-2 border-white border-opacity-10 text-white"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(link.id)} className="btn btn-dark p-2 border-white border-opacity-10 text-danger"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista Mobile: Cards */}
      <div className="d-lg-none row g-4">
        {filteredLinks.map((link) => (
          <div key={link.id} className="col-12">
            <div className="card-admin p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="fw-black text-accent font-orbitron"># {link.order}</div>
                <div className={`badge rounded-0 px-2 py-1 ${link.active ? 'bg-accent text-black' : 'bg-danger text-white'}`} style={{ fontSize: '0.6rem' }}>
                  {link.active ? 'ON' : 'OFF'}
                </div>
              </div>
              <h3 className="h6 fw-black text-white text-uppercase mb-2 tracking-widest">{link.title}</h3>
              <p className="text-secondary small mb-4">{link.description}</p>
              <div className="d-flex gap-2">
                <button onClick={() => openForm(link)} className="btn btn-dark flex-grow-1 py-3 text-white border-white border-opacity-10 small fw-bold">EDITAR</button>
                <button onClick={() => handleDelete(link.id)} className="btn btn-outline-danger p-3"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal Brutalista */}
      {editing && (
        <div className="position-fixed top-0 start-0 w-100 h-100 z-index-1050 bg-blur d-flex align-items-center justify-content-center p-3">
          <div className="card-admin w-100 shadow-lg" style={{ maxWidth: '500px', border: '2px solid var(--accent)' }}>
            <div className="p-4 bg-accent text-black d-flex justify-content-between align-items-center">
              <h2 className="h5 fw-black font-orbitron m-0 text-uppercase tracking-tighter">{isNew ? 'NUEVO ENLACE' : 'EDITAR ENLACE'}</h2>
              <button className="btn text-black p-0" onClick={() => setEditing(null)}><X size={24} /></button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="form-label text-accent x-small fw-black uppercase">Título del Portal</label>
                <input type="text" className="form-control form-control-pro" value={editing.title} onChange={(e) => setEditing({...editing, title: e.target.value})} placeholder="Ej: PADEL TUCUMÁN" />
              </div>
              <div className="mb-4">
                <label className="form-label text-accent x-small fw-black uppercase">Bajada / Descripción</label>
                <input type="text" className="form-control form-control-pro" value={editing.description} onChange={(e) => setEditing({...editing, description: e.target.value})} placeholder="Ej: Reservá canchas en segundos" />
              </div>
              <div className="mb-4">
                <label className="form-label text-accent x-small fw-black uppercase">URL Completa</label>
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-50"><ExtIcon size={14} /></span>
                  <input type="url" className="form-control form-control-pro ps-5" value={editing.url} onChange={(e) => setEditing({...editing, url: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="form-check form-switch mb-4 d-flex align-items-center gap-3">
                <input className="form-check-input bg-dark border-secondary" type="checkbox" checked={editing.active} onChange={(e) => setEditing({...editing, active: e.target.checked})} id="linkActive" style={{ width: '40px', height: '20px' }} />
                <label className="form-check-label text-white small fw-bold" htmlFor="linkActive">ENLACE ACTIVO EN WEB</label>
              </div>
            </div>
            <div className="p-4 border-top border-white border-opacity-5 d-flex gap-3">
              <button className="btn btn-dark px-4 py-3 flex-grow-1 border-white border-opacity-10 text-white" onClick={() => setEditing(null)}>CANCELAR</button>
              <button className="btn btn-action px-4 py-3 flex-grow-1" onClick={handleSave}>
                <Save size={18} /> GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .x-small { font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; }
        .hover-accent:hover { color: var(--accent) !important; }
      `}</style>
    </AdminLayout>
  );
};

export default LinkAdmin;