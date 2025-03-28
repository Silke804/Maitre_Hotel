import { useState } from 'react';
import MenuCategory from '../components/Menu/MenuCategory.jsx';
import { menuItems } from '../data/menuItems';

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on the search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered items by category
  const groupedCategories = filteredItems.reduce((acc, item) => {
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
    <div className="menu-page">
      <div className="menu-header">
        <h2 className="page-title">Menu</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Zoek gerecht..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="menu">
        {categories.map((category) => (
          <MenuCategory 
            key={category.name}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;