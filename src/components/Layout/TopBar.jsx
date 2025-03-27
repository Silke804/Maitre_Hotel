import { useNotifications } from '../../contexts/NotificationsContext';
import '../../assets/styles/TopBar.css';

const TopBar = () => {
  const { 
    unreadCount, 
    markAsRead, 
    showNotifications, 
    setShowNotifications,
    notifications,
    setNotifications
  } = useNotifications();

  const handleToggleNotifications = () => {
    if (!showNotifications) markAsRead();
    setShowNotifications(!showNotifications);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <header className="topbar">
      <h1 className="topbar-title">Dashtaurant</h1>
      <div className="topbar-right">
        <div className="notification-container">
          <div 
            className="notification-badge-container" 
            onClick={handleToggleNotifications}
          >
            <span className="notification-icon">🔔</span>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>
          
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3 className="notifications-title">Notifications</h3>
                <div className="notifications-controls">
                  <button 
                    className="close-button"
                    onClick={() => setShowNotifications(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="notification-item empty">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className="notification-item"
                    >
                      <div className="notification-content">
                        <div className="notification-meta">
                          <span className="notification-time">
                            {new Date(notification.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="notifications-footer">
                  <button 
                    className="clear-all-button"
                    onClick={handleClearAll}
                  >
                    Clear All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="user-profile">
          <div className="profile-icon">👤</div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;