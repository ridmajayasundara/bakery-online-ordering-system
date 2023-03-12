const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    //TODO : send all items
    res.status(200).json({
        message : "here you can get all the bakery items"
    })
})

router.post('/',(req,res,next)=>{
    //
    res.status(201).json({
        message : "here authorized users can edit items : authorization part not yet implimented"
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    // 
    res.status(200).json({
        message : "product ID extracted get req",
        id : id
    })
})


router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    // 
    res.status(200).json({
        message : "product ID extracted patch req",
        id : id
    })
})


router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    // 
    res.status(200).json({
        message : "product ID extracted delete req",
        id : id
    })
})


module.exports = router;

