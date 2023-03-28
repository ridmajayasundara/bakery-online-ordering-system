const express = require('express');
const route = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product'); 

const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders');


route.get('/',checkAuth, OrdersController.orders_get_all)

route.post('/',checkAuth,OrdersController.new_order)

route.get('/:orderId',checkAuth,(req,res,next)=>{
    Order.findById(req.params.orderId)
    .exec()
    .then(order=>{
        res.status(200).json({
            order : order   
        })
    })
    .catch(error=>{ 
        res.status(500).json({
            message : "error with find order by ID",
            error : error
        })
        
    })
})

route.delete('/:orderId',checkAuth,(req,res,next)=>{
    Order.deleteOne({_id : req.params.orderId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message : "Deleted Successfully!"
        });
    })
    .catch(error=>{
        res.status(500).json({
            message : "Delete not complete, Server error",
            error : error
        });
    })
})


module.exports = route;