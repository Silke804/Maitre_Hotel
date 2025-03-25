const BillItem = ({ bill, onDelete }) => {
  const total = typeof bill.total === 'number' ? bill.total : Number(bill.total);

  return (
    <div className={`bill-item ${bill.status}`}>
      <div className="bill-header">
        <h3>Tafel {bill.tableNumber}</h3>
        <span className={`bill-status ${bill.status}`}>
          {bill.status}
        </span>
      </div>
      <div className="bill-details">
        <p className="bill-time">
          <i className="fas fa-clock"></i> {bill.time}
        </p>
        <p className="bill-total">
          €{total.toFixed(2)}
        </p>
      </div>
      <div className="bill-actions">
        <button className="btn print-btn">
          <i className="fas fa-print"></i> Print
        </button>
        <button className="btn delete-btn" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default BillItem;