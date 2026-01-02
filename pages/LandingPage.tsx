import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  ShoppingCart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  TrendingUp,
  Award
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
    const phone = config.brand.whatsapp;
    const message = comboName
      ? `¡Hola! Me interesa potenciar mi rendimiento con el ${comboName}. ¿Me das más info?`
      : `¡Hola! Quisiera recibir asesoramiento experto sobre mi suplementación.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container-fluid p-0 bg-black overflow-hidden">
      {/* Dynamic Header / Navbar */}
      <nav className="fixed-top px-4 py-3 bg-blur border-bottom border-white border-opacity-5 z-index-1050">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="brand-title h4 m-0">{config.brand.name}</div>
          <button onClick={() => openWhatsApp()} className="btn btn-sm btn-premium py-2 px-4 d-none d-md-flex">
            ASESORAMIENTO 
          </button>
        </div>
      </nav>

      {/* Hero High-Impact */}
      <section className="min-vh-100 d-flex align-items-center justify-content-center position-relative pt-5">
        <div className="position-absolute w-100 h-100 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 255, 136, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}>
        </div>
        
        <div className="position-absolute bg-accent opacity-5 rounded-circle blur-3xl" style={{ width: '600px', height: '600px', top: '10%', right: '-10%', filter: 'blur(150px)' }}></div>
        <div className="position-absolute bg-cyan opacity-5 rounded-circle blur-3xl" style={{ width: '600px', height: '600px', bottom: '10%', left: '-10%', filter: 'blur(150px)' }}></div>

        <div className="container position-relative z-1 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="d-inline-flex align-items-center gap-2 mb-4 px-4 py-2 border border-accent border-opacity-20 rounded-pill text-accent fw-bold font-orbitron bg-black bg-opacity-40"
            style={{ fontSize: '0.75rem', letterSpacing: '3px' }}
          >
            <Award size={16} /> PERFORMANCE DE ÉLITE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="display-1 fw-black brand-title mb-4"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)', lineHeight: 0.85 }}
          >
            DOMINA TU<br/>POTENCIAL
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lead text-muted mb-5 mx-auto fs-4 fw-light" style={{ maxWidth: '800px' }}>
            {config.brand.tagline}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="d-flex flex-column flex-sm-row gap-4 justify-content-center align-items-center pt-3"
          >
            <button onClick={() => openWhatsApp()} className="btn btn-premium btn-lg px-5 shadow-lg">
              <MessageCircle size={22} /> HABLAR CON EXPERTO
            </button>
            <a href="#combos" className="btn btn-outline-premium btn-lg px-5">
              EXPLORAR COMBOS <ArrowRight size={20} className="ms-2" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-accent opacity-30">
          <ChevronDown size={40} />
        </motion.div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-5 bg-black border-top border-bottom border-white border-opacity-5">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <h3 className="h1 fw-black font-orbitron text-accent m-0 tracking-tighter">+10K</h3>
              <p className="text-muted small text-uppercase fw-bold m-0 mt-2">Clientes</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="h1 fw-black font-orbitron text-cyan m-0 tracking-tighter">24H</h3>
              <p className="text-muted small text-uppercase fw-bold m-0 mt-2">Entrega</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="h1 fw-black font-orbitron text-accent m-0 tracking-tighter">100%</h3>
              <p className="text-muted small text-uppercase fw-bold m-0 mt-2">Original</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="h1 fw-black font-orbitron text-cyan m-0 tracking-tighter">+50</h3>
              <p className="text-muted small text-uppercase fw-bold m-0 mt-2">Combos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Combos Grid */}
      <section id="combos" className="py-5 my-5 container-fluid px-lg-5">
        <div className="text-center mb-5 pb-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="d-flex flex-column align-items-center"
          >
            <span className="text-accent font-orbitron fw-black tracking-widest small mb-3">CATÁLOGO SELECCIONADO</span>
            <h2 className="display-4 font-orbitron fw-black text-white m-0">SISTEMAS DE <span className="text-cyan">PAGO</span></h2>
            <div className="mt-3 bg-accent" style={{ width: '60px', height: '4px', borderRadius: '10px' }}></div>
          </motion.div>
        </div>

        <div className="row g-5 px-lg-4">
          {combos.map((combo) => (
            <div key={combo.id} className="col-12 col-md-6 col-xl-4">
              <motion.div 
                whileHover={{ y: -10 }}
                className="card-premium h-100"
              >
                <div className="position-relative" style={{ height: '320px' }}>
                  <img src={combo.image} className="h-100 w-100 object-fit-cover" alt={combo.name} />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(rgba(11, 15, 20, 0.1), rgba(11, 15, 20, 0.9))' }}></div>
                  
                  {combo.discount && (
                    <div className="position-absolute top-0 end-0 m-4">
                       <span className="badge bg-accent text-black fw-black px-4 py-2 rounded-pill font-orbitron shadow-lg" style={{ fontSize: '0.7rem' }}>
                        {combo.discount}
                      </span>
                    </div>
                  )}
                  
                  <div className="position-absolute bottom-0 start-0 p-4">
                     <h3 className="h2 fw-black text-white font-orbitron tracking-tighter m-0">{combo.name.toUpperCase()}</h3>
                  </div>
                </div>
                
                <div className="card-body p-4 p-lg-5 d-flex flex-column">
                  <p className="text-muted mb-4 flex-grow-1" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{combo.description}</p>
                  
                  <div className="mb-5 py-3 border-top border-bottom border-white border-opacity-5">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-3 mb-2 text-white text-opacity-80">
                        <TrendingUp size={16} className="text-cyan" />
                        <span className="small fw-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-end justify-content-between mb-4">
                    <div>
                      <p className="text-muted small fw-black font-orbitron mb-1 tracking-widest">INVERSIÓN TOTAL</p>
                      <span className="display-6 fw-black text-accent font-orbitron m-0 glow-text">
                        ${combo.price.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => openWhatsApp(combo.name)} className="btn btn-premium w-100 py-4 fs-5">
                    <ShoppingCart size={22} /> RESERVAR AHORA
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / Brand Pillars */}
      <section className="py-5 bg-glass mb-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-4 text-center">
              <div className="p-4 bg-accent bg-opacity-5 border border-accent border-opacity-10 rounded-4 mb-4 d-inline-block">
                <ShieldCheck size={48} className="text-accent" />
              </div>
              <h4 className="font-orbitron fw-black text-white mb-3">CALIDAD LAB</h4>
              <p className="text-muted">Todos nuestros productos están testeados bajo estándares internacionales de pureza.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-4 bg-cyan bg-opacity-5 border border-cyan border-opacity-10 rounded-4 mb-4 d-inline-block">
                <Zap size={48} className="text-cyan" />
              </div>
              <h4 className="font-orbitron fw-black text-white mb-3">BIO-DISPONIBLE</h4>
              <p className="text-muted">Fórmulas optimizadas para una absorción inmediata y máximo impacto metabólico.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-4 bg-accent bg-opacity-5 border border-accent border-opacity-10 rounded-4 mb-4 d-inline-block">
                <Truck size={48} className="text-accent" />
              </div>
              <h4 className="font-orbitron fw-black text-white mb-3">SPEED LOGISTICS</h4>
              <p className="text-muted">Red de distribución prioritaria para que nunca interrumpas tu proceso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding Heavy */}
      <footer className="py-6 mt-5 bg-black border-top border-white border-opacity-5">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-5 mb-md-0">
              <div className="brand-title h2 mb-2">{config.brand.name}</div>
              <p className="text-muted small fw-bold font-orbitron tracking-widest m-0 opacity-50">SUPLEMENTACIÓN DE RENDIMIENTO SUPERIOR</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-4 mb-4">
                <Activity className="text-accent" size={24} />
                <Award className="text-cyan" size={24} />
                <Zap className="text-accent" size={24} />
              </div>
              <p className="text-muted small m-0 opacity-30">© {new Date().getFullYear()} TUCUMÁN PERFORMANCE DIV. PROTEGIDO POR PROTOCOLO ELITE.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;