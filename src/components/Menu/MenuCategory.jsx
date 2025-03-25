import React from 'react';
import MenuItem from './MenuItem';

const MenuCategory = ({ category }) => {
  return (
    <section className="menu-category">
      <h2>{category.name}</h2>
      <div className="menu-items">
        {category.items.map(item => (
          // Use category name with item.id to ensure uniqueness
          <MenuItem key={`${category.name}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuCategory;

