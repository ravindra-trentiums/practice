const validateRegister= require('./reqRegister')
const validateLogin= require('./reqLogin')
const validateBlog= require('./reqBlog')
module.exports={
  VALIDATE_REGISTER:validateRegister,
  VALIDATE_LOGIN:validateLogin,
  VALIDATE_BLOG:validateBlog
}