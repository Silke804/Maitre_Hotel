import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/MenuItem.css';

const MenuItem = ({ item }) => {
  // Formatting
  const formattedPrice = item.price.toLocaleString('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  });

  return (
    <div className={`menu-item ${!item.available ? 'unavailable' : ''}`}>
      <div className="item-image">
        <img 
          src={process.env.PUBLIC_URL + item.image} 
          alt={item.description || item.name}
          loading="lazy"
        />
        {item.isVegetarian && (
          <span className="dietary-badge veg">🌱 Vegetarisch</span>
        )}
        {!item.available && (
          <span className="availability-badge">Niet beschikbaar</span>
        )}
      </div>
      
      <div className="item-info">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <span className="item-price">{formattedPrice}</span>
        </div>
        
        {item.description && item.description !== item.name && (
          <p className="item-description">{item.description}</p>
        )}

        <div className="dietary-tags">
          {item.isSpicy && (
            <span className="tag spicy">
              🌶️ Pittig
            </span>
          )}
          {item.isGlutenFree && (
            <span className="tag gluten-free">
              🌾 Glutenvrij
            </span>
          )}
          {item.category === 'drank' && (
            <span className="tag drink">
              🥤 Drank
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isVegetarian: PropTypes.bool,
    isSpicy: PropTypes.bool,
    isGlutenFree: PropTypes.bool,
    available: PropTypes.bool
  }).isRequired
};

export default MenuItem;