var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/register', function(req, res, next) {
  console.log(req.body)
  res.status(200).send('hello')
});

module.exports = router;
