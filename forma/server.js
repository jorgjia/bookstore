// Librarite qe kane konstruktore dhe funksione
var express = require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var FormSchema=new mongoose.Schema({
	emri:String,
	mbiemri:String,
	email:String
});

var Form=mongoose.model('Form',FormSchema);
	
mongoose.connection.on('error', function(){
	if (err){
		console.log(err);
		mongoose.disconnect();
	}	
});
	
mongoose.connection.once('open',function(){
	console.log('database connection');
		
	app.post('/',function(){
		var form={
			emri:req.body.emri,
			mbiemri:req.body.mbiemri,
			email:req.body.email,
		};
			
		Form.create(form,function(err,result){
			if(err){
				console.log(err);	
			}
			else{
				console.log(result);
				res.status(201).json({message:"web form submited"});
			}
		});
	});
		
	app.post("/find", function(req, res) {
		Form.findOne({emri: req.body.emri}, function(err, result) {
			if (err) console.error(err);
			else res.status(200).json(result);
		});
	});
});

mongoose.connect("mongodb://webform:webform@ds141937.mlab.com:41937/webform").then(function(){
	app.listen(process.env.PORT || 7000);
});