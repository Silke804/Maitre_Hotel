import React from 'react';

const StatusBar = ({ tables, orders }) => {
  // Occupied tables count
  const occupiedCount = tables.filter(table => table.status === 'occupied').length;
  const totalTables = tables.length;

  // Orders in preparation (status: pending/preparing)
  const ordersInPreparation = orders.filter(order => 
    ['pending', 'preparing'].includes(order.status)
  ).length;

  // Birthdays (using table notes instead of icons)
  const birthdaysToday = tables.filter(table => 
    table.notes?.toLowerCase().includes('verjaardag')
  ).length;

  return (
    <div className="status-bar">
      <div className="status-item">
        <span>🪑 Bezet: {occupiedCount}/{totalTables}</span>
      </div>
      <div className="status-item">
        <span>⏳ Orders in bewerking: {ordersInPreparation}</span>
      </div>
      <div className="status-item">
        <span>🎂 Verjaardagen: {birthdaysToday}</span>
      </div>
    </div>
  );
};

export default StatusBar;