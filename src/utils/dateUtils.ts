export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time: string): string => {
  return time;
};

export const getDaysUntil = (targetDate: string): number => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;
  return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
};

export const isEventPassed = (targetDate: string): boolean => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  return target < now;
}; 