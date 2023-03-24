const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, res, cb){
        cb(null,'./uploads');
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString()+'$' + file.originalname); // $ can be used to get the original name later 
    }

})
const fileFilter = function(req,file,cb){
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true);
    }
    else{ // if file is not jpeg or png server will note save and will NOT throw an error
        cb(null,false);
    }
}
const upload = multer(
    {
        storage : storage,
        limits : {
            fileSize : 1024 * 1024 * 10 // 10 mb max is decided
        },
        fileFilter : fileFilter
    });

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

router.post('/',upload.single('productImage'),(req,res,next)=>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        productImageLink :process.env.URL + ':' + process.env.PORT +'/' + req.file.path
    });
    product
        .save() 
        .then(result=>{
            console.log("saved to db");
            console.log(result);
            res.status(201).json({
                message : "success! saved to db",
                    product : result,
                    request : {
                        type : 'GET',
                        //url : process.env.URL + process.env.PORT + '/a/'+ result._id, // TODO : get the route from somewhere else rather than hard coding it                        
                    }
                })
            })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                message : "server error at /products POST reqest",
                error : error
            }
            )
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
      const retval = await Product.deleteOne({ _id: req.params.id });
      if(retval.deletedCount == 0){
        return res.status(404).json({
            message : 'product not found'
        })
      }na
      res.json({ 
        message: 'Item deleted successfully',
        returnValue : retval
     });
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

