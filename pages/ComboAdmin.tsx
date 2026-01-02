
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Check } from 'lucide-react';
import { db } from '../db';
import { Combo } from '../types';

const ComboAdmin: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [editing, setEditing] = useState<Combo | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setCombos(db.getCombos());
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este combo?')) {
      db.deleteCombo(id);
      setCombos(db.getCombos());
    }
  };

  const handleToggle = (combo: Combo) => {
    db.updateCombo(combo.id, { active: !combo.active });
    setCombos(db.getCombos());
  };

  const openForm = (combo?: Combo) => {
    if (combo) {
      setEditing(JSON.parse(JSON.stringify(combo)));
      setIsNew(false);
    } else {
      setEditing({
        id: db.getCombos().length + 1,
        name: '',
        description: '',
        price: 0,
        discount: null,
        items: [''],
        image: 'https://picsum.photos/400/300',
        active: true,
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
    if (isNew) {
      const current = db.getCombos();
      db.saveCombos([...current, editing]);
    } else {
      db.updateCombo(editing.id, editing);
    }
    setCombos(db.getCombos());
    closeForm();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Combos Promocionales</h1>
            <p className="text-dark-muted">Administra los productos y ofertas de la tienda.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-black font-bold rounded-2xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Nuevo Combo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {combos.map((combo) => (
            <div key={combo.id} className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden flex flex-col">
              <div className="h-48 relative">
                <img src={combo.image} alt="" className="w-full h-full object-cover" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg ${combo.active ? 'bg-primary text-black' : 'bg-red-500 text-white'}`}>
                  {combo.active ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{combo.name}</h3>
                <p className="text-dark-muted text-sm mb-4 line-clamp-2">{combo.description}</p>
                <div className="text-2xl font-bold text-primary mb-6 font-orbitron">
                  ${combo.price.toLocaleString('es-AR')}
                </div>
                <div className="mt-auto flex items-center gap-2 pt-6 border-t border-dark-border">
                  <button 
                    onClick={() => openForm(combo)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button 
                    onClick={() => handleToggle(combo)}
                    className={`p-3 rounded-xl transition-all flex items-center justify-center ${combo.active ? 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                    title={combo.active ? 'Desactivar' : 'Activar'}
                  >
                    {combo.active ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => handleDelete(combo.id)}
                    className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-all flex items-center justify-center"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeForm} />
          <div className="bg-dark-card border border-dark-border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-8 font-orbitron">{isNew ? 'Crear Nuevo Combo' : 'Editar Combo'}</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-muted">Nombre del Combo</label>
                  <input 
                    type="text" 
                    value={editing.name} 
                    onChange={(e) => setEditing({...editing, name: e.target.value})}
                    className="w-full bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-muted">Precio</label>
                  <input 
                    type="number" 
                    value={editing.price} 
                    onChange={(e) => setEditing({...editing, price: Number(e.target.value)})}
                    className="w-full bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Descripción</label>
                <textarea 
                  rows={3}
                  value={editing.description} 
                  onChange={(e) => setEditing({...editing, description: e.target.value})}
                  className="w-full bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-dark-muted">Productos Incluidos</label>
                {editing.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={item} 
                      onChange={(e) => {
                        const newItems = [...editing.items];
                        newItems[idx] = e.target.value;
                        setEditing({...editing, items: newItems});
                      }}
                      className="flex-1 bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                      placeholder={`Producto ${idx + 1}`}
                    />
                    {editing.items.length > 1 && (
                      <button 
                        onClick={() => {
                          const newItems = editing.items.filter((_, i) => i !== idx);
                          setEditing({...editing, items: newItems});
                        }}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  onClick={() => setEditing({...editing, items: [...editing.items, '']})}
                  className="w-full py-3 border-2 border-dashed border-dark-border text-dark-muted hover:text-white hover:border-primary/50 transition-all rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Agregar Producto
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">URL de Imagen</label>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl border border-dark-border bg-black overflow-hidden shrink-0">
                    <img src={editing.image} className="w-full h-full object-cover" />
                  </div>
                  <input 
                    type="text" 
                    value={editing.image} 
                    onChange={(e) => setEditing({...editing, image: e.target.value})}
                    className="flex-1 bg-black border border-dark-border rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button 
                  onClick={closeForm}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-4 bg-primary hover:bg-primary-hover text-black rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Guardar Combo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ComboAdmin;
