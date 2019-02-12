//Start Section
$(".productBox").mouseover(function () { 
	// console.log(".productBox - mouseover");
		  $(this).css({
		'border' : '1px solid black',
		'background' : 'black',
		'opacity' : '0.3',
	    'filter' : 'alpha(opacity=50)',
    });	
});		

$(".productBox").mouseout(function () { 
		// console.log(".productBox - mouseout");
 		  $(this).css({
				'background' : 'white',
				'opacity' : '1',
				// 'border' : 'none',
           	});	

});

$(".middleMs").mouseover(function () { 			
	// console.log(".middleMs - mouseover");

	$(this).prev().css({
		'border' : '1px solid black',
		'background' : 'black',
		'opacity' : '0.3',
	    'filter' : 'alpha(opacity=50)',
   	});	

});
//End Section

// $(document).ready(function() {
    // $(".middleMs").hover(
    //         // $(".productBox").css({
    //         	$(".productBox").css({
				// 	'border' : '1px solid black',
				// 	'background' : 'black',
				// 	'opacity' : '0.3',
				//     'filter' : 'alpha(opacity=50)',
	   //          });
       
    //  );

    // https://stackoverflow.com/questions/18287056/apply-hover-simultaneously-to-different-part-of-text-with-css
	// http://jsfiddle.net/v98uS/
    // console.log("products jquery is loaded");
	

    // $(".middleMs").mouseover(function () { 
    // 	console.log(".middleMs - mouseover");
    //  		$(".productBox").css({
				// 	'border' : '1px solid black',
				// 	'background' : 'black',
				// 	'opacity' : '0.3',
				//     'filter' : 'alpha(opacity=50)',
	   //         	});	

    // });

// });

