
import { GlobalConfig, Combo, ExternalLink } from './types';

export const INITIAL_CONFIG: GlobalConfig = {
  brand: {
    name: 'SuplementosNoroesteTuc',
    whatsapp: '543816284867',
    tagline: 'Combos de suplementos – Pedidos directos por WhatsApp',
    description: 'Los mejores suplementos nutricionales en Tucumán y todo el país'
  },
  admin: {
    username: 'Pablovasi23',
    password: 'Tucuman1223'
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
    title: '¡No esperes más para alcanzar tus objetivos!',
    subtitle: 'Los mejores suplementos al mejor precio, con atención personalizada y envíos a todo el país.',
    buttonText: 'Hacé tu pedido ahora por WhatsApp'
  }
};

export const INITIAL_COMBOS: Combo[] = [
  {
    id: 1,
    name: 'Combo Iniciante',
    description: 'Perfecto para quienes empiezan en el mundo fitness',
    price: 25000,
    discount: null,
    items: ['Proteína Whey 1kg', 'Creatina Monohidratada 300g', 'Multivitamínico 60 caps'],
    image: 'https://picsum.photos/400/300?random=1',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Combo Ganancia Masa',
    description: 'Para aumentar volumen muscular de forma efectiva',
    price: 35000,
    discount: '15% OFF',
    items: ['Gainer 2kg', 'Creatina 300g', 'Glutamina 300g', 'Shaker + Gorra'],
    image: 'https://picsum.photos/400/300?random=2',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Combo Definición',
    description: 'Ideal para bajar grasa y mantener masa muscular',
    price: 32000,
    discount: null,
    items: ['Whey Isolate 1kg', 'L-Carnitina 60 caps', 'Termogénico 60 caps', 'Barra Proteica x3'],
    image: 'https://picsum.photos/400/300?random=3',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_LINKS: ExternalLink[] = [
  {
    id: 1,
    title: 'Nuestra App de Pádel',
    description: 'Reserva canchas de pádel en Tucumán de forma rápida y fácil',
    url: 'https://padel-tucuman.example.com',
    active: true,
    icon: 'ExternalLink',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
