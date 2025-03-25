import { useState } from 'react';
import { menuItems } from '../../data/menuItems';

const OrderPopup = ({ tableNumber, onClose, onOrderSubmit }) => {
    const [selectedItems, setSelectedItems] = useState({});

    const allMenuItems = menuItems.flatMap(category => category.items);

    const handleOrderItem = (itemId, quantity) => {
        if (!validateMenuItem(itemId)) return;

        setSelectedItems(prev => ({
            ...prev,
            [itemId]: Math.max(0, quantity) // Ensure non-negative
        }));
    };

    const validateMenuItem = (itemId) => {
        const item = allMenuItems.find(i => i.id === parseInt(itemId));
        if (!item) {
            console.warn(`Invalid menu item ID: ${itemId}`);
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        const orderItems = Object.entries(selectedItems)
            .filter(([_, qty]) => qty > 0)
            .map(([itemId, qty]) => {
                const item = allMenuItems.find(i => i.id === parseInt(itemId));

                if (!item) {
                    console.error(`Menu item with ID ${itemId} not found`);
                    return null;
                }

                return {
                    item: item.name,
                    price: item.price,
                    quantity: qty,
                    note: []
                };
            })
            .filter(Boolean); // Remove any null entries

        if (orderItems.length > 0) {
            onOrderSubmit(orderItems);
        }
        onClose();
    };

    return (
        <div className="order-popup">
            <div className="popup-content">
                <h3>Bestelling plaatsen voor Tafel {tableNumber}</h3>

                <div className="menu-items">
                    {menuItems.map(category => (
                        <div key={category.name} className="menu-category">
                            <h4 className="category-title">{category.name}</h4>
                            {category.items.map(item => (
                                <div key={item.id} className="menu-item">
                                    <div className="item-info">
                                        <h5>{item.name}</h5>
                                        <p>{item.description}</p>
                                        <span>€{item.price.toFixed(2)}</span>
                                    </div>
                                    <div className="item-controls">
                                        <input
                                            type="number"
                                            min="0"
                                            value={selectedItems[item.id] || 0}
                                            onChange={(e) =>
                                                handleOrderItem(
                                                    item.id,
                                                    Math.max(0, parseInt(e.target.value) || 0)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="popup-actions">
                    <button
                        className="btn cancel-btn"
                        onClick={onClose}
                    >
                        Annuleren
                    </button>
                    <button
                        className="btn confirm-btn"
                        onClick={handleSubmit}
                    >
                        Plaats Bestelling
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPopup;