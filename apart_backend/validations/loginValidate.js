const joi = require('joi');

function loginValidate(req, res, next) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.json({status_code: 406, msg: error.message});
    }
    else{
        next();
    }
}

module.exports = loginValidate;