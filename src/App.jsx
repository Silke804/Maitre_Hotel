import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import { tables as initialTableData } from './data/tables';
import { initialOrders } from './data/orders';
import { initialBills } from './data/bills';
import { menuItems } from './data/menuItems';
import ErrorBoundary from './utils/ErrorBoundary';
import { NotificationsProvider, useNotifications } from './contexts/NotificationsContext';
import { v4 as uuid } from 'uuid';
import './assets/styles/App.css';
import './assets/styles/OrderPopup.css';

function AppContent() {
  const { addNotification } = useNotifications();
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);

  const [tables, setTables] = useState(
    initialTableData.map(table => ({
      ...table,
      // Ensure that icons exists even if empty
      icons: table.icons || [],
    }))
  );

  const [bills, setBills] = useState(
    initialBills.map(bill => ({
      ...bill,
    }))
  );

  const handleTimestampChange = (tableId, newTimestamp) => {
    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId ? { ...table, timestamp: newTimestamp } : table
      )
    );
  };

  const handleNotesChange = (tableId, newNotes) => {
    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId ? { ...table, notes: newNotes } : table
      )
    );
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          ...(newStatus === 'served' && { servedTime: new Date().toISOString() })
        };
        
        // Check if all orders for this table are served
        const tableOrders = prev.filter(o => 
          o.tableId === order.tableId && o.id !== orderId
        );
        
        if (newStatus === 'served' && tableOrders.every(o => o.status === 'served')) {
          setTables(prevTables => prevTables.map(table => 
            table.id === order.tableId ? {
              ...table,
              icons: table.icons.filter(icon => icon !== '📝')
            } : table
          ));
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  const handleStatusChange = (tableId, newStatus) => {
    setTables(prevTables =>
      prevTables.map(table => {
        if (table.id === tableId) {
          const updates = { status: newStatus };

          if (newStatus === 'free') {
            updates.timestamp = '';
            updates.notes = '';
            updates.orders = [];
          } else if (newStatus === 'occupied') {
            updates.timestamp = new Date().toISOString();
          }

          return { ...table, ...updates };
        }
        return table;
      })
    );
  };

  const handleTableClick = tableId => {
    setSelectedTable(tables.find(t => t.id === tableId));
    setIsModalOpen(true);
  };

  const handleCheckout = tableId => {
    const tableOrders = orders.filter(o => o.tableId === tableId);

    const total = tableOrders.reduce((sum, order) => {
      const menuItem = menuItems.find(item => item.id === order.menuItemId);
      return sum + (menuItem?.price || 0) * order.quantity;
    }, 0);

    const newBill = {
      id: uuid(),
      tableId,
      orderIds: tableOrders.map(o => o.id),
      total: Number(total.toFixed(2)),
      paymentMethod: 'cash',
      status: 'paid',
      timestamp: new Date().toISOString(),
    };



    setOrders(prev => prev.filter(order =>
      String(order.tableId) !== String(tableId)
    ));

    setBills([...bills, newBill]);
    setTables(tables.map(t =>
      t.id === tableId ? {
        ...t,
        status: 'free',
        timestamp: '',
        notes: '',
        orders: []
      } : t
    ));
    setIsModalOpen(false);
  };


  const handleOrderSubmit = (tableId, newOrders) => {
    addNotification(`New order received for Table ${tableId}`);
    const table = tables.find(t => t.id === tableId);
  
    const ordersWithStatus = newOrders.map(order => {
      let orderNotes = order.note || [];
  
      // If the birthday icon is active, add the birthday tag
      if (table && table.icons.includes('🎂') && !orderNotes.includes('verjaardag')) {
        orderNotes.push('verjaardag');
      }
      // If the allergy icon is active, add the allergy tag
      if (table && table.icons.includes('⚠️') && !orderNotes.includes('allergie')) {
        orderNotes.push('allergie');
      }
  
      return {
        ...order,
        tableId: tableId,
        status: 'pending',
        note: orderNotes,
      };
    });
  
    
    setOrders(prev => [...prev, ...newOrders]);
    
    // Automatically add '📝' icon if not present
    setTables(prevTables => prevTables.map(table => 
      table.id === tableId ? {
        ...table,
        status: 'occupied',
        icons: [...new Set([...table.icons, '📝'])]
      } : table
    ));
  };


  const handleIconChange = (tableId, icon, isChecked) => {
    setTables(prevTables =>
      prevTables.map(t =>
        t.id === tableId
          ? {
            ...t,
            icons: isChecked
              ? [...new Set([...t.icons, icon])] // Ensure unique
              : t.icons.filter(i => i !== icon)
          }
          : t
      )
    );
  };

  const countBirthdays = () => {
    return tables.filter(table => table.icons.includes('🎂')).length;
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes
          tables={tables}
          orders={orders}
          menuItems={menuItems}
          bills={bills}
          setBills={setBills}
          onTableClick={handleTableClick}
          isModalOpen={isModalOpen}
          selectedTable={selectedTable}
          onClose={() => setIsModalOpen(false)}
          onCheckout={handleCheckout}
          onIconChange={handleIconChange}
          onOrderSubmit={handleOrderSubmit}
          countBirthdays={countBirthdays}
          onStatusChange={handleStatusChange}
          onTimestampChange={handleTimestampChange}
          onNotesChange={handleNotesChange}
          onUpdateStatus={handleUpdateStatus}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <NotificationsProvider>
      <AppContent />
    </NotificationsProvider>
  );
}

export default App;
