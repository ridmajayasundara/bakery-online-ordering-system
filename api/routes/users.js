const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup',(req,res,next)=>{
     bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    message : "error in the server",
                    error : err
                })
            }
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : hash  
        })
        user.save()
            .exec()
            .then(result=>{
                res.status(201).json({
                    message : "user sign up success!"
                })
            })
            .catch(error=>{
                res.status(500).json({
                    message : "server error when trying to sign up",
                    error : error
                })
            })
     })
     
})



models.exports = router