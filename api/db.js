var aws = require("aws-sdk");

aws.config.update({
	accessKeyId: "AKIAJAX7OK37HX73JBLA",
	secretAccessKey: "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",
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

var docClient = new aws.DynamoDB.DocumentClient();

var db = {};

db.put = function(params) {
	return docClient.put(params, function(err, data) {
		if(err) {
			console.log("Unable to add item. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			console.log("Added Item:" + JSON.stringify(data, null, 2));
		}
	});	
};

db.put2 = function(params) {
	return new Promise((res, rej) => {		  
		docClient.put(params, function(err, data) {
			if (err) {
				console.log("Unable to add item. Error JSON: " + JSON.stringify(err, null, 2));
				res("error");
			} else {
				console.log("Added Item:" + JSON.stringify(data, null, 2));
				res("success");
			}
		});
	})
};

db.get = function (params, res) {
	return docClient.get(params, function(err, data) {
		if(err) {
			console.log("Unable to read item. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			res.send(data.Item);
		}
	});
};

db.get2 = function(params) {
	return new Promise((res, rej) => {		  
		docClient.get(params, function(err, data) {
			if (err) {
				console.error("Unable to get. Error:", JSON.stringify(err, null, 2));
			} else {
				res(data);
			}
		});
	})
};

db.query = function(params) {
	return new Promise((res, rej) => {		  
		docClient.query(params, function(err, data) {
			if (err) {
				console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
			} else {
				res(data.Items);
			}
		});
	})
};

db.scan = function (params, res) {
	docClient.scan(params, function(err, data) {
		if(err) {
			console.log("Unable to scan the table. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			res.send(data.Items);
		}
	});
};

db.del = function(params) {
	return docClient.delete(params, function(err, data) {
		if(err) {
			console.log("Unable to delete item. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			console.log("Added Item:" + JSON.stringify(data, null, 2));
		}
	});
};

db.update = function(params) {
	return docClient.update(params, function(err, data) {
		if(err) {
			console.log("Unable to update item. Error JSON: " + JSON.stringify(err, null, 2));
		} else {
			console.log("Added Item:" + JSON.stringify(data, null, 2));
		}
	});
};

db.update2 = function(params) {
	return new Promise((res, rej) => {		  
		docClient.update(params, function(err, data) {
			if (err) {
				console.error("Unable to query. Error:", JSON.stringify(err, null, 2));	
			} else {
				res(data);
			}
			
		});
	})
};

module.exports = db;