const express = require('express');
const route = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product'); 


route.get('/',(req,res,next)=>{
    Order.find()
    .select('_id product quantity')
    .then(result=>{
        res.status(200).json({
            message : "here are all the orders in the system",
            orders : result.map(re=>{
                return{
                    _id : re._id,
                    product :re.product,
                    quantity : re.quantity,
                    request : {
                        type : 'GET',
                        url : "add the url later"
                    } 
                }
            })
        })
    })
    .catch(error=>{
        res.status(500).json({
            message : 'server error tring to get all orders',
            error : error
        })
    })
    res.status(200).json({
        Message : "order get request"
    })
})

route.post('/',(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product =>{
        const order = new Order({
            id : mongoose.Types.ObjectId,
            product : req.body.productId,
            quantity : req.body.quantity
        });
        return order.save();
    })
    .then(result=>{
        res.status(201).json({
            message : 'order stored successfully!',
            createdOrder : {
                _id : result.ObjectId,
                product : result.product,
                quantity : result.quantity
            },
            request : {
                type : 'GET',
                url : 'url later' + result.ObjectId + ' '
            }
            })
    })
    .catch(error=>{
        res.status(500).json({
            message : "server error when trying to store order",
            error : error
        })
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