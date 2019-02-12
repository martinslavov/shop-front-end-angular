$(document).ready(function() {
	
	$(function(){
	    $("#lCart")
	    .on("click", function(){

			var urlPath = window.location.pathname.split("/");
			// console.log( urlPath );
			// console.log( urlPath[urlPath.length-1] );

			if(urlPath[urlPath.length-1] != "cart" ){

		    	if($("#messageBox").hasClass("active")){

		    		$("#messageBox").slideUp("slow");
					$("#messageBox").removeClass("active");

		    	}else{
				 	$("#messageBox").slideDown("fast",function(){
					           // $(this).delay(2000).slideUp("fast");
					        });
				 	$("#messageBox").addClass("active");
		    	}
		    }
	        
	    });

	});

    $(".main-content-ms").click(function(){
        $("#messageBox").slideUp("slow");
        $("#messageBox").removeClass("active");
    });


	$( ".addProductToCart" ).click(function() {
		// console.log("Popup message add");
		$.iaoAlert({msg: "The product has been added to cart",
	            type: "success",
	            mode: "light",})
	});

	$( ".removeProductToCart" ).click(function() {
		// console.log("Popup message remove");
		$.iaoAlert({msg: "The product has been removed from cart",
	            type: "error",
	            mode: "dark",})
	});


	$(function(){
		    $("#mobile-cart")
		    .on("click", function(){

				var urlPath = window.location.pathname.split("/");
				// console.log( urlPath );
				// console.log( urlPath[urlPath.length-1] );

				if(urlPath[urlPath.length-1] != "cart" ){

			    	if($("#messageBox-mobile").hasClass("active")){

			    		$("#messageBox-mobile").slideUp("slow");
						$("#messageBox-mobile").removeClass("active");

			    	}else{
					 	$("#messageBox-mobile").slideDown("fast",function(){
						           // $(this).delay(2000).slideUp("fast");
						        });
					 	$("#messageBox-mobile").addClass("active");
			    	}
			    }
		        
		    });

		});

	    $(".main-content-ms").click(function(){
	        $("#messageBox-mobile").slideUp("slow");
	        $("#messageBox-mobile").removeClass("active");

	        // $("#messageBox-mobile").slideUp("slow");
	        // $("#messageBox-mobile").removeClass("active");

	    });
	// urlPath = window.location.pathname.split("/");

});


	// $(window).on('hashchange', function(e){
	// 	console.log("url has been changed");
	//  // Your Code goes here
	// });

// on click get position on cart 









// $(document).ready(function() {
// 	$(function(){
// 	    $("button")
// 	    .on("click", function(){
// 	        $("#lCart")
// 	        .slideDown("fast",function(){
// 	           // $(this).delay(2000).slideUp("fast");
// 	         });
	        
// 	        // redirect to new page here
	        
// 	    });

// 	});
// });