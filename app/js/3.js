/**
 * Created by Pluto on 6/19/2014.
 */
;$(function() {
    $('nav#menu-left').livequery(function(){
        $(this).mmenu();
        $(this).removeClass('hidden');
    });

    $('#ei-slider').livequery(function(){
        $(this).eislideshow({
            animation			: 'center',
            autoplay			: true,
            slideshow_interval	: 3000,
            titlesFactor		: 0
        });
    });

    $(".scroll").livequery(function(){
        $(this).click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top},1200);
        });
    });

    var defaults = {
        containerID: 'toTop', // fading element id
        containerHoverID: 'toTopHover', // fading element hover id
        scrollSpeed: 1200,
        easingType: 'linear'
    };

    $('nav#menu-left').livequery(function(){
        $().UItoTop({ easingType: 'easeOutQuart' });
    });
});