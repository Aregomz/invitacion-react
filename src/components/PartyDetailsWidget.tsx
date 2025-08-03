import React from 'react';
import { motion } from 'framer-motion';
import { useInvitationStore } from '../stores/invitationStore';
import { formatEventDate } from '../utils/dateUtils';

export const PartyDetailsWidget: React.FC = () => {
  const { partyDetails, rsvpSubmitted } = useInvitationStore();

  // Solo mostrar si ya confirmaron asistencia
  if (!rsvpSubmitted) {
    return null;
  }

  const details = [
    {
      icon: "📍",
      title: "Dirección",
      value: partyDetails.location
    },
    {
      icon: "📅",
      title: "Fecha",
      value: formatEventDate(partyDetails.date)
    },
    {
      icon: "🕐",
      title: "Hora",
      value: partyDetails.time
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
          DETALLES DEL EVENTO
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {details.map((detail, index) => (
          <motion.div
            key={detail.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="glass-effect rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-4">{detail.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold text-gold mb-3">
              {detail.title}
            </h3>
            <p className="text-white/90 text-lg leading-relaxed">
              {detail.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 