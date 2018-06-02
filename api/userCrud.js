var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "User";

/*router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"userID": req.userID,
			"username": req.username,
			"password": req.password,
			"email": req.email,
			"firstName": req.firstName,
			"lastName": req.lastName,
			"loggedIn": loggedIn
		}
	}
	
	db.put(params, res);
});*/

/*router.get('/:id', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"userID": parseInt(req.params.id)
		}
	}
	
	db.get(params, res);
});*/

/*router.get('', function(req, res) {
	var params = {
		TableName: tableName,
	}
	
	db.scan(params, res);
})

router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"bookID": req.bookID
		},
		UpdateExpression: "set info.title = :t, info.issueList = :i",
		ExpressionAttributeValues: {
			":t": req.title,
			":i": req.issuesList
		}
	}
	
	db.update(params);
});

router.delete('/:id', function(req, res) {
	var params = {
		TableName: TableName,
		Key: {
			"bookID": parseInt(req.params.id)
		},
		ConditionExpression: "info.bookID == :bookID",
		ExpressionAttributeValues: {
			":bookID": parseInt(req.params.id)
		}
	}
	
	db.delete(params);
});*/

module.exports = router;