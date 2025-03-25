import Table from '../components/Tables/Table';
import TableModal from '../components/Tables/TableModal';

const TablesPage = ({
  tables,
  onTableClick,
  isModalOpen,
  selectedTable,
  onClose,
  onCheckout,
  onIconChange,
  onOrderSubmit
}) => {
  return (
    <div className="tables-page">
      <div className="restaurant-grid">
        {tables.map(table => (
          <Table
            key={table.number}
            number={table.number}
            size={table.size}
            status={table.status}
            isNew={table.isNew}
            icons={table.icons}
            onTableClick={onTableClick}
          />
        ))}
      </div>

      <TableModal
        isOpen={isModalOpen}
        tableData={selectedTable}
        status={selectedTable?.status}
        onClose={onClose}
        onCheckout={onCheckout}
        onIconChange={onIconChange}
        onOrderSubmit={onOrderSubmit}
      />
    </div>
  );
};

export default TablesPage;