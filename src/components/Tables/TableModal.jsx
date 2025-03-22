const TableModal = ({ 
    isOpen,
    tableData,
    status,
    onClose,
    onCheckout,
    onIconChange
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Tafel {tableData.number}</h2>
          
          <div className="modal-info">
            <p>Status: <span id="modalStatus">{status}</span></p>
            <p>Grootte: <span id="modalSize">{tableData.size} personen</span></p>
            <p>Tijd: <span id="modalTime">{tableData.time}</span></p>
            <p>Opmerkingen: <span id="modalNotes">{tableData.notes}</span></p>
          </div>
  
          <div className="icon-controls">
            <label>
              <input 
                type="checkbox"
                onChange={(e) => onIconChange('🎂', e.target.checked)}
              /> Verjaardag
            </label>
            <label>
              <input 
                type="checkbox"
                onChange={(e) => onIconChange('⚠️', e.target.checked)}
              /> Allergie
            </label>
          </div>
  
          <button 
            className="checkout-btn"
            onClick={onCheckout}
          >
            Afrekenen
          </button>
        </div>
      </div>
    );
  };
  
  export default TableModal;