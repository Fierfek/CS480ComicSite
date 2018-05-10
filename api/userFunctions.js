var express = require('express');
var router = express.Router();
var db = require('./db.js');


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
			//response.cookie  Send cookie
		} else {
			response.signedIn = false;
		}
		res.send(response);
	});
});

router.post('/signUp', function(req, res) {
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
				"question2": user.answer2,
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
				"profilePic": "http://via.placeholder.com/300x250"
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