var express=require('express');
var bodyparser=require('body-parser');
var app=new express();
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
app.use(express.static('public'));



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended:true
}));

mongoose.connect("mongodb://jori:jori@ds147799.mlab.com:47799/bookstore");

mongoose.connection.once("open", function() {
	console.log("database connected");

	var SignupSchema = new mongoose.Schema({
		email:String,
		username:String,
		password:String
	});

	var LoginSchema = new mongoose.Schema({
		username:String,
		password:String
	});

	var Login=mongoose.model('Login',LoginSchema);
	var Signup=mongoose.Schema('Signup',SignupSchema);

	app.post('/signup',function(req,res) {			
		var username=req.body.username;
		var email=req.body.email;
		var password=req.body.password;

		Signup.create({
			username:username,
			email:email,
			password:password
		},function(err,item){
			if(err){

				console.log(err);
			}else{
				console.log(item);
			}
		});
	});

	app.post('/login',function(req,res){
		var username=req.body.username;	
		var password=req.body.password;
		login.findOne({
			username:username,
			password:password
		},function(err,item){
			if(err){
				console.log(err);
			}else{
				console.log(item);
			}
		});
	});
});

app.listen(7000, function() {
	console.log("Listening to port 7000");
});


