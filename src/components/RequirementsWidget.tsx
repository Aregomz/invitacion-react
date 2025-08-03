import React from 'react';
import { motion } from 'framer-motion';

export const RequirementsWidget: React.FC = () => {
  const requirements = [
    {
      icon: "🍺",
      title: "Ganas de Pistear",
      description: "Ven con las mejores vibras y ganas de celebrar"
    },
    {
      icon: "🥃",
      title: "Tu Botella Favorita",
      description: "Lleva tu bebida preferida para compartir"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-elegant">
          INFORMACIÓN IMPORTANTE
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {requirements.map((req, index) => (
          <motion.div
            key={req.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="glass-effect rounded-2xl p-6 flex items-start gap-4"
          >
            <div className="text-3xl flex-shrink-0">{req.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">
                {req.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {req.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 