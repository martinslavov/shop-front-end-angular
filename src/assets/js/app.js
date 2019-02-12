$(document).ready(function(){

	$("[data-toggle=popover]").popover({
        html : true,
        // trigger: 'focus',
        container: 'body',
        // class:'whatever-you-want',
        content: function() {
            var content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
        }
    }); 
    
});








	// $("[data-toggle=popover]").popover({
 //        html : true,
 //        // trigger: 'focus',
 //        // container: 'body',
 //        content: function() {
 //            var content = $(this).attr("data-popover-content");
 //            return $(content).children(".popover-body").html();
 //        }
 //    }); 





 // $("[data-toggle=popover]").popover({
 //        html : true,
 //        // trigger: 'focus',
 //        content: function() {
 //            var content = $(this).attr("data-popover-content");
 //            return $(content).children(".popover-body").html();
 //        }
 //    });