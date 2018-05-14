var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var aws = require('aws-sdk');
var db = require('./db.js');
var sharp = require('sharp');

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

uploader.createIssue = function(req, imageId) {
	return new Promise((res, rej) => {
		var issue = {};
		
		var form = new formidable.IncomingForm();

		form.parse(req);
		
		form.on('fileBegin', function (name, file){
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
			
			var fileStream = fs.createReadStream(file.path);
			
			sharp(file.path)
			//.resize(225, 250);
			.toFile(__dirname + "/uploads/" + imageId + ".jpg")
			.then(function() {
				
				var fileStream2 = fs.createReadStream(__dirname + "/uploads/" + imageId + ".jpg");
				
				var uploadParams = {
					Bucket: s3bucketName,
					Key: path.basename(imageId + ".jpg"),
					Body: fileStream2,
					ACL: 'public-read'
				};
				
				s3.upload (uploadParams, function (err, data) {
					if (err) {
						console.log("Error", err);
					} if (data) {
						console.log("Upload Success", data.Location);
					}
					res(JSON.stringify(issue));
				});
			});		
		});
	})
}

uploader.uploadImage = function(req, res, id){
	
	var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
		file.path = __dirname + '/uploads/' + file.name;
	});
	
	form.on('field', function(name, value) {
		console.log(name + ": " + value);
	});

	form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
		
		var fileStream = fs.createReadStream(file.path);
		
		
		sharp(file.path)
		//.resize(300, 250)
		.toFile(__dirname + "/uploads/" + id + ".jpg")
		.then(function() {
			console.log("resized");
			
			var fileStream2 = fs.createReadStream(__dirname + "/uploads/" + id + ".jpg");
			
			var uploadParams = {
				Bucket: s3bucketName,
				Key: path.basename(id + ".jpg"),
				Body: fileStream2,
				ACL: 'public-read'
			};
			
			s3.upload (uploadParams, function (err, data) {
				if (err) {
					console.log("Error", err);
				} if (data) {
					console.log("Upload Success", data.Location);
				}
			});
		});		
    });
}

module.exports = uploader;