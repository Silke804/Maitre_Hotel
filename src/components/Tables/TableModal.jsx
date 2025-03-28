import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderPopup from '../Orders/OrderPopup';
import PropTypes from 'prop-types';
import '../../assets/styles/TablesPage.css';
import '../../assets/styles/Table.css';
import { formatTime } from '../../utils/helpers';

const TableModal = ({
  isOpen,
  tables,
  tableId,
  onClose,
  onCheckout,
  onIconChange,
  onOrderSubmit,
  onStatusChange,
  onTimestampChange,
  onNotesChange,
  orders = []
}) => {
  const navigate = useNavigate();
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const tableData = tables.find(t => t.id === tableId) || {};

  if (!tableData || !isOpen) return null;

  const filteredOrders = tableData?.orders
    ? orders.filter(order =>
      tableData.orders.includes(order.id) &&
      order.tableId === tableData.id
    )
    : [];

  const { id, size, timestamp, notes, icons = [], status } = tableData;


  const totalItems = filteredOrders.reduce((sum, order) => sum + order.quantity, 0);

  const handleCheckoutAndNavigate = () => {
    onCheckout(tableData.id);
    navigate('/bills');
  };

  const handleOrderSubmit = (items) => {
    if (typeof onOrderSubmit === 'function') {
      onOrderSubmit(tableData.id, items);
      onIconChange(tableData.id, '📝', true);
    }
    setShowOrderPopup(false);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(tableId, newStatus);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <span className="table-number">Tafel {id}</span>
            <div className="status-controls">
              {['free', 'occupied', 'reserved'].map((statusOption) => (
                <button
                  key={statusOption}
                  className={`status-pill ${status} ${status === statusOption ? 'active' : ''}`}
                  onClick={() => handleStatusChange(statusOption)}
                  disabled={status === statusOption}
                >
                  {statusOption === 'free' && 'Vrij'}
                  {statusOption === 'occupied' && 'Bezet'}
                  {statusOption === 'reserved' && 'Gereserveerd'}
                </button>
              ))}
            </div>
          </h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
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
              <span className="info-label">Starttijd</span>
              <div className="info-value time-input-wrapper">
                {status === 'reserved' ? (
                  <input
                    type="datetime-local"
                    value={timestamp || ''}
                    onChange={(e) => onTimestampChange(tableId, e.target.value)}
                    className="compact-datetime-input"
                  />
                ) : (
                  <div className="time-display">
                    <i className="fas fa-clock"></i>
                    {timestamp ? formatTime(timestamp) : 'Niet ingesteld'}
                  </div>
                )}
              </div>
            </div>
            <div className="info-item full-width">
              <span className="info-label">Opmerkingen</span>
              <textarea
                value={notes || ''}
                onChange={(e) => onNotesChange(tableId, e.target.value)}
                className="notes-input"
                placeholder="Voer opmerkingen in..."
              />
            </div>
            <div className="order-summary">
              <h3>Huidige Bestelling ({totalItems} items)</h3>
              {filteredOrders?.map(order => (
                <div key={order?.id} className="order-line">
                  <span>
                    {order?.quantity || 0}x {order?.menuItemId || 'Unknown Item'}
                  </span>
                  <span>
                    €{(order?.total * order?.quantity || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="icon-controls">
            <label className="icon-toggle">
              <input
                type="checkbox"
                checked={icons.includes('🎂')}
                onChange={(e) => onIconChange(tableId, '🎂', e.target.checked)}
              />
              <span className="toggle-button birthday">🎂 Verjaardag</span>
            </label>
            <label className="icon-toggle">
              <input
                type="checkbox"
                checked={icons.includes('⚠️')}
                onChange={(e) => onIconChange(tableId, '⚠️', e.target.checked)}
              />
              <span className="toggle-button allergy">⚠️ Allergie</span>
            </label>
            <label className="icon-toggle">
              <input
                type="checkbox"
                checked={icons.includes('📝')}
                onChange={(e) => onIconChange(tableId, '📝', e.target.checked)}
              />
              <span className="toggle-button ordered">📝 Besteld</span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn order-btn" onClick={() => setShowOrderPopup(true)}>
            <i className="fas fa-utensils"></i> Bestel
          </button>
          <button className="checkout-btn" onClick={handleCheckoutAndNavigate}>
            <i className="fas fa-cash-register"></i> Afrekenen
          </button>
        </div>
      </div>

      {showOrderPopup && (
        <OrderPopup
          tableId={id}
          onClose={() => setShowOrderPopup(false)}
          onOrderSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
};

TableModal.propTypes = {
  tables: PropTypes.array.isRequired,
  onOrderSubmit: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  onIconChange: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onTimestampChange: PropTypes.func.isRequired,
  onNotesChange: PropTypes.func.isRequired,
};

TableModal.defaultProps = {
  onOrderSubmit: () => console.warn('onOrderSubmit prop not provided'),
  onIconChange: () => console.warn('onIconChange prop not provided'),
  onCheckout: () => console.warn('onCheckout prop not provided'),
  onStatusChange: () => console.warn('onStatusChange prop not provided'),
  onTimestampChange: () => console.warn('onTimestampChange prop not provided'),
  onNotesChange: () => console.warn('onNotesChange prop not provided'),
};

export default TableModal;