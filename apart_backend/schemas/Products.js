const { string } = require('joi');
const mongoose=require('mongoose');
const products=new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
    },
    product_image:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    }

})
module.exports=mongoose.model('products',products)