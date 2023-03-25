const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const morgan = require('morgan'); // to log all the incoming requests to the console
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://ridmajayasundara:'+
    process.env.MONGO_DB_PW_bakery_db+
    '@bakery-db.jsiezrz.mongodb.net/?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

app.use(morgan('dev'));

app.use('/uploads',express.static('uploads'));

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
app.use('/user',userRoutes);

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