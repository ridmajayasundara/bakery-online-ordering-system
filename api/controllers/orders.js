const Order = require('../models/order');
const Product = require('../models/product')

exports.orders_get_all = (req,res,next)=>{
    Order.find()
    .select('_id product quantity')
    .then(result=>{
        res.status(200).json({
            message : "here are all the orders in the system",
            count : result.length,
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
}



exports.new_order = (req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product =>{
        if(!product){
            return res.status(404).json({
                message : 'product not found',
            })
        }
        const order = new Order({
            _id : new mongoose.Types.ObjectId(),
            product : req.body.productId,
            quantity : req.body.quantity
        });
        return order.save();
    })
    .then(result=>{
        res.status(201).json({
            message : 'order stored successfully!',
            createdOrder : {
                _id : result._id,
                productId : result.product,
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
}


exports.get_one_order = (req,res,next)=>{
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
}