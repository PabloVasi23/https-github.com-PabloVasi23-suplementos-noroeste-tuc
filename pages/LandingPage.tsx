
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Sparkles, 
  Star, 
  Zap, 
  ExternalLink, 
  ShoppingCart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { db } from '../db';
import { Combo, ExternalLink as ExtLink } from '../types';

const LandingPage: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [links, setLinks] = useState<ExtLink[]>([]);
  const config = db.getConfig();

  useEffect(() => {
    setCombos(db.getCombos(true));
    setLinks(db.getLinks(true));
  }, []);

  const openWhatsApp = (comboName?: string) => {
    const phone = (import.meta as any).env.VITE_WHATSAPP_NUMBER || config.brand.whatsapp;
    const message = comboName
      ? `Hola, quiero pedir el Combo ${comboName} que vi en SuplementosNoroesteTuc`
      : `Hola, quiero hacer una consulta desde la web de SuplementosNoroesteTuc`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container-fluid p-0 overflow-hidden">
      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center justify-content-center position-relative px-3 text-center" style={{ background: 'radial-gradient(circle at center, #10b98115 0%, transparent 70%)' }}>
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="position-relative z-1">
          <span className="badge rounded-pill bg-primary-custom px-3 py-2 mb-4 d-inline-flex align-items-center gap-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
            <Sparkles size={14} /> Suplementos de Calidad en Tucumán
          </span>
          <h1 className="display-1 fw-black font-orbitron mb-3 text-white">
            {config.brand.name.toUpperCase()}
          </h1>
          <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            {config.brand.tagline}
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button onClick={() => openWhatsApp()} className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3 d-flex align-items-center justify-content-center gap-2">
              <MessageCircle size={20} /> Pedir por WhatsApp
            </button>
            <a href="#combos" className="btn btn-outline-secondary btn-lg rounded-pill px-5 py-3 d-flex align-items-center justify-content-center gap-2 text-white border-secondary">
              <ShoppingCart size={20} /> Ver Combos
            </a>
          </div>
        </div>

        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-secondary animate-bounce">
          <ChevronDown size={30} />
        </div>
      </section>

      {/* Combos Section */}
      <section id="combos" className="py-5 container">
        <div className="text-center mb-5">
          <h2 className="display-4 font-orbitron fw-bold mb-3">Combos Promocionales</h2>
          <p className="text-secondary">Seleccionados por expertos para maximizar tus resultados físicos.</p>
        </div>

        <div className="row g-4">
          {combos.map((combo) => (
            <div key={combo.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 card-dark">
                <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                  <img src={combo.image} className="card-img-top h-100 w-100 object-fit-cover" alt={combo.name} />
                  {combo.discount && (
                    <span className="position-absolute top-0 end-0 m-3 badge bg-danger rounded-pill fw-bold">
                      {combo.discount}
                    </span>
                  )}
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h3 className="h4 fw-bold mb-2">{combo.name}</h3>
                  <p className="text-secondary small mb-4 flex-grow-1">{combo.description}</p>
                  
                  <div className="mb-4">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-2 mb-1 small text-light opacity-75">
                        <div style={{ width: '6px', height: '6px' }} className="bg-primary-custom rounded-circle"></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <span className="h2 fw-bold text-primary-custom font-orbitron m-0">
                      ${combo.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <button onClick={() => openWhatsApp(combo.name)} className="btn btn-primary-custom w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                    <MessageCircle size={18} /> Pedir ahora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-5 bg-dark border-top border-bottom border-secondary border-opacity-10">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 card-dark h-100 d-flex flex-column align-items-center">
                <Truck className="text-primary-custom mb-3" size={40} />
                <h4 className="fw-bold">Envíos a todo el país</h4>
                <p className="text-secondary small">Llegamos a cada rincón de Argentina con los mejores suplementos.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 card-dark h-100 d-flex flex-column align-items-center">
                <ShieldCheck className="text-primary-custom mb-3" size={40} />
                <h4 className="fw-bold">Calidad Certificada</h4>
                <p className="text-secondary small">Solo marcas líderes y productos originales para tu seguridad.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 card-dark h-100 d-flex flex-column align-items-center">
                <Clock className="text-primary-custom mb-3" size={40} />
                <h4 className="fw-bold">Atención 24/7</h4>
                <p className="text-secondary small">Asesoramiento personalizado por WhatsApp en cualquier momento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 container text-center">
        <div className="py-5">
          <h2 className="display-5 font-orbitron fw-bold mb-4">{config.finalCTA.title}</h2>
          <p className="text-secondary mb-5 mx-auto fs-5" style={{ maxWidth: '700px' }}>{config.finalCTA.subtitle}</p>
          <button onClick={() => openWhatsApp()} className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fs-4">
             {config.finalCTA.buttonText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-black border-top border-secondary border-opacity-10">
        <div className="container">
          <div className="row align-items-center justify-content-between text-center text-md-start">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3 className="font-orbitron fw-bold m-0">{config.brand.name}</h3>
              <p className="text-secondary small m-0">{config.brand.description}</p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0 d-flex justify-content-center gap-4">
              <a href="#" className="text-secondary text-decoration-none hover-primary">Instagram</a>
              <a href="#" className="text-secondary text-decoration-none hover-primary">WhatsApp</a>
              <a href="#" className="text-secondary text-decoration-none hover-primary">Facebook</a>
            </div>
            <div className="col-md-4 text-md-end">
              <p className="text-secondary small m-0">© {new Date().getFullYear()} Elite Performance Tucumán</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
