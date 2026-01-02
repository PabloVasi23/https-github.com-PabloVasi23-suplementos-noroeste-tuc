
import { GlobalConfig, Combo, ExternalLink } from './types';
import { INITIAL_CONFIG, INITIAL_COMBOS, INITIAL_LINKS } from './constants';

const DB_KEYS = {
  CONFIG: 'tuc_config',
  COMBOS: 'tuc_combos',
  LINKS: 'tuc_links',
  AUTH: 'tuc_auth'
};

export const db = {
  // Config
  getConfig: (): GlobalConfig => {
    const data = localStorage.getItem(DB_KEYS.CONFIG);
    if (!data) {
      localStorage.setItem(DB_KEYS.CONFIG, JSON.stringify(INITIAL_CONFIG));
      return INITIAL_CONFIG;
    }
    return JSON.parse(data);
  },
  saveConfig: (config: GlobalConfig) => {
    localStorage.setItem(DB_KEYS.CONFIG, JSON.stringify(config));
  },

  // Combos
  getCombos: (activeOnly = false): Combo[] => {
    const data = localStorage.getItem(DB_KEYS.COMBOS);
    let combos: Combo[] = data ? JSON.parse(data) : INITIAL_COMBOS;
    if (activeOnly) combos = combos.filter(c => c.active);
    return combos;
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

  // Links
  getLinks: (activeOnly = false): ExternalLink[] => {
    const data = localStorage.getItem(DB_KEYS.LINKS);
    let links: ExternalLink[] = data ? JSON.parse(data) : INITIAL_LINKS;
    if (activeOnly) links = links.filter(l => l.active);
    return links.sort((a, b) => a.order - b.order);
  },
  saveLinks: (links: ExternalLink[]) => {
    localStorage.setItem(DB_KEYS.LINKS, JSON.stringify(links));
  },

  // Auth
  isLoggedIn: () => {
    return localStorage.getItem(DB_KEYS.AUTH) === 'true';
  },
  login: (user: string, pass: string) => {
    const config = db.getConfig();
    if (user === config.admin.username && pass === config.admin.password) {
      localStorage.setItem(DB_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem(DB_KEYS.AUTH);
  }
};
