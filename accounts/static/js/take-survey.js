$(document).ready(function() {
    $('.question-layout').each(function(i) {
        if (i > 0) {
            console.log(i);
            console.log(this);
            $(this).hide();
        }
    });
});

var handleNextClick = function(current) {
    var numberOfQuestions = $('.question-layout').length;
    var next = (current + 1) % numberOfQuestions;
    $('#q' + (current + 1)).hide('slide', {direction: 'left'}, 1000);
    $('#q' + (next + 1)).show('slide', {direction: 'right'}, 1000);
};

var handlePrevClick = function(current) {
    var numberOfQuestions = $('.question-layout').length;
    var prev = current > 0 ? (current - 1) : numberOfQuestions - 1;
    $('#q' + (current + 1)).hide('slide', {direction: 'right'}, 1000);
    $('#q' + (prev + 1)).show('slide', {direction: 'left'}, 1000);
};