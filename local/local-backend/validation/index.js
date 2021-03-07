const validateRegister= require('./reqRegister')
const validateLogin= require('./reqLogin')
module.exports={
  VALIDATE_REGISTER:validateRegister,
  VALIDATE_LOGIN:validateLogin
}