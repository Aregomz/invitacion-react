import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface VideoWidgetProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  description?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const VideoWidget: React.FC<VideoWidgetProps> = ({ 
  videoUrl = "/videos/despedida-video.mp4",
  posterUrl = "/videos/despedida-poster.jpg",
  title = "mira a eli",
  description = "",
  showControls = true,
  autoPlay = false,
  muted = true,
  loop = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-5xl mx-auto px-6"
    >
      <div className="text-center mb-8">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-gold mb-4"
        >
          {title}
        </motion.h3>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"
        ></motion.div>
      </div>
      
              <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/30 bg-black/20 backdrop-blur-sm"
          whileHover={{ scale: 1.01 }}
        >
        {/* Efecto de brillo dorado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-shimmer pointer-events-none z-10"></div>
        
        {/* Controles personalizados */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 z-20">
          <span className="text-gold text-sm font-semibold">
            {isPlaying ? '▶️' : '⏸️'} Video
          </span>
        </div>
        
        <video
          className="w-full h-auto max-h-[500px] object-cover"
          controls={showControls}
          poster={posterUrl}
          preload="metadata"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Tu navegador no soporta el elemento de video.
        </video>
        
        {/* Overlay decorativo */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 z-20">
          <span className="text-gold text-sm font-semibold">🎬</span>
        </div>
      </motion.div>
      
             {/* Información adicional */}
       {description && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="text-center mt-6"
         >
           <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
             {description}
           </p>
         </motion.div>
       )}
      
      {/* Indicadores de estado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex justify-center items-center gap-4 mt-6"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
          <span className="text-white/60 text-xs">Video HD</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gold rounded-full"></div>
          <span className="text-white/60 text-xs">Reproducción automática</span>
        </div>
      </motion.div>
    </motion.div>
  );
}; 