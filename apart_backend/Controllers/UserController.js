const userModel=require('../schemas/User')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtsecret = 'shfdjd43kskdj5jfdk';
const saltRounds = 10;
const helpers=require('../helpers/helpers')
const multer=require('multer')
const path=require('path')
const sendMail=require('../helpers/sendMail')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
   
})

const registeration=async(req, res)=>{
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let phone=req.body.phone;
    let address1=req.body.address1;
    let address2=req.body.address2;
    let State=req.body.State;
    let Country=req.body.Country;
    let pincode=req.body.pincode;
    let password=req.body.password;
    const data = {address1,address2,State,Country,pincode}
    password = bcrypt.hashSync(req.body.password, saltRounds);
    let data1={firstname:firstname,lastname:lastname,email:email,phone:phone,address:data
    ,password:password}
  
  
    try{
        const user_data = await new userModel(data1);
        await user_data.save();
        sendMail(user_data)
        res.json({status_code: 201, msg: 'Registered successfully'})
    }
    catch(err){
        res.json({status_code: 400, msg: err.message})
    }
}
const loginUser=async(req, res)=>{
    const data = req.body;
    try{
        const user = await userModel.findOne({email: data.email});
        if(bcrypt.compareSync(data.password, user.password)){
            let payload={
                uid:data.email
            }
            const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
            res.json({msg: "Logged in successfully","token":token,user:user,status_code:200})
        }
        else{
            res.json({status_code: 400, msg:'Passwor wrong'});
        }
    }
    catch(err){
        res.json({status_code: 400, msg: 'Invalid email and password'});
    }
}
const getProfile=(req,res)=>{
    let { email }=req.params;
    console.log(email)
    userModel.find({email:email},(err,info)=>{
        if(err) {
            res.json({status_code:400,msg:"Failed to load data"})
        }else{
            res.json({status_code:201,user:info})
        }
        
    })
}
const UpdateProfile=(req,res)=>{
    let {email}=req.params;
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email1=req.body.email;
    let phone=req.body.phone;
    let pincode=req.body.pincode;
    let address1=req.body.address1;
    let address2=req.body.address2;
    let data={address1,address2,pincode};

    userModel.updateOne({email:email},{$set:{firstname:firstname,lastname:lastname,email:email1,address:data,
    phone:phone}},(err)=>{
        if(err){
            res.json({status_code:400,msg:"Update failed"});
        }
        else{
            res.json({status_code:201,msg:"Successfull"})
        }
    })
}
const Changepassword=(req,res)=>{
    let password=req.body.password;
    let oldpassword = req.body.oldpassword;
    let email = req.body.email
    console.log(req.body)
    userModel.findOne({email:email}, (err, info)=>{
        if(err) {
            res.json({err:1, msg:"Fetch error"})
            }
            else if(info===null){
                res.json({err:1, msg:"User data not found"})
            }else{
                if(bcrypt.compareSync(oldpassword, info.password)){
                    const hash = bcrypt.hashSync(password, saltRounds);
                    userModel.updateOne({email:email},{$set:{password:hash}},(err)=>{
                        if(err){
                            res.json({err:1,status_code:400, msg:"Update error"})
                        }
                        else{
                            res.json({err:0,status_code:201,msg:"Updated successfully"})
                        }
                    })
                }
                else{
                    res.json({err:1,msg:"Correctly enter the old password"})
                }
            }
        })

}
const Addaddress=async(req,res)=>{
    let {email}=req.params;
    let address1=req.body.address1;
    let address2=req.body.address2;
    let State=req.body.State;
    let Country=req.body.Country;
    let pincode=req.body.pincode;
    let data={address1,address2,State,Country,pincode}
  console.log(email)
    userModel.updateOne({email:email},{$push:{address:data}},(err)=>{
        if(err) {
            console.log(err)
           res.json({status_code:400,msg:"Please enter proper details"})
        }
        else{
            res.json({status_code:201,msg:"Update successfull"})
        }
    })
}
const Uplodlogo=(req,res)=>{
    let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('file');
    upload(req,res,(err)=>{
        if(req.fileValidationError){
            res.json({err:req.fileValidationError});
        }
        else if(!req.file){
            res.json({status_code:404,err:"Please select a file"});
        }
        else if(err){
            res.json({status_code:400,err:"Some file uploading error"});
        }else{
        let email=req.params.email;
        let profile=req.file.filename;
        console.log(profile)
        userModel.updateOne({email:email},{$set:{profile:profile}},(err)=>{
            if(err){
                res.json({status_code:400,err:"Update Error"});
            };
            res.json({status_code:201,msg: "Update successfully",profile:profile})
            console.log(profile)
        });
    }
    })  
}
module.exports={registeration,loginUser,getProfile,UpdateProfile,Changepassword,Addaddress,Uplodlogo}