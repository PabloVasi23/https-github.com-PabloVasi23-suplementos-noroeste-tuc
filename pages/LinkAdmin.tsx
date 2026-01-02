
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
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Links Externos</h1>
            <p className="text-dark-muted">Conecta tus otras aplicaciones o servicios externos.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Nuevo Link
          </button>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-border bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Orden</th>
                  <th className="px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Título</th>
                  <th className="px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">URL</th>
                  <th className="px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {links.map((link, idx) => (
                  <tr key={link.id} className="hover:bg-white/5 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{link.order}</span>
                        <div className="flex flex-col">
                          <button onClick={() => moveOrder(link.id, 'up')} disabled={idx === 0} className="text-dark-muted hover:text-white disabled:opacity-20"><MoveUp className="w-3 h-3" /></button>
                          <button onClick={() => moveOrder(link.id, 'down')} disabled={idx === links.length - 1} className="text-dark-muted hover:text-white disabled:opacity-20"><MoveDown className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{link.title}</div>
                      <div className="text-xs text-dark-muted truncate max-w-xs">{link.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={link.url} target="_blank" className="text-blue-400 text-xs hover:underline truncate max-w-[200px] block">{link.url}</a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${link.active ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {link.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openForm(link)} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(link.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeForm} />
          <div className="bg-dark-card border border-dark-border w-full max-w-lg rounded-3xl relative z-10 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-8 font-orbitron">{isNew ? 'Nuevo Link' : 'Editar Link'}</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Título</label>
                <input 
                  type="text" 
                  value={editing.title} 
                  onChange={(e) => setEditing({...editing, title: e.target.value})}
                  className="w-full bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="Nuestra Web de Pádel"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Descripción</label>
                <input 
                  type="text" 
                  value={editing.description} 
                  onChange={(e) => setEditing({...editing, description: e.target.value})}
                  className="w-full bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="Breve descripción..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">URL</label>
                <input 
                  type="url" 
                  value={editing.url} 
                  onChange={(e) => setEditing({...editing, url: e.target.value})}
                  className="w-full bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="link-active"
                  checked={editing.active} 
                  onChange={(e) => setEditing({...editing, active: e.target.checked})}
                  className="w-5 h-5 rounded bg-black border-dark-border text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="link-active" className="text-sm text-gray-300">Link activo</label>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button onClick={closeForm} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all">Cancelar</button>
                <button onClick={handleSave} className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" /> Guardar
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
