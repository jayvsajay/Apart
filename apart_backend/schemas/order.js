const mongoose=require('mongoose')

const orders=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    quantity:{
        type:Number,
        default:1

    },
    checkout:{
        type:Boolean,
        default:false
    },
    address:{
        type:Object
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('orders',orders)