export const formatDate = (date: string): string => {
  try {
    const d = new Date(date);
    
    // Verificar si la fecha es válida
    if (isNaN(d.getTime())) {
      console.error('Fecha inválida:', date);
      return 'Fecha no disponible';
    }
    
    return d.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Fecha no disponible';
  }
};

export const formatEventDate = (date: string): string => {
  try {
    // Asegurar que la fecha esté en formato YYYY-MM-DD
    const dateObj = new Date(date + 'T00:00:00');
    
    if (isNaN(dateObj.getTime())) {
      console.error('Fecha de evento inválida:', date);
      return 'Viernes 8 de agosto de 2025';
    }
    
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formateando fecha del evento:', error);
    return 'Viernes 8 de agosto de 2025';
  }
};

export const formatTime = (time: string): string => {
  try {
    // Si el tiempo viene en formato HH:MM, formatearlo
    if (time.includes(':')) {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}`;
    }
    return time;
  } catch (error) {
    console.error('Error formateando tiempo:', error);
    return time;
  }
};

export const getDaysUntil = (targetDate: string): number => {
  try {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;
    return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
  } catch (error) {
    console.error('Error calculando días:', error);
    return 0;
  }
};

export const isEventPassed = (targetDate: string): boolean => {
  try {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    return target < now;
  } catch (error) {
    console.error('Error verificando si el evento pasó:', error);
    return false;
  }
}; 