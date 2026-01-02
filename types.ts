
export interface Combo {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: string | null;
  items: string[];
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExternalLink {
  id: number;
  title: string;
  description: string;
  url: string;
  active: boolean;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BrandConfig {
  name: string;
  whatsapp: string;
  tagline: string;
  description: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface GlobalConfig {
  brand: BrandConfig;
  admin: {
    username: string;
    password: string;
  };
  benefits: Benefit[];
  finalCTA: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}
