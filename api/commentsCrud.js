var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "Comments";

router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"issueID": req.issueID,
			"userId": req.userID,
			"comment": req.comment,
			"timestamp": req.timestamp,
			"rating": req.rating
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

/*router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": req.issueID,
			"illustrator": req.illustrator,
		},
		UpdateExpression: "set info.illustrator = :illustrator",
		ExpressionAttributeValues: {
			":illustrator": req.illustrator,
		}
	}
	
	db.update(params);
});*/

/*router.delete('/:issue/:illustrator', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": parseInt(req.params.id),
			"illustrator": req.params.illustrator
		}
	}
	
	db.delete(params);
});*/

module.exports = router;