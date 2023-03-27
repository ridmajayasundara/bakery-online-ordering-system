const Orders = require('../models/order');

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