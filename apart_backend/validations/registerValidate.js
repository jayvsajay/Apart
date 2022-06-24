const joi = require('joi');

function registerValidate(req, res, next){
    const schema = joi.object({
        firstname: joi.string().min(4).required(),
        lastname: joi.string().min(2).required(),
        email: joi.string().email().required(),
        phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        address1: joi.string().min(10),
        address2: joi.string().min(5),
        State:joi.string().min(3),
        Country:joi.string().min(4),
        pincode: joi.string().length(6).pattern(/^[0-9]+$/),
        password: joi.string().min(8).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.json({status_code: 406, msg: error.message});
    }
    else{
        next();
    }
}

module.exports = registerValidate;