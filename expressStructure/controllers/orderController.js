// Mock database (in-memory)
let users = [
    { orderId: 1, Itam : 'Shirt' , Qty : 3 },
  ];
  
  
  const getAllOrders = (req, res) => {
    console.log("getAllUsers API Called...")
    res.json(users);
  };
  
  
  
  // Export functions at the end
  module.exports = { getAllOrders };
  