import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../utils/helpers';


const BillItem = ({ bill, onDelete }) => {
  return (
    <div className={`bill-item ${bill.status}`}>
      <div className="bill-header">
        <h3>Tafel {bill.tableId}</h3>
        <span className={`bill-status ${bill.status}`}>
          {bill.status}
        </span>
      </div>
      <div className="bill-details">
        <p className="bill-time">
          <i className="fas fa-clock"></i> {formatTime(bill.timestamp)}
        </p>
        <p className="bill-total">
          €{bill.total.toFixed(2)}
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

BillItem.propTypes = {
  bill: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BillItem;