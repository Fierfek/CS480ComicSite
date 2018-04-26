var aws = require("aws-sdk");

aws.config.update({
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

var dynamodb = new aws.DynamoDB();

//Definition for book table
var bookTable = {
	TableName: "Book",
	AttributeDefinitions: [
		{
			AttributeName: "bookID",
			AttributeType: "N"
		},
		{
			AttributeName: "title",
			AttributeType: "S"
		},
	],
	KeySchema: [
		{
			AttributeName: "bookID", //Primary Key
			KeyType: "HASH"
		},
		{
			AttributeName: "title", //Sort Key
			KeyType: "RANGE"
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var SecurityQuestions = {
	TableName: "SecurityQuestions",
	AttributeDefinitions: [
		{
			AttributeName: "userID",
			AttributeType: "N"
		},
	],
	KeySchema: [
		{
			AttributeName: "userID", //Primary Key
			KeyType: "HASH"
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var UserFavorites = {
	TableName: "UserFavorites",
	AttributeDefinitions: [
		{
			AttributeName: "userID",
			AttributeType: "N"
		},
	],
	KeySchema: [
		{
			AttributeName: "userID", //Primary Key
			KeyType: "HASH"
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var UserFollows = {
	TableName: "UserFollows",
	AttributeDefinitions: [
		{
			AttributeName: "userID",
			AttributeType: "N"
		},
	],
	KeySchema: [
		{
			AttributeName: "userID", //Primary Key
			KeyType: "HASH"
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var UserEvents = {
	TableName: "UserEvents",
	AttributeDefinitions: [
		{
			AttributeName: "userID",
			AttributeType: "N"
		},
	],
	KeySchema: [
		{
			AttributeName: "userID", //Primary Key
			KeyType: "HASH"
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var Comments = {
	TableName: "Comments",
	AttributeDefinitions: [
		{
			AttributeName: "issueID",
			AttributeType: "N"
		},
		{
			AttributeName: "timestamp",
			AttributeType: "S"
		},
	],
	KeySchema: [
		{
			AttributeName: "issueID", //Primary Key
			KeyType: "HASH"
		},
		{
			AttributeName: "timestamp", //Sort Key
			KeyType: "RANGE"
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var userTable = {
	TableName: "User",
	AttributeDefinitions: [
		{
			AttributeName: "userID",
			AttributeType: "N"
		},
		{
			AttributeName: "username",
			AttributeType: "S"
		},
		{
			AttributeName: "email",
			AttributeType: "S"
		},
		{
			AttributeName: "password",
			AttributeType: "S"
		},
	],
	KeySchema: [
		{
			AttributeName: "userID", //Primary Key
			KeyType: "HASH"
		},
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "userpass",
			KeySchema: [
				{
					AttributeName: "username", //Primary Key
					KeyType: "HASH",
				},
				{
					AttributeName: "password", //Sort Key
					KeyType: "RANGE",
				}
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
		{
			IndexName: "emailpass",
			KeySchema: [
				{
					AttributeName: "email", //Primary Key
					KeyType: "HASH",
				},
				{
					AttributeName: "password", //Sort Key
					KeyType: "RANGE",
				}
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	},
};

var IssueTable = {
	TableName: "Issue",
	AttributeDefinitions: [
		{
			AttributeName: "issueID",
			AttributeType: "N"
		},
		{
			AttributeName: "title",
			AttributeType: "S"
		},
		{
			AttributeName: "volume",
			AttributeType: "N"
		},
		{
			AttributeName: "year",
			AttributeType: "N"
		},
	],
	KeySchema: [
		{
			AttributeName: "issueID", //Primary Key
			KeyType: "HASH"
		},
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "titlevolume",
			KeySchema: [
				{
					AttributeName: "title", //Primary Key
					KeyType: "HASH",
				},
				{
					AttributeName: "volume", //Sort Key
					KeyType: "RANGE",
				}
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
		{
			IndexName: "yeartitle",
			KeySchema: [
				{
					AttributeName: "year", //Primary Key
					KeyType: "HASH",
				},
				{
					AttributeName: "title", //Sort Key
					KeyType: "RANGE",
				}
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	},
};

var IssueCharacters = {
	TableName: "IssueCharacters",
	AttributeDefinitions: [
		{
			AttributeName: "issueID",
			AttributeType: "N"
		},
		{
			AttributeName: "character",
			AttributeType: "S"
		},
	],
	KeySchema: [
		{
			AttributeName: "issueID", //Primary Key
			KeyType: "HASH"
		}
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "by-character",
			KeySchema: [
				{
					AttributeName: "character", //Primary Key
					KeyType: "HASH",
				},
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var IssueWriters = {
	TableName: "IssueWriters",
	AttributeDefinitions: [
		{
			AttributeName: "issueID",
			AttributeType: "N"
		},
		{
			AttributeName: "writers",
			AttributeType: "S"
		}
	],
	KeySchema: [
		{
			AttributeName: "issueID", //Primary Key
			KeyType: "HASH"
		},
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "by-writer",
			KeySchema: [
				{
					AttributeName: "writers", //Primary Key
					KeyType: "HASH",
				},
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

var IssueIllustrators = {
	TableName: "IssueIllustrators",
	AttributeDefinitions: [
		{
			AttributeName: "issueID",
			AttributeType: "N"
		},
		{
			AttributeName: "illustrators",
			AttributeType: "S"
		},
	],
	KeySchema: [
		{
			AttributeName: "issueID", //Primary Key
			KeyType: "HASH"
		}
	],
	GlobalSecondaryIndexes: [
		{
			IndexName: "by-illustrator",
			KeySchema: [
				{
					AttributeName: "illustrators", //Primary Key
					KeyType: "HASH",
				},
			],
			Projection: {
				ProjectionType: "ALL"
			},
			ProvisionedThroughput: {
				ReadCapacityUnits: 3,
				WriteCapacityUnits: 3,
			},
		},
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 3,
		WriteCapacityUnits: 3,
	}
};

function errorLog(log) {
	console.error("Unable to create table. Error JSON:", JSON.stringify(log, null, 2));
}

function successLog(log) {
	console.log("Created table. Table description JSON:", JSON.stringify(log, null, 2));
}

dynamodb.createTable(bookTable, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(userTable, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(UserEvents, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(SecurityQuestions, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(UserFavorites, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(UserFollows, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(Comments, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(IssueTable, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(IssueCharacters, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(IssueIllustrators, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});

dynamodb.createTable(IssueWriters, function(err, data) {
	if (err) {
		errorLog(err);
	} else {
		successLog(data);
	}
});