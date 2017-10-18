$(document).ready(function(){

	var searchURL =  'http://localhost:3000/search';
	var registerURL =  'http://localhost:3000/register';
	var data;
	console.log("load");
	var loQuiero =[];
	var userpath = "";
   	

   	if(action == "login"){

   		$("#login").fadeIn();

   	}else{

   		$("#MyLetter").fadeIn();
   	}
	
	

	$("#search").submit(function(e){
        e.preventDefault();
        console.log("searching");
        var keyword = $("input",e.target).val();


        $("#productos-holder").fadeOut();
        $("#productos-holder").html("");

        data = [];
		$.get(searchURL, { keyword: keyword }, function( data ) {

			var data = data;
			for(item in data){				

			var title = data[item].title;
			var image = data[item].image;
			var cost = data[item].cost;
			var url = data[item].url;
			var cardTemplate =  '<div class="card"><img class="card-img-top" src="'+image+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+title+'e</h4><p class="card-text">'+title+'</p></div><div class="card-footer"><small class=" text-danger">$'+cost+'<button type="button" class="product-btn btn btn-danger float-right">Lo quiero</button></small> </div></div>';


			//<a href="https://www.liverpool.com.mx/'+url+'">
			$("#productos-holder").append(cardTemplate);

			}
			
			$("#productos-holder").fadeIn();
	
		$(".product-btn").on( "click", function(e) {
  			console.log(e.target);
  			$(e.target).removeClass("btn-danger")
  			$(e.target).addClass("btn-secondary")
  			$(e.target).html("No lo quiero");
			
			
  			var producto = data[$(this).closest('.card').index()];

  			loQuiero.push(producto);
  			$("#cartita").prepend('<a target="_blank" href="https://www.liverpool.com.mx'+producto.url+'" class="list-group-item list-group-item-action">'+producto.title+'   <small class=" text-danger">$'+producto.cost+'</span>          <img src="'+producto.image+'" width="40px" style="margin-left:5px;" /></a>');



  			//$("#cartita").append('<a href="#" class="list-group-item list-group-item-action">Cras justo odio</a>');
		});

		});


    });


	$("#register").submit(function(e){
        e.preventDefault();
        console.log("register");
        var email = $("input",e.target).val();
        if(email){
        	console.log(email);
        	userpath = email;
			$.get(registerURL, { user: email }, function( data ) {
				console.log(data);
				if(data){

					$("#url-holder").attr("placeholder","http://localhost:3000/user/"+userpath)
					$("#login").fadeOut(function(){
						$("#browser").fadeIn();
					});
					

				}
				

			});		        	

        }	    	

    });


$("#guardar").on('click',function(e){
        e.preventDefault();
   		console.log(loQuiero);

   		$.get('http://localhost:3000/save', { products: loQuiero }, function( data ) {


   			window.location.replace("http://localhost:3000/user/"+userpath);


   		});


    });



})




