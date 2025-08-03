# 📹 Videos del Proyecto

## 📁 Ubicación de Archivos
Los videos deben colocarse en esta carpeta: `public/videos/`

## 🎬 Archivos Requeridos

### Video Principal
- **Nombre**: `despedida-video.mp4`
- **Formato**: MP4 (recomendado)
- **Tamaño**: Máximo 50MB para mejor rendimiento
- **Resolución**: 1280x720 o 1920x1080

### Imagen de Portada (Opcional)
- **Nombre**: `despedida-poster.jpg`
- **Formato**: JPG o PNG
- **Tamaño**: 1280x720 píxeles
- **Función**: Se muestra antes de reproducir el video

## 📋 Formatos Soportados
- ✅ **MP4** (recomendado)
- ✅ **WebM**
- ✅ **OGG**

## 🔧 Configuración

### Para usar tu propio video:
1. Coloca tu archivo de video en esta carpeta
2. Renómbralo a `despedida-video.mp4`
3. (Opcional) Agrega una imagen de portada como `despedida-poster.jpg`

### Para cambiar el nombre del archivo:
Edita `src/App.tsx` y modifica:
```typescript
<VideoWidget 
  videoUrl="/videos/tu-video.mp4"
  posterUrl="/videos/tu-poster.jpg"
  // ... otras propiedades
/>
```

## ⚡ Optimización
- **Comprime el video** antes de subirlo
- **Usa formatos modernos** como H.264 para MP4
- **Mantén archivos pequeños** para carga rápida
- **Considera usar CDN** para videos grandes

## 🎯 Ejemplo de Estructura
```
public/videos/
├── despedida-video.mp4    # Video principal
├── despedida-poster.jpg   # Imagen de portada
└── README.md             # Este archivo
``` 