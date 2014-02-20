/* Smooth Scrolling */
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
});

var end = new Date('04/28/2014 4:00 AM');
var timer;

function countdown() {
    var now = new Date();
    var distance = Math.floor((end - now) / 1000)

    $(".replace").text(distance);
}

timer = setInterval(countdown, 1000);

/* Google Maps API */
function initialize() {
	var mapOptions = {
		center           : new google.maps.LatLng(-33.855, 151.208),
		zoom             : 14,
		panControl       : false,
		mapTypeControl   : false,
		streetViewControl: false,
		scrollwheel      : false,

		styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
	windowUpdate();

	$("#me .leftcol img").attr("src", "http://www.gravatar.com/avatar/9531a7acf89bad418f44ab0f695f6c9c?s=" + $(window).innerWidth()*0.27) // Only gets the image size which we initially need
	
	if ($(window).innerHeight()*0.8 < 240) { // Resize the image based on initial screen width
		$("img.gear").attr("src", "/images/gear.png");
	} else if ($(window).innerHeight()*0.8 < 384) {
		$("img.gear").attr("src", "/images/gear@768.png");
	} else if ($(window).innerHeight()*0.8 < 516) {
		$("img.gear").attr("src", "/images/gear@1030.png");
	} else if ($(window).innerHeight()*0.8 < 828) {
		$("img.gear").attr("src", "/images/gear@1240.png");
	} else if ($(window).innerHeight()*0.8 < 1366) {
		$("img.gear").attr("src", "/images/gear@2048.png");
	} else {
		$("img.gear").attr("src", "/images/gear@full.png");
	}

	$(window).resize(function() {
		windowUpdate();
	});
});

var windowUpdate = function() {
	/* Dimensions */
	if ($(window).innerWidth() > $(window).innerHeight()) {
		$("img.gear").css("height", $(window).innerHeight()*0.8);
		$("img.gear").css("width", "auto");

		$(".header").css("height", $(window).innerHeight());
	} else {
		$("img.gear").css("width", $(window).innerWidth()*0.8);
		$("img.gear").css("height", "auto");

		$(".header").css("height", $(window).innerWidth()+20);
	}

	$("#chat > #map").css("height", $(window).innerHeight());
}