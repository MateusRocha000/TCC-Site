let cur_level = 1;
let answer = [];
let language = window.location.hash.substring(1) || 'pt-br';
let levels = [
	{
			id: '1',
			name: 'Seletor',
			instr: 'Seletor para aplicar estilo da página',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p>Olá</p>\n   </body>\n</html>',
			item: '<p>Olá</p>',
			sel_init: 'p{',
			sel_end: '}',
			style: 'one'
	},
	{
			id: '2',
			name: 'Identificador',
			instr: 'Maneira alternativa de aplicar estilo. Identificadores são únicos.',
			before: "<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p id=\"ola\">Olá</p>\n   </body>\n</html>",
			item: '<p id=\"ola\">Olá</p>',
			sel_init: '#ola{',
			sel_end: '}',
			style: 'two'
	},
	{
			id: '3',
			name: 'Classe',
			instr: 'Outra maneira de aplicar estilo. Classes são usados em elementos que receberão o mesmo estilo.',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p class=\"ola\">Olá</p>\n      <p class=\"ola\">Entre</p>\n   </body>\n</html>',
			item: '<p class=\"ola\">Olá</p>      <p class=\"ola\">Entre</p>',
			sel_init: '.ola{',
			sel_end: '}',
			style: 'three'
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

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function loadLevel(level)
{
	let title = document.querySelector("#title");
	let instr = document.querySelector("#instr");
	let before = document.querySelector("#before");
	let item = document.querySelector(".item");
	let submitBtn = document.querySelector("#submit");
	let quitBtn = document.querySelector("#quit_btn");
	let display_cur_level = document.querySelector(".current");
	let total_levels = document.querySelector(".total");
	let text = document.querySelector("textarea");
	let backG = document.querySelector(".background");
	let style = levels[level-1].style;
	$("#levels-box").hide();
	$(".level-marker").removeClass('current').eq(this.cur_level).addClass('current');
	$("textarea").val('');

	key = Object.values(levels[level-1].id);
	let content = answer[key];
	
	document.querySelector("#next_btn").disabled = true;
	
	title.textContent = levels[level-1].name;
	instr.textContent = levels[level-1].instr;
	before.textContent = levels[level-1].before;
	display_cur_level.innerHTML = level;
	total_levels.innerHTML = count;
	item.innerHTML = levels[level-1].item;
	backG.classList = 'background level-' + style;

	if(hasClass(document.querySelector('#board'), 'fadeOut') && hasClass(document.querySelector('#board'), 'animated_fadeout'))
	{
		document.querySelector('#board').classList.remove('fadeOut');
		document.querySelector('#board').classList.remove('animated_fadeout');
	}
	
	document.querySelector('#board').classList.add('fadeIn');
	document.querySelector('#board').classList.add('animated_fadein');
	
	document.querySelector("#next_btn").disabled = true;

	if(level === 1)
	{
		document.querySelector("#button1").disabled = true;
		document.querySelector("#button2").disabled = false;
	}
	else if(level === count)
	{
		document.querySelector("#button1").disabled = false;
		document.querySelector("#button2").disabled = true;
	}
	else{
		document.querySelector("#button1").disabled = false;
		document.querySelector("#button2").disabled = false;
	}
	
};

$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});
	
	$("#next_btn").on("click", function(){
		let next_content = answer[cur_level+1];
		if(hasClass(document.querySelector('#board'), 'fadeIn') && hasClass(document.querySelector('#board'), 'animated_fadein'))
		{
			document.querySelector('#board').classList.remove('fadeIn');
			document.querySelector('#board').classList.remove('animated_fadein');
		}
		document.querySelector('#board').classList.add('fadeOut');
		document.querySelector('#board').classList.add('animated_fadeout');
		setTimeout(
			function(){
				if(cur_level < count)
				{
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
			}, 1000
		);
	});
	
	$("#button1").on("click", function(){
		let back_content = answer[cur_level-1];
		if(hasClass(document.querySelector('#board'), 'fadeIn') && hasClass(document.querySelector('#board'), 'animated_fadein'))
		{
			document.querySelector('#board').classList.remove('fadeIn');
			document.querySelector('#board').classList.remove('animated_fadein');
		}
		document.querySelector('#board').classList.add('fadeOut');
		document.querySelector('#board').classList.add('animated_fadeout');
		setTimeout(
			function(){
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
			}, 1000
		);
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
		level++;
		cur_level = level;
		if(hasClass(document.querySelector('#board'), 'fadeIn') && hasClass(document.querySelector('#board'), 'animated_fadein'))
		{
			document.querySelector('#board').classList.remove('fadeIn');
			document.querySelector('#board').classList.remove('animated_fadein');
		}
		document.querySelector('#board').classList.add('fadeOut');
		document.querySelector('#board').classList.add('animated_fadeout');
		setTimeout(function(){
			loadLevel(level)
		}, 1000);
	});

	$("#level-indicator").on("click", function(){
		
		$('.box').hide();
		$('#levels-box').toggle();
	});
	
	$("#button2").on("click", function(){
		let next_content = answer[cur_level+1];
		if(hasClass(document.querySelector('#board'), 'fadeIn') && hasClass(document.querySelector('#board'), 'animated_fadein'))
		{
			document.querySelector('#board').classList.remove('fadeIn');
			document.querySelector('#board').classList.remove('animated_fadein');
		}
		document.querySelector('#board').classList.add('fadeOut');
		document.querySelector('#board').classList.add('animated_fadeout');
		setTimeout(
			function(){
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
			}, 1000
		);
	});
	
	$("#check").on("click", function(){
		saveData($("textarea.text").val());
		var tmpString1 = $("textarea.text").val().split("{");
		var tmpString2 = tmpString1[1].trim().split(":");
		var tmpString3 = tmpString2[1].trim().split(";");
		console.log('String 1 = ' + '(' + tmpString1[0] + ', ' + tmpString1[1] + ')');
		console.log('String 2 = ' + '(' + tmpString2[0] + ', ' + tmpString2[1] + ')');
		console.log('String 3 = ' + '(' + tmpString3[0] + ', ' + tmpString3[1] + ')');
		
		var prop = tmpString2[0];
		var value = tmpString3[0];

		console.log('CSS: ' + prop + ':' + value);
		
		$("p").css(prop,value);
		$("#ola").css(prop,value);
		$(".ola").css(prop,value);

		document.querySelector("#next_btn").disabled = false;
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