const express = require('express');
const route = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');


route.get('/',(req,res,next)=>{
    res.status(200).json({
        Message : "order get request"
    })
})

route.post('/',(req,res,next)=>{
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        product : req.body.productId,
        quantity : req.body.quantity

    })
    order.save()
    then(result=>{
        res.status(201).json({
            message : 'order stored successfully!',
            order_object : result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message : "server error when trying to store order",
            error : error
        })
    })
    res.status(201).json({
        Message : "order post request",
        orderId : orderId
    })
})

route.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        Message : "order id get request",
        id : req.params.orderId
    })
})

route.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        Message : "order id delete request",
        id : req.params.orderId
    })
})


module.exports = route;