//Nível atual
let cur_level_css = parseInt(localStorage.cur_level_css, 10) || 1;

//Vetor onde serão salvas as respostas do usuário (caso corretas)
let answer_css = (localStorage.answer_css && JSON.parse(localStorage.answer_css)) || {};

//Vetor que indica quais níveis foram cumpridos
let level_cleared = (localStorage.level_cleared_css && JSON.parse(localStorage.level_cleared_css)) || [];

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
			help: '<p>O seletor é utilizado para indicar para a página que um elemento HTML está recebendo um estilo com certas propriedades definidas.</p> <p>A regra é definida com o nome da regra com as propriedades recebendo seus possíveis valores entre chaves, como:</p><p>p{</p><p>&nbsp;&nbsp;font-size: 25px;</p><p>}</p><p>No exemplo acima, é alterado o tamanho da fonte de um parágrafo.</p>'
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
			help: '<p>A definição da regra utilizando o identificador é feita da mesma maneira que os seletores, tendo apenas a diferença que você utiliza o nome do identificador colocado no elemento HTML precedido de <q>#</q>.</p><p>Portanto, a regra é feita da seguinte maneira: </p><p>#nome_do_id{</p><p>&nbsp;font-size: 25px;</p><p>}</p>'
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
			help: '<p>As regras utilizando classes também possuem a mesma sintaxe que o identificador, com a pequena diferença que em vez de <q>#</q> colocamos <q>.</q> no lugar:</p><p>.nome_da_classe{</p><p>&nbsp;font-size: 25px;</p><p>}</p>'
	},
	{
			id: '4',
			name: 'Propriedade: background',
			instr: '',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p>Texto 1</p>\n      <p>Texto 2</p>\n   </body>\n</html>',
			item: '<p>Texto 1</p><p>Texto 2</p>',
			sel_init: '{',
			property: 'background',
			sel_end: '}',
			style: 'four',
			help: '<p>As propriedades do plano de fundo, seja cor, imagem de fundo, tamanho, posição, etc., podem ser alteradas. O uso da propriedade <q>background</q> pode ser feita da seguinte forma:</p><p>background: cor imagem posição tamanho repetir origem clipe anexo</p><p>&nbsp;- Cor (background-color): Define a cor do plano de fundo;</p><p>&nbsp;- Imagem (background-image): Define uma imagem como plano de fundo;</p><p>&nbsp;- Tamanho (background-size): Define o tamanho do background, recebendo os valores de largura e altura seperados por espaço;</p><p>&nbsp;- Posição (background-position): Define a posição do background, assim como tamanho;</p><p>&nbsp;- Repetir (background-repeat): Define se será a imagem que ficará se repetindo ou não;</p><p>&nbsp;- Origem (background-origin): Define a origem do background (borda, preenchimento ou conteúdo);</p><p>&nbsp;- Clipe (background-clip): Define até quando o background se extende, seja até abaixo da borda, até a borda de preenchimento ou a borda do conteúdo.</p><p>&nbsp;- Anexo (background-attachment): Define se a imagem de background seguirá a barra de rolagem da página ou será fixa.</p><p>Você também pode usar algumas das propriedades e o navegador saberá quais estão sendo definidas. Além disso, você pode utilizar as propriedades de forma separada.</p>'
	},
	{
			id: '5',
			name: 'Propriedade: position',
			instr: '',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <p id="p1">Texto 1</p>\n      <p>Texto 2</p>\n   </body>\n</html>',
			item: '<p id="p1">Texto 1</p><p>Texto 2</p>',
			sel_init: '{',
			property: 'position',
			sel_end: '}',
			style: 'five',
			help: '<p>Cada elemento é posicionado em sua página utilizando a tag <q>pai</q> como referência tendo como exemplo:</p><p>&lt;body&gt;</p><p>&lt;img src=<q>imagem.jpg</q>&gt;</p><p>&lt;/body&gt;<p>Neste exemplo, a tag <i>&lt;img&gt;</i> possue como pai a tag <i>&lt;body&gt;</i>. Portanto, elas serão posicionados levando em consideração a dimensão e o posicionamento do corpo da página.</p><p>Elementos na página também podem servir de referência para outros utilizando a propriedade <q>position</q>. O elemento que for utilizado como referência terá essa propriedade com o valor <q>relative</q>, enquanto os elementos que serão posicionados recebem <q>absolute</q>.</p><p>elemento1 {</p><p>&nbsp;position: relative;</p><p>}</p><p>elemento2 {</p><p>&nbsp;position: absolute;</p><p>}</p>'
	},
	{
			id: '6',
			name: 'Propriedade: float',
			instr: '',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n   <img src="">\n	</body>\n</html>',
			item: '',
			sel_init: '{',
			property: 'float',
			sel_end: '}',
			style: 'six',
			help: '<p>A propriedade float é usada para indicar que elementos devem ser removidos do fluxo normal da página e <q>flutuados</q> na esquerda ou na direita.</p><p>No caso de você inserir uma imagem na página e logo em seguida um texto, o texto será inserido abaixo da imagem. Mas caso queira que a imagem permaneça na esquerda ou na direita, enquanto o texto também ocupe o espaço ao lado da imagem, será a propriedade float a fazer isso.</p><p>&lt;img src=<q>nome_da_imagem.jpg</q>&gt;</p><p>&lt;p&gt;Um parágrafo para servir de exemplo.&lt;/p&gt;</p><p>Abaixo estão os exemplos:</p><img src="../img/sem float.png" style="width: 300px; height: 300px;">&nbsp;&nbsp;&nbsp;&nbsp;<img src="../img/com float.png" style="width: 300px; height: 300px;">'
	}
];

//Variável auxiliar que pega a quantidade de níveis
let num_levels = Object.keys(levels).length;

$(window).on("load", loadLevel(cur_level_css));


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
	document.querySelector("#dialog").innerHTML = levels[level-1].help;
	document.querySelector("#about").innerHTML = '<p>O CSS (Cascading StyleSheet), ou Folha de Estilo em Cascata, é um formato de arquivo utilizado para dar estilo aos elementos em uma página HTML. Com ela é possível alterar a cor de fundo, tamanho da fonte, posição dos elementos e muitas outras coisas.</p><p>Para alterar as propriedades de um elemento, basta criar uma regra. Esta regra é composta por um seletor, que seleciona o elemento HTML, e o conjunto de propriedades, que alteram valores do elemento, entre chaves. </p><p>Há muitas propriedades que são possíveis de alterar, como: largura (width), altura (height), cor de fundo (background-color), e muito mais.</p>';
	document.querySelector("#before").textContent = levels[level-1].before;
	document.querySelector(".current").innerHTML = level;
	document.querySelector(".total").innerHTML = num_levels;
	document.querySelector(".background").classList = 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").disabled = true;
	document.querySelector("#next_btn").classList = 'btn btn-secondary';
	document.querySelector(".item").classList = 'item pos_' + levels[level-1].style;
	document.querySelector(".item").innerHTML = levels[level-1].item;

	if(answer_css[level] !== undefined && localStorage.answer_css !== undefined)
	{
		
		$("textarea").val(answer_css[level]);
		if(JSON.parse(localStorage.answer_css)[level] !== undefined)
		{
			let aux = JSON.parse(localStorage.answer_css)[level-1].split('{');
			let sel = aux[0];
			let aux2 = aux[1].split('}');
			let prop = aux2[0];
			if(level == 1)
			{
				document.querySelector(".item p").style = prop;
			}
			else if(level == 2)
			{
				document.querySelector(".item #ola").style = prop;
			}
			else if(level == 3)
			{
				document.querySelector(".item .ola").style = prop;
			}
		}
	}
	else
		$("textarea").val('');

	$("#levels-box").hide();

	key = Object.values(levels[level-1].id);
	let content = answer_css[key];
	
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
		document.querySelector("#next_btn").textContent = 'Acabar';
	}
	else{
		document.querySelector("#button1").disabled = false;
		document.querySelector("#button2").disabled = false;
	}
	
};

$(window).on("beforeunload", function(){
	localStorage.setItem('cur_level_css', cur_level_css);
	localStorage.setItem('answer_css', JSON.stringify(answer_css));
	localStorage.setItem('level_cleared_css', JSON.stringify(level_cleared));
});

$(function(){
	let new_line = 10;
	$("textarea").keydown(function(e){
		newLines = $(this).val().split("\n").length;

		if(e.keyCode == 13 && newLines >= new_line)
		{
			return false;
		}

	});

	//Limpa as respostas e recarrega a página depois de um segundo
	$("#clear_storage").on("click", function(){
		answer_css.length = 0;
		localStorage.removeItem('level_cleared_css');
		localStorage.removeItem('answer_css');
		setTimeout(function(){
			location.reload();
		}, 1000);
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
				if(cur_level_css < num_levels)
				{
					cur_level_css++;
					loadLevel(cur_level_css);
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
				if(cur_level_css !== 1)
				{
					document.querySelector("#button1").disabled = false;
					cur_level_css--;
					loadLevel(cur_level_css);
				}
			}, 1000
		);
	});
	
	levels.forEach(function(level, i){
		let levelMarker = $('<span/>').addClass('level-marker').attr('data-level', i).text(i+1);

		if(localStorage.getItem('level_cleared_css') !== null)
		{
			if (hasValue(level.id, localStorage.getItem('level_cleared_css'))) {
				levelMarker.addClass('cleared');
			}
		}

		levelMarker.appendTo('#levels');
	});

	$(".level-marker").on("click", function(){
		let level = $(this).attr('data-level');
		level = parseInt(level, 10);
		level++;
		cur_level_css = level;
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
				if(cur_level_css !== num_levels)
				{
					document.querySelector("#button2").disabled = false;
					cur_level_css++;
					loadLevel(cur_level_css);
				}
			}, 1000
		);
	});
	
	$("#check").on("click", function(){
		let text = $("textarea").val();
		let lines = text.split('\n');
		let aux_rule, aux_prop = [], aux_value = [], temp;
		answer_css[cur_level_css-1] = text;
		let properties = '';

		if(text.indexOf(levels[cur_level_css-1].sel_init) > -1 && text.indexOf(levels[cur_level_css-1].sel_end) > -1 && text !== 'undefined')
		{
			for(let i = 1; i < lines.length-1; i++)
			{
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
						levels[cur_level_css-1].text = properties;
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
			
			if(cur_level_css == 1)
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
			else if(cur_level_css == 2)
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
			else if(cur_level_css == 3)
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
			else if(cur_level_css == 5)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					
					try{
						$("#p1").css(aux_prop[i], aux_value[i]);
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
		else if(text.indexOf(levels[cur_level_css-1].sel_init) == -1 && text.indexOf(levels[cur_level_css-1].sel_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Seu seletor está incorreto.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		else if(text.indexOf(levels[cur_level_css-1].sel_init) > -1 && text.indexOf(levels[cur_level_css-1].sel_end) == -1 && text !== 'undefined')
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
		let current_lvl = cur_level_css-1;
		$('[data-level=' + current_lvl + ']').addClass('cleared');
		answer_css[levels[cur_level_css-1].id] = text;
		level_cleared[levels[cur_level_css-1].id] = cur_level_css;
		document.querySelector("#next_btn").classList = 'btn btn-success';
		document.querySelector("#next_btn").disabled = false;
	});

	$("#dialog").dialog({
		autoOpen : false,
		modal : true, 
		show : "blind", 
		hide : "blind",
		width: 1000,
		height: 'auto'	
	});

	$("#about").dialog({
		autoOpen : false,
		modal : true, 
		show : "blind", 
		hide : "blind",
		width: 1000,
		height: 'auto'	
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
