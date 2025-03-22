<div id="tableModal" className="modal">
    <div className="modal-content">
      <span className="close">×</span>
      <p>
        {" "}
        <span id="modalNumber" />
      </p>
      <h2>Tafel Details</h2>
      {/* Knoppen om iconen toe te voegen */}
      <div id="iconSelection">
        <label>
          <input
            type="checkbox"
            id="birthdayCheckbox"
            className="icon-checkbox"
          />{" "}
          Verjaardag 🎂
        </label>
        <label>
          <input
            type="checkbox"
            id="allergyCheckbox"
            className="icon-checkbox"
          />{" "}
          Allergie ⚠️
        </label>
      </div>
      {/* Grid structuur voor modal */}
      <div className="modal-body">
        {/* Linkerkolom: Extra info en opmerkingen */}
        <div className="modal-left">
          <p>
            <strong>Status:</strong> <span id="modalStatus" />
          </p>
          <p>
            <strong>Capaciteit:</strong> <span id="modalSize" />
          </p>
          <p>
            <strong>Tijd aan tafel:</strong> <span id="modalTime" />
          </p>
          <p>
            <strong>Opmerkingen:</strong> <span id="modalNotes" />
          </p>
          <p>
            <strong>Extra info:</strong> <span id="modalExtra" />
          </p>
        </div>
        {/* Rechterkolom: Bestellingen, Totaal bedrag en Afreken knop */}
        <div className="modal-right">
          <p>
            <strong>Bestellingen:</strong>
          </p>
          <ul id="modalOrders" />
          <p>
            <strong>Totaal bedrag:</strong> <span id="modalTotal" />
          </p>
          <button id="checkoutBtn">Afrekenen</button>
        </div>
      </div>
    </div>
  </div>