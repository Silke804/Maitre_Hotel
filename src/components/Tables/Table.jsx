const Table = ({ number, size, status, isNew, icons, onTableClick }) => {
    return (
      <div
        className={`table ${status} ${isNew ? 'new' : ''}`}
        onClick={() => onTableClick(number)}
        data-size={size}
      >
        <div className="number">{number}</div>
        <div className="icon-container">
          {/* Status Indicator Icons */}
          {status === 'occupied' && <span className="icon">🕑</span>}
          {status === 'reserved' && <span className="icon">📅</span>}
          {isNew && <span className="icon new-indicator">NEW</span>}
  
          {/* Dynamic Icons from Parent */}
          {icons.map((icon, index) => (
            <span
              key={index}
              className="icon"
              style={{
                position: 'absolute',
                top: '5px',
                right: `${5 + index * 25}px`,
                fontSize: '20px'
              }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default Table;