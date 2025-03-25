import React from 'react';

const MenuItem = ({ item }) => {
  const price = typeof item.price === 'number' ? item.price.toFixed(2) : '0.00';

  return (
    <div className="menu-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        {item.isVegetarian && <span className="veg-badge">🌱 Vegetarisch</span>}
      </div>
      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        <div className="item-details">
          <span className="price">€{price}</span>
          <div className="dietary">
            {item.isSpicy && <span className="dietary-tag spicy">🌶️ Pittig</span>}
            {item.isGlutenFree && <span className="dietary-tag gluten-free">🌾 Glutenvrij</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
