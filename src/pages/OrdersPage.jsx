import React from 'react';
import OrderGroup from '../components/Orders/OrderGroup';
import '../assets/styles/OrdersPage.css';

const OrdersPage = ({ tables, orders, menuItems }) => {
  const getMenuItemName = (id) => {
    const item = menuItems.find(m => m.id === id);
    return item?.name || 'Onbekend item';
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get occupied tables with actual orders
  const occupiedTables = tables.filter(table =>
    table.status === 'occupied' &&
    orders.some(o => o.tableId === table.id)
  );

  return (
    <div className="orders-page">
      <h1 className="page-title">📋 Actieve Bestellingen</h1>

      {occupiedTables.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>Geen actieve bestellingen</p>
        </div>
      ) : (
        <div className="order-list">
          {occupiedTables.map(table => {
            const tableOrders = orders.filter(o => o.tableId === table.id);

            return (
              <div key={table.id} className="order-card">
                <div className="table-header">
                  <div className="table-meta">
                    <span className="table-icon">🍽️</span>
                    <h2 className="table-number">Tafel {table.id}</h2>
                  </div>
                  <span className="order-count">
                    <span className="count">{tableOrders.length}</span>
                    {tableOrders.length === 1 ? ' bestelling' : ' bestellingen'}
                  </span>
                </div>

                <div className="order-groups">
                  {['pending', 'preparing', 'served'].map(status => (
                    <OrderGroup
                      key={status}
                      status={status}
                      orders={tableOrders.filter(o => o.status === status)}
                      getMenuItemName={getMenuItemName}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;