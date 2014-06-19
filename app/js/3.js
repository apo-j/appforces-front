/**
 * Created by Pluto on 6/19/2014.
 */
;$(function() {
    $('nav#menu-left').mmenu();

    $('#ei-slider').eislideshow({
        animation			: 'center',
        autoplay			: true,
        slideshow_interval	: 3000,
        titlesFactor		: 0
    });

    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1200);
    });

    var defaults = {
        containerID: 'toTop', // fading element id
        containerHoverID: 'toTopHover', // fading element hover id
        scrollSpeed: 1200,
        easingType: 'linear'
    };


    $().UItoTop({ easingType: 'easeOutQuart' });
});