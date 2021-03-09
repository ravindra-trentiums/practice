const user = require('../controllers/user')

module.exports = {
  configure: function (app) {

    app.post('/login', user.login);
    app.post('/register', user.register);
  }
}   
