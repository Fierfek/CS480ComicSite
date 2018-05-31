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

router.get('/events/byuser/:userId', function(req, res) {
	var params = {
		TableName: "UserEvents",
		KeyConditionExpression: "userID = :userId",
		ExpressionAttributeValues: {
			":userId": parseInt(req.params.userId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/issueRating/byIssue/:issueID', function(req, res) {
	var params = {
		TableName: "IssueRatings",
		KeyConditionExpression: "issueID = :issueID",
		ExpressionAttributeValues: {
			":issueID": parseInt(req.params.issueID)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/article/newest', function(req, res) {
	/*var params = {
		TableName: "Article",
		IndexName: "byDate",
		KeyConditionExpression: "articleId = :articleId",
		ExpressionAttributeValues: {
			":articleId": parseInt(req.params.articleId)
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});*/
	
	var params = {
		TableName: "Article",
		IndexName: "byDate"
	}
	
	db.scan(params, res);
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

router.get('/byIssue/:title', function(req, res) {
	var params = {
		TableName: "Issue",
		IndexName: "titlevolume",
		KeyConditionExpression: "title = :title",
		ExpressionAttributeValues: {
			":title": req.params.title
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
	
});

router.get('/issue/byYear/:year', function(req, res) {
	console.log("year: "+req.params.year);
	var params = {
		TableName: "Issue",
		IndexName: " yeartitle",
		KeyConditionExpression: "year = :year",
		ExpressionAttributeValues: {
			":year": req.params.year
		}
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
	
});

router.get('/byBook/:title', function(req, res) {
	var params = {
		TableName: "Book",
		IndexName:"byTitle",
		KeyConditionExpression: "title = :title",
		ExpressionAttributeValues: {
			":title": req.params.title
		},
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});

router.get('/byUserName/:username', function(req, res) {
	var params = {
		TableName: "User",
		IndexName: "userpass",
		KeyConditionExpression: "username = :username",
		ExpressionAttributeValues: {
			":username": req.params.username
		},
		ProjectionExpression:"username,userID"
	};
	
	db.query(params).then((data) => {
		console.log(data.userID);
		res.send(data);
	});
});

router.get('/byEmail/:email', function(req, res) {
	var params = {
		TableName: "User",
		IndexName: "emailpass",
		KeyConditionExpression: "email = :email",
		ExpressionAttributeValues: {
			":email": req.params.email
		},
		ProjectionExpression:"userID, username"
	};
	
	db.query(params).then((data) => {
		res.send(data);
	});
});


router.get('/user/:userId', function(req, res) {
	
	var params = {
		TableName: "User",
		Key: {
			"userID": parseInt(req.params.userId)
		}
	};
	db.get(params,res);
});

router.get('/user/securityQuestions/:userId', function(req, res) {
	var params = {
		TableName: "SecurityQuestions",
		Key: {
			"userID": parseInt(req.params.userId)
		}
	};
	
	db.get(params,res);
});


module.exports = router;