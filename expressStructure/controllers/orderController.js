// Mock database (in-memory)
let orders = [
    { orderId: 1, Itam : 'Shirt' , Qty : 3 },
  ];
  
  
  const getAllOrders = (req, res) => {
    console.log("getAllorders API Called...")
    res.json(orders);
  };
  
  
  
  // Export functions at the end
  module.exports = { getAllOrders };
  