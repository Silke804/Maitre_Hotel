import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderPopup from '../Orders/OrderPopup';
import PropTypes from 'prop-types';

const TableModal = ({
  isOpen,
  tableData = {},
  status = 'free',
  onClose,
  onCheckout,
  onIconChange,
  onOrderSubmit
}) => {
  const navigate = useNavigate();
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  if (!tableData || !isOpen) return null;

  const { number = 'N/A', size = 0, time = '', notes = '' } = tableData;
  const totalItems = tableData.orders?.reduce((sum, order) => sum + order.quantity, 0) || 0;

  const handleCheckoutAndNavigate = () => {
    onCheckout();
    navigate('/bills');
  };

  const handleOrderSubmit = (items) => {
    console.log(items);
    console.log(typeof onOrderSubmit);
    if (typeof onOrderSubmit === 'function') {
      console.log('submitting order');
      onOrderSubmit(tableData.number, items);
      onIconChange('📝', true);
    }
    setShowOrderPopup(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <span className="table-number">Tafel {number}</span>
            <span className={`status-badge ${status}`}>{status}</span>
          </h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Grootte</span>
              <span className="info-value">
                <i className="fas fa-users"></i> {size} personen
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Tijd</span>
              <span className="info-value">
                <i className="fas fa-clock"></i> {time || '-'}
              </span>
            </div>
            <div className="info-item full-width">
              <span className="info-label">Opmerkingen</span>
              <span className="info-value notes">
                {notes || 'Geen opmerkingen'}
              </span>
            </div>
            <div className="order-summary">
              <h3>Huidige Bestelling ({totalItems} items)</h3>
              {tableData.orders?.map((order, index) => (
                <div key={index} className="order-line">
                  <span>{order.quantity}x {order.item}</span>
                  <span>€{(order.price * order.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="icon-controls">
            <label className="icon-toggle">
              <input
                type="checkbox"
                onChange={(e) => onIconChange('🎂', e.target.checked)}
              />
              <span className="toggle-button birthday">
                🎂 Verjaardag
              </span>
            </label>
            <label className="icon-toggle">
              <input
                type="checkbox"
                onChange={(e) => onIconChange('⚠️', e.target.checked)}
              />
              <span className="toggle-button allergy">
                ⚠️ Allergie
              </span>
            </label>
            <label className="icon-toggle">
              <input
                type="checkbox"
                checked={tableData.icons?.includes('📝') || false}
                onChange={(e) => onIconChange('📝', e.target.checked)}
              />
              <span className="toggle-button ordered">
                📝  Besteld
              </span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn order-btn"
            onClick={() => setShowOrderPopup(true)}
          >
            <i className="fas fa-utensils"></i> Bestel
          </button>
          <button
            className="checkout-btn"
            onClick={handleCheckoutAndNavigate}
          >
            <i className="fas fa-cash-register"></i> Afrekenen
          </button>
        </div>
      </div>

      {showOrderPopup && (
        <OrderPopup
          tableNumber={number}
          onClose={() => setShowOrderPopup(false)}
          onOrderSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

//type checking
TableModal.propTypes = {
  onOrderSubmit: PropTypes.func.isRequired
};

TableModal.defaultProps = {
  onOrderSubmit: () => console.warn('onOrderSubmit prop not provided')
};

export default TableModal;