import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Dashtaurant</h3>
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink 
            to="/tables" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-utensils"></i>
            <span>Tafels</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/orders" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-clipboard-list"></i>
            <span>Bestellingen</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/bills" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-receipt"></i>
            <span>Rekeningen</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-book-open"></i>
            <span>Menu</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;