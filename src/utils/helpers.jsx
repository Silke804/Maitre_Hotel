export const calculateTimeSpent = (timestamp) => {
  if (!timestamp) return "";
  const now = new Date();
  const [startHour, startMinute] = timestamp.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0);

  const diff = Math.floor((now - startDate) / (1000 * 60));
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}u ${minutes}min`;
};

export const formatOrders = (orders) => {
  return orders.map(order => ({
    ...order,
    note: Array.isArray(order.note) ? order.note : [order.note]
  }));
};


// Helper to format time duration
export const formatDuration = (timestamp) => {
  const start = new Date(`2023-01-01T${timestamp}`);
  const now = new Date();
  const diff = now - start;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
};

// Format currency display
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);


export const getOccupiedDuration = (timestamp) => {
  const [hours, minutes] = timestamp.split(':');
  const occupiedDate = new Date();
  occupiedDate.setHours(hours, minutes, 0, 0);

  const diff = new Date() - occupiedDate;
  const hoursDiff = Math.floor(diff / 3600000);
  const minutesDiff = Math.floor((diff % 3600000) / 60000);

  return `${hoursDiff}h ${minutesDiff}m`;
};

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit'
  });
};