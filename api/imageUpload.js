var formidable = require('formidable');
var fs = require('fs');

var form = new formidable.IncomingForm();
form.uploadDir = path.join(__dirname + "/uploads");

var uploader = {};

uploader.uploadImage = function(){
	
	forms.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, fileName));
	});
	
	form.on('error', function(error) {
		console.log('An error has occured: \n' + err);
	});
	
	forms.on('end', function(err) {
		//res.send('success');
	});
	
	form.parse(req);
}