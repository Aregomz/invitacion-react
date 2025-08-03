import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { useInvitationStore } from '../stores/invitationStore';

interface TimeCardProps {
  value: string;
  label: string;
  index: number;
}

const TimeCard: React.FC<TimeCardProps> = ({ value, label, index }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0, y: 50 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.8, 
      delay: index * 0.2,
      ease: "easeOut"
    }}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="flex-1 p-6 bg-black/40 backdrop-blur-sm border-2 border-gold/30 rounded-2xl shadow-2xl card-hover"
  >
    <div className="text-center">
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          textShadow: [
            "0 0 5px #FFD700",
            "0 0 20px #FFD700, 0 0 30px #FFD700",
            "0 0 5px #FFD700"
          ]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-gold mb-3 font-elegant"
      >
        {value}
      </motion.div>
      <div className="text-sm md:text-base lg:text-lg text-gold-dark font-semibold uppercase tracking-wider">
        {label}
      </div>
    </div>
  </motion.div>
);

export const CountdownWidget: React.FC = () => {
  const { partyDetails } = useInvitationStore();
  const { days, hours, minutes, seconds } = useCountdown(partyDetails.date + 'T' + partyDetails.time + ':00');

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-elegant">
          CUENTA REGRESIVA
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto rounded-full"></div>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <TimeCard 
          value={days.toString().padStart(2, '0')} 
          label="DÍAS" 
          index={0} 
        />
        <TimeCard 
          value={hours.toString().padStart(2, '0')} 
          label="HORAS" 
          index={1} 
        />
        <TimeCard 
          value={minutes.toString().padStart(2, '0')} 
          label="MINUTOS" 
          index={2} 
        />
        <TimeCard 
          value={seconds.toString().padStart(2, '0')} 
          label="SEGUNDOS" 
          index={3} 
        />
      </div>
    </div>
  );
}; 