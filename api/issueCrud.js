var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "Issue";

/*router.put('', function(req, res) {
	var params = {
		TableName: tableName,
		Item: {
			"issueID": req.issueID,
			"coverImage": req.coverImage,
			"title": req.title,
			"summary": req.summary,
			"synopsis": req.synopsis,
			"volumeNum": req.volumeNum,
			"issueNum": req.issueNum,
			"year": req.year,
			"rating": req.rating
		}
	}
	
	db.put(params, res);
});*/

router.get('/:id', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": parseInt(req.params.id)
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

/*router.post('', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": req.userID
		},
		UpdateExpression: "set info.coverImage = :coverImage, info.title = :title, info.summary = :summary, info.synopsis = :synopsis, info.volumeNum = :volumeNum, info.issueNum = :issueNum, info.year = :year, info.rating = :rating",
		ExpressionAttributeValues: {
			":coverimage": req.coverImage,
			":title": req.title,
			":summary": req.summary,
			":synopsis": req.synopsis,
			":volumeNum": req.volumeNum,
			":issueNum": req.issueNum,
			":year": req.year,
			":rating": req.rating
		}
	}
	
	db.update(params);
});*/

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