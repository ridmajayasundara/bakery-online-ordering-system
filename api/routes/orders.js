const express = require('express');
const route = express.Router();


route.get('/',(req,res,next)=>{
    res.status(200).json({
        Message : "order get request"
    })
})

route.post('/',(req,res,next)=>{
    res.status(200).json({
        Message : "order post request"
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