

const { body, validationResult } = require('express-validator'); 


const signUpValidationRules = () =>{
    return [

        body('email' ,'Email field must have a value').notEmpty(),
        body('email' ,'Invalid Email').isEmail(),
        body('password','Password field must have a value').notEmpty(),
        body('password','Invalid Password').isLength({min:4}),
        
    ]
}




const validate =(req,res,next) =>{
  
  
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
      errors: extractedErrors
    })
    // for(error in errors){
    //     console.log(extractedErrors.array())
    // }
    //****************FLASH MESSAGE FOR USERS **********

   
   

        
}




module.exports = {
    signUpValidationRules,
    validate,
  
  }