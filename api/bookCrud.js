var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "Book";

router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"bookID": req.bookID,
			"title": req.title,
			"issueList": req.issuesList,
			"publisher": req.publisher,
			"publishDate": req.publishDate
		}
	}
	
	db.put(params, res);
});

router.get('/:id', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"bookID": parseInt(req.params.id)
		}
	}
	
	db.get(params, res);
});


router.get('', function(req, res) {
	var params = {
		TableName: tableName,
		ProjectionExpression: "bookID, title"
	}
	
	db.scan(params, res);
});

/*router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"bookID": req.bookID
		},
		UpdateExpression: "set title = :t, issueList = :i, publisher = :p, publishDate = :pd",
		ExpressionAttributeValues: {
			":t": req.title,
			":i": req.issuesList,
			":p": req.publisher,
			":pd": req.publishDate
		}
	}
	
	db.update(params);
});

router.delete('/:id', function(req, res) {
	var params = {
		TableName: tableName,
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