var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "UserFavorites";

router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"userID": req.userID,
			"issues": req.issues,
			"books": req.books,
			"illustrators": req.illustrators,
			"authors": req.authors,
			"bio": req.bio,
			"profilePic": req.profilePic
		}
	}
	
	db.put(params, res);
});

router.get('/:id', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"userID": parseInt(req.params.id)
		}
	}
	
	db.get(params, res);
});

/*router.get('', function(req, res) {
	var params = {
		TableName: tableName,
		ProjectionExpression: "bookID, title, issueList"
	}
	
	db.scan(params, res);
});*/

router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"userID": req.userID
		},
		UpdateExpression: "set issues = :issues, books = :books, illustrators = :illustrators, authors = :authors, bio = :bio, profilePic = :profilePic",
		ExpressionAttributeValues: {
			":issues": req.issues,
			":books": req.books,
			":illustrators": req.illustrators,
			":authors": req.authors,
			":bio": req.bio,
			":profilePic": req.profilePic
		}
	}
	
	db.update(params);
});

/*router.delete('/:id', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"userID": parseInt(req.params.id)
		},
		ConditionExpression: "info.bookID == :bookID",
		ExpressionAttributeValues: {
			":bookID": parseInt(req.params.id)
		}
	}
	
	db.delete(params);
});*/

module.exports = router;