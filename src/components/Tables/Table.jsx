import { useState } from 'react';

const Table = ({ number, size, status, isNew, onTableClick }) => {
    const [icons, setIcons] = useState([]);

    const handleClick = () => {
        onTableClick(number);
    };

    return (
        <div
            className={`table ${status} ${isNew ? 'new' : ''}`}
            onClick={handleClick}
            data-size={size}
        >
            <div className="number">{number}</div>
            <div className={`table ${status}`}>
                <span className="number">{number}</span>
                <div className="icon-container">
                    {status === 'occupied' && <span className="icon">🕑</span>}
                    {status === 'reserved' && <span className="icon">📅</span>}
                    {isNew && <span className="icon new-indicator">NEW</span>}
                </div>
            </div>
            <div className="icon-container">
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