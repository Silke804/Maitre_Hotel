import React from 'react';
import MenuCategory from './MenuCategory';
import { menuItems } from '../data/menuItems'; // Assuming your data is exported from here

const Menu = () => {
  return (
    <div className="menu">
      {menuItems.map((category, index) => (
        <MenuCategory key={index} category={category} />
      ))}
    </div>
  );
};

export default Menu;
