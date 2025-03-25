import React, { useState, useEffect  } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes'; // Import the routing configuration
import { tables as initialTableData } from './data/tables';
import { initialOrders } from './data/orders';
import ErrorBoundary from './utils/ErrorBoundary';
import './assets/styles/App.css';
import './assets/styles/OrderPopup.css';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tables, setTables] = useState(
    Object.keys(initialTableData).map(key => ({
      number: key,
      size: initialTableData[key].size || 2,
      status: initialTableData[key].status || 'free',
      data: initialTableData[key],
      icons: [],
    }))
  );
  const [bills, setBills] = useState(
    Object.keys(initialOrders).map(key => ({
      number: key,
      tableNumber: initialOrders[key].tableNumber,
      status: initialOrders[key].status,
      total: initialOrders[key].total,
      time: initialOrders[key].time,
      items: initialOrders[key].items,
      data: initialOrders[key],
    }))
  );

  useEffect(() => {
    console.log('Tables state updated:', tables);
  }, [tables]);

  const handleTableClick = tableNumber => {
    setSelectedTable(tables.find(t => t.number === tableNumber));
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    if (!selectedTable) return;
  
    const calculatedTotal = selectedTable.data.orders.reduce(
      (sum, order) => sum + (order.price * order.quantity),
      0
    );
  
    const newBill = {
      id: Date.now() + Math.random(),
      tableNumber: selectedTable.number,
      total: calculatedTotal, // Use calculated total
      status: 'paid',
      time: new Date().toLocaleTimeString('nl-NL', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: selectedTable.data.orders.map(order => ({
        name: order.item,
        price: order.price,
        quantity: order.quantity
      }))
    };
  
    setTables(tables.map(t =>
      t.number === selectedTable.number ? { ...t, status: 'free' } : t
    ));
    setBills([...bills, newBill]);
    setIsModalOpen(false);
  };

  const handleOrderSubmit = (tableNumber, items) => {
    setTables(prevTables => 
      prevTables.map(table => 
        table.number === tableNumber ? {
          ...table,
          data: {
            ...table.data,
            // Ensure orders exists and is an array
            orders: [...(table.data.orders || []), ...items]
          },
          status: 'occupied',
          icons: [...(table.icons || []), '📝']
        } : table
      )
    );
  };
  

  const handleIconChange = (icon, isChecked) => {
    setTables(prevTables =>
      prevTables.map(t =>
        t.number === selectedTable.number
          ? {
              ...t,
              icons: isChecked
                ? [...t.icons, icon]
                : t.icons.filter(i => i !== icon),
            }
          : t
      )
    );
  };
  

  const countBirthdays = () => {
    return tables.filter((table) => table.icons.includes('🎂')).length;
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes
          tables={tables}
          bills={bills}
          setBills={setBills}
          onTableClick={handleTableClick}
          isModalOpen={isModalOpen}
          selectedTable={selectedTable}
          onClose={() => setIsModalOpen(false)}
          onCheckout={handleCheckout}
          onIconChange={handleIconChange}
          onOrderSubmit={handleOrderSubmit}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
