const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

require('dotenv').config();
// MIGHT HAVE TO CONVERT ALL THE FUCTIONS TO ASYNC-AWAIT : SEEMS LIKE THE BETTER WAY

const Product = require('../models/product');

router.get('/',(req,res,next)=>{
    Product.find()
    .select('_id name price quantity')
    .exec() //>>>>>>>>>>>>>>>>>
    .then(result=>{
        const result_count = result.length
        res.status(200).json({
            message : "here are all the bakery items in our shop",
            total_count : result_count,
            products : result.map(doc=>{
                return{
                    product : doc,
                    request : {
                        type : 'GET',
                        url : process.env.URL + process.env.PORT + '/a/'+ doc._id, // TODO : get the route from somewhere else rather than hard coding it
                    }
                }
            })
        })
    })
    .catch(error=>{
        res.status(500).json({
            message : "Server Error at GET /products request",
            error : error
        })
    })
})

router.post('/',(req,res,next)=>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity
    });
    product
        .save() // IMPORTANT : not sure whether i have to add exec() here or not
        .then(result=>{
            console.log("saved to db");
            console.log(result);
            res.status(201).json({
                message : "success!. here authorized users can edit items : authorization part not yet implimented",
                product :  result.map(doc=>{
                    return {
                        product : doc,
                        request : {
                            type : 'GET',
                            url : process.env.URL + process.env.PORT + '/a/'+ doc._id, // TODO : get the route from somewhere else rather than hard coding it                        
                        }
                    }
                })
            })
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json("server error at /products POST reqest")
        })
    
})

router.delete('/', async (req, res) => {
    try {
      await Product.deleteMany();
      res.json({ message: 'all items deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error with deleting all');
    }
  });

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select('_id name price quantity')
    .exec() // CHECK OUT THIS
    .then(result =>{
            if(result){
                res.status(200).json({
                message : "Product Found!",
                product : result
            })}
            else{
                res.status(404).json({
                    message : "Id you entered has not DB entries"
                })
            }  
        })
    
    .catch(error =>{
        res.status(500).json({
            Message : "An Error occured at /products/:productID GET reqeust",
            error : error // TODO : remove in the final product
        })
    })
})


router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateList = {};
    for(const item of req.body){
        updateList[item.propertyName] = item.propertyValue;
    }
    Product.updateOne({_id : id},{$set: updateList})
    .exec()
    .then(result=>{
        res.status(200).json({
            message : "patch success"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message : "server error trying to patch the product",
            error : error
        })
    })
})


router.delete('/:id', async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
       message : 'Server Error',
        error : err
    }
        );
    }
  });

  
module.exports = router;

