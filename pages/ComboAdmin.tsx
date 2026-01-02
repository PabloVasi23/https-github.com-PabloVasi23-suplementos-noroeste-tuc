
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Plus, Pencil, Trash2, X, Save, Check, Image as ImageIcon } from 'lucide-react';
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
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
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

  const closeForm = () => setEditing(null);

  const handleSave = () => {
    if (!editing) return;
    const current = db.getCombos();
    if (isNew) {
      db.saveCombos([...current, editing]);
    } else {
      db.updateCombo(editing.id, editing);
    }
    setCombos(db.getCombos());
    closeForm();
  };

  return (
    <AdminLayout>
      <div className="py-2">
        <header className="mb-5 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div>
            <h1 className="fw-bold font-orbitron m-0 text-white">GESTIONAR PRODUCTOS</h1>
            <p className="text-secondary m-0">Administra los combos y promociones activos.</p>
          </div>
          <button onClick={() => openForm()} className="btn btn-primary-custom px-4 py-3 rounded-3 fw-bold d-flex align-items-center gap-2">
            <Plus size={20} /> Añadir Producto
          </button>
        </header>

        <div className="row g-4">
          {combos.map((combo) => (
            <div key={combo.id} className="col-12 col-md-6 col-xl-4">
              <div className="card card-dark h-100">
                <div className="position-relative overflow-hidden rounded-top" style={{ height: '200px' }}>
                  <img src={combo.image} alt="" className="w-100 h-100 object-fit-cover opacity-75" />
                  <div className={`position-absolute top-0 end-0 m-3 badge rounded-pill fw-bold ${combo.active ? 'bg-success' : 'bg-danger'}`}>
                    {combo.active ? 'ACTIVO' : 'INACTIVO'}
                  </div>
                </div>
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-1 text-white">{combo.name}</h3>
                  <div className="h4 fw-bold text-primary-custom font-orbitron mb-3">${combo.price.toLocaleString('es-AR')}</div>
                  <p className="text-secondary small mb-4 line-clamp-2">{combo.description}</p>
                  
                  <div className="d-flex gap-2 pt-3 border-top border-secondary border-opacity-25">
                    <button onClick={() => openForm(combo)} className="btn btn-dark border-secondary border-opacity-25 flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                      <Pencil size={16} /> Editar
                    </button>
                    <button 
                      onClick={() => handleToggle(combo)} 
                      className={`btn ${combo.active ? 'btn-outline-warning' : 'btn-outline-success'} d-flex align-items-center justify-content-center p-2`}
                    >
                      {combo.active ? <X size={20} /> : <Check size={20} />}
                    </button>
                    <button onClick={() => handleDelete(combo.id)} className="btn btn-outline-danger d-flex align-items-center justify-content-center p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal Mockup */}
      {editing && (
        <div className="modal show d-block bg-black bg-opacity-75 z-index-1050 overflow-auto py-5 px-3">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content card-dark shadow-lg">
              <div className="modal-header border-secondary border-opacity-25 p-4">
                <h2 className="modal-title h4 fw-bold font-orbitron text-white">{isNew ? 'NUEVO PRODUCTO' : 'EDITAR PRODUCTO'}</h2>
                <button type="button" className="btn-close btn-close-white" onClick={closeForm}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label text-secondary small fw-bold">Nombre del Producto</label>
                      <input type="text" className="form-control bg-black border-secondary border-opacity-25 text-white py-3" value={editing.name} onChange={(e) => setEditing({...editing, name: e.target.value})} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label text-secondary small fw-bold">Precio ($)</label>
                      <input type="number" className="form-control bg-black border-secondary border-opacity-25 text-white py-3" value={editing.price} onChange={(e) => setEditing({...editing, price: Number(e.target.value)})} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label text-secondary small fw-bold">Descripción Corta</label>
                      <textarea className="form-control bg-black border-secondary border-opacity-25 text-white py-3" rows={3} value={editing.description} onChange={(e) => setEditing({...editing, description: e.target.value})}></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small fw-bold d-flex justify-content-between">
                      Productos Incluidos
                      <button onClick={() => setEditing({...editing, items: [...editing.items, '']})} className="btn btn-link text-primary-custom p-0 text-decoration-none small">+ Añadir</button>
                    </label>
                    {editing.items.map((item, idx) => (
                      <div key={idx} className="input-group mb-2">
                        <input type="text" className="form-control bg-black border-secondary border-opacity-25 text-white" placeholder={`Item ${idx + 1}`} value={item} onChange={(e) => {
                          const newItems = [...editing.items];
                          newItems[idx] = e.target.value;
                          setEditing({...editing, items: newItems});
                        }} />
                        {editing.items.length > 1 && (
                          <button className="btn btn-outline-danger" onClick={() => {
                            const newItems = editing.items.filter((_, i) => i !== idx);
                            setEditing({...editing, items: newItems});
                          }}><Trash2 size={16} /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label text-secondary small fw-bold">URL de Imagen</label>
                      <div className="d-flex gap-3 align-items-center">
                        <img src={editing.image} alt="Preview" className="rounded" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        <input type="text" className="form-control bg-black border-secondary border-opacity-25 text-white py-3" value={editing.image} onChange={(e) => setEditing({...editing, image: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-secondary border-opacity-25 p-4">
                <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={closeForm}>Cancelar</button>
                <button type="button" className="btn btn-primary-custom px-5 py-2 d-flex align-items-center gap-2" onClick={handleSave}>
                  <Save size={18} /> Guardar Cambios
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
