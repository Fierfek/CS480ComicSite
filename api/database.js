var express = require('express');
var router = express.Router();
var aws = require("aws-sdk");

aws.config.update({
	"accessKeyId": "AKIAJAX7OK37HX73JBLA",
	"secretAccessKey": "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",
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

var docClient = new aws.DynamoDB.DocumentClient();

router.post('/book/create', function(req, res) {
	var params = {
		TableName: "Book",
		Item: {
			"bookID": req.bookID,
			"title": req.title,
			"issuesList": req.issuesList,
		}
	}
	
	docClient.put(params, function(err, data) {
		if(err) {
			console.log("Unable to add item. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			console.log("Added Item:" + JSON.stringify(data, null, 2));
		}
	});
});

router.get('/book', function(req, res) {
	var params = {
		TableName: "Book",
		ProjectionExpression: "bookID, title, issueList"
	}
	
	docClient.scan(params, function(err, data) {
		if(err) {
			console.log("Unable to scan the table. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			console.log("Scan success");
			res.send(data.Items);
			data.Items.forEach(function(book) {
				console.log(book.bookID + " | " + book.title);
			});
		}
	});
	
});

router.get('/', function(req, res) {
	console.log("get anything");
});

module.exports = router;