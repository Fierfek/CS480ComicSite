//queries
var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/issue/byBook/:bookId', function(req, res) {
	var params = {
		TableName: "Issue",
		IndexName: "by-book",
		KeyConditionExpression: "bookId = :bookId",
		ExpressionAttributeValues: {
			":bookId": parseInt(req.params.bookId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueRating/byIssue/:issueID', function(req, res) {
	var params = {
		TableName: "IssueRatings",
		KeyConditionExpression: "issueID = :bookID",
		ExpressionAttributeValues: {
			":issueID": parseInt(req.params.issueID)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/article/newest', function(req, res) {
	var params = {
		TableName: "Article",
		IndexName: "byDate",
		/*KeyConditionExpression: "articleId = :articleId",
		ExpressionAttributeValues: {
			":articleId": parseInt(req.params.articledeId)
		}*/
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/articleComments/byArticle/:articleId', function(req, res) {
	var params = {
		TableName: "ArticleComments",
		KeyConditionExpression: "articleId = :articleId",
		ExpressionAttributeValues: {
			":articleId": parseInt(req.params.articleId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/comments/byIssue/:issueId', function(req, res) {
	var params = {
		TableName: "Comments",
		KeyConditionExpression: "issueID = :issueId",
		ExpressionAttributeValues: {
			":issueId": parseInt(req.params.issueId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueCharacters/byIssue/:issueId', function(req, res) {
	var params = {
		TableName: "IssueCharacters",
		KeyConditionExpression: "issueID = :issueId",
		ExpressionAttributeValues: {
			":issueId": parseInt(req.params.issueId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueCharacters/byCharacter/:name', function(req, res) {
	var params = {
		TableName: "IssueCharacters",
		IndexName: "by-character",
		KeyConditionExpression: "#charname = :name",
		ExpressionAttributeValues: {
			":name": req.params.name
		},
		ExpressionAttributeNames: {
			"#charname": "character"
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueWriters/byIssue/:issueId', function(req, res) {
	var params = {
		TableName: "IssueWriters",
		KeyConditionExpression: "issueID = :issueId",
		ExpressionAttributeValues: {
			":issueId": parseInt(req.params.issueId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueWriters/byWriter/:writer', function(req, res) {
	var params = {
		TableName: "IssueWriters",
		IndexName: "by-writer",
		KeyConditionExpression: "writer = :writer",
		ExpressionAttributeValues: {
			":writer": req.params.character
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueIllustrators/byIssue/:issueId', function(req, res) {
	var params = {
		TableName: "IssueIllustrators",
		KeyConditionExpression: "issueID = :issueId",
		ExpressionAttributeValues: {
			":issueId": parseInt(req.params.issueId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueIllustrators/byIllustrator/:illustrator', function(req, res) {
	var params = {
		TableName: "IssueIllustrators",
		IndexName: "by-illustrator",
		KeyConditionExpression: "illustrator = :illustrator",
		ExpressionAttributeValues: {
			":illustrator": req.params.illustrator
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

module.exports = router;