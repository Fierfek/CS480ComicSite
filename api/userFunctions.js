var express = require('express');
var router = express.Router();
var db = require('./db.js');
var loadForm = require('./handleForm.js');


var aws = require("aws-sdk");

aws.config.update({
	accessKeyId: "AKIAJAX7OK37HX73JBLA",
	secretAccessKey: "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",
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

var docClient = new aws.DynamoDB.DocumentClient();

router.post('/signedIn', function(req, res) {
	var signedIn = true;
	res.send(signedIn);
});

router.post('/image', function(req, res) {
	generateId("image").then((id) => {
		loadForm.uploadImage(req, res, id);
	});
});

router.post('/image/:id', function(req, res) {
	generateId("image").then((id) => {
		loadForm.uploadImage(req, res, id);
	});
});

router.post('/articleComment', function(req, res) {
	var comment= req.body.comment;
	console.log("creating article comment: ");
	
	var commentParams = {
		TableName: "ArticleComments",
		Item: {
			"articleId": parseInt(comment.articleId),
			"userId": comment.userId,
			"timestamp": comment.timestamp,
			"comment": comment.comment
		}
	}
	
	db.put2(commentParams).then((result) => {
		var response;
		//response.status = result;
		res.send(response);
	});
});

router.post('/article', function(req, res) {
	
	var article = req.body.article;
	
	generateId("article").then((id) => {
		var articleParams = {
			TableName: "Article",
			Item: {
				"articleId": id,
				"title": article.title,
				"author": article.author,
				"timestamp": article.timestamp,
				"body": article.body
			}
		}
		
		db.put2(articleParams).then((result) => {
			var response={};
			response.status = result;
			
			if(result == "success") {
				response.id = id;
			}
				
			res.send(response);
			
		});
	});
});

router.post('/rateIssue', function(req, res) { 
	var params = {
		TableName: "IssueRating",
		Item: {
			"issueID": req.body.issueId,
			"userID": req.body.userId,
			"rating": req.body.rating
		}
	}
	
	db.put2(params).then((result) => {
		response.status = result;		
		res.send(response);
	});
});

router.post('/changeIssueRating', function(req, res) {
	var params = {
		TableName: "IssueRatings",
		Key: {
			"issueID": req.body.issueID,
			"userID": req.body.userID
		},
		UpdateExpression: "set rating = :r",
		ExpressionAttributeValues: {
			":r": req.body.rating,
		}
	}
	
	db.update(params);
});

router.post('/createIssue', function(req, res) {
	generateId("issue").then((issueId) => {
		generateId("image").then((imageId) => {
			loadForm.createIssue(req, imageId).then((issueString) => {
				
				var response = {};
				console.log("issue: " + issueString);
				
				var issue = JSON.parse(issueString);
				var issueParams = {
					TableName: "Issue",
					Item: {
						"issueID": issueId,
						"coverImage": "https://s3-us-west-2.amazonaws.com/comicbashimages/" + imageId + ".jpg",
						"title": issue.title,
						"summary": issue.summary,
						"synopsis": issue.synopsis,
						"volume": parseInt(issue.volume),
						"issueNum": parseInt(issue.issueNum),
						"year": parseInt(issue.year),
						"bookId": parseInt(issue.bookId)
					}
				}
				
				db.put2(issueParams).then((result) => {
					response.status = result;
					
					if(result == "success") {
						response.issueId = issueId;
					}
					
					res.send(response);
				});
				
				var writers = issue.writer.split(',');
				var characters = issue.characters.split(',');
				var illustrators = issue.illustrators.split(',');
				
				var writerParams = {
					TableName: "IssueWriters",
					Item: {
						"issueID": issueId
					}
				}
				
				for(var i = 0; i < writers.length; i++) {
					writerParams.Item.writer = writers[i];
					
					db.put(writerParams);
				}
				
				var illustratorParams = {
					TableName: "IssueIllustrators",
					Item: {
						"issueID": issueId
					}
				}
				
				for(var k = 0; k < illustrators.length; k++) {
					illustratorParams.Item.illustrator = illustrators[k];
					
					db.put(illustratorParams);
				}
				
				var characterParams = {
					TableName: "IssueCharacters",
					Item: {
						"issueID": issueId
					}
				}
				
				for(var j = 0; j < characters.length; j++) {
					characterParams.Item.character = characters[j];
					
					db.put(characterParams);
				}
			});
		});
	});
});


router.post('/comment', function(req, res) {
	var comment= req.body.comment;
	var commentParams = {
		TableName: "Comments",
		Item: {
			"issueID": parseInt(comment.issueId),
			"userId": comment.userId,
			"timestamp": Date.now(),
			"comment": comment.comment,
			"rating":parseInt(comment.rating)
		}
	}
	
	db.put2(commentParams).then((result) => {
		var response;
		//response.status = result;
		res.send(response);
	});
});


router.post('/createBook', function(req, res) {	
	
	var response = {};
	
	generateId("book").then((id) => {
		console.log("creating book: " + id);
		
		var bookParams = {
			TableName: "Book",
			Item: {
				"bookID": id,
				"title": req.body.book.title,
				"publisher": req.body.book.publisher,
				"publishDate": req.body.book.publishDate
			}
		}
		
		db.put2(bookParams).then((result) => {
			response.status = result;
			
			if(result == "success") {
				response.id = id;
			}
			
			res.send(response);
		});
	});
});

router.post('/signIn', function(req, res) {
	var response = {};
	
	var user = req.body.user;
	
	var params = {
		TableName: "User",
		IndexName: "userpass",
		KeyConditionExpression: "username = :username and password = :password",
		ExpressionAttributeValues: {
			":username": user.username,
			":password": user.password
		}
	};
	
	
	db.query(params).then((data) => {
		if(data[0]) {
			response.signedIn = true;	
			response.userId = data[0].userID
			
			generateId("session").then((id) => {
				response.sessionId = id;
				res.send(response);
			});
			
		} else {
			response.signedIn = false;
			res.send(response);
		}
	});
});

router.post('/signUp', function(req, res) {
	//need to send a response
	console.log(req.body.user);
	
	var user = req.body.user;
	
	generateId("user").then((id) => {
		var userTableParams = {
			TableName: "User",
			Item: {
				"userID": id,
				"username": user.username,
				"password": user.password,
				"email": user.email
			}
		}
		
		db.put(userTableParams);
		
		var secParams = {
			TableName: "SecurityQuestions",
			Item: {
				"userID": id,
				"question1": user.question1,
				"answer1": user.answer1,
				"question2": user.question2,
				"answer2": user.answer2
			}
		}
		
		db.put(secParams);
		
		var favParams = {
			TableName: "UserFavorites",
			Item: {
				"userID": id,
				"issues": "0",
				"books": "0",
				"illustrators": "nobody",
				"authors": "nobody",
				"bio": "Start your bio",
				"profilePic": "http://via.placeholder.com/300x250",
				"username": user.username,
			}
		}
		
		db.put(favParams);
		
		var followsParams = {
			TableName: "UserFollows",
			Item: {
				"userID": id,
				"books": "0",
				"users": "0"
			}
		}
		
		db.put(followsParams);
		
		generateId("session").then((sessionId) => {
			var response = {};
			response.status = "success";
			response.userId = id;
			response.sessionId = sessionId;
			
			res.send(response);
		});
	});
});



var generateId = function(type) {
	
	var params = {
		TableName: "UID",
		Key:{
			"type": type,
		},
		UpdateExpression: "set id = id + :incr",
		ExpressionAttributeValues:{
			":incr": 1
		},
		ReturnValues:"UPDATED_NEW"
	};
	
	return new Promise((res, rej) => {		  
		db.update2(params).then(data => {
			res(parseInt(data.Attributes.id));
		}).catch(err => {
			rej(err);
		})
	})
};

module.exports = router;