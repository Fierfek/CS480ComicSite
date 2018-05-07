var express = require('express');
var router = express.Router();

router.use('/book', require(__dirname + '/bookCrud.js'));

router.ask('/signedIn', function(req, res) {
	console.log(req);
	var signedIn = true;
	res.send(signedIn);
});

router.get('/', function(req, res) {
	console.log("get anything");
});

module.exports = router;