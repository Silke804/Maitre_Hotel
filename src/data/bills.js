export const initialBills = [{
        id: "1",
        tableId: "1",
        orderIds: ["1"], // References orders in the orders array
        total: 50,
        paymentMethod: 'cash',
        status: 'open',
        timestamp: '2023-09-20T14:30:00Z',
        discount: 10,
        tip: 5
    },
    {
        id: "2",
        tableId: "1",
        orderIds: ["2"],
        total: 50,
        paymentMethod: 'card',
        status: 'paid',
        timestamp: '2023-09-20T14:30:00Z',
        discount: 10,
        tip: 5
    },
    {
        id: "3",
        tableId: "1",
        orderIds: ["3"],
        total: 50,
        paymentMethod: 'mobile',
        status: 'voided',
        timestamp: '2023-09-20T14:30:00Z',
        discount: 10,
        tip: 5
    },
    {
        id: "4",
        tableId: "1",
        orderIds: ["4"],
        total: 25.50, // Calculated from orders
        paymentMethod: 'cash',
        status: 'paid',
        timestamp: "2023-09-20T14:00:00Z"
    },
    {
        id: "5",
        tableId: "2",
        orderIds: ["5"],
        total: 32.00,
        paymentMethod: 'card',
        status: 'open',
        timestamp: "2023-09-20T13:45:00Z"
    },
];