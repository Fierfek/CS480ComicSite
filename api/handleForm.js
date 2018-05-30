var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var aws = require('aws-sdk');
var db = require('./db.js');

// Set the region 
aws.config.update({
	accessKeyId: "AKIAJAX7OK37HX73JBLA",
	secretAccessKey: "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",
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

// Create S3 service object
s3 = new aws.S3({apiVersion: '2006-03-01'});

var s3bucketName = "comicbashimages"

var uploader = {};

uploader.parseProfile = function(req, imageId) {
	
	var profile = {};
	
	return new Promise((res, rej) => {
		var updates = {};
		
		var form = new formidable.IncomingForm();

		form.parse(req);
		
		form.on('fileBegin', function(name, file) {
			file.path = __dirname + '/uploads/' + file.name;
		});
		
		form.on('field', function(name, value) {
			
			console.log('found: ' + name);
			
			switch(name) {
				case "name": profile.name = value; break;
				case "bio": profile.bio = value; break;
			}
		});		
		
		form.on('file', function(name, file) {
			fs.rename(file.path, __dirname + "/uploads/" + imageId + ".jpg", function(err) {
				if ( err ) {
					console.log('ERROR: ' + err);
				} else {
					var fileStream = fs.createReadStream(__dirname + "/uploads/" + imageId + ".jpg");
					
					var uploadParams = {
						Bucket: s3bucketName,
						Key: path.basename(imageId + ".jpg"),
						Body: fileStream,
						ACL: 'public-read'
					};
					
					s3.upload (uploadParams, function (err, data) {
						if (err) {
							console.log("Error", err);
						} if (data) {
							console.log("Upload Success", data.Location);
						}
						
						fs.unlink(__dirname + "/uploads/" + imageId + ".jpg", function(error) {
							if (error) {
								console.log('unable to delete image');
							}
						});
						
						res(JSON.stringify(profile));
					});	
				}
			});
		});
	});
}

uploader.createIssue = function(req, imageId) {
	return new Promise((res, rej) => {
		var issue = {};
		
		var form = new formidable.IncomingForm();

		form.parse(req);
		
		form.on('fileBegin', function(name, file) {
			file.path = __dirname + '/uploads/' + file.name;
		});
		
		form.on('field', function(name, value) {			
			issue.rating = 0;
			
			console.log(name + ": " + value);
			
			switch(name) {
				case "title":
					issue.title = value;
					break;
				case "writer":
					issue.writer = value;
					break;
				case "characters":
					issue.characters = value;
					break;
				case "illustrators":
					issue.illustrators = value;
					break;
				case "year":
					issue.year = value;
					break;
				case "volume":
					issue.volume = value;
					break;
				case "issueNum":
					issue.issueNum = value;
					break;
				case "summary":
					issue.summary = value;
					break;
				case "synopsis":
					issue.synopsis = value;
					break;
				case "bookId":
					issue.bookId = value;	
					break;
			}
		});

		form.on('file', function (name, file){
			console.log('Uploaded ' + file.name);
			
			
			fs.rename(file.path, __dirname + "/uploads/" + imageId + ".jpg", function(err) {
				if ( err ) {
					console.log('ERROR: ' + err);
				} else {
					var fileStream = fs.createReadStream(__dirname + "/uploads/" + imageId + ".jpg");
					
					var uploadParams = {
						Bucket: s3bucketName,
						Key: path.basename(imageId + ".jpg"),
						Body: fileStream,
						ACL: 'public-read'
					};
					
					s3.upload (uploadParams, function (err, data) {
						if (err) {
							console.log("Error", err);
						} if (data) {
							console.log("Upload Success", data.Location);
						}
						
						fs.unlink(__dirname + "/uploads/" + id + ".jpg", function(error) {
							if (error) {
								console.log('unable to delete image');
							}
						});
						
						res(JSON.stringify(issue));
					});	
				}
			});
		});
	})
}

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

module.exports = uploader;