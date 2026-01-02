import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  ShoppingCart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Clock,
  Zap,
  Activity,
  ArrowRight
} from 'lucide-react';
import { db } from '../db';
import { Combo } from '../types';

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
      <section className="min-vh-100 d-flex align-items-center justify-content-center position-relative px-3 text-center overflow-hidden">
        
        {/* Animated Background Grids */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)', 
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
          }}>
        </div>
        
        {/* Glowing Orbs */}
        <div className="position-absolute bg-accent opacity-10 rounded-circle blur-3xl" 
          style={{ width: '500px', height: '500px', top: '-10%', left: '-10%', filter: 'blur(120px)' }}></div>
        <div className="position-absolute bg-cyan opacity-10 rounded-circle blur-3xl" 
          style={{ width: '500px', height: '500px', bottom: '-10%', right: '-10%', filter: 'blur(120px)' }}></div>

        <div className="position-relative z-1 container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="d-inline-flex align-items-center gap-2 mb-4 px-4 py-2 bg-accent bg-opacity-10 border border-accent border-opacity-20 rounded-pill text-accent fw-bold font-orbitron"
            style={{ fontSize: '0.7rem', letterSpacing: '3px' }}
          >
            <Activity size={14} /> TECNOLOGÍA EN RENDIMIENTO
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="display-1 fw-black font-orbitron mb-4 text-white tracking-tighter"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 0.9 }}
          >
            {config.brand.name.toUpperCase()}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lead text-muted mb-5 mx-auto fs-4" style={{ maxWidth: '800px', fontWeight: 400 }}>
            {config.brand.tagline}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="d-flex flex-column flex-sm-row gap-4 justify-content-center pt-3"
          >
            <button onClick={() => openWhatsApp()} className="btn btn-primary-custom btn-lg px-5 py-4 d-flex align-items-center justify-content-center gap-3">
              <MessageCircle size={22} /> HABLAR CON ASESOR
            </button>
            <a href="#combos" className="btn btn-outline-custom btn-lg px-5 py-4 d-flex align-items-center justify-content-center gap-3">
              VER CATÁLOGO <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-accent opacity-30">
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Combos Section */}
      <section id="combos" className="py-5 container-fluid px-lg-5">
        <div className="text-center mb-5 pt-5">
          <span className="text-accent font-orbitron fw-bold tracking-widest small mb-2 d-block">OPTIMIZACIÓN TOTAL</span>
          <h2 className="display-4 font-orbitron fw-black mb-3 text-white">COMBOS <span className="text-accent">ELITE</span></h2>
          <div className="bg-accent mx-auto mb-5" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4 px-lg-4">
          {combos.map((combo) => (
            <div key={combo.id} className="col-12 col-md-6 col-xl-4">
              <div className="card-futuristic h-100 overflow-hidden">
                <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
                  <img src={combo.image} className="h-100 w-100 object-fit-cover transition-all" alt={combo.name} style={{ filter: 'brightness(0.6)' }} />
                  {combo.discount && (
                    <span className="position-absolute top-0 end-0 m-4 badge bg-accent text-black fw-black px-3 py-2 rounded-1 font-orbitron shadow">
                      {combo.discount}
                    </span>
                  )}
                  <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, var(--bg-card))' }}>
                     <h3 className="h3 fw-black mb-0 text-white font-orbitron tracking-tighter">{combo.name.toUpperCase()}</h3>
                  </div>
                </div>
                <div className="card-body p-4 p-lg-5 d-flex flex-column">
                  <p className="text-muted mb-4 flex-grow-1" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{combo.description}</p>
                  
                  <div className="mb-5 bg-black bg-opacity-30 p-4 rounded-3 border-accent-soft">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-3 mb-2 text-light opacity-90">
                        <Zap size={16} className="text-accent" />
                        <span className="fw-bold small">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex flex-column">
                      <span className="text-muted small font-orbitron fw-bold">PRECIO FINAL</span>
                      <span className="h1 fw-black text-accent font-orbitron m-0">
                        ${combo.price.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => openWhatsApp(combo.name)} className="btn btn-primary-custom w-100 py-4 rounded-3 d-flex align-items-center justify-content-center gap-2 fs-5">
                    <ShoppingCart size={22} /> ADQUIRIR AHORA
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-5 my-5 bg-glass border-top border-bottom border-white border-opacity-5">
        <div className="container py-4">
          <div className="row g-5 text-center">
            <div className="col-md-4">
              <div className="mb-4 d-inline-block p-4 rounded-circle bg-accent bg-opacity-5 border border-accent border-opacity-10 text-accent">
                <Truck size={40} />
              </div>
              <h4 className="fw-black font-orbitron h5 mb-3">ENVÍO PRIORITARIO</h4>
              <p className="text-muted small mx-auto" style={{ maxWidth: '250px' }}>Logística optimizada para entregas en tiempo récord a nivel nacional.</p>
            </div>
            <div className="col-md-4">
              <div className="mb-4 d-inline-block p-4 rounded-circle bg-cyan bg-opacity-5 border border-cyan border-opacity-10 text-cyan">
                <ShieldCheck size={40} />
              </div>
              <h4 className="fw-black font-orbitron h5 mb-3">CERTIFICACIÓN ELITE</h4>
              <p className="text-muted small mx-auto" style={{ maxWidth: '250px' }}>Trazabilidad completa y sellos de calidad internacional en cada gramo.</p>
            </div>
            <div className="col-md-4">
              <div className="mb-4 d-inline-block p-4 rounded-circle bg-accent bg-opacity-5 border border-accent border-opacity-10 text-accent">
                <Clock size={40} />
              </div>
              <h4 className="fw-black font-orbitron h5 mb-3">SOPORTE TÉCNICO</h4>
              <p className="text-muted small mx-auto" style={{ maxWidth: '250px' }}>Expertos en bioquímica deportiva listos para optimizar tu plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 container text-center">
        <motion.div 
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          className="py-5 px-4 py-lg-6 rounded-5 border border-accent border-opacity-20" 
          style={{ background: 'radial-gradient(circle at center, rgba(0,255,136,0.05) 0%, transparent 100%)' }}>
          <h2 className="display-3 font-orbitron fw-black mb-4 text-white tracking-tighter">{config.finalCTA.title}</h2>
          <p className="text-muted mb-5 mx-auto fs-5" style={{ maxWidth: '700px' }}>{config.finalCTA.subtitle}</p>
          <button onClick={() => openWhatsApp()} className="btn btn-primary-custom btn-lg px-5 py-4 rounded-pill font-orbitron fs-4 shadow-lg">
             {config.finalCTA.buttonText}
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-5 mt-5 border-top border-white border-opacity-5 bg-black">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="font-orbitron fw-black m-0 text-accent tracking-tighter" style={{ fontSize: '1.5rem' }}>{config.brand.name}</h3>
              <p className="text-muted small m-0 mt-1 fw-bold font-orbitron opacity-50">SISTEMA INTEGRAL DE SUPLEMENTACIÓN</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted small m-0 opacity-40">© {new Date().getFullYear()} Elite Performance Tucumán. Encriptado & Asegurado.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;