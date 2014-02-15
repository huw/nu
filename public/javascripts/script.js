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

$(document).ready(function(){
	windowUpdate();

	$("#me .leftcol img").attr("src", "http://www.gravatar.com/avatar/9531a7acf89bad418f44ab0f695f6c9c?s=" + $(window).innerWidth()*0.27) // Only gets the image size which we initially need

	$(window).resize(function() {
		windowUpdate();
	});
});

var windowUpdate = function() {
	/* Dimensions */
	$(".header").css("height", $(window).innerHeight());

	if ($(window).innerWidth() > $(window).innerHeight()) {
		$("img.gear").css("height", $(window).innerHeight()*0.8);
		$("img.gear").css("width", "auto");
	} else {
		$("img.gear").css("width", $(window).innerWidth()*0.95);
		$("img.gear").css("height", "auto");
	}
}