let cur_level = 1;
let answer = [];
let levels = [
	{
			id: '1',
			name: 'Seletor',
			instr: 'Seletor para aplicar estilo da página.',
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
		let text = $("textarea").val();
		let lines = text.split('\n');
		let rule;
		let aux_rule, aux_prop = [], aux_value = [], temp;
		answer[cur_level-1] = text;

		if(text.indexOf(levels[cur_level-1].sel_init) > -1 && text.indexOf(levels[cur_level-1].sel_end) > -1 && text !== 'undefined')
		{
			for(let i = 0; i < lines.length; i++)
			{
				if(lines[i].indexOf(";") > -1)
				{
					aux_rule = lines[i].split(";")[0];
					temp = aux_rule.split(":");
					aux_prop.push(temp[0]);
					aux_value.push(temp[1]);
				}
			}
			
			if(cur_level == 1)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					$("p").css(aux_prop[i], aux_value[i]);
				}
			}
			else if(cur_level == 2)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					$("#ola").css(aux_prop[i], aux_value[i]);
				}
			}
			else if(cur_level == 3)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					$(".ola").css(aux_prop[i], aux_value[i]);
				}
			}
		}
		else{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Código incorreto</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		

		/* if(text.indexOf(levels[cur_level-1].sel_init) > -1 && text.indexOf(levels[cur_level-1].sel_end) > -1 && text !== 'undefined')
		{
			localStorage.setItem('answer',JSON.stringify(answer));
			var tmpString1 = $("textarea").val().split("{");
			var tmpString2 = tmpString1[1].trim().split(":");
			var tmpString3 = tmpString2[1].trim().split(";");
		
			var prop = tmpString2[0];
			var value = tmpString3[0];
		
			if(cur_level == 1 && tmpString1[0].indexOf('p') > -1)
				$("p").css(prop,value);
			else if (cur_level == 2 && tmpString1[0].indexOf('#') > -1)
				$("#ola").css(prop,value);
			else if (cur_level == 3 && tmpString1[0].indexOf('.') > -1)
				$(".ola").css(prop,value);
		} */
		

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
