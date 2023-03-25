const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup',(req,res,next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(mails=>{
        if(mails.length>=1){
            return res.status(409).json({
                message : "user already exists"
            })
        }
        else{
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
        }
    })
     
     
})

router.delete('/deleteAll',(req,res,next)=>{ // USE WITH CAUTION : DEV MODE ONLY
    User.deleteMany()
    .exec()
    .then(sucess=>{
        res.status(200).json({
            message : "all users deleted success!"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message : "error tyring to delete all users",
            error : error
        })
    })
})


router.delete('/:userId',(req,res,next)=>{
    User.deleteOne({_id : req.params.userId})
    .exec()
    .then(sucess=>{
        res.status(200).json({
            message : "delete success!"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message : "error tyring to delete user",
            error : error
        })
    })
})



module.exports = router