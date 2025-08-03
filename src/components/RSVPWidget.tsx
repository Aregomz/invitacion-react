import React from 'react';
import { motion } from 'framer-motion';
import { useInvitationStore } from '../stores/invitationStore';

export const RSVPWidget: React.FC = () => {
  const { setModalOpen, rsvpSubmitted } = useInvitationStore();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        {rsvpSubmitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gold mb-4">
              ¡Confirmación Enviada!
            </h3>
            <p className="text-white/90 text-lg">
              Gracias por confirmar tu asistencia a la despedida.
            </p>
          </motion.div>
        ) : (
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gold mb-4">
              ¿Asistirás a nuestra despedida?
            </h3>
            <p className="text-white/90 text-lg mb-8">
              Confirma tu asistencia para que podamos preparar todo perfectamente para ti en esta celebración especial.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="gold-gradient text-black font-bold py-4 px-8 rounded-full text-lg md:text-xl shadow-2xl hover:shadow-gold/50 transition-all duration-300"
            >
              CONFIRMAR ASISTENCIA
            </motion.button>
            
            <p className="text-white/60 text-sm mt-6">
              💡 Puedes compartir esta invitación, pero todos deben confirmar su asistencia individualmente.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}; 