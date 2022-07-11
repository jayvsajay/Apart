const express = require('express');
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const registerValidate = require('../validations/registerValidate');
const loginValidate = require('../validations/loginValidate');
const {authenticateToken}=require('../Authentication/Aunthenticate')
const {getCart, search_product, deleteOrder, productdata, Addrate, getProduct, Increment_Quantity, decrement_quantity, Addtocart, checkout, getOrder, getOrd}=require('../Controllers/Productcontroller');
const { registeration, loginUser, getProfile, UpdateProfile, Changepassword, Addaddress, Uplodlogo } = require('../Controllers/UserController');
const router = express.Router();
router.use(express.static("uploads"));
const razorpay = new Razorpay({
	key_id: 'rzp_test_UPbQhy9R6bG5of',
	key_secret: 'Hi7VAucTlIrvCjefbAS9SCr4'
})
router.post('/register',registerValidate, registeration);
router.post('/login',loginValidate, loginUser)
router.get('/getproducts',productdata)
router.get('/getprofile/:email',authenticateToken,getProfile)
router.put('/updateprofile/:email',authenticateToken,UpdateProfile)
router.post('/changepassword',authenticateToken,Changepassword)
router.put('/addaddress/:email',authenticateToken,Addaddress)
router.post('/uploadlogo/:email',authenticateToken,Uplodlogo)
router.get('/getitems/:id',authenticateToken,getProduct)
router.put('/addrate/:id' ,authenticateToken,Addrate)
router.post('/addtocart',authenticateToken,Addtocart)
router.get('/getcart/:email',authenticateToken,getCart)
router.put('/incrementquantity',authenticateToken,Increment_Quantity)
router.put('/decrementquantity',authenticateToken,decrement_quantity)
router.delete('/deleteorder/:id',authenticateToken,deleteOrder)
router.get('/search/:key',search_product)
router.get("/getOrder/:email",authenticateToken,getOrder)
router.get("/getOrderbyid/:id",authenticateToken,getOrd)
router.post('/razorpay/:carttotal', async (req, res) => {
	const payment_capture = 1
	const currency = 'INR';
    let {email,address}=req.body;
    const amount=req.params.carttotal;
    console.log(amount)
	const options = {
        amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		checkout({email,address})
		const response = await razorpay.orders.create(options)
		res.json({
            amount: response.amount,
			id: response.id,
			currency: response.currency,
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router;