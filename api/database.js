var express = require('express');
var router = express.Router();

router.use('/book', require(__dirname + '/bookCrud.js'));
router.use('/user', require(__dirname + '/userCrud.js'));
router.use('/userFavorites', require(__dirname + '/userFavoritesCrud.js'));
router.use('/userFollows', require(__dirname + '/userFollowsCrud.js'));
router.use('/userEvents', require(__dirname + '/userEventsCrud.js'));
router.use('/issue', require(__dirname + '/issueCrud.js'));
router.use('/issueCharacter', require(__dirname + '/issueCharactersCrud.js'));
router.use('/issueWriter', require(__dirname + '/issueWritersCrud.js'));
router.use('/issueIllustrator', require(__dirname + '/issueIllustratorsCrud.js'));
router.use('/comment', require(__dirname + '/commentsCrud.js'));

router.post('/signedIn', function(req, res) {
	var signedIn = true;
	res.send(signedIn);
});

router.get('/', function(req, res) {
	console.log("get anything");
});

module.exports = router;