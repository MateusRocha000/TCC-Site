$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	$("#next_btn").on("click", function(){
		$(".wrap").empty();
		$(".text").focus();
	});
})

$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	$("#submit").on("click", function(){
		var item = document.getElementById("item").querySelector("div");
		var full_code = '$(document).ready(function() {' 
							+ $(".text").val() 
							+ 'setInterval(function() {' + item.id + '.style.display = (' + item.id + '.style.display == \'none\' ? \'\' : \'none\');}, 500);});';
		console.log(full_code);
		eval(full_code);
	});
	
	
});