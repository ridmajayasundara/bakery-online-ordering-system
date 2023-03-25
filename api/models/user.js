const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    }
})

models.exports = mongoose.model('User',UserSchema);