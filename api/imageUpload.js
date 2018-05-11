var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

var uploader = {};

uploader.uploadImage = function(req, res){
	
	var form = new formidable.IncomingForm();
	
	form.uploadDir = path.join(__dirname + "/uploads");
	
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, fileName));
	});
	
	form.on('error', function(error) {
		console.log('An error has occured: \n' + err);
	});
	
	form.on('end', function(err) {
		//res.send('success');
	});
	
	form.parse(req);
}

module.exports = uploader;