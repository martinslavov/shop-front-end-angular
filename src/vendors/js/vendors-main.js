$(document).ready(function() {

	// Initialize animate
	new WOW().init();

    // Section Start Remove # from url
    $(window).on('hashchange', function(e){
        history.replaceState ("", document.title, e.originalEvent.oldURL);
    });
    // Section End Remove # from url

	// Stick the header at top on scroll
  	$("#header").sticky({topSpacing:0, zIndex: '9999'});
	// Start Mobile Navigation

	var isMobile = window.matchMedia("only screen and (max-width: 760px)");
	if (isMobile.matches) {

	}

  	$(document).on('click', '#mobile-nav-toggle', function(e){
		if (isMobile.matches) {
			$('body').toggleClass('mobile-nav-active');
		    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
		    $('#mobile-body-overly').toggle();
		}
	});

	$(document).on('click', '#li-lang', function(e){
		if (isMobile.matches) {
			$('body').toggleClass('mobile-nav-active');
		    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
		    $('#mobile-body-overly').toggle();
		}
	});

	$(document).on('click', '#li-shop', function(e){
		if (isMobile.matches) {
			$('body').toggleClass('mobile-nav-active');
		    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
		    $('#mobile-body-overly').toggle();
		}
	});

	$(document).on('click', '#li-cart', function(e){
		if (isMobile.matches) {
			$('body').toggleClass('mobile-nav-active');
		    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
		    $('#mobile-body-overly').toggle();
		}
	});

	// Section Start - On Scroll 
	// TO DO - да се зануляват настройките при resize
	var iScrollPos = 0;
	$(window).scroll(function () {

		// if ($(document).scrollTop() == 0 && $(window).width() > 768) {
	    if ($(document).scrollTop() < 53 && $(window).width() > 768) {
        	// changed
        	// $('.nav-menu-title li a').css("color", "white");
        	$('.nav-menu-title li a').css("color", "black");
        	$("#header").css({
						    "opacity": "1",
						    "background": ""
						});
        	$('.logo-moniks img').css("width", "80");
        // } else if($(document).scrollTop() > 0 && $(window).width() > 768) {
	    } else if($(document).scrollTop() > 53 && $(window).width() > 768) {
	        $('.nav-menu-title li a').css("color", "black");
	        $("#header").css({
						    "opacity": "0.9",
						    "background": "white"
						});
	        $('.logo-moniks img').css("width", "60");
	    }

	    // Section Start - Check if device is mobile
	    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
	    if (isMobile.matches) {
	    	// Start Section - Detect Scrol Up/Down
		    var iCurScrollPos = $(this).scrollTop();
		    if (iCurScrollPos > iScrollPos) {
		        //Scrolling Down
		        // $('#mobile-nav-toggle').hide();
		        // console.log('down');
		    } else {
		       //Scrolling Up
		       $('#mobile-nav-toggle').show();		      
		       // console.log('up');
		    }
		    iScrollPos = iCurScrollPos;
		    // End Section - Detect Scrol Up/Down
	    }
		// Section End - Check if device is mobile
	}); 
	// Section End - On Scroll 

	// Section Start - Smooth scrolling
	  $(function() {
	    $('a[href*="#"]:not([href="#"])').click(function() {
	      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	        var target = $(this.hash);
	        console.log(target);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

	        if (target.length) {
	          $('html, body').animate({
	            scrollTop: target.offset().top
	          }, 2000, 'easeInOutExpo');

	          if ( $(this).parents('.nav-menu').length ) {
	            $('.nav-menu .menu-active').removeClass('menu-active');
	            $(this).closest('li').addClass('menu-active');
	          }

	          if ( $('body').hasClass('mobile-nav-active') ) {
	              $('body').removeClass('mobile-nav-active');
	              $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
	              $('#mobile-body-overly').fadeOut();
	          }
	          return false;
	        }
	      }
	    });
	  });
	 // Section End - Smooth scrolling

    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
    	$('#lLang').addClass('change-lang-main');
        $('#mobile-nav-toggle').css("z-index", "9999");
    	$('.home').css("background-color", "#dc3545");
        $('.home').css("z-index", "9998");
        $('#home').addClass("fixed-top");        
        $('#header').css("opacity", "0");
        $('.breadcrumb-ms').css("margin-top", "70px");
       	$('#mobile-cart').css("display", "block");
    }else{
    	console.log('window resize');
    	$('#lLang').removeClass('change-lang-main');
    	$('.home').css("background-color", "white");
        $('.home').removeClass("fixed-top");
        $('#mobile-cart').css("display", "none");
    } 
});

$(window).resize(function() {
	var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
    	$('#mobile-nav-toggle').css("z-index", "9999");
    	$('.home').css("background-color", "#dc3545");
        $('.home').css("z-index", "9998");
        $('#home').addClass("fixed-top");        
        $('#header').css("opacity", "0");
        $('.breadcrumb-ms').css("margin-top", "70px");
    }else{
    	$('#lLang').removeClass('change-lang-main');
    	
    	$('.home').css("background-color", "white");
        $('.home').removeClass("fixed-top");
    } 
});

$(document).ready(function() {
    $('.preloader-remove').removeClass("preloader");

    function setTimeoutRemovePreloader() {
    	// console.log("Remove preloader");
    	$('.preloader-remove').removeClass("preloader");
	}

    function fixCrollingBug() {
    	console.log("fixCrollingBug");
    	$('html, body').css({
			overflow: 'auto',
			height: 'auto'
		});
	}


	setTimeout(setTimeoutRemovePreloader, 2000);
	// setTimeout(fixCrollingBug, 2000);
});