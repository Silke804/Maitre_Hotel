export const initialOrders = [
  //these are the initial done orders, not to be confused with the orders in table.js which are the current ongoing orders
  {
    id: 1,
    tableNumber: 'T1',
    total: 45.50,
    status: 'paid',
    time: '14:30',
    items: [
      { name: 'Pizza Margherita', price: 12.00, quantity: 2 },
      { name: 'Cola', price: 2.50, quantity: 1 }
    ]
  }
];