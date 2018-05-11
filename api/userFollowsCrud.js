var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "UserFollows";

router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"userID": req.userID,
			"users": req.users,
			"books": req.books
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
		UpdateExpression: "set users = :users, books = :books",
		ExpressionAttributeValues: {
			":users": req.users,
			":books": req.books
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