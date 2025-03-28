import Table from '../components/Tables/Table';
import TableModal from '../components/Tables/TableModal';
import '../assets/styles/TablesPage.css';
import '../assets/styles/Table.css';

const TablesPage = ({
  tables,
  onTableClick,
  isModalOpen,
  selectedTable,
  onClose,
  onCheckout,
  onIconChange,
  onOrderSubmit,
  onStatusChange,
  onTimestampChange,
  onNotesChange,
  orders,
  menuItems
}) => {
  return (
    <div className="tables-page">
      <h1 className="tables-header">Tafels</h1>
      <div className="tables-grid">
        {tables.map((table) => (
          <Table
            key={table.id}
            id={table.id}
            size={table.size}
            status={table.status}
            orders={orders.filter(order => 
              String(order.tableId) === String(table.id)
            )}
            timestamp={table.timestamp}
            notes={table.notes}
            icons={table.icons}
            onTableClick={onTableClick}
          />
        ))}
      </div>

      {isModalOpen && selectedTable && (
        <TableModal
          isOpen={isModalOpen}
          onClose={onClose}
          onCheckout={onCheckout}
          onIconChange={onIconChange}
          onOrderSubmit={onOrderSubmit}
          onStatusChange={onStatusChange}
          tables={tables}
          tableId={selectedTable?.id}
          onTimestampChange={onTimestampChange}
          onNotesChange={onNotesChange}
          orders={orders}
          menuItems={menuItems}
        />
      )}
    </div>
  );
};

export default TablesPage;