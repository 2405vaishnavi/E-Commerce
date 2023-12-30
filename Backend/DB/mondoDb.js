require("dotenv").config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

module.exports = function Ecommerce(){
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>console.log("DataBase Connected")).catch((err)=>{console.log(err)});
}