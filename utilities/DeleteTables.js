var aws = require("aws-sdk");

aws.config.update({
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

var dynamodb = new aws.DynamoDB();

var tableNames = [
	{TableName: "Book"},
	{TableName: "Comments"},
	{TableName: "Issue"},
	{TableName: "IssueCharacters"},
	{TableName: "IssueIllustrators"},
	{TableName: "IssueWriters"},
	{TableName: "SecurityQuestions"},
	{TableName: "User"},
	{TableName: "UserEvents"},
	{TableName: "UserFavorites"},
	{TableName: "UserFollows"}];

		
function errorLog(log) {
	console.error("Unable to create table. Error JSON:", JSON.stringify(log, null, 2));
}

function successLog(log) {
	console.log("Created table. Table description JSON:", JSON.stringify(log, null, 2));
}

function deleteAllTables() {
	for (var i = 0; i < tableNames.length; i++) {
		console.log(tableNames[i]);
		dynamodb.deleteTable(tableNames[5], function(err, data) {
			if (err) {
				errorLog(err);
			} else {
				successLog(data);
			}
		})
	}
}

deleteAllTables();