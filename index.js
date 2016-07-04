var express = require('express');
var nodemailer = require("nodemailer");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/sendmail', function(request, response){
  console.log("holaaaa");
  alert("hola");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function sendmail(req, res){
	console.log('sendmail');

	if(req.method.toLowerCase() == 'post'){
		console.log('start mailing');

		var form = new formidable.IncomingForm();

		form.parse(req, function(error, field, files){
			var smtpTransport = nodemailer.createTransport("SMTP",{
			   service: "Gmail",
			   auth: {
			       user: "utnprogramacionjcp@gmail.com",
			       pass: "123456987utn"
			   }
			});

			smtpTransport.sendMail({
			   from: "David <davidfrias01@gmail.com>", // sender address
			   to: field.email, // comma separated list of receivers
			   subject: "Mail from Nodemailer", // Subject line
			   text: field.description// plaintext body
			}, function(error, response){
			   if(error){
			       console.log(error);
			   }else{
			       console.log("Mail sent: " + response.message);
			   }
			});
		});
	}
}
