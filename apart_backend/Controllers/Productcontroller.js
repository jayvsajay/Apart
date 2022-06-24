const productModel=require('../schemas/Products');
const orderModel=require('../schemas/order')

const productdata=(req,res)=>{
     productModel.find({},(err,info)=>{
         if(err) {
             res.json({status_code:400,msg:"Failed to load data"})
         }else{
             res.json({status_code:201,products:info})
         }
         
     })
}

const search_product=async(req,res)=>{
    let result=await productModel.find({
        "$or":[{
            product_name:{$regex:req.params.key}
        }]
    })
    res.json({status_code:201,product:result})
}
const deleteOrder=(req, res)=>{
    let {id} = req.params;
    orderModel.deleteOne({_id:id},(err)=>{
        if(err){
            res.json({err:"Delete not able to possible"});
        }
        else{
            res.json({status_code:201,msg:"Cart Item deleted successfully"});
        }
    })
}
const Addrate=(req,res)=>{
    let { id }=req.params;
    let rate=req.body.rate;
    productModel.updateOne({_id:id},{$set:{rating:rate}},(err)=>{
        if(err){
            res.json({status_code:400,err:"Not able to update"})
        }else{
            res.json({status_code:201,msg:"Updated successfull"})
        }
    })
}
const getProduct=(req,res)=>{
    let {id}=req.params;
    productModel.find({_id:id},(err,info)=>{
        if(err) {
          
            res.json({status_code:400,msg:"Failed to load data"})
        }else{
            res.json({status_code:201,Item:info})
        }
        
    })
}
// const getOrderById = (id, email) =>{
//     return orderModel.findOne({product_id:id, email:email,checkout:false}).exec();
// }
// const getCart = (email) =>{
//     return orderModel.find({email:email,checkout:false}).populate(['product_id'])
//     .exec();
// }
const Addtocart=async(req,res)=>{
    let {id, email} = req.body;
    console.log(email)
    const order_data = orderModel.findOne({product_id:id, email:email,checkout:false});
    order_data.then(response=>{
        if(response){
            res.json({err:"Product already added to cart"})
        }
        else{
            let order_ins = new orderModel({email:email, product_id:id})
            order_ins.save((err)=>{
                if(err){
                    console.log(err);
                    res.json({status_code:400,err:"Product inserted error"});
                }
                else{
                    res.json({status_code:200,msg:"Product added to cart successfully"});
                }
            })
            
        }
    })

}
const getCart=(req, res)=>{
    let {email} = req.params;
    const cart_data = orderModel.find({email:email,checkout:false});
    cart_data.then(response=>{
        if(response){
            res.json({status_code:201,cart:response});            
        }
        else{
            res.json({status_code:304,err:"No products ordered"})
        }
    })
}
const Increment_Quantity=(req, res)=>{
    let {email, product_id} = req.body;
    orderModel.updateOne({email:email, product_id:product_id,checkout:false},{$inc:{quantity:1}},(err)=>{
        if(err){
            res.json({status_code:400,err:"Increment error"})
        }
        else{
            res.json({status_code:201,msg:"Incremented successfully"});
        }
    })
}

const decrement_quantity=(req, res)=>{
    let {email, product_id} = req.body;
    const order_data = orderModel.findOne({product_id:id, email:email,checkout:false});
    order_data.then(response=>{
        if(response.quantity === 1){
            res.json({err:'Product cannot be decremented'});
        }
        else{
    orderModel.updateOne({email:email, product_id:product_id,checkout:false},{$inc:{quantity:-1}},(err)=>{
        if(err){
            res.json({status_code:400,err:"Decrement error"})
        }
        else{
            res.json({msg:"Decremented successfully",status_code:200});
        }
    })
}
    })
}

module.exports={productdata,Addtocart,getCart,search_product,deleteOrder,Addrate,getProduct,Increment_Quantity,decrement_quantity}