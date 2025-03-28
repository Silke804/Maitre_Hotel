import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { menuItems } from '../../data/menuItems';
import { v4 as uuid } from 'uuid';

const OrderPopup = ({ tableId, onClose, onOrderSubmit }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});
  const allMenuItems = menuItems;

  const handleOrderItem = (itemId, quantity) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: {
        quantity: Math.max(0, quantity),
        note: prev[itemId]?.note || ''
      }
    }));
  };

  const handleNoteChange = (itemId, note) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        note: note
      }
    }));
  };

  const handleSubmit = () => {
    const newOrders = Object.entries(selectedItems)
      .filter(([_, { quantity }]) => quantity > 0)
      .map(([itemId, { quantity, note }]) => {
        const menuItem = allMenuItems.find(i => i.id === itemId);
        return menuItem ? {
          id: uuid(),
          tableId: tableId,
          menuItemId: menuItem.id,
          quantity: quantity,
          specialrequests: "",
          total: menuItem.price * quantity,
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: note.trim() ? [note.trim()] : [] // Store note in array so we can have multiple
        } : null;
      })
      .filter(Boolean);

    if (newOrders.length > 0) {
      onOrderSubmit(newOrders);
      navigate('/orders');
    }
    onClose();
  };

  return (
    <div className="order-popup">
      <div className="popup-content">
        <h3>Place Order for Table {tableId}</h3>

        <div className="menu-items-scroll-container">
          <div className="menu-items">
            {allMenuItems.map(item => {
              const currentItem = selectedItems[item.id] || { quantity: 0, note: '' };

              return (
                <div key={item.id} className="menu-item">
                  <div className="item-info">
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <span>€{item.price.toFixed(2)}</span>
                    <small>{item.category}</small>
                  </div>

                  <div className="item-controls">
                    <input
                      type="number"
                      min="0"
                      value={currentItem.quantity}
                      onChange={(e) =>
                        handleOrderItem(item.id, parseInt(e.target.value))
                      }
                      className="quantity-input"
                    />
                  </div>

                  {currentItem.quantity > 0 && (
                    <div className="note-container">
                      <input
                        type="text"
                        placeholder="Special requests..."
                        value={currentItem.note}
                        onChange={(e) => handleNoteChange(item.id, e.target.value)}
                        className="note-input"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="popup-actions">
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn confirm-btn" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;