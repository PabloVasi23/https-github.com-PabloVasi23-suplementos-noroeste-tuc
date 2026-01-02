
# 🏋️ SuplementosNoroesteTuc - Web Completa con Panel de Administración

Web completa para venta de suplementos nutricionales con **landing pública** y **panel de administración privado**, optimizada para conversiones vía WhatsApp.

## 🎯 Características Principales

### Landing Pública
- ✅ **100% Dinámica** - Datos cargados desde un sistema persistente (Simulado con LocalStorage).
- ✅ **Conversiones por WhatsApp** - Mensajes pre-cargados automáticos.
- ✅ **Diseño Futurista** - Negro/gris oscuro con acentos en verde neón.
- ✅ **Mobile-First** - Totalmente responsive.

### Panel de Administración
- ✅ **Login Seguro** - Autenticación con usuario/contraseña.
- ✅ **Gestión de Combos** - CRUD completo (crear, editar, eliminar).
- ✅ **Gestión de Links** - CRUD de links externos.
- ✅ **Dashboard** - Vista general del sistema.

## 🚀 Acceso al Sistema

### Panel de Administración
URL: `#/admin/login`

**Credenciales por defecto:**
- Usuario: `Pablovasi23`
- Contraseña: `Tucuman1223`

## 📦 Estructura del Proyecto

```
src/
├── App.tsx             # Enrutador y estructura
├── db.ts               # Simulación de persistencia
├── types.ts            # Tipos globales
├── constants.tsx       # Datos iniciales
├── pages/              # Páginas de la app
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── Dashboard.tsx
│   ├── ComboAdmin.tsx
│   └── LinkAdmin.tsx
└── components/         # Componentes compartidos
```

## ⚙️ Configuración

### Cambiar Credenciales de Admin
Edita `constants.tsx`:
```typescript
export const INITIAL_CONFIG = {
  admin: {
    username: "tu-usuario",
    password: "tu-contraseña"
  }
}
```

### Cambiar Número de WhatsApp
Edita `constants.tsx`:
```typescript
export const INITIAL_CONFIG = {
  brand: {
    whatsapp: "543816284867"
  }
}
```

## 🎨 Stack Tecnológico
- **Framework:** React 18+
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **Animaciones:** Framer Motion
- **Persistencia:** LocalStorage (Simulando JSON DB)

---
**Hecho con ❤️ para SuplementosNoroesteTuc**
