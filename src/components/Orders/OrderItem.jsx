import React from 'react';

const OrderItem = ({
  order,
  isSelected,
  onSelect,
  getMenuItemName,
  formatTime,
  onUpdateStatus,
  allowedNextStatus,
  actionLabel,
  showTableNumber
}) => {
  const handleStatusUpdate = (e) => {
    e.stopPropagation();
    if (onUpdateStatus && allowedNextStatus) {
      onUpdateStatus(order.id, allowedNextStatus);
    }
  };

  return (
    <li
      className={`order-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="order-main">
        <div className="order-meta">
          {showTableNumber && (
            <span className="table-number">Tafel {order.tableId}</span>
          )}
          <span className="quantity">{order.quantity}x</span>
          <span className="item-name">
            {getMenuItemName(order.menuItemId)}
          </span>
        </div>

        <div className="order-timing">
          <span className="order-time">
            Besteld: {formatTime(order.timestamp)}
          </span>
          {order.servedTime && (
            <span className="served-time">
              Geserveerd: {formatTime(order.servedTime)}
            </span>
          )}
        </div>
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

      {isSelected && onUpdateStatus && allowedNextStatus && (
        <button
          className="compact-action-button"
          onClick={handleStatusUpdate}
        >
          {actionLabel}
        </button>
      )}
    </li>
  );
};

export default OrderItem;