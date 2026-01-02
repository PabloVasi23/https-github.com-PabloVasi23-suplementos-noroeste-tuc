
import { GlobalConfig, Combo, ExternalLink } from './types';
import { INITIAL_CONFIG, INITIAL_COMBOS, INITIAL_LINKS } from './constants';

const DB_KEYS = {
  CONFIG: 'tuc_config_v3',
  COMBOS: 'tuc_combos_v3',
  LINKS: 'tuc_links_v3',
  AUTH: 'tuc_auth_v3'
};

export const db = {
  getConfig: (): GlobalConfig => {
    try {
      const data = localStorage.getItem(DB_KEYS.CONFIG);
      return data ? JSON.parse(data) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  },
  saveConfig: (config: GlobalConfig) => {
    localStorage.setItem(DB_KEYS.CONFIG, JSON.stringify(config));
  },

  getCombos: (activeOnly = false): Combo[] => {
    try {
      const data = localStorage.getItem(DB_KEYS.COMBOS);
      let combos: Combo[] = data ? JSON.parse(data) : INITIAL_COMBOS;
      if (activeOnly) combos = combos.filter(c => c.active);
      return combos;
    } catch {
      return INITIAL_COMBOS;
    }
  },
  saveCombos: (combos: Combo[]) => {
    localStorage.setItem(DB_KEYS.COMBOS, JSON.stringify(combos));
  },
  updateCombo: (id: number, updates: Partial<Combo>) => {
    const combos = db.getCombos();
    const index = combos.findIndex(c => c.id === id);
    if (index !== -1) {
      combos[index] = { ...combos[index], ...updates, updatedAt: new Date().toISOString() };
      db.saveCombos(combos);
    }
  },
  deleteCombo: (id: number) => {
    const combos = db.getCombos().filter(c => c.id !== id);
    db.saveCombos(combos);
  },

  getLinks: (activeOnly = false): ExternalLink[] => {
    try {
      const data = localStorage.getItem(DB_KEYS.LINKS);
      let links: ExternalLink[] = data ? JSON.parse(data) : INITIAL_LINKS;
      if (activeOnly) links = links.filter(l => l.active);
      return links.sort((a, b) => a.order - b.order);
    } catch {
      return INITIAL_LINKS;
    }
  },
  saveLinks: (links: ExternalLink[]) => {
    localStorage.setItem(DB_KEYS.LINKS, JSON.stringify(links));
  },

  isLoggedIn: () => {
    return localStorage.getItem(DB_KEYS.AUTH) === 'true';
  },
  login: (user: string, pass: string) => {
    const envUser = (import.meta as any).env.VITE_ADMIN_USER || INITIAL_CONFIG.admin.username;
    const envPass = (import.meta as any).env.VITE_ADMIN_PASSWORD || INITIAL_CONFIG.admin.password;
    
    if (user === envUser && pass === envPass) {
      localStorage.setItem(DB_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem(DB_KEYS.AUTH);
  }
};
