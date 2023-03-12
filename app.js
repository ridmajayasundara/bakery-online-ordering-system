const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE,PATCH,');
        return res.status(200).json({});
    }
    next();
})

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error = new Error("Page Not Found");
    error.status = 404;
    console.log(error.status)
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500) ;
    res.json({
        message : error.message || "Error"
    })
})

module.exports = app;