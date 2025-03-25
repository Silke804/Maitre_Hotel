import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import TablesPage from './pages/TablesPage';
import OrdersPage from './pages/OrdersPage';
import BillsPage from './pages/BillsPage';
import MenuPage from './pages/MenuPage';

const AppRoutes = ({
  tables,
  bills,
  setBills,
  onTableClick,
  isModalOpen,
  selectedTable,
  onClose,
  onCheckout,
  onIconChange,
  onOrderSubmit,
}) => {
  return (
    <Routes>
      <Route
        element={
          <DashboardLayout
            tables={tables}
          />
        }>
        <Route
          index
          element={
            <TablesPage
              tables={tables}
              onTableClick={onTableClick}
              isModalOpen={isModalOpen}
              selectedTable={selectedTable}
              onClose={onClose}
              onCheckout={onCheckout}
              onIconChange={onIconChange}
              onOrderSubmit={onOrderSubmit}
            />
          }
        />
        <Route
          path="tables"
          element={
            <TablesPage
              tables={tables}
              onTableClick={onTableClick}
              isModalOpen={isModalOpen}
              selectedTable={selectedTable}
              onClose={onClose}
              onCheckout={onCheckout}
              onIconChange={onIconChange}
              onOrderSubmit={onOrderSubmit}
            />
          }
        />
        <Route path="orders" element={<OrdersPage tables={tables} />} />
        <Route
          path="bills"
          element={<BillsPage bills={bills} setBills={setBills} />}
        />
        <Route path="menu" element={<MenuPage />} />
        <Route path="*" element={<Navigate to="/tables" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
