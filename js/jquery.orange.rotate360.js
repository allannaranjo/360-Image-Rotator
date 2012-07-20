/*

Developed by Allan Naranjo
allan.naranjo@gmail.com
* Copyright 2011, Allan Naranjo
* Dual licensed under the MIT or GPL Version 2 licenses.

Do whatever you want with this script!!!...
Enjoy!...

*/

jQuery.fn.rotate360 = function(settings) {
	
	var options = {
		car_dir : settings.car_dir || "A_STATION_1tone",
		transition_speed : settings.transition_speed || 200,
		images : settings.images
	}
	
	var interval_controller = null;
	
	var self = this;
	var current_image_being_preloaded;
	var image_preloader_controller = 0;
	
	$("#slider").slider({ max: 36, min :1, value: 1, animate : true });
	function change_image(number){
		var prev_image = Number(number) - 1;
		prev_image = prev_image == 0 ? 1 : prev_image;
		prev_image = prev_image < 10 ? "0" + prev_image : prev_image;

		$("#bg_smooth").attr("src",  options.car_dir.toLowerCase() + '/a_360_' + prev_image + '.jpg');
		$(self).css("background-image","url(" + options.car_dir.toLowerCase() + "/a_360_" + number + ".jpg)");
	}
	
	function autoplay(stop){
		if(stop){
			clearTimeout(interval_controller);
			$( "#slider" ).slider("option","value",1);
			return false;
		}
		
		interval_controller = setTimeout(function(){
			
			var value = $("#slider").slider("option", "value");
			var max_value = $( "#slider" ).slider( "option", "max" );
			if((value + 1) > max_value){
				autoplay(true);
			} else {
				value = (value +1) < 10 ? "0" + (value + 1) : value + 1;
				$( "#slider" ).slider("option","value", Number(value));
				change_image(value);
				autoplay(false);
			}
		}, options.transition_speed);
		
	}
	
	change_image("01");

	$("#slider").live( "slide", function(event, ui) {var value = ui.value;change_image(value < 10 ? "0" + value : value);});

	$("#main_image_container div.play").live("click", function(e){

		e.preventDefault();
		autoplay(false);

	})

	function preload_image(){
		var src = options.car_dir + "/" + options.images[image_preloader_controller].name;
		current_image_being_preloaded = new Image(); 
		current_image_being_preloaded.src = src;
		$(current_image_being_preloaded).load(function(){
			$("#progress_bar").progressBar(Math.floor((image_preloader_controller / options.images.length) * 100));
			if((image_preloader_controller+1) < options.images.length){
				image_preloader_controller++;
				preload_image();
			} else {
				$("#progress_bar").progressBar(0);
				$("#progress_bar").hide();
				$(self).find(".controls").show();
			}
		})
	}

	function init(){
		$("#progress_bar").show().progressBar();
		if(options.images){
			preload_image();
		}

	}



	init();
	
	
	
	
	
	
	
	
	
}