const express = requre("express");
const app = express();

app.use((req,res,next)=>{
    res.status(200).json({
        "message" : "Hello and Welcome"
    })
})

module.exports = app;