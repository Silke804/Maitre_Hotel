import React from 'react';
import MenuCategory from './MenuCategory';
import { menuItems } from '../data/menuItems';

const Menu = () => {
  // Group items by category
  const groupedCategories = menuItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        items: []
      };
    }
    acc[category].items.push(item);
    return acc;
  }, {});

  const categories = Object.values(groupedCategories);

  return (
    <div className="menu">
      {categories.map((category) => (
        <MenuCategory 
          key={category.name}
          category={category}
        />
      ))}
    </div>
  );
};

export default Menu;