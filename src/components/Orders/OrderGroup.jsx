import React from 'react';
import OrderItem from './OrderItem';

const OrderGroup = ({ status, orders, getMenuItemName, formatTime }) => {
  const statusText = {
    pending: '⏱ In afwachting',
    preparing: '👨🍳 In bereiding',
    served: '✅ Geserveerd'
  };

  if (orders.length === 0) return null;

  return (
    <div className={`order-group ${status}`}>
      <h4 className="status-header">{statusText[status]}</h4>
      <ul>
        {orders.map(order => (
          <OrderItem
            key={order.id}
            order={order}
            getMenuItemName={getMenuItemName}
            formatTime={formatTime}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderGroup;