import React from 'react';

const StatusBar = ({ tables }) => {
  const occupiedCount = tables.filter(table => table.status === 'occupied').length;
  const totalTables = tables.length;

  const ordersInPreparation = tables.reduce((total, table) => {
    if (table.status === 'occupied' && table.data.orders && Array.isArray(table.data.orders)) {
      return total + table.data.orders.length;
    }
    return total;
  }, 0);

  const birthdaysToday = tables.filter((table) => table.icons.includes('🎂')).length;

  return (
    <div className="status-bar">
      <div className="status-item">
        <span>🪑 Bezet: {occupiedCount}/{totalTables}</span>
      </div>
      <div className="status-item">
        <span>⏳ Wachtende bestellingen: {ordersInPreparation}</span>
      </div>
      <div className="status-item">
        <span>🎂 Verjaardagen vandaag: {birthdaysToday}</span>
      </div>
    </div>
  );
};

export default StatusBar;
