import { useState } from 'react';
import MenuItem from '../components/Menu/MenuItem.jsx';
import { menuItems } from '../data/menuItems';

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use the flat menuItems array directly.
  const allItems = menuItems;

  // Filter items based on the search term.
  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="menu-grid">
        {filteredItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
