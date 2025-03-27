import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import { tables as initialTableData } from './data/tables';
import { initialOrders } from './data/orders';
import { initialBills } from './data/bills';
import { menuItems } from './data/menuItems';
import ErrorBoundary from './utils/ErrorBoundary';
import { NotificationsProvider,useNotifications  } from './contexts/NotificationsContext';
import { v4 as uuid } from 'uuid';
import './assets/styles/App.css';
import './assets/styles/OrderPopup.css';

function AppContent() {
  const { addNotification } = useNotifications(); // Now this works correctly
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

  const handleTableClick = tableId => {
    setSelectedTable(tables.find(t => t.id === tableId));
    setIsModalOpen(true);
  };

  const handleCheckout = tableId => {
    const tableOrders = orders.filter(o => o.tableId === tableId);
    const total = tableOrders.reduce((sum, order) => sum + order.total, 0);

    const newBill = {
      id: uuid(),
      tableId,
      orderIds: tableOrders.map(o => o.id),
      total,
      paymentMethod: 'cash',
      status: 'paid',
      timestamp: new Date().toISOString(),
    };

    setBills([...bills, newBill]);
    setTables(tables.map(t =>
      t.id === tableId ? {
        ...t,
        status: 'free',
        timestamp: '',       // Reset timestamp
        notes: '',           // Reset notes
        orders: []           // Clear orders
      } : t
    ));
    setIsModalOpen(false);
  };


  const handleOrderSubmit = (tableId, newOrders) => {
    addNotification(`New order received for Table ${tableId}`);
    setOrders(prev => [...prev, ...newOrders]);

    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId
          ? {
            ...table,
            status: 'occupied',
            icons: [...new Set([...table.icons, '📝'])],
          }
          : table
      )
    );
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
          />
        </BrowserRouter>
      </ErrorBoundary>
  );
}

// Main App component that provides the context
function App() {
  return (
    <NotificationsProvider>
      <AppContent />
    </NotificationsProvider>
  );
}

export default App;
