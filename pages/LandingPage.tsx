import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Sparkles, 
  ShoppingCart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Clock,
  Zap,
  Activity
} from 'lucide-react';
import { db } from '../db';
import { Combo, ExternalLink as ExtLink } from '../types';

const LandingPage: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const config = db.getConfig();

  useEffect(() => {
    setCombos(db.getCombos(true));
  }, []);

  const openWhatsApp = (comboName?: string) => {
    const phone = (import.meta as any).env.VITE_WHATSAPP_NUMBER || config.brand.whatsapp;
    const message = comboName
      ? `Hola! Vengo de la web y quiero info sobre el ${comboName}`
      : `Hola! Quisiera recibir asesoramiento sobre suplementos.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container-fluid p-0 bg-black">
      {/* Hero Section */}
      <section className="min-vh-100 d-flex align-items-center justify-content-center position-relative px-3 text-center" 
        style={{ background: 'linear-gradient(to bottom, #0B0F14 0%, #000000 100%)' }}>
        
        {/* Animated Background Grids */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', 
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}>
        </div>
        
        <div className="position-relative z-1 container">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge rounded-pill border border-success border-opacity-50 text-accent px-4 py-2 mb-4 d-inline-flex align-items-center gap-2 text-uppercase fw-bold" 
            style={{ fontSize: '0.75rem', letterSpacing: '2px', background: 'rgba(0,255,136,0.05)' }}>
            <Activity size={16} /> Suplementación de Élite
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="display-1 fw-black font-orbitron mb-3 text-white tracking-tighter">
            {config.brand.name.toUpperCase()}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lead text-muted mb-5 mx-auto fs-4" style={{ maxWidth: '700px', fontWeight: 300 }}>
            {config.brand.tagline}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button onClick={() => openWhatsApp()} className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3 d-flex align-items-center justify-content-center gap-2">
              <MessageCircle size={22} /> HABLAR CON UN ASESOR
            </button>
            <a href="#combos" className="btn btn-outline-custom btn-lg rounded-pill px-5 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold">
              <ShoppingCart size={22} /> VER COMBOS
            </a>
          </motion.div>
        </div>

        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-accent opacity-50 animate-bounce">
          <ChevronDown size={40} />
        </div>
      </section>

      {/* Combos Section */}
      <section id="combos" className="py-5 container">
        <div className="text-center mb-5 pt-5">
          <h2 className="display-4 font-orbitron fw-900 mb-2 text-white">COMBOS <span className="text-accent">FORCE</span></h2>
          <p className="text-muted fs-5">Tecnología nutricional para resultados exponenciales.</p>
        </div>

        <div className="row g-4">
          {combos.map((combo) => (
            <div key={combo.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 card-futuristic overflow-hidden">
                <div className="position-relative overflow-hidden" style={{ height: '260px' }}>
                  <img src={combo.image} className="card-img-top h-100 w-100 object-fit-cover transition-all" alt={combo.name} style={{ filter: 'brightness(0.7)' }} />
                  {combo.discount && (
                    <span className="position-absolute top-0 start-0 m-3 badge bg-accent text-black fw-black px-3 py-2 rounded-1 font-orbitron">
                      {combo.discount}
                    </span>
                  )}
                  <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, var(--bg-secondary))' }}>
                     <h3 className="h4 fw-bold mb-0 text-white font-orbitron">{combo.name.toUpperCase()}</h3>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>{combo.description}</p>
                  
                  <div className="mb-4">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-2 mb-2 small text-light opacity-80">
                        <Zap size={14} className="text-cyan" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-4 border-top border-secondary pt-3">
                    <span className="h2 fw-black text-accent font-orbitron m-0">
                      ${combo.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <button onClick={() => openWhatsApp(combo.name)} className="btn btn-primary-custom w-100 py-3 rounded-2 d-flex align-items-center justify-content-center gap-2 font-orbitron">
                    <ShoppingCart size={18} /> LO QUIERO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-5 my-5" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <Truck className="text-accent mb-3" size={48} />
              <h4 className="fw-bold font-orbitron h5">ENVIOS NACIONALES</h4>
              <p className="text-muted small">Llegamos a todo el país con logística de alta velocidad.</p>
            </div>
            <div className="col-md-4">
              <ShieldCheck className="text-cyan mb-3" size={48} />
              <h4 className="fw-bold font-orbitron h5">CALIDAD TECH</h4>
              <p className="text-muted small">Productos testeados y certificados para el máximo rendimiento.</p>
            </div>
            <div className="col-md-4">
              <Clock className="text-accent mb-3" size={48} />
              <h4 className="fw-bold font-orbitron h5">SOPORTE 24/7</h4>
              <p className="text-muted small">Asesoramiento técnico inmediato por nuestros expertos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-5 container text-center">
        <div className="py-5 px-4 rounded-5 border border-secondary border-opacity-25" style={{ background: 'radial-gradient(circle, #111827 0%, transparent 100%)' }}>
          <h2 className="display-4 font-orbitron fw-black mb-4 text-white">{config.finalCTA.title}</h2>
          <p className="text-muted mb-5 mx-auto fs-5" style={{ maxWidth: '700px' }}>{config.finalCTA.subtitle}</p>
          <button onClick={() => openWhatsApp()} className="btn btn-primary-custom btn-lg px-5 py-4 rounded-pill font-orbitron fs-5">
             {config.finalCTA.buttonText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 mt-5 border-top border-secondary border-opacity-20">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="font-orbitron fw-bold m-0 text-accent">{config.brand.name}</h3>
              <p className="text-muted small m-0">Optimización física de alto nivel.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted small m-0 opacity-50">© {new Date().getFullYear()} Elite Performance Tucumán. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;