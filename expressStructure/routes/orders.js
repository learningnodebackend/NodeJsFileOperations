const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Define routes and map them to controller functions

router.get("/", orderController.getAllOrders);


module.exports = router;
