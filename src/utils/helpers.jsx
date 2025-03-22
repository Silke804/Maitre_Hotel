export const calculateTimeSpent = (startTime) => {
    if (!startTime) return "";
    const now = new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
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