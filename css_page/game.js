let cur_level = 1;
let answer = [];
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

$(window).on("load", loadLevel(cur_level));

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function loadLevel(level)
{
	document.querySelector("#title").textContent = levels[level-1].name;
	document.querySelector("#instr").textContent = levels[level-1].instr;
	document.querySelector("#before").textContent = levels[level-1].before;
	document.querySelector(".current").innerHTML = level;
	document.querySelector(".total").innerHTML = count;
	document.querySelector(".background").classList = 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").disabled = true;
	document.querySelector(".item").classList = 'item pos_' + levels[level-1].style;
	document.querySelector(".item").innerHTML = levels[level-1].item;

	if(localStorage.getItem('visited') == null)
	{
		document.querySelector("#help_body").style.display = "block";
		localStorage.setItem('visited',true);
	}

	if(answer[level-1] !== '')
		$("textarea").val(answer[level-1]);
	else
		$("textarea").val('');

	$("#levels-box").hide();
	$(".level-marker").removeClass('current').eq(this.cur_level).addClass('current');

	key = Object.values(levels[level-1].id);
	let content = answer[key];
	
	document.querySelector("#next_btn").disabled = true;

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
	$("#clear_storage").on("click", function(){
		answer.length = 0;
		localStorage.clear();
	});

	$("#next_btn").on("click", function(){
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
					cur_level++;
					loadLevel(cur_level);
				}
			}, 1000
		);
	});
	
	$("#button1").on("click", function(){
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
					cur_level--;
					loadLevel(cur_level);
				}
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
					cur_level++;
					loadLevel(cur_level);
				}
			}, 1000
		);
	});
	
	$("#check").on("click", function(){
		answer[cur_level-1] = $("textarea").val();
		localStorage.setItem('answer',JSON.stringify(answer));
		var tmpString1 = $("textarea").val().split("{");
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

	$("#help_btn").on('click', function(){
		modal.style.display = "block";
	});

	$(".close_modal").on('click', function(){
		modal.style.display = "none";
	});
});
