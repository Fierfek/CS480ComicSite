var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "IssueCharacters";

router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"issueID": req.userID,
			"character": req.character
		}
	}
	
	db.put(params, res);
});

/*router.get('/:id', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": parseInt(req.params.id)
		}
	}
	
	db.get(params, res);
});*/

/*router.get('', function(req, res) {
	var params = {
		TableName: tableName
	}
	
	db.scan(params, res);
});*/

router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": req.issueID,
			"character": req.character,
		},
		UpdateExpression: "set character = :character",
		ExpressionAttributeValues: {
			":characters": req.characters,
		}
	}
	
	db.update(params);
});

router.delete('/:issue/:character', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": parseInt(req.params.id),
			"character": req.params.character
		}
	}
	
	db.delete(params);
});

module.exports = router;