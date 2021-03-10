
const blog= require('../controllers/blog')

module.exports = {
  configure: function (app) {
    app.post('/blog', blog.createBlog);
    app.get('/blog', blog.getBlogs);
    app.delete('/blog',blog.deleteBlog );
  }
}   
function ensureAuthenticated(req, res, next) {
    if (Object.keys(req.cookies).length === 0) {
      return res.redirect('/login');
    }
    // check cookies
    let cookie_name = "auth_token"
    console.log(req.cookies)
    if (req.cookies.hasOwnProperty(cookie_name)) {
      var auth_token = req.cookies[cookie_name];
      if (auth_token !== undefined || auth_token !== '') {
        jwt.verify(auth_token, 'mysecret', (err, decoded) => {
          // Check if error is expired or invalid
          if (err) {
            console.log(err)
            return res.redirect('/login');
          } else {
            req.user_info = decoded; 
            // console.log(decoded)
            next()
          }
        });
      } else {
        return res.redirect('/login');
      }
    } else {
      return res.redirect('/login');
    }
  }