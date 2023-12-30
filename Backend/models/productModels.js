const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"PLease Enter product Price"],
        maxLength:[8,"Price cannot exceed 8 character"]
    },
    ratings : {
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
],
category:{
    type:String,
    require:[true,"Please Enter Product Category"],
},
Stock:{
    type:Number,
    required:[true,"Please Enter product Stock"],
    maxLength:[4,"Stock cannot exceed 4 character"],
    default:1
},
numberOfReviews : {
    type:Number,
    default:0
},

reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref : "User",
            required : true,
        },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            default:true
        },
    },
],
    user:{
        type:mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },

    createdAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model("Product",productSchema)