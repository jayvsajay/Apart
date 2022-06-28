const express = require('express');
// const userModel = require('../schemas/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const multer=require('multer');
// const path=require('path');
// const helpers=require('../helpers/helpers')
const registerValidate = require('../validations/registerValidate');
const loginValidate = require('../validations/loginValidate');
const {authenticateToken}=require('../Authentication/Aunthenticate')
// const sendMail=require('../helpers/sendMail')
// const productModel=require("../schemas/Products")
// const orderModel=require("../schemas/order");
const {getCart, search_product, deleteOrder, productdata, Addrate, getProduct, Increment_Quantity, decrement_quantity, Addtocart, checkout, getOrder, getOrd}=require('../Controllers/Productcontroller');
const { registeration, loginUser, getProfile, UpdateProfile, Changepassword, Addaddress, Uplodlogo } = require('../Controllers/UserController');
// const jwtsecret = 'shfdjd43kskdj5jfdk';
// const saltRounds = 10;
const router = express.Router();
router.use(express.static("uploads"));

router.post('/register',registerValidate, registeration);
router.post('/login',loginValidate, loginUser)
// router.post('/contact',async(req,res)=>{
//     const data=req.body;
//     try{
//         sendMailtoadmin(data)
//         res.json({status_code:201,msg:"Mail send to admin"})
//     }
//     catch(err){
//         res.json({status_code:400,msg:'Error Occured'})
//     }
// })
router.get('/getproducts',productdata)
router.get('/getprofile/:email',getProfile)
router.put('/updateprofile/:email',UpdateProfile)
router.post('/changepassword',Changepassword)
router.put('/addaddress/:email',Addaddress)
router.post('/uploadlogo/:email',Uplodlogo)
router.get('/getitems/:id',getProduct)
router.put('/addrate/:id' ,Addrate)
router.post('/addtocart',Addtocart)
router.get('/getcart/:email',getCart)
router.put('/incrementquantity',Increment_Quantity)
router.put('/decrementquantity',decrement_quantity)
router.delete('/deleteorder/:id',deleteOrder)
router.get('/search/:key',search_product)
router.put("/checkout",checkout);
router.get("/getOrder/:email",getOrder)
router.get("/getOrderbyid/:id",getOrd)
module.exports = router;