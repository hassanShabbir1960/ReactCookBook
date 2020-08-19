var express = require('express');
var router = express.Router();
const WordsTresureController = require('../Controllers/Menu');
const OrderController = require("../Controllers/Order");

//---------post routes------
router.post('/addFood', WordsTresureController.create);
router.post('/createOrder', OrderController.create);
router.post('/test', async (req, res) => await res.send(req.body))
//---------get routes------
router.get('/getTodayFood', OrderController.getTodayOrder);
router.get('/getAllMenu', WordsTresureController.getAllMenu);
router.get('/trackOrder/:orderNumber', OrderController.trackOrder);


router.get('/test', (req, res) => res.send("Reached SuccessFully"))
//---------put routes------


module.exports = router;
