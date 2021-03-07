const user = require('../controlllers/user')

module.exports = {
  configure: function (app) {

    app.post('/login', user.login);
    app.post('/register', user.register);
  }
}   
