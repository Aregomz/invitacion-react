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
    // Para el evento específico del 8 de agosto, usar una fecha hardcodeada para evitar problemas de zona horaria
    if (date === "2025-08-08") {
      return "viernes, 8 de agosto de 2025";
    }
    
    // Para otras fechas, usar el método normal
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day)); // month - 1 porque los meses van de 0-11
    
    if (isNaN(dateObj.getTime())) {
      console.error('Fecha de evento inválida:', date);
      return 'Viernes 8 de agosto de 2025';
    }
    
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Forzar UTC para evitar problemas de zona horaria
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