import { GlobalConfig, Combo, ExternalLink } from './types';

export const INITIAL_CONFIG: GlobalConfig = {
  brand: {
    name: 'SuplementosNoroesteTuc',
    whatsapp: '543816284867',
    tagline: 'ELITE PERFORMANCE & NUTRITION',
    description: 'Los mejores suplementos nutricionales en Tucumán y todo el país'
  },
  admin: {
    username: 'pablovasi23',
    password: 'pablocande2328'
  },
  benefits: [
    { icon: 'Users', title: 'Atención Personalizada', description: 'Asesoramiento experto adaptado a tus objetivos específicos' },
    { icon: 'Truck', title: 'Envíos a Todo el País', description: 'Llevamos tus suplementos a cualquier parte de Argentina' },
    { icon: 'Target', title: 'Combos Armados para Objetivos Reales', description: 'Cada combo está diseñado pensando en resultados reales' },
    { icon: 'Award', title: 'Experiencia y Asesoramiento', description: 'Más de 10 años en el mercado de suplementación deportiva' },
    { icon: 'ShieldCheck', title: 'Productos Certificados', description: 'Solo trabajamos con marcas de máxima calidad y confianza' },
    { icon: 'Clock', title: 'Respuesta Rápida', description: 'Atención inmediata por WhatsApp para todas tus consultas' }
  ],
  finalCTA: {
    title: 'FORJA TU MEJOR VERSIÓN',
    subtitle: 'Tecnología en suplementación para alcanzar el máximo rendimiento físico.',
    buttonText: 'HACER PEDIDO POR WHATSAPP'
  }
};

export const INITIAL_COMBOS: Combo[] = [
  {
    id: 1,
    name: 'Combo Elite Start',
    description: 'La base fundamental para tu transformación física diaria.',
    price: 28500,
    discount: 'POPULAR',
    items: ['Proteína Whey 1kg', 'Creatina Monohidratada 300g', 'Shaker Pro'],
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Hyper Mass Build',
    description: 'Diseñado para atletas que buscan máxima ganancia muscular.',
    price: 39900,
    discount: '15% OFF',
    items: ['Gainer 2kg', 'Creatina 300g', 'BCAA Recovery', 'Gorra Elite'],
    image: 'https://images.unsplash.com/photo-1593095191071-82763e9f5182?q=80&w=800',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Definition Tech',
    description: 'Optimiza la quema de grasa manteniendo tu musculatura.',
    price: 34500,
    discount: 'NUEVO',
    items: ['Whey Isolate 1kg', 'L-Carnitina 1500', 'Termogénico Advanced'],
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_LINKS: ExternalLink[] = [
  {
    id: 1,
    title: 'Pádel Tucumán Connect',
    description: 'Reserva de canchas y torneos locales.',
    url: 'https://padel-tucuman.example.com',
    active: true,
    icon: 'ExternalLink',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];