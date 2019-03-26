//Nível atual
let cur_level = 1;

//Vetor onde serão salvas as respostas do usuário (caso corretas)
let answer = [];

//Vetor que indica quais níveis foram cumpridos
let level_cleared = [];

//Informações de cada nível
let levels = [
	{
			id: '1',
			name: 'Seletor',
			instr: 'Seletor para aplicar estilo da página.',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p>Olá</p>\n   </body>\n</html>',
			item: '<p>Olá</p>',
			sel_init: 'p{',
			sel_end: '}',
			style: 'one',
			help: 'O seletor é utilizado para indicar para a página que um elemento HTML está recebendo um estilo com certas propriedades definidas. A regra é definida com o nome da regra com as propriedades recebendo seus possíveis valores entre chaves, como:\np{\n   font-size: 25px;\n}\n\nNo exemplo acima, é alterado o tamanho da fonte de um parágrafo.'
	},
	{
			id: '2',
			name: 'Identificador',
			instr: 'Maneira alternativa de aplicar estilo. Identificadores são únicos.',
			before: "<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p id=\"ola\">Olá</p>\n   </body>\n</html>",
			item: '<p id=\"ola\">Olá</p>',
			sel_init: '#ola{',
			sel_end: '}',
			style: 'two',
			help: 'A definição da regra utilizando o identificador é feita da mesma maneira que os seletores, tendo apenas a diferença que você utiliza o nome do identificador colocado no elemento HTML precedido de \"#\". Portanto, a regra é feita da seguinte maneira: \n#nome_do_id{\n   font-size: 25px;\n}'
	},
	{
			id: '3',
			name: 'Classe',
			instr: 'Outra maneira de aplicar estilo. Classes são usados em elementos que receberão o mesmo estilo.',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p class=\"ola\">Olá</p>\n      <p class=\"ola\">Entre</p>\n   </body>\n</html>',
			item: '<p class=\"ola\">Olá</p>      <p class=\"ola\">Entre</p>',
			sel_init: '.ola{',
			sel_end: '}',
			style: 'three',
			help: 'As regras utilizando classes também possuem a mesma sintaxe que o identificador, com a pequena diferença que em vez de \"#\" colocamos \".\" no lugar: \n#nome_da_classe{\n   font-size: 25px;\n}'
	}
];

//Variável auxiliar que pega a quantidade de níveis
let num_levels = Object.keys(levels).length;

$(window).on("load", loadLevel(cur_level));

//Salva os níveis concluídos antes de sair da página caso deem refresh na página
//Mas caso deem refresh de novo, os níveis concluídos são perdidos (Mudar para MongoDB??)
$(window).on("beforeunload", function(){
	localStorage.setItem('level_cleared_css', JSON.stringify(level_cleared));
});

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

//Função auxiliar para verificar se um elemento está contido em um array
function hasValue(el, array){
	let exists = false;
	for(let i = 0; i < array.length; i++)
	{
		if(el == array[i])
		{
			exists = true;
			break;
		}	
	}
	return exists;
}

function loadLevel(level)
{
	document.querySelector("#title").textContent = levels[level-1].name;
	document.querySelector("#instr").textContent = levels[level-1].instr;
	document.querySelector("#dialog").textContent = levels[level-1].help;
	document.querySelector("#about").innerHTML = '<p>O CSS (Cascading StyleSheet), ou Folha de Estilo em Cascata, é um formato de arquivo utilizado para dar estilo aos elementos em uma página HTML. Com ela é possível alterar a cor de fundo, tamanho da fonte, posição dos elementos e muitas outras coisas.</p><p>Para alterar as propriedades de um elemento, basta criar uma regra. Esta regra é composta por um seletor, que seleciona o elemento HTML, e o conjunto de propriedades, que alteram valores do elemento, entre chaves. </p><p>Há muitas propriedades que são possíveis de alterar, como: largura (width), altura (height), cor de fundo (background-color), e muito mais.</p>';
	document.querySelector("#before").textContent = levels[level-1].before;
	document.querySelector(".current").innerHTML = level;
	document.querySelector(".total").innerHTML = num_levels;
	document.querySelector(".background").classList = 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").disabled = true;
	document.querySelector("#next_btn").classList = 'btn btn-secondary';
	document.querySelector(".item").classList = 'item pos_' + levels[level-1].style;
	document.querySelector(".item").innerHTML = levels[level-1].item;

	if(localStorage.getItem('visited') == null)
	{
		document.querySelector("#help_body").style.display = "block";
		localStorage.setItem('visited',true);
	}

	if(answer[level-1] !== '' && levels[level-1].text !== undefined)
	{
		$("textarea").val(answer[level-1]);
		document.querySelector(".item").style = levels[level-1].text;
	}
	else
		$("textarea").val('');

	$("#levels-box").hide();

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
	else if(level === num_levels)
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
	let new_line = 10;
	$("textarea").keydown(function(e){
		newLines = $(this).val().split("\n").length;

		if(e.keyCode == 13 && newLines >= new_line)
		{
			return false;
		}

	});

	$("#clear_storage").on("click", function(){
		answer.length = 0;
		localStorage.clear();
	});

	//Limpa a área de texto do código
	$("#clear_text").on("click", function(){
		$("textarea").val('');
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
				if(cur_level < num_levels)
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

		if (hasValue(level.id, localStorage.getItem('level_cleared_css'))) {
			levelMarker.addClass('cleared');
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
			loadLevel(level);
		}, 1000);
	});

	$("#level-indicator").on("click", function(){
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
				if(cur_level !== num_levels)
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
		console.log(lines);
		let aux_rule, aux_prop = [], aux_value = [], temp;
		answer[cur_level-1] = text;
		let properties = '';

		if(text.indexOf(levels[cur_level-1].sel_init) > -1 && text.indexOf(levels[cur_level-1].sel_end) > -1 && text !== 'undefined')
		{
			for(let i = 1; i < lines.length-1; i++)
			{
				console.log(lines[i]);
				if(lines[i].indexOf(";") > -1)
				{
					aux_rule = lines[i].split(";")[0];
					if(lines[i].indexOf(":") == -1)
					{
						document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
						setTimeout(function(){
							document.querySelector(".speech-bubble").remove();
						}, 2000);
						return;
					}
					else
					{
						properties += lines[i];
						temp = aux_rule.split(":");
						aux_prop.push(temp[0]);
						aux_value.push(temp[1]);
						levels[cur_level-1].text = properties;
					}
				}
				else
				{
					document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
					setTimeout(function(){
						document.querySelector(".speech-bubble").remove();
					}, 2000);
					return;
				}
			}
			
			if(cur_level == 1)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					try{

						$("p").css(aux_prop[i], aux_value[i]);
					}catch(err)
					{
						document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
						setTimeout(function(){
							document.querySelector(".speech-bubble").remove();
						}, 2000);
						return;
					}
				}
			}
			else if(cur_level == 2)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					
					try{
						$("#ola").css(aux_prop[i], aux_value[i]);
					}catch(err)
					{
						document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
						setTimeout(function(){
							document.querySelector(".speech-bubble").remove();
						}, 2000);
						return;
					}
				}
			}
			else if(cur_level == 3)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					
					try{
						$(".ola").css(aux_prop[i], aux_value[i]);
					}catch(err)
					{
						document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
						setTimeout(function(){
							document.querySelector(".speech-bubble").remove();
						}, 2000);
					}
				}
			}
		}
		else if(text.indexOf(levels[cur_level-1].sel_init) == -1 && text.indexOf(levels[cur_level-1].sel_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Seu seletor está incorreto.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		else if(text.indexOf(levels[cur_level-1].sel_init) > -1 && text.indexOf(levels[cur_level-1].sel_end) == -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Está faltando um fecha chaves.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		else{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Código incorreto</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		let current_lvl = cur_level-1;
		$('[data-level=' + current_lvl + ']').addClass('cleared');
		answer[cur_level-1] = text;
		level_cleared[cur_level-1] = cur_level;
		localStorage.setItem('level_cleared_css', JSON.stringify(level_cleared));
		localStorage.setItem('answer_css',JSON.stringify(answer));
		document.querySelector("#next_btn").classList = 'btn btn-success';
		document.querySelector("#next_btn").disabled = false;
	});

	$("#dialog").dialog({
		autoOpen : false,
		modal : true, 
		show : "blind", 
		hide : "blind",
		minWidth: 1000,
		minHeight: 'auto'	
	});

	$("#about").dialog({
		autoOpen : false,
		modal : true, 
		show : "blind", 
		hide : "blind",
		minWidth: 1000,
		minHeight: 'auto'	
	});

	$("#help_btn").on('click', function(){
		$("#dialog").dialog('open');
		return false;
	});

	$("#css_about_btn").on('click', function(){
		$("#about").dialog('open');
		return false;
	});
});
