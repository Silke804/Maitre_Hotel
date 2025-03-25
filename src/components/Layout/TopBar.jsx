const TopBar = () => {
    return (
      <header className="topbar">
        <h1 className="topbar-title">Dashtaurant</h1>
        <div className="topbar-right">
          <span className="notification">
            <span className="notification-badge">3</span>
            🔔
          </span>
          <div className="user-profile">
            <div className="profile-icon">👤</div>
          </div>
        </div>
      </header>
    );
  };
  
  export default TopBar;