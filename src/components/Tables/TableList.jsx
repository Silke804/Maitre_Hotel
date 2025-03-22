const TableList = ({ tables, onSelectTable, currentOrder }) => {
    return (
      <div className="tables-grid">
        {tables.map(table => (
          <div 
            key={table.id}
            className={`table ${table.status}`}
            onClick={() => onSelectTable(table)}
          >
            <h3>Table {table.id}</h3>
            <p>Status: {table.status}</p>
            {currentOrder?.tableId === table.id && (
              <div className="order-indicator">Active Order</div>
            )}
          </div>
        ))}
      </div>
    );
  };