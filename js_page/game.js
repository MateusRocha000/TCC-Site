var item;
var full_code;

let cur_level = 1;
let answer = [];

let levels = [
		{
				id: '1',
				name: 'Variável',
				instr: 'Variáveis em JavaScript',
				before: '<body>\n      <div id="ola">Olá</div>\n</body>\n\n<script>\n$(document).ready(function() {',
				after: 'ola.innerHTML += \'Olá, como vai?\';\n</script>',
				js_init: 'var'
		},
		{
				id: '2',
				name: 'Condicional',
				instr: 'Condicional em JavaScript.',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div>Olá</div>\n   </body>\n</html>\n<script>\nvar ola = document.getElementById("ola");\n',
				after: '});\n</script>',
				js_init: 'if'
		},
		{
				id: '3',
				name: 'Função',
				instr: 'Função em JavaScript',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div>Olá</div>\n   </body>\n</html>',
				
				js_init: 'function'
		},
		{
				id: '4',
				name: 'Evento',
				instr: 'Evento em JavaScript',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div>Olá</div>\n   </body>\n</html>',
				
				js_init: 'on'
		}
	];	

let count = Object.keys(levels).length;
let key = Object.values(levels[cur_level-1].id);

function saveData(text)
{
	answer[cur_level-1] = text;
};

function clearStorage()
{
	answer.length = 0;
};

$(window).on("load", loadLevel(cur_level));

function loadLevel(level)
{
	let title = document.querySelector("#title");
	let instr = document.querySelector("#instr");
	let before = document.querySelector("#before");
	let after = document.querySelector("#after");
	let item = document.querySelector("#item");
	let nextBtn = document.querySelector("#next_btn");
	let submitBtn = document.querySelector("#submit");
	let quitBtn = document.querySelector("#quit_btn");
	let display_cur_level = document.querySelector(".current");
	let total_levels = document.querySelector(".total");
	let text = document.querySelector(".text");
	let wrap = document.querySelector(".wrap");
	let backG = document.querySelector(".background");
	let style = levels[level-1].style;
	$("#levels-box").hide();
	$(".level-marker").removeClass('current').eq(this.cur_level).addClass('current');
	
	key = Object.values(levels[level-1].id);
	let content = answer[key];
	
	document.querySelector("#next_btn").disabled = true;
	
	title.textContent = levels[level-1].name;
	instr.textContent = levels[level-1].instr;
	before.textContent = levels[level-1].before;
	after.textContent = levels[level-1].after;
	display_cur_level.innerHTML = level;
	total_levels.innerHTML = count;
	backG.classList = 'background level-' + style;

	$(".text").val(answer[key]);
	
	if(level === 1)
		document.querySelector("#button1").disabled = true;
	if(level === count)
		document.querySelector("#button2").disabled = true;

};

$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	$("#button1").on("click", function(){
		let back_content = answer[cur_level-1];
		if(cur_level !== 1)
		{
			document.querySelector("#button1").disabled = false;
			if(back_content == '')
			{
				text = '';
				wrap = '';
			}
			
			cur_level--;
			loadLevel(cur_level);
		}
		$(".wrap").empty();
		$(".text").focus();
		$(".text").empty();
	});
	
	$("#next_btn").on("click", function(){
		$(".wrap").empty();
		$(".text").focus();
	});
	
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	levels.forEach(function(level, i){
		let levelMarker = $('<span/>').addClass('level-marker').attr('data-level', i).text(i+1);

		if($.inArray(level.tag_init, answer) !== -1 && $.inArray(level.tag_end, answer) !== -1)
		{
			levelMarker.addClass('solved');
		}

		levelMarker.appendTo('#levels');
	});

	$(".level-marker").on("click", function(){
		saveData($("text").textContent);

		let level = $(this).attr('data-level');
		level = parseInt(level, 10);
		console.log(level);
		level++;
		loadLevel(level);
	});

	$("#level-indicator").on("click", function(){	
		$('.box').hide();
		$('#levels-box').toggle();
	});
	
	$("#button2").on("click", function(){
		let next_content = answer[cur_level+1];
		if(cur_level !== count)
		{
			document.querySelector("#button2").disabled = false;
			if(next_content == '')
			{
				text = '';
				wrap = '';
			}
			
			cur_level++;
			loadLevel(cur_level);
		}
		$(".wrap").empty();
		$(".text").focus();
		$(".text").empty();
	});
	
	$("#check").on("click", function(){
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
	
	let modal = document.querySelector("#help_body");
	let close_btn = document.querySelector(".close_modal");

	$("#help_btn").on('click', function(){
		modal.style.display = "block";
	});

	$(".close_modal").on('click', function(){
		modal.style.display = "none";
	});
});