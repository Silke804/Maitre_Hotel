import React from 'react';
import OrderItem from './OrderItem';

const OrderColumn = ({ 
  title, 
  orders, 
  status, 
  getMenuItemName, 
  formatTime, 
  onUpdateStatus, 
  allowedNextStatus, 
  actionLabel,
  showTableNumber = false,
  selectedOrderId,
  onSelectOrder
}) => {
  return (
    <div className={`order-column ${status}`}>
      <div className="column-header">
        <h3>{title}</h3>
        <span className="order-count">{orders.length} items</span>
      </div>
      
      <div className="scrollable-orders">
        {orders.length === 0 ? (
          <div className="empty-column">
            <p>Geen bestellingen</p>
          </div>
        ) : (
          orders.map(order => (
            <OrderItem
              key={order.id}
              order={order}
              isSelected={order.id === selectedOrderId}
              onSelect={() => onSelectOrder(order.id)}
              getMenuItemName={getMenuItemName}
              formatTime={formatTime}
              onUpdateStatus={onUpdateStatus}
              allowedNextStatus={allowedNextStatus}
              actionLabel={actionLabel}
              showTableNumber={showTableNumber}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderColumn;