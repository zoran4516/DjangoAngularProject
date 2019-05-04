$(document).ready(function(){
    if ($(window).width() < 900) {
        $('.nav').addClass("slideInLeft");
    }
    $('.float').click(function(){
        $('.nav').show();
        $('.grey').fadeIn();
    });
    $('.grey').click(function(){
        $('.nav').hide();
        $('.grey').fadeOut();
    });
});