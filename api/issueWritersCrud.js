var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "IssueWriters";

router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"issueID": req.userID,
			"writer": req.writer
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
		TableName: tableName,
		ProjectionExpression: "bookID, title, issueList"
	}
	
	db.scan(params, res);
});*/

router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": req.issueID,
			"writer": req.writer,
		},
		UpdateExpression: "set writer = :writer",
		ExpressionAttributeValues: {
			":writer": req.writer,
		}
	}
	
	db.update(params);
});

router.delete('/:issue/:writer', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": parseInt(req.params.id),
			"writer": req.params.writer
		}
	}
	
	db.delete(params);
});

module.exports = router;