import React from 'react';

const OrderItem = ({ order, getMenuItemName, formatTime }) => {
  return (
    <li className="order-item">
      <div className="order-main">
        <span className="quantity">{order.quantity}x</span>
        <span className="item-name">
          {getMenuItemName(order.menuItemId)}
        </span>
        <span className="order-time">
          {formatTime(order.timestamp)}
        </span>
      </div>
      
      {(order.note?.length > 0 || order.specialrequests) && (
        <div className="order-notes">
          {order.specialrequests && (
            <span className="note">{order.specialrequests}</span>
          )}
          {order.note?.map((note, i) => (
            <span key={i} className="note">{note}</span>
          ))}
        </div>
      )}
    </li>
  );
};

export default OrderItem;