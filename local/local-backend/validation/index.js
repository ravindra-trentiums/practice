const validateRegister= require('./reqRegister')
const validateLogin= require('./reqLogin')
const validateBlog= require('./reqBlog')
const validateComment= require('./reqComment')
module.exports={
  VALIDATE_REGISTER:validateRegister ,
  VALIDATE_LOGIN:validateLogin ,
  VALIDATE_BLOG:validateBlog ,
  VALIDATE_COMMENT:validateComment
}