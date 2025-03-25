const OrdersPage = ({ tables }) => {
  console.log("OrdersPage tables:", tables);
  return (
    <div className="order-section">
      <h2>Bestellingen</h2>
      <div className="order-list">
        {/* Map through orders */}
        {tables.filter(t => t.status === 'occupied').map(table => (
          <div key={table.number} className="order">
            <h3>Tafel {table.number}</h3>
            <ul>
              {table.data.orders?.map((order, index) => (
                <li key={index}>
                  {order.quantity}x {order.item}
                  {order.note?.map((note, i) => (
                    <span key={i} className="note">{note}</span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;