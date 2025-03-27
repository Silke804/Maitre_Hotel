import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';

const DashboardLayout = ({ tables, orders }) => {
  return (
    <div className="dashboard-layout">
      <TopBar />
      <div className="main-container">
        <Sidebar />
        <main className="content-area">
          <StatusBar  
            tables={tables}
            orders={orders}
          />
          <Outlet /> {/* Replace children with Outlet */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;