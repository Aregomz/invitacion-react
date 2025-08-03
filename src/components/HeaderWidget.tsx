import React from 'react';
import { motion } from 'framer-motion';
import { useInvitationStore } from '../stores/invitationStore';

export const HeaderWidget: React.FC = () => {
  const { partyDetails } = useInvitationStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-gold/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-gold/40 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.h1
          animate={{ 
            textShadow: [
              "0 0 10px #FFD700",
              "0 0 20px #FFD700, 0 0 30px #FFD700",
              "0 0 10px #FFD700"
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center font-elegant text-gold leading-tight break-words mb-8"
        >
          {partyDetails.title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gold-dark">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <span className="font-semibold">{partyDetails.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕐</span>
              <span className="font-semibold">{partyDetails.time}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gold rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
}; 