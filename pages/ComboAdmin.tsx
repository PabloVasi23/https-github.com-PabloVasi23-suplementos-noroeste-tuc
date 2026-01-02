import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Plus, Pencil, Trash2, X, Save, Check, Upload, Search, Image as ImageIcon } from 'lucide-react';
import { db } from '../db';
import { Combo } from '../types';

const ComboAdmin: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [editing, setEditing] = useState<Combo | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCombos(db.getCombos());
  }, []);

  const filteredCombos = combos.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editing) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditing({ ...editing, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar permanentemente este producto?')) {
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
        image: 'https://via.placeholder.com/400x300?text=Cargar+Imagen',
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setIsNew(true);
    }
  };

  const handleSave = () => {
    if (!editing || !editing.name) {
      alert("El nombre es obligatorio");
      return;
    }
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
        <h1 className="h2 fw-black text-white mb-2 font-orbitron uppercase tracking-tighter">Inventario Elite</h1>
        <p className="text-secondary">Control total sobre tus combos y stock comercial.</p>
        <div className="separator-brand mt-4"></div>
      </div>

      <div className="row g-4 mb-4 align-items-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="position-relative">
            <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={18} />
            <input 
              type="text" 
              className="form-control form-control-pro ps-5" 
              placeholder="BUSCAR PRODUCTO..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-8 text-md-end">
          <button onClick={() => openForm()} className="btn btn-action w-100 w-md-auto">
            <Plus size={18} /> AÑADIR NUEVO
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="d-none d-lg-block card-admin overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover m-0 align-middle">
            <thead>
              <tr className="border-bottom border-white border-opacity-10">
                <th className="px-4 py-4 text-secondary x-small uppercase fw-black tracking-widest">Preview</th>
                <th className="px-4 py-4 text-secondary x-small uppercase fw-black tracking-widest">Nombre del Combo</th>
                <th className="px-4 py-4 text-secondary x-small uppercase fw-black tracking-widest">Precio (ARS)</th>
                <th className="px-4 py-4 text-secondary x-small uppercase fw-black tracking-widest">Estado</th>
                <th className="px-4 py-4 text-secondary x-small uppercase fw-black tracking-widest text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCombos.map((combo) => (
                <tr key={combo.id} className="border-bottom border-white border-opacity-5">
                  <td className="px-4 py-4">
                    <img src={combo.image} alt="" className="border border-white border-opacity-10" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                  </td>
                  <td className="px-4 py-4 fw-black text-uppercase small">{combo.name}</td>
                  <td className="px-4 py-4 font-orbitron text-accent fw-bold h5">${combo.price.toLocaleString('es-AR')}</td>
                  <td className="px-4 py-4">
                    <span className={`badge rounded-0 px-3 py-2 ${combo.active ? 'bg-accent text-black' : 'bg-danger text-white'}`} style={{ fontSize: '0.65rem' }}>
                      {combo.active ? 'VISIBLE' : 'PAUSADO'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button onClick={() => openForm(combo)} className="btn btn-dark p-2 border-white border-opacity-10 text-white"><Pencil size={18} /></button>
                      <button onClick={() => handleToggle(combo)} className={`btn p-2 border-white border-opacity-10 ${combo.active ? 'text-warning' : 'text-success'}`}>
                        {combo.active ? <X size={18} /> : <Check size={18} />}
                      </button>
                      <button onClick={() => handleDelete(combo.id)} className="btn btn-dark p-2 border-white border-opacity-10 text-danger"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Grid View */}
      <div className="d-lg-none row g-4">
        {filteredCombos.map((combo) => (
          <div key={combo.id} className="col-12">
            <div className="card-admin p-4">
              <div className="d-flex gap-4 align-items-center mb-4">
                <img src={combo.image} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="border border-white border-opacity-10" />
                <div className="flex-grow-1">
                  <h3 className="h6 fw-black text-white text-uppercase m-0">{combo.name}</h3>
                  <p className="text-accent font-orbitron fw-bold m-0 mt-1">${combo.price.toLocaleString('es-AR')}</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button onClick={() => openForm(combo)} className="btn btn-dark flex-grow-1 border-white border-opacity-10 text-white small fw-black">EDITAR</button>
                <button onClick={() => handleDelete(combo.id)} className="btn btn-outline-danger p-3"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal Brutalista */}
      {editing && (
        <div className="position-fixed top-0 start-0 w-100 h-100 z-index-1050 bg-blur d-flex align-items-center justify-content-center p-3">
          <div className="card-admin w-100 shadow-lg" style={{ maxWidth: '650px', border: '2px solid var(--accent)' }}>
            <div className="p-4 bg-accent text-black d-flex justify-content-between align-items-center">
              <h2 className="h5 fw-black font-orbitron m-0 text-uppercase tracking-tighter">{isNew ? 'NUEVO SISTEMA' : 'ACTUALIZAR SISTEMA'}</h2>
              <button className="btn text-black p-0" onClick={() => setEditing(null)}><X size={24} /></button>
            </div>
            
            <div className="p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              <div className="row g-4">
                {/* Image Section */}
                <div className="col-12">
                  <div className="p-4 bg-black border border-white border-opacity-5 text-center position-relative">
                    <img src={editing.image} alt="Preview" className="mb-4 shadow-lg border border-accent border-opacity-20" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    <div className="d-flex justify-content-center gap-3">
                      <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />
                      <button onClick={() => fileInputRef.current?.click()} className="btn btn-action py-2 px-3">
                        <Upload size={16} /> SUBIR DESDE PC
                      </button>
                    </div>
                    <p className="text-secondary x-small mt-3 uppercase tracking-widest">URL Manual (Opcional)</p>
                    <input type="text" className="form-control form-control-pro text-center small" value={editing.image.startsWith('data:') ? 'Imagen Cargada Localmente' : editing.image} onChange={(e) => setEditing({...editing, image: e.target.value})} placeholder="O pega un link directo..." />
                  </div>
                </div>

                <div className="col-md-8">
                  <label className="form-label text-accent x-small fw-black uppercase">Nombre del Producto</label>
                  <input type="text" className="form-control form-control-pro" value={editing.name} onChange={(e) => setEditing({...editing, name: e.target.value.toUpperCase()})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-accent x-small fw-black uppercase">Precio (ARS)</label>
                  <input type="number" className="form-control form-control-pro font-orbitron" value={editing.price} onChange={(e) => setEditing({...editing, price: Number(e.target.value)})} />
                </div>

                <div className="col-12">
                  <label className="form-label text-accent x-small fw-black uppercase">Descripción Estratégica</label>
                  <textarea className="form-control form-control-pro" rows={2} value={editing.description} onChange={(e) => setEditing({...editing, description: e.target.value})} />
                </div>

                <div className="col-12">
                  <label className="form-label text-accent x-small fw-black uppercase d-flex justify-content-between">
                    Componentes
                    <button onClick={() => setEditing({...editing, items: [...editing.items, '']})} className="btn btn-link text-white p-0 text-decoration-none x-small fw-black">+ AÑADIR</button>
                  </label>
                  {editing.items.map((item, idx) => (
                    <div key={idx} className="d-flex gap-2 mb-2">
                      <input type="text" className="form-control form-control-pro flex-grow-1" value={item} onChange={(e) => {
                        const newItems = [...editing.items];
                        newItems[idx] = e.target.value;
                        setEditing({...editing, items: newItems});
                      }} />
                      <button className="btn btn-outline-danger" onClick={() => {
                        const newItems = editing.items.filter((_, i) => i !== idx);
                        setEditing({...editing, items: newItems});
                      }}><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-top border-white border-opacity-5 d-flex gap-3">
              <button className="btn btn-dark flex-grow-1 border-white border-opacity-10 text-white" onClick={() => setEditing(null)}>DESCARTAR</button>
              <button className="btn btn-action flex-grow-1" onClick={handleSave}>
                <Save size={18} /> GUARDAR SISTEMA
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .x-small { font-size: 0.65rem; font-weight: 900; letter-spacing: 1.5px; }
      `}</style>
    </AdminLayout>
  );
};

export default ComboAdmin;