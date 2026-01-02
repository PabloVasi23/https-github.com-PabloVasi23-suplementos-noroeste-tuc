import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Plus, Pencil, Trash2, X, Save, Check, Image as ImageIcon, Search } from 'lucide-react';
import { db } from '../db';
import { Combo } from '../types';

const ComboAdmin: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [editing, setEditing] = useState<Combo | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCombos(db.getCombos());
  }, []);

  const filteredCombos = combos.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que querés eliminar este producto definitivamente?')) {
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
        id: Date.now(),
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

  const handleSave = () => {
    if (!editing) return;
    const current = db.getCombos();
    if (isNew) {
      db.saveCombos([...current, editing]);
    } else {
      db.updateCombo(editing.id, editing);
    }
    setCombos(db.getCombos());
    setEditing(null);
  };

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="h2 fw-black text-white mb-2">Catálogo de Productos</h1>
        <p className="text-secondary">Añadí o editá los combos que se muestran en la landing.</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              className="form-control form-control-pro ps-5" 
              placeholder="Buscar por nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-8 text-md-end">
          <button onClick={() => openForm()} className="btn btn-action w-100 w-md-auto">
            <Plus size={18} className="me-2" /> Añadir Producto
          </button>
        </div>
      </div>

      {/* Vista Desktop: Tabla */}
      <div className="desktop-only card-admin overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover m-0 align-middle">
            <thead>
              <tr className="border-bottom border-white border-opacity-5">
                <th className="px-4 py-3 text-secondary small fw-bold">IMAGEN</th>
                <th className="px-4 py-3 text-secondary small fw-bold">NOMBRE</th>
                <th className="px-4 py-3 text-secondary small fw-bold">PRECIO</th>
                <th className="px-4 py-3 text-secondary small fw-bold">ESTADO</th>
                <th className="px-4 py-3 text-secondary small fw-bold text-end">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredCombos.map((combo) => (
                <tr key={combo.id} className="border-bottom border-white border-opacity-5">
                  <td className="px-4 py-3">
                    <img src={combo.image} alt="" className="rounded border border-white border-opacity-10" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  </td>
                  <td className="px-4 py-3 fw-bold">{combo.name}</td>
                  <td className="px-4 py-3 font-orbitron text-accent fw-bold">${combo.price.toLocaleString('es-AR')}</td>
                  <td className="px-4 py-3">
                    <span className={`badge rounded-pill px-3 ${combo.active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                      {combo.active ? 'Visible' : 'Oculto'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button onClick={() => openForm(combo)} className="btn btn-dark p-2 border-white border-opacity-10 rounded-3 text-white"><Pencil size={18} /></button>
                      <button onClick={() => handleToggle(combo)} className={`btn p-2 border-white border-opacity-10 rounded-3 ${combo.active ? 'text-warning' : 'text-success'}`}>
                        {combo.active ? <X size={18} /> : <Check size={18} />}
                      </button>
                      <button onClick={() => handleDelete(combo.id)} className="btn btn-dark p-2 border-white border-opacity-10 rounded-3 text-danger"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista Mobile: Cards */}
      <div className="mobile-only row g-4">
        {filteredCombos.map((combo) => (
          <div key={combo.id} className="col-12">
            <div className="card-admin p-3">
              <div className="d-flex gap-3 align-items-center mb-3">
                <img src={combo.image} alt="" className="rounded" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <div className="flex-grow-1">
                  <h3 className="h6 fw-bold m-0 text-white">{combo.name}</h3>
                  <p className="text-accent small font-orbitron fw-bold m-0">${combo.price.toLocaleString('es-AR')}</p>
                </div>
                <div className={`badge rounded-pill px-2 py-1 ${combo.active ? 'bg-success' : 'bg-danger'}`} style={{ fontSize: '0.65rem' }}>
                  {combo.active ? 'ON' : 'OFF'}
                </div>
              </div>
              <div className="d-flex gap-2">
                <button onClick={() => openForm(combo)} className="btn btn-dark flex-grow-1 py-2 border-white border-opacity-10 text-white small">Editar</button>
                <button onClick={() => handleToggle(combo)} className={`btn flex-grow-1 py-2 border-white border-opacity-10 small ${combo.active ? 'btn-outline-warning' : 'btn-outline-success'}`}>
                  {combo.active ? 'Pausar' : 'Activar'}
                </button>
                <button onClick={() => handleDelete(combo.id)} className="btn btn-outline-danger p-2"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario Modal */}
      {editing && (
        <div className="position-fixed top-0 start-0 w-100 h-100 z-index-1050 bg-blur d-flex align-items-center justify-content-center p-3" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="card-admin w-100 shadow-2xl" style={{ maxWidth: '700px' }}>
            <div className="p-4 border-bottom border-white border-opacity-5 d-flex justify-content-between align-items-center">
              <h2 className="h5 fw-bold font-orbitron text-white m-0">{isNew ? 'NUEVO PRODUCTO' : 'EDITAR PRODUCTO'}</h2>
              <button className="btn text-secondary p-0" onClick={() => setEditing(null)}><X size={24} /></button>
            </div>
            <div className="p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              <div className="row g-4">
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold">Nombre</label>
                    <input type="text" className="form-control form-control-pro" value={editing.name} onChange={(e) => setEditing({...editing, name: e.target.value})} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold">Precio ($)</label>
                    <input type="number" className="form-control form-control-pro font-orbitron" value={editing.price} onChange={(e) => setEditing({...editing, price: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold">Descripción Corta</label>
                    <textarea className="form-control form-control-pro" rows={2} value={editing.description} onChange={(e) => setEditing({...editing, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary small fw-bold d-flex justify-content-between">
                    Componentes del Combo
                    <button onClick={() => setEditing({...editing, items: [...editing.items, '']})} className="btn btn-link text-accent p-0 text-decoration-none small fw-bold">+ Añadir Item</button>
                  </label>
                  {editing.items.map((item, idx) => (
                    <div key={idx} className="input-group mb-2">
                      <input type="text" className="form-control form-control-pro" placeholder={`Ej: Proteína 1kg`} value={item} onChange={(e) => {
                        const newItems = [...editing.items];
                        newItems[idx] = e.target.value;
                        setEditing({...editing, items: newItems});
                      }} />
                      {editing.items.length > 1 && (
                        <button className="btn btn-outline-danger px-3 border-white border-opacity-10" onClick={() => {
                          const newItems = editing.items.filter((_, i) => i !== idx);
                          setEditing({...editing, items: newItems});
                        }}><Trash2 size={16} /></button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold">Imagen (URL)</label>
                    <div className="d-flex gap-3 align-items-center bg-black bg-opacity-20 p-3 rounded-3 border border-white border-opacity-5">
                      <img src={editing.image} alt="Preview" className="rounded shadow" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                      <input type="text" className="form-control form-control-pro flex-grow-1" value={editing.image} onChange={(e) => setEditing({...editing, image: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-top border-white border-opacity-5 d-flex justify-content-end gap-3">
              <button className="btn btn-outline-secondary px-4 text-white border-white border-opacity-10" onClick={() => setEditing(null)}>Cancelar</button>
              <button className="btn btn-action px-5" onClick={handleSave}>
                <Save size={18} className="me-2" /> Guardar Producto
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ComboAdmin;