import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Award,
  Target,
  Clock,
  ExternalLink as ExtIcon,
  ShoppingBag
} from 'lucide-react';
import { db } from '../db';
import { Combo, ExternalLink } from '../types';

const LandingPage: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const config = db.getConfig();

  useEffect(() => {
    setCombos(db.getCombos(true));
    setLinks(db.getLinks(true));
  }, []);

  const openWhatsApp = (comboName?: string) => {
    const phone = config.brand.whatsapp;
    const message = comboName
      ? `¡Hola! Me interesa el ${comboName}. ¿Me darías más info?`
      : `¡Hola! Quisiera recibir asesoramiento sobre suplementación.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getIcon = (iconName: string) => {
    const icons: any = { Truck, ShieldCheck, Zap, Target, Award, Clock };
    const Icon = icons[iconName] || Zap;
    return <Icon className="text-accent" size={36} strokeWidth={2.5} />;
  };

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Dynamic Navbar */}
      <nav className="fixed-top px-4 py-3 bg-blur border-bottom border-white border-opacity-5 z-index-1050">
        <div className="container d-flex justify-content-between align-items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="font-orbitron fw-black h4 m-0 tracking-tighter"
          >
            <span className="text-accent">ELITE</span> TUC
          </motion.div>
          <div className="d-none d-lg-flex gap-5">
            {['productos', 'beneficios', 'comunidad'].map((item) => (
              <a key={item} href={`#${item}`} className="text-decoration-none text-white small fw-black text-uppercase tracking-widest hover-accent transition-all">{item}</a>
            ))}
          </div>
          <button onClick={() => openWhatsApp()} className="btn btn-action py-2 px-4 d-none d-sm-flex">
            SOPORTE EN VIVO
          </button>
        </div>
      </nav>

      {/* Hero Section Brutalista */}
      <section className="min-vh-100 d-flex align-items-center position-relative pt-5 overflow-hidden">
        <div className="container position-relative z-2">
          <div className="row">
            <div className="col-xl-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="d-inline-block px-3 py-1 bg-accent text-black fw-black x-small mb-4 text-uppercase tracking-widest">
                  ESTÁNDAR DE COMPETICIÓN 2024
                </div>
                <h1 className="title-massive mb-4" style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}>
                  HARDCORE <br />
                  <span className="text-accent">PERFORMANCE</span> <br />
                  FUEL
                </h1>
                <p className="lead text-secondary mb-5 fs-4 fw-light" style={{ maxWidth: '750px', lineHeight: '1.2' }}>
                  {config.brand.tagline}. No vendemos suplementos, proveemos el combustible para tu evolución física definitiva.
                </p>
                <div className="d-flex flex-wrap gap-4">
                  <button onClick={() => openWhatsApp()} className="btn btn-action btn-lg px-5 py-4">
                    PEDIR POR WHATSAPP <ArrowRight size={22} />
                  </button>
                  <a href="#productos" className="btn btn-outline-brand btn-lg px-5 py-4">
                    CATÁLOGO COMPLETO
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Background Graphic Decor */}
        <div className="position-absolute bottom-0 end-0 p-5 opacity-5 d-none d-lg-block pointer-events-none">
          <div className="font-orbitron fw-black text-white" style={{ fontSize: '25rem', lineHeight: '0.7' }}>2024</div>
        </div>
      </section>

      {/* Marquee Categorías Infinito */}
      <div className="bg-accent py-4 overflow-hidden border-top border-bottom border-black position-relative z-3">
        <div className="marquee-wrapper">
          <div className="marquee-content d-flex">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="d-flex align-items-center gap-5 px-4">
                <span className="text-black fw-black font-orbitron h4 m-0 text-nowrap">PROTEÍNAS ELITE</span>
                <span className="text-black fw-black font-orbitron h4 m-0 text-nowrap">•</span>
                <span className="text-black fw-black font-orbitron h4 m-0 text-nowrap">CREATINAS PURAS</span>
                <span className="text-black fw-black font-orbitron h4 m-0 text-nowrap">•</span>
                <span className="text-black fw-black font-orbitron h4 m-0 text-nowrap">PRE-ENTRENO TECH</span>
                <span className="text-black fw-black font-orbitron h4 m-0 text-nowrap">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secciones de Combos */}
      <section id="productos" className="py-8 container">
        <div className="mb-6">
          <h2 className="title-massive text-white h1 mb-0">SISTEMAS DE <span className="text-accent">FUERZA</span></h2>
          <div className="separator-brand"></div>
          <p className="text-secondary fs-5" style={{ maxWidth: '600px' }}>Selección premium de packs diseñados para maximizar la hipertrofia y la resistencia.</p>
        </div>

        <div className="row g-5">
          {combos.map((combo) => (
            <div key={combo.id} className="col-12 col-md-6 col-lg-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="card-admin h-100 d-flex flex-column"
              >
                <div className="position-relative overflow-hidden" style={{ height: '350px' }}>
                  <img src={combo.image} className="w-100 h-100 object-fit-cover" alt={combo.name} />
                  {combo.discount && (
                    <div className="position-absolute top-0 end-0 m-3 bg-accent text-black fw-black px-3 py-1 x-small z-2">
                      {combo.discount}
                    </div>
                  )}
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark">
                    <h3 className="h3 fw-black m-0 text-uppercase tracking-tighter">{combo.name}</h3>
                  </div>
                </div>
                
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <p className="text-secondary mb-4 small flex-grow-1" style={{ color: '#888' }}>{combo.description}</p>
                  
                  <div className="mb-4">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-3 mb-2 text-white small">
                        <div className="bg-accent" style={{ width: '8px', height: '2px' }}></div>
                        <span className="fw-bold opacity-80">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-4 border-top border-white border-opacity-10">
                    <div>
                      <span className="text-accent x-small d-block mb-1 font-orbitron fw-bold">VALOR PACK</span>
                      <span className="h2 fw-black font-orbitron">${combo.price.toLocaleString('es-AR')}</span>
                    </div>
                    <button onClick={() => openWhatsApp(combo.name)} className="btn btn-action p-3">
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios Elite */}
      <section id="beneficios" className="py-8 bg-surface border-top border-bottom border-white border-opacity-5">
        <div className="container">
          <div className="row g-5">
            {config.benefits.map((benefit, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 border border-white border-opacity-5 h-100 hover-border-accent transition-all"
                >
                  <div className="mb-4">{getIcon(benefit.icon)}</div>
                  <h4 className="fw-black text-white text-uppercase h5 mb-3 tracking-widest">{benefit.title}</h4>
                  <p className="text-secondary small m-0 leading-relaxed" style={{ opacity: 0.7 }}>{benefit.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Heavy Branding */}
      <footer className="py-8 bg-black border-top border-accent">
        <div className="container text-center text-lg-start">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="font-orbitron fw-black h1 m-0 text-white tracking-tighter">
                ELITE <span className="text-accent">TUC</span>
              </div>
              <p className="text-secondary x-small mt-3 m-0 opacity-40 uppercase tracking-widest leading-lg">
                © {new Date().getFullYear()} SUPLEMENTOS NOROESTE TUCUMÁN. <br />
                SISTEMA OPERATIVO DE NUTRICIÓN DEPORTIVA.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-center justify-content-lg-end gap-3 flex-wrap">
                <button onClick={() => openWhatsApp()} className="btn btn-outline-brand px-5">WHATSAPP</button>
                <a href="/admin/login" className="btn btn-action px-5">ADMIN_CONSOLE</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .py-8 { padding-top: 8rem; padding-bottom: 8rem; }
        .x-small { font-size: 0.65rem; font-weight: 900; letter-spacing: 2.5px; }
        .bg-gradient-dark { background: linear-gradient(transparent, rgba(0,0,0,0.95)); }
        .hover-accent:hover { color: var(--accent) !important; }
        .hover-border-accent:hover { border-color: var(--accent) !important; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-wrapper { width: 100%; overflow: hidden; }
        .marquee-content { width: fit-content; animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;