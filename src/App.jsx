import { useState } from 'react';
import Table from './components/Tables/Table';
import TableModal from './components/Tables/TableModal';
import { tables as initialTableData } from './data/tables';

function App() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tables, setTables] = useState(
    Object.keys(initialTableData).map(key => ({
      number: key,
      size: initialTableData[key].size || 2, // Use explicit size
      status: initialTableData[key].status || 'free',
      data: initialTableData[key],
      icons: []
    }))
  );

  const handleTableClick = (tableNumber) => {
    setSelectedTable(tables.find(t => t.number === tableNumber));
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    setTables(tables.map(t => 
      t.number === selectedTable.number ? { ...t, status: 'free' } : t
    ));
    setIsModalOpen(false);
  };

  const handleIconChange = (icon, isChecked) => {
    setTables(tables.map(t => 
      t.number === selectedTable.number 
        ? {
            ...t,
            icons: isChecked 
              ? [...t.icons, icon]
              : t.icons.filter(i => i !== icon)
          }
        : t
    ));
  };

  return (
    <div className="dashboard">
      <div className="tables-grid">
        {tables.map(table => (
          <Table
            key={table.number}
            number={table.number}
            size={table.size}
            status={table.status}
            isNew={table.isNew}
            onTableClick={handleTableClick}
          />
        ))}
      </div>

      <TableModal
        isOpen={isModalOpen}
        tables={selectedTable}
        status={selectedTable?.status}
        onClose={() => setIsModalOpen(false)}
        onCheckout={handleCheckout}
        onIconChange={handleIconChange}
      />
    </div>
  );
}

export default App;