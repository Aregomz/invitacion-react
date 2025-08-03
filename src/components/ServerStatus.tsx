import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService, type HealthResponse } from '../services/api';

export const ServerStatus: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await apiService.checkHealth();
        setHealth(response);
        setError('');
      } catch (err) {
        console.error('Error checking server health:', err);
        setError('Error al conectar con el servidor');
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-gold/30 rounded-lg p-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-white/70">Verificando servidor...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-4 right-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-red-400">Servidor no disponible</span>
        </div>
      </motion.div>
    );
  }

  if (health?.success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-4 right-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-xs"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-400">Servidor funcionando</span>
        </div>
      </motion.div>
    );
  }

  return null;
}; 