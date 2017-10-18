var express = require("express");
var session = require('express-session');
var app  = express();
var path = require("path");


var request = require("request")
var HTMLParser = require('fast-html-parser');
var baseURL = "https://www.liverpool.com.mx/tienda/?s="
var keyword = "";
var querry =baseURL+keyword;
var productos = [];

var MongoClient = require('mongodb').MongoClient;
var myCollection;

var NodeSession = require('node-session');


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}))
app.set('view engine', 'ejs');



console.log("::::::: Setup :::::::");


app.use('/statics', express.static('statics'));




app.get('/',function(req,res){

	 if(req.session.user){

	 	console.log("registrado");
	 	console.log(req.session.user);
	 	console.log("::::::: Redirect: user :::::::")	
	 	res.redirect('/user/'+req.session.user.user);  

	 }else{

	 	console.log("no registrado")
	 	console.log("::::::: Request: Index :::::::")	
	 	res.render('index',{action:'login'});
	 }


	console.log("::::::: Request: Index :::::::")	
  	//res.sendFile(path.join(__dirname+'/index.html'));

  	//res.render('index');

  //__dirname : It will resolve to your project folder.
});

app.get('/search',function(req,res){
	console.log("::::::: Request: Search :::::::")
	if(req.param('keyword') != ""){
		var keyword = req.param('keyword');
		console.log("::::::: Searching keyword: "+keyword+" :::::::");

		querry =baseURL+keyword;

		request({
		    url: querry,
		    json: true
		}, function (error, response, html) {

			productos = [];

		    if (!error && response.statusCode === 200) {

			    console.log("::::::: Loaded data :::::::");
				var root = HTMLParser.parse(html);

				var elements = root.querySelectorAll('.product-cell');
				var total = elements.length;
				console.log("::::::: Results: "+total+" :::::::")

				for(var x = 0; x <elements.length; x++){

					var producto = {};
					producto.title = elements[x].querySelector('a').attributes['title']
					producto.url = elements[x].querySelector('a').attributes['href']
					producto.image = elements[x].querySelector('img').rawAttributes['data-original'];
					var cost = elements[x].querySelector('.price-amount').text;
					cost = cost.slice(0, -2);
					producto.cost = cost;
					productos.push(producto);

				}
				console.log("::::::: Feeding data :::::::")
				res.setHeader('Content-Type', 'application/json');
	   			res.send(JSON.stringify(productos, null, 3));


		    }
		});		

	}
  		
	

});

app.get('/register',function(req,res){

	console.log("::::::: Request: Rregister :::::::")

	var someAttribute = req.session.perrito;
 	console.log("This will print the attribute I set earlier: "+ someAttribute);



	if(req.param('user') != ""){
		var user = req.param('user');
		console.log("::::::: Registering User: "+user+" :::::::");		

		var db = MongoClient.connect('mongodb://127.0.0.1:27017/liverpool', function(err, db) {
	    if(err){
			 throw err;
		}else{
			console.log("::::::: connected to the mongoDB :::::::");
			myCollection = db.collection('liverpool_users');
			myCollection.findOne({user:user}, function(err, result) {
	    		if (err) throw err;
	    	
		    		if(result){
		    			console.log("::::::: User Already exist :::::::");

		    			//req.session.put(result);

		    			req.session.user = result;
	 			
						res.send(JSON.stringify(result, null, 3));	    				

		    		}else{
						myCollection.insert({user: user, description: "liverpool site"}, function(err, e) {
		    				if(err)
		        				throw err;
		    				console.log("::::::: User saved :::::::");
		    				if(e.result.ok){

		    					var result = e.ops[0];


		    					req.session.user = result;

		    					res.send(JSON.stringify(result, null, 3));	
		    				}
		    				
						});	
		    			
		    		}	    	
	   		db.close();


	  		});					


		}

		/*if(err)
	        throw err;
	        throwconsole.log("connected to the mongoDB !");
		    myCollection = db.collection('liverpool_users');
			myCollection.insert({user: "vinci1618@gmail.com", description: "liverpool site"}, function(err, result) {
	    	if(err)
	        	throw err;
	    	console.log("entry saved");
		});

		myCollection.findOne({}, function(err, result) {
	    	if (err) throw err;
	    	console.log(result);
	   		db.close();
	  	});*/
  	
	  });

	}

  //res.sendFile(path.join(__dirname+'/sitemap.html'));
});

app.get('/save',function(req,res){


	var products = req.param('products');

	console.log(products);

	
	var db = MongoClient.connect('mongodb://127.0.0.1:27017/liverpool', function(err, db) {

	myCollection = db.collection('liverpool_productos');
	myCollection.insert({user: req.session.user.user, products: products}, function(err, e) {

			console.log("guardado "+ req.session.user.user);
			res.send(JSON.stringify({success:true}, null, 3));	

	});


	});





});




app.get('/user/:userId',function(req,res){



	//console.log(req.session.user.user);

	var parametros = req.params.userId;
	console.log(parametros)

	var db = MongoClient.connect('mongodb://127.0.0.1:27017/liverpool', function(err, db) {

		myCollection = db.collection('liverpool_productos');
		myCollection.findOne({user: parametros}, function(err, result) {

				if(result){

					res.render('letter',{action:'list', products:result.products});

				}else{

					 	res.redirect('/'); 

				}			  


		});
	});

});



app.listen(3000);

console.log("Running at Port 3000");







function getData(){

	request({
    url: querry,
    json: true
}, function (error, response, html) {
	productos = [];
	producto = [];
    if (!error && response.statusCode === 200) {

	    console.log("::::::: Load data :::::::");
		var root = HTMLParser.parse(html);

		var elements = root.querySelectorAll('.product-cell');
		var total = elements.length;
			console.log(total)

		for(var x = 0; x <elements.length; x++){

			var producto = [];
			producto.title = elements[x].querySelector('a').attributes['title']
			producto.url = elements[x].querySelector('a').attributes['href']
			producto.image = elements[x].querySelector('img').rawAttributes['data-original'];
			producto.cost = elements[x].querySelector('.price-amount').text;
			productos.push(producto);

		}
		
		console.log("::::::: Data processed :::::::");
		


    }
});

}

