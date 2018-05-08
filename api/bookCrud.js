var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.put('', function(req, res) {
	var params = {
		TableName: "Book",
		Item: {
			"bookID": req.bookID,
			"title": req.title,
			"issuesList": req.issuesList,
		}
	}
	
	db.post(params, res);
});

router.get('/:id', function(req, res) {
	var params = {
		TableName: "Book",
		Key: {
			"bookID": parseInt(req.params.id)
		}
	}
	
	db.get(params, res);
});

router.get('', function(req, res) {
	var params = {
		TableName: "Book",
		ProjectionExpression: "bookID, title, issueList"
	}
	
	db.scan(params, res);
});

router.post('', function(req, res) {
	var params = {
		TableName: "Book",
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
		TableName: "Book",
		Key: {
			"bookID": parseInt(req.params.id)
		},
		ConditionExpression: "info.bookID == :bookID",
		ExpressionAttributeValues: {
			":bookID": parseInt(req.params.id)
		}
	}
	
	db.delete(params);
});

module.exports = router;