import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/CheckoutPopup.css';

const CheckoutPopup = ({ orders, totalPrice, onConfirm, onCancel, menuItems }) => {
  return (
    <div className="checkout-popup-overlay">
      <div className="checkout-popup-container">
        <h2>Bestelling Overzicht</h2>
        <div className="checkout-summary">
          {orders.map(order => {
            const menuItem = menuItems.find(item => item.id === order.menuItemId);
            const itemName = menuItem?.name || 'Onbekend Item';
            const itemPrice = menuItem?.price || 0;

            return (
              <div key={order.id} className="checkout-order-line">
                <span>
                  {order.quantity}x {itemName}
                </span>
                <span>
                  €{(itemPrice * order.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
          <div className="checkout-total">
            <strong>Totaal: €{totalPrice.toFixed(2)}</strong>
          </div>
        </div>
        <div className="checkout-actions">
          <button className="btn confirm-btn" onClick={onConfirm}>
            Bevestigen
          </button>
          <button className="btn cancel-btn" onClick={onCancel}>
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
};

CheckoutPopup.propTypes = {
  orders: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired, // Added prop type
};

export default CheckoutPopup;