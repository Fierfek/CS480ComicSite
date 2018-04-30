// set up
var express 		= require('express');
var app 			= express();
var aws 			= require("aws-sdk");
var bodyParser 		= require('body-parser');
//var methodOverride 	= require('method-override');


// configuration
var port = process.env.PORT || 8080;

var dynamodb = new aws.DynamoDB();
aws.config.update({
	region: "us-west-2",
	//endpoint: "http://localhost:8000"
});

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extend:true}));
//app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app);


//start app
app.listen(port);
console.log("App listening on port" + port);

//expose app
exports = module.exports = app;