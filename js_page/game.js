var item;
var full_code;

$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	$("#next_btn").on("click", function(){
		$(".wrap").empty();
		$(".text").focus();
	});
});

$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	$("#submit").on("click", function(){
		item = document.getElementById("item").querySelector("div");
		full_code = '$(document).ready(';
		var aux;
		if($(".text").val().indexOf("var") > -1)
		{
			aux = 'function() {' + $(".text").val() + 'ola.innerHTML += \'<div>Olá, como vai?</div>\';});';
			full_code += aux;
		}
		else if($(".text").val().indexOf("if") > -1)
		{
			aux = 'function() {\n var ola = document.getElementById(\"ola\");'+ $(".text").val() + '});';
			full_code += aux;
		}
		
		eval(full_code);
		
	});
	
	$("#next_btn").on("click", function(){
		var item = document.getElementById("item").querySelector("div");
		var extra = item.querySelector("div");
		console.log(extra);
		if(extra !== null)
		{
			extra.remove();
		}
		if(item.style.fontSize !== '')
			item.style.fontSize = 25;
	});
	
	
});