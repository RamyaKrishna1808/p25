export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTimeRemaining = (dueDate: Date | string): { days: number; hours: number; minutes: number; seconds: number; isOverdue: boolean } => {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const now = new Date();
  const diff = due.getTime() - now.getTime();

  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isOverdue: false };
};

export const isOverdue = (dueDate: Date | string): boolean => {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return new Date() > due;
};
