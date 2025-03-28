import React, { useState } from 'react';
import OrderColumn from '../components/Orders/OrderColumn';
import '../assets/styles/OrdersPage.css';

const OrdersPage = ({ orders, menuItems, onUpdateStatus }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const getMenuItemName = (id) => {
    const item = menuItems.find(m => m.id === id);
    return item?.name || 'Onbekend item';
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Categorize orders into different status groups
  const categorizedOrders = orders.reduce((acc, order) => {
    if (!acc[order.status]) acc[order.status] = [];
    acc[order.status].push(order);
    return acc;
  }, { pending: [], preparing: [], served: [] });

  // Sort orders by timestamp (oldest first for pending/preparing, newest first for served)
  const sortedOrders = {
    pending: [...categorizedOrders.pending].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    preparing: [...categorizedOrders.preparing].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    served: [...categorizedOrders.served].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  };

  return (
    <div className="orders-page">
      <h1 className="page-title">📋 Bestellingen Overzicht</h1>
      
      <div className="order-columns-container">
        <OrderColumn
          title="In de Keuken"
          orders={sortedOrders.pending}
          status="pending"
          onSelectOrder={handleSelectOrder}
          selectedOrderId={selectedOrderId}
          getMenuItemName={getMenuItemName}
          formatTime={formatTime}
          onUpdateStatus={onUpdateStatus}
          allowedNextStatus="preparing"
          actionLabel="Markeer als Bereid 👨🍳"
        />
        
        <OrderColumn
          title="Klaar voor Ophalen"
          orders={sortedOrders.preparing}
          status="preparing"
          onSelectOrder={handleSelectOrder}
          selectedOrderId={selectedOrderId}
          getMenuItemName={getMenuItemName}
          formatTime={formatTime}
          onUpdateStatus={onUpdateStatus}
          allowedNextStatus="served"
          actionLabel="Markeer als Geserveerd 🚀"
        />
        
        <OrderColumn
          title="Geserveerd"
          orders={sortedOrders.served}
          status="served"
          onSelectOrder={handleSelectOrder}
          selectedOrderId={selectedOrderId}
          getMenuItemName={getMenuItemName}
          formatTime={formatTime}
          onUpdateStatus={onUpdateStatus}
          showTableNumber={true}
        />
      </div>
    </div>
  );
};

export default OrdersPage;