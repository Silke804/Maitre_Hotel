import { useState } from 'react';
import BillItem from '../components/Bills/BillItem';

const BillsPage = ({ bills, setBills }) => {
  return (
    <div className="bills-page">
      <h2 className="page-title">Rekeningen</h2>
      <div className="bills-list">
        {bills.map((bill, index) => (
          <BillItem
            key={`${bill.id}-${index}`}
            bill={bill}
            onDelete={() => setBills(bills.filter(b => b.id !== bill.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default BillsPage;