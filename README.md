# 🎉 Aplicación de Invitación Elegante

Una aplicación web de invitación moderna y elegante construida con React, TypeScript y Tailwind CSS.

## ✨ Características

- **Countdown Timer Animado**: Cuenta regresiva elegante con efectos visuales
- **Diseño Responsivo**: Optimizado para móviles y desktop
- **Animaciones Suaves**: Usando Framer Motion para transiciones profesionales
- **Tema Oscuro Elegante**: Negro con acentos dorados
- **Formulario RSVP**: Sistema de confirmación de asistencia
- **Modal Interactivo**: Para detalles adicionales
- **Tipografía Moderna**: Fuentes elegantes y legibles

## 🚀 Tecnologías Utilizadas

- **React 18** + **TypeScript**
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Zustand** para manejo de estado
- **Vite** como build tool

## 🎨 Diseño Visual

- **Colores**: Negro (#000000), Dorado (#FFD700), Blanco (#FFFFFF)
- **Tipografía**: Playfair Display (elegante), Inter (moderna)
- **Efectos**: Sombras, brillos, transiciones suaves
- **Layout**: Mobile-first, responsive design

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd invitacion

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── CountdownWidget.tsx      # Timer principal
│   ├── HeaderWidget.tsx         # Encabezado con título
│   ├── PartyDetailsWidget.tsx   # Detalles del evento
│   ├── RequirementsWidget.tsx   # Información importante
│   ├── RSVPWidget.tsx          # Botón de confirmación
│   └── DetailsModalWidget.tsx  # Modal con formulario
├── hooks/
│   └── useCountdown.ts         # Hook para countdown
├── stores/
│   └── invitationStore.ts      # Estado global (Zustand)
├── types/
│   └── invitation.ts           # Tipos TypeScript
├── utils/
│   └── dateUtils.ts           # Utilidades de fecha
└── styles/
    └── index.css              # Estilos globales
```

## 🎯 Funcionalidades

### Countdown Timer
- Cuenta regresiva en tiempo real
- Animaciones de pulso y brillo
- Layout responsivo (2x2 en móvil, 1x4 en desktop)
- Efectos visuales elegantes

### Formulario RSVP
- Campos: nombre, email, asistencia, invitados, mensaje
- Validación de formulario
- Estado de confirmación
- Modal interactivo

### Diseño Responsivo
- Mobile-first approach
- Breakpoints optimizados
- Tipografía escalable
- Animaciones adaptativas

## 🎨 Personalización

### Cambiar Fecha del Evento
Edita el archivo `src/stores/invitationStore.ts`:

```typescript
const defaultPartyDetails: PartyDetails = {
  title: "Tu Título",
  date: "2024-12-31", // Cambia aquí
  time: "20:00",       // Y aquí
  // ... resto de configuración
};
```

### Modificar Colores
Edita `tailwind.config.js`:

```javascript
colors: {
  'gold': '#FFD700',      // Dorado principal
  'gold-dark': '#FFA500', // Dorado oscuro
  'gold-light': '#FFF8DC', // Dorado claro
}
```

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm run build
# Subir a Vercel
```

### Netlify
```bash
npm run build
# Subir carpeta dist a Netlify
```

## 📱 Características PWA

- Diseño responsive
- Animaciones optimizadas
- Carga rápida
- SEO friendly

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🎉 ¡Disfruta tu aplicación de invitación elegante!
