import React from 'react';

const StatusBar = ({ tables, orders }) => {
  const occupiedCount = tables.filter(table => table.status === 'occupied').length;
  const totalTables = tables.length;

  const ordersInPreparation = orders.filter(order => 
    ['pending', 'preparing'].includes(order.status)
  ).length;


  const birthdaysToday = tables.filter(table => 
    table.icons.includes('🎂')
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