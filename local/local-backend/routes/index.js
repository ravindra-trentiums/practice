var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/registration', function(req, res, next) {
  console.log(req.body)
});

module.exports = router;
