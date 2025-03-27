import { formatDuration } from '../../utils/helpers';
import PropTypes from 'prop-types';
import '../../assets/styles/TablesPage.css';
import '../../assets/styles/Table.css';
import { formatTime } from '../../utils/helpers';

const Table = ({ id, size, orders = [], timestamp, notes, icons = [], status, onTableClick }) => {
  return (
    <div
      className={`table ${status}`}
      onClick={() => onTableClick(id)}
      data-size={size}
    >
      <div className="number">#{id}</div>
      
      <div className="status-info">
        {status === 'occupied' && (
          <div className="occupied-info">
            <span className="time">🕑 {formatTime(timestamp)}</span>
            <span className="orders-badge">
              📦 {orders.length}
            </span>
          </div>
        )}
        {status === 'reserved' && (
          <div className="reserved-info">
            <span className="icon">📅 Reserved</span>
          </div>
        )}
        {status === 'free' && (
          <div className="free-info">
            <span className="icon">✅ Available</span>
          </div>
        )}
      </div>

      <div className="icon-container">
        {icons.map((icon, index) => (
          <span 
            key={`${icon}-${index}`}
            className="icon"
            style={{ 
              position: 'absolute',
              top: `${5 + index * 30}px`,
              right: '5px',
              fontSize: '24px'
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      <div className="size-indicator">
        {size} people
      </div>
    </div>
  );
};

Table.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number,
  orders: PropTypes.array,
  timestamp: PropTypes.string,
  notes: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    element: PropTypes.node
  })),
  status: PropTypes.oneOf(['free', 'occupied', 'reserved']).isRequired,
  onTableClick: PropTypes.func.isRequired
};

Table.defaultProps = {
  orders: [],
  icons: [],
  size: 2,
  notes: ''
};

export default Table;