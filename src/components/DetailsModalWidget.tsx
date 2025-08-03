import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInvitationStore } from '../stores/invitationStore';
import { formatDate } from '../utils/dateUtils';
import html2canvas from 'html2canvas';
import { apiService } from '../services/api';

interface FormData {
  name: string;
  phone: string;
}

export const DetailsModalWidget: React.FC = () => {
  const { isModalOpen, setModalOpen, setRSVPSubmitted, partyDetails } = useInvitationStore();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormData>({
    name: '',
    phone: ''
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const detailsRef = useRef<HTMLDivElement>(null);

  const validateName = (name: string): string => {
    if (!name.trim()) return 'El nombre es requerido';
    if (/\d/.test(name)) return 'El nombre no puede contener números';
    if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return 'El celular es requerido';
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) return 'El celular debe tener exactamente 10 dígitos';
    return '';
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitError(''); // Limpiar errores al escribir
    
    // Validar en tiempo real
    if (field === 'name') {
      setErrors(prev => ({ ...prev, name: validateName(value) }));
    } else if (field === 'phone') {
      setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    
    setErrors({
      name: nameError,
      phone: phoneError
    });

    if (!nameError && !phoneError) {
      setIsSubmitting(true);
      setSubmitError('');

      try {
        // Enviar datos al backend
        const response = await apiService.submitRSVP({
          name: formData.name.trim(),
          phone: formData.phone.replace(/\s/g, '')
        });

        console.log('RSVP submitted successfully:', response);
        setIsConfirmed(true);
        setRSVPSubmitted(true);
      } catch (error) {
        console.error('Error submitting RSVP:', error);
        
        // Manejar diferentes tipos de errores
        if (error instanceof Error) {
          if (error.message.includes('409')) {
            setSubmitError('Este número de teléfono ya está registrado');
          } else if (error.message.includes('400')) {
            setSubmitError('Datos inválidos. Por favor verifica la información');
          } else {
            setSubmitError('Error al enviar la confirmación. Por favor intenta de nuevo');
          }
        } else {
          setSubmitError('Error inesperado. Por favor intenta de nuevo');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setIsConfirmed(false);
    setFormData({ name: '', phone: '' });
    setErrors({ name: '', phone: '' });
    setSubmitError('');
  };

  const captureScreenshot = async () => {
    if (!detailsRef.current) return;
    
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(detailsRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      // Crear un enlace para descargar la imagen
      const link = document.createElement('a');
      link.download = `detalles-despedida-${partyDetails.date}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error al capturar screenshot:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-black/90 backdrop-blur-md border-2 border-gold/30 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isConfirmed ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gold mb-2">
                    Confirmar Asistencia
                  </h3>
                  <p className="text-white/80 text-sm">
                    Completa el formulario para confirmar tu participación
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gold font-semibold mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gold/30 focus:border-gold'
                      }`}
                      placeholder="Tu nombre completo"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gold font-semibold mb-2">
                      Número de Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gold/30 focus:border-gold'
                      }`}
                      placeholder="10 dígitos (ej: 5512345678)"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 gold-gradient text-black font-bold rounded-lg disabled:opacity-50"
                    >
                      {isSubmitting ? 'Enviando...' : 'Confirmar'}
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gold mb-6">
                  ¡Confirmación Enviada!
                </h3>
                
                <div ref={detailsRef} className="space-y-4 mb-6">
                  <div className="glass-effect rounded-xl p-4">
                    <div className="text-2xl mb-2">📍</div>
                    <h4 className="text-gold font-semibold mb-1">Dirección</h4>
                    <p className="text-white/90 text-sm">{partyDetails.location}</p>
                  </div>
                  
                  <div className="glass-effect rounded-xl p-4">
                    <div className="text-2xl mb-2">📅</div>
                    <h4 className="text-gold font-semibold mb-1">Fecha</h4>
                    <p className="text-white/90 text-sm">{formatDate(partyDetails.date)}</p>
                  </div>
                  
                  <div className="glass-effect rounded-xl p-4">
                    <div className="text-2xl mb-2">🕐</div>
                    <h4 className="text-gold font-semibold mb-1">Hora</h4>
                    <p className="text-white/90 text-sm">{partyDetails.time}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={captureScreenshot}
                    disabled={isCapturing}
                    className="flex-1 px-6 py-3 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors disabled:opacity-50"
                  >
                    {isCapturing ? '📸 Capturando...' : '📸 Guardar Detalles'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 gold-gradient text-black font-bold rounded-lg"
                  >
                    Cerrar
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 