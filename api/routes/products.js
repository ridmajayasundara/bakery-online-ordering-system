const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message : "here you can get all the bakery items"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message : "here authorized users can edit items : authorization part not yet implimented"
    })
})


module.exports = router;

