
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Package, 
  ShieldCheck, 
  Truck, 
  Users, 
  Target, 
  Award, 
  Clock, 
  Star, 
  Zap, 
  ExternalLink, 
  ShoppingCart,
  ChevronDown
} from 'lucide-react';
import { db } from '../db';
import { Combo, ExternalLink as ExtLink } from '../types';

const IconMap: any = {
  Users, Truck, Target, Award, ShieldCheck, Clock, Sparkles, Package, Star, Zap, ExternalLink, ShoppingCart
};

const LandingPage: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [links, setLinks] = useState<ExtLink[]>([]);
  const config = db.getConfig();

  useEffect(() => {
    setCombos(db.getCombos(true));
    setLinks(db.getLinks(true));
  }, []);

  const openWhatsApp = (comboName?: string) => {
    const message = comboName
      ? `Hola, quiero pedir el Combo ${comboName} que vi en SuplementosNoroesteTuc`
      : `Hola, quiero hacer una consulta desde la web de SuplementosNoroesteTuc`;
    const url = `https://wa.me/${config.brand.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-primary selection:text-black">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

        <motion.div 
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Suplementos de Calidad en Tucumán
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-orbitron font-bold mb-6 bg-gradient-to-r from-white via-primary to-emerald-200 bg-clip-text text-transparent">
            {config.brand.name}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-dark-muted mb-8 max-w-2xl mx-auto font-light">
            {config.brand.tagline}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => openWhatsApp()}
              className="bg-primary hover:bg-primary-hover text-black px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center gap-2 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir por WhatsApp
            </button>
            <button 
              onClick={() => document.getElementById('combos')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Ver Combos
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-muted"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Explorar</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Combos */}
      <section id="combos" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
            <Star className="w-4 h-4 mr-2" /> Ofertas Especiales
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">Combos Promocionales</h2>
          <p className="text-dark-muted text-lg max-w-xl mx-auto">
            Seleccionados por expertos para maximizar tus resultados físicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <motion.div 
              key={combo.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden group hover:border-primary/50 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={combo.image} alt={combo.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                {combo.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {combo.discount}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{combo.name}</h3>
                <p className="text-dark-muted text-sm mb-6 leading-relaxed line-clamp-2">{combo.description}</p>
                <div className="space-y-3 mb-8">
                  {combo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div className="text-3xl font-bold text-primary font-orbitron">
                    ${combo.price.toLocaleString('es-AR')}
                  </div>
                </div>
                <button 
                  onClick={() => openWhatsApp(combo.name)}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-black rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir por WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Links Externos */}
      {links.length > 0 && (
        <section className="py-24 px-4 bg-dark-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-3 py-1">
                <ExternalLink className="w-4 h-4 mr-2" /> Más del Negocio
              </Badge>
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">Nuestras Aplicaciones</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {links.map((link) => {
                const Icon = IconMap[link.icon] || ExternalLink;
                return (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 bg-dark-card border border-dark-border rounded-3xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{link.title}</h4>
                      <p className="text-dark-muted text-sm">{link.description}</p>
                    </div>
                    <ArrowRight className="ml-auto w-6 h-6 text-dark-muted group-hover:text-primary transition-all group-hover:translate-x-2" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.benefits.map((benefit, idx) => {
            const Icon = IconMap[benefit.icon] || Zap;
            return (
              <div key={idx} className="p-8 bg-dark-card border border-dark-border rounded-3xl hover:bg-white/5 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                <p className="text-dark-muted text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 bg-gradient-to-t from-black to-dark-bg">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse-slow" />
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">{config.finalCTA.title}</h2>
          <p className="text-xl text-dark-muted mb-12">{config.finalCTA.subtitle}</p>
          <button 
            onClick={() => openWhatsApp()}
            className="px-12 py-6 bg-primary hover:bg-primary-hover text-black text-xl font-bold rounded-full transition-all shadow-[0_0_50px_rgba(16,185,129,0.4)] hover:shadow-[0_0_80px_rgba(16,185,129,0.6)] flex items-center gap-3 mx-auto"
          >
            <MessageCircle className="w-7 h-7" />
            {config.finalCTA.buttonText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-border bg-black/50 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">{config.brand.name}</h3>
            <p className="text-dark-muted text-sm">{config.brand.description}</p>
          </div>
          <div className="flex gap-8 text-sm text-dark-muted">
            <a href={`https://wa.me/${config.brand.whatsapp}`} target="_blank" className="hover:text-primary transition-all">WhatsApp</a>
            <a href="#" className="hover:text-primary transition-all">Instagram</a>
            <a href="#" className="hover:text-primary transition-all">Ubicación</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-dark-muted">
            © {new Date().getFullYear()} {config.brand.name}. Hecho con ❤️
          </p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button 
        onClick={() => openWhatsApp()}
        className="fixed bottom-6 right-6 z-50 p-5 bg-primary text-black rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all animate-bounce"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
      </button>
    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default LandingPage;
