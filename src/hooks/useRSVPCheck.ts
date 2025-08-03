import { useState, useCallback } from 'react';
import { apiService, type CheckRSVPResponse } from '../services/api';

export const useRSVPCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<CheckRSVPResponse | null>(null);
  const [error, setError] = useState<string>('');

  const checkRSVP = useCallback(async (phone: string) => {
    if (!phone || phone.length !== 10) {
      setError('Número de teléfono inválido');
      return null;
    }

    setIsChecking(true);
    setError('');

    try {
      const result = await apiService.checkRSVP(phone);
      setCheckResult(result);
      return result;
    } catch (err) {
      console.error('Error checking RSVP:', err);
      
      if (err instanceof Error) {
        if (err.message.includes('404')) {
          setError('Usuario no encontrado');
        } else {
          setError('Error al verificar el registro');
        }
      } else {
        setError('Error inesperado');
      }
      
      return null;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const resetCheck = useCallback(() => {
    setCheckResult(null);
    setError('');
  }, []);

  return {
    checkRSVP,
    isChecking,
    checkResult,
    error,
    resetCheck,
    isRegistered: checkResult?.data.isRegistered || false,
    userData: checkResult?.data.user || null,
    events: checkResult?.data.events || []
  };
}; 