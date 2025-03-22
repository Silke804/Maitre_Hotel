import { useState } from 'react';
import { initialTables, initialOrders, menuItems } from './data/tables';
import DashboardLayout from './components/Layout/DashboardLayout';
import TableList from './components/Tables/TableList';
import OrderList from './components/Orders/OrderList';
import BillSummary from './components/Bill/BillSummary';

function App() {
  const [tables, setTables] = useState(initialTables);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedTable, setSelectedTable] = useState(null);

  const currentOrder = orders.find(order => 
    order.tableId === selectedTable?.id && !order.paid
  );

  // Add items to order
  const addToOrder = (item) => {
    if (!selectedTable) return;
    
    setOrders(prev => prev.map(order => {
      if (order.tableId === selectedTable.id && !order.paid) {
        return { ...order, items: [...order.items, item] };
      }
      return order;
    }));
  };

  // Mark order as paid
  const markAsPaid = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, paid: true } : order
    ));
    setTables(prev => prev.map(table => 
      table.id === selectedTable.id ? { ...table, status: 'available' } : table
    ));
  };

  return (
    <DashboardLayout>
      <TableList 
        tables={tables} 
        onSelectTable={setSelectedTable} 
        currentOrder={currentOrder}
      />
      
      {selectedTable && (
        <>
          <OrderList 
            order={currentOrder} 
            menuItems={menuItems}
            onAddItem={addToOrder}
          />
          <BillSummary 
            order={currentOrder} 
            onPayment={markAsPaid}
          />
        </>
      )}
    </DashboardLayout>
  );
}

export default App;