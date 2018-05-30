var express = require('express');
var router = express.Router();
var db = require('./db.js');

var tableName = "IssueRatings";

router.get('/:issueID/:userID', function(req, res) {
	var params = {
		TableName: tableName,
		Key: {
			"issueID": parseInt(req.params.issueID),
			"userID": parseInt(req.params.userID)
		}
	}
	
	db.get(params, res);
});

module.exports = router;