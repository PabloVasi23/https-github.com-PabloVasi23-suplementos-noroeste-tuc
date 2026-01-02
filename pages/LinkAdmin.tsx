
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Plus, Pencil, Trash2, X, Save, ExternalLink, MoveUp, MoveDown } from 'lucide-react';
import { db } from '../db';
import { ExternalLink as ExtLink } from '../types';

const LinkAdmin: React.FC = () => {
  const [links, setLinks] = useState<ExtLink[]>([]);
  const [editing, setEditing] = useState<ExtLink | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setLinks(db.getLinks());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este link?')) {
      const current = db.getLinks().filter(l => l.id !== id);
      db.saveLinks(current);
      setLinks(db.getLinks());
    }
  };

  const openForm = (link?: ExtLink) => {
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

  const closeForm = () => {
    setEditing(null);
    setIsNew(false);
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
    closeForm();
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
      <div className="py-2">
        <header className="mb-5 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div>
            <h1 className="fw-bold font-orbitron m-0 text-white text-uppercase">Links Externos</h1>
            <p className="text-secondary m-0">Conecta tus otras aplicaciones o servicios externos.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="btn btn-primary-custom px-4 py-3 rounded-3 fw-bold d-flex align-items-center gap-2"
          >
            <Plus size={20} /> Nuevo Link
          </button>
        </header>

        <div className="card card-dark overflow-hidden border-0 shadow">
          <div className="table-responsive">
            <table className="table table-dark table-hover m-0 align-middle">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-secondary small text-uppercase">Orden</th>
                  <th className="px-4 py-3 text-secondary small text-uppercase">Título</th>
                  <th className="px-4 py-3 text-secondary small text-uppercase">URL</th>
                  <th className="px-4 py-3 text-secondary small text-uppercase">Estado</th>
                  <th className="px-4 py-3 text-secondary small text-uppercase text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link, idx) => (
                  <tr key={link.id}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-white">{link.order}</span>
                        <div className="d-flex flex-column gap-1">
                          <button onClick={() => moveOrder(link.id, 'up')} disabled={idx === 0} className="btn btn-link p-0 text-secondary border-0"><MoveUp size={14} /></button>
                          <button onClick={() => moveOrder(link.id, 'down')} disabled={idx === links.length - 1} className="btn btn-link p-0 text-secondary border-0"><MoveDown size={14} /></button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="fw-bold text-white">{link.title}</div>
                      <div className="text-secondary small truncate" style={{ maxWidth: '200px' }}>{link.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <a href={link.url} target="_blank" rel="noreferrer" className="text-info small text-decoration-none truncate d-block" style={{ maxWidth: '150px' }}>{link.url}</a>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge rounded-pill ${link.active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                        {link.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button onClick={() => openForm(link)} className="btn btn-sm btn-dark border-secondary border-opacity-25"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(link.id)} className="btn btn-sm btn-outline-danger"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="modal show d-block bg-black bg-opacity-75 z-index-1050 overflow-auto py-5 px-3">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content card-dark shadow-lg">
              <div className="modal-header border-secondary border-opacity-25 p-4">
                <h2 className="modal-title h4 fw-bold font-orbitron text-white">{isNew ? 'NUEVO LINK' : 'EDITAR LINK'}</h2>
                <button type="button" className="btn-close btn-close-white" onClick={closeForm}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Título</label>
                  <input type="text" className="form-control bg-black border-secondary border-opacity-25 text-white py-3" value={editing.title} onChange={(e) => setEditing({...editing, title: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">Descripción</label>
                  <input type="text" className="form-control bg-black border-secondary border-opacity-25 text-white py-3" value={editing.description} onChange={(e) => setEditing({...editing, description: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">URL</label>
                  <input type="url" className="form-control bg-black border-secondary border-opacity-25 text-white py-3" value={editing.url} onChange={(e) => setEditing({...editing, url: e.target.value})} />
                </div>
                <div className="form-check form-switch mb-3 mt-4">
                  <input className="form-check-input" type="checkbox" role="switch" id="linkActive" checked={editing.active} onChange={(e) => setEditing({...editing, active: e.target.checked})} />
                  <label className="form-check-label text-secondary" htmlFor="linkActive">Link Activo</label>
                </div>
              </div>
              <div className="modal-footer border-secondary border-opacity-25 p-4">
                <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={closeForm}>Cancelar</button>
                <button type="button" className="btn btn-primary-custom px-5 py-2 d-flex align-items-center gap-2" onClick={handleSave}>
                  <Save size={18} /> Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default LinkAdmin;
