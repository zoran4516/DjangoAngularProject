$(document).ready(function(){
    $('.grey-noti').click(function(){
        $('noti').hide();
        $('.grey-noti').fadeOut();
    });
    $('#noti_open').click(function(){
        $('noti').addClass("slideInLeft");
        $('noti').show();
        $('.grey-noti').fadeIn();
    });
});