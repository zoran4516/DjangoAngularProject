var check = 0;
setInterval(function(){
	var height = $(document).height();
	if(height !== check) {
		var val = height+"px solid #fafafa";
		console.log(val);
		$(".sideCut").css({"border-bottom": val});
		check = height;
	}
}, 100);