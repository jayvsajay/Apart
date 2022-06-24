const jwt = require('jsonwebtoken');
const jwtsecret = 'shfdjd43kskdj5jfdk';
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                next();
            }
        })
    }
}
module.exports={authenticateToken}