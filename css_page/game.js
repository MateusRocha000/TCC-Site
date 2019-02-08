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
	$("#submit").on("click", function(){
		
		var tmpString1 = $(".text").val().split("{");
		var tmpString2 = tmpString1[1].split(":");
		var tmpString3 = tmpString2[1].split(";");
		
		var prop = tmpString2[0];
		var value = tmpString3[0];
		
		$("p").css(prop,value);
		$("#ola").css(prop,value);
		$(".ola").css(prop,value);
	});
});