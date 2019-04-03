//Nível atual
let cur_level_css = parseInt(localStorage.cur_level_css, 10) || 1;

//Vetor para pegar as respostas de HTML e verificar se foi terminado
let answer_html = (localStorage.answer_html && JSON.parse(localStorage.answer_html)) || {};

//Vetor onde serão salvas as respostas do usuário (caso corretas)
let answer_css = (localStorage.answer_css && JSON.parse(localStorage.answer_css)) || {};

//Vetor que indica quais níveis foram cumpridos
let level_cleared_css = (localStorage.level_cleared_css && JSON.parse(localStorage.level_cleared_css)) || [];

//Informações de cada nível
let levels = [
	{
			id: '1',
			name: 'Seletor',
			instr: '<p>O nome de nossa cidade foi colocado perfeitamente. Mas ele parece precisar ficar mais bonito. Altere o estilo da fonte com <q>font-family</q> usando a fonte <q>Luckiest Guy</q></p>',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n     '+ answer_html[1] + '\n   </body>\n</html>',
			item: answer_html[1],
			sel_init: 'h1{',
			sel_end: '}',
			style: 'one',
			help: '<p>O seletor é utilizado para indicar para a página que um elemento HTML está recebendo um estilo com certas propriedades definidas.</p> <p>A regra é definida com o nome da regra com as propriedades recebendo seus possíveis valores entre chaves, como:</p><p>tag{</p><p>&nbsp;&nbsp;propriedade: valor;</p><p>}</p>'
	},
	{
			id: '2',
			name: 'Identificador',
			instr: 'Aplique a propriedade visibility recebendo hidden na pedra utilizando o identificador.',
			before: "<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div id=\"pedra\"></div>\n   </body>\n</html>",
			item: '<div id="pedra"></div>',
			sel_init: '#pedra{',
			sel_end: '}',
			style: 'two',
			help: '<p>A definição da regra utilizando o identificador é feita da mesma maneira que os seletores, tendo apenas a diferença que você utiliza o nome do identificador colocado no elemento HTML precedido de <q>#</q>.</p><p>Portanto, a regra é feita da seguinte maneira: </p><p>#nome_do_id{</p><p>&nbsp;propriedade: valor;</p><p>}</p>'
	},
	{
			id: '3',
			name: 'Classe',
			instr: 'Utilize a classe das divs para iluminar o local com a cor #FFD700 para o plano de fundo.',
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div class="lamp"></div>\n      <div class="lamp"></div>\n   </body>\n</html>',
			item: '<div class="lamp"></div><div class="lamp"></div>',
			sel_init: '.lamp{',
			sel_end: '}',
			style: 'three',
			help: '<p>As regras utilizando classes também possuem a mesma sintaxe que o identificador, com a pequena diferença que em vez de <q>#</q> colocamos <q>.</q> no lugar:</p><p>.nome_da_classe{</p><p>&nbsp;propriedade: valor;</p><p>}</p>'
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
			before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n   <img src="https://i.imgur.com/MTpaggz.png">\n	</body>\n</html>',
			item: '<img src="https://i.imgur.com/MTpaggz.png"> <p>Um parágrafo de exemplo para mostrar a propriedade float.</p>',
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
	//Se as atividades de HTML não estão completas, redireciona para o index
	if(Object.keys(answer_html).length !== 9)
	{
		alert("Você não conluiu as atividades de HTML. Conclua-as e volte aqui.");
		window.location = '../index.html';
	}
	document.querySelector("#title").textContent 		= levels[level-1].name;
	document.querySelector("#instr").innerHTML 			= levels[level-1].instr;
	document.querySelector("#dialog").innerHTML 		= levels[level-1].help;
	document.querySelector("#about").innerHTML 			= '<p>O CSS (Cascading StyleSheet), ou Folha de Estilo em Cascata, é um formato de arquivo utilizado para dar estilo aos elementos em uma página HTML, alterando propriedades como: largura (width), altura (height), cor de fundo (background-color), e muito mais..</p><p>Para alterar as propriedades de um elemento, basta criar uma regra. Esta regra é composta por um seletor, que seleciona o elemento HTML, e o conjunto de propriedades, que alteram valores do elemento, entre chaves.</p><p>Cada elemento HTML utiliza a seguinte configuração:</p><p><div id="margin">Margem<div id="border">Borda<div id="padding">Preenchimento<div id="content">Conteúdo</div></div></div></div></p><p>- Margem: uma área transparente por fora da borda do elemento. Normalmente usada para controlar distância entre os elementos</p><p>- Borda: a borda que fica ao redor do conteúdo + preenchimento.</p><p>- Preenchimento: uma área transparente que fica ao redor do conteúdo do elemento.</p><p>- Conteúdo: o próprio conteúdo do elemento: imagem, texto, etc.</p>';
	document.querySelector("#before").textContent 		= levels[level-1].before;
	document.querySelector(".current").innerHTML 		= level;
	document.querySelector(".total").innerHTML 			= num_levels;
	document.querySelector(".background").classList 	= 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").classList 		= 'btn btn-secondary';
	document.querySelector(".item").classList 			= 'item pos_' + levels[level-1].style;

	//Carrega a pose normal do personagem para cada nível no tamanho e posição corretos.
	switch(level)
	{
		case 1: document.querySelector("#char").classList = 'char_level_one';
				break;
		case 2: document.querySelector("#char").classList = 'char_level_two';
				break;
		case 3: document.querySelector("#char").classList = 'char_level_three';
				break;
		case 4: document.querySelector("#char").classList = 'char_level_four';
				break;
		case 5: document.querySelector("#char").classList = 'char_level_five';
				break;
		case 6: document.querySelector("#char").classList = 'char_level_six';
				break;
	}
	//Pega as respostas dos níveis de HTML para aproveitar, exceto para os níveis 2 e 3
	if(answer_html[level] !== undefined && answer_html[level] !== null)
	{
		if(level == 2 || level == 3)
			document.querySelector(".item").innerHTML = levels[level-1].item;
		else
			document.querySelector(".item").innerHTML = answer_html[level];
	}
	//Se o nível já foi concluído deixa o botão próximo habilitado.
	if(level_cleared_css[level] !== null && level_cleared_css[level] !== undefined)
	{
		document.querySelector("#next_btn").disabled = false;
		document.querySelector("#next_btn").classList = 'btn btn-success';
	}
	else
		document.querySelector("#next_btn").disabled = true;

	//Se o nível já foi concluído, o item da área de visualização permanece com o estilo
	if(answer_css[level] !== undefined && localStorage.answer_css !== undefined)
	{
		$("textarea").val(answer_css[level-1]);

		let aux = answer_css[level].split('{');
		let sel = aux[0];
		let aux2 = aux[1].split('}');
		let prop = aux2[0];
		if(level == 1 && answer_html[level] !== undefined && answer_html[level] !== null)
		{
			document.querySelector(".item h1").style = prop;
		}
		else if(level == 2 && answer_html[level] !== undefined && answer_html[level] !== null)
		{
			document.querySelector(".item #pedra").style = prop;
		}
		else if(level == 3 && answer_html[level] !== undefined && answer_html[level] !== null)
		{
			let node = document.querySelector(".item").childNodes;
			for(let i = 0; i < node.length; i++)
			{
				node[i].style = prop;
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

//Salva as respostas antes de dar refresh na página
$(window).on("beforeunload", function(){
	if(cur_level_css !== undefined 
			&& JSON.stringify(answer_css) !== '' 
				&& JSON.stringify(level_cleared_css) !== '')
	{
		localStorage.setItem('cur_level_css', cur_level_css);
		localStorage.setItem('answer_css', JSON.stringify(answer_css));
		localStorage.setItem('level_cleared_css', JSON.stringify(level_cleared_css));
	}
});

$(function(){
	//Se HTML e CSS foram concluídos e botão de próximo (com "Acabar" no content) for clicado
	//redireciona para a página de parabéns
	if(Object.keys(answer_html).length == 9 && Object.keys(answer_css).length == 6)
	{
		$("#next_btn").on("click", function(){
			window.location = '../finish.html';
		});
	}
	
	
	//Não deixa o usuário passar de 10 linhas
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
		answer_css = {};
		level_cleared_css = [];
		localStorage.setItem('level_cleared_css', level_cleared_css);
		localStorage.setItem('answer_css', answer_css);
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
		console.log(text);
		if(text.indexOf(levels[cur_level_css-1].sel_init) > -1 && text.indexOf(levels[cur_level_css-1].sel_end) > -1 && text !== 'undefined')
		{
			for(let i = 1; i < lines.length-1; i++)
			{
				if(lines[i].indexOf(";") > -1)
				{
					aux_rule = lines[i].split(";")[0];
					if(lines[i].indexOf(":") == -1)
					{
						//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
						switch(cur_level_css)
						{
							case 1: document.querySelector("#char").classList = 'char_level_one_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
									break;
							case 2: document.querySelector("#char").classList = 'char_level_two_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
									break;
							case 3: document.querySelector("#char").classList = 'char_level_three_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
									break;
							case 4: document.querySelector("#char").classList = 'char_level_four_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
									break;
							case 5: document.querySelector("#char").classList = 'char_level_five_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
									break;
							case 6: document.querySelector("#char").classList = 'char_level_six_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ":"</div>';
									break;
						}
						
						setTimeout(function(){
							switch(cur_level_css)
							{
								//Retorna o personagem para pose normal e remove a fala depois de um tempo
								case 1: document.querySelector("#char").classList = 'char_level_one';
										document.querySelector(".speech-bubble-one").remove();
										break;
								case 2: document.querySelector("#char").classList = 'char_level_two';
										document.querySelector(".speech-bubble-two").remove();
										break;
								case 3: document.querySelector("#char").classList = 'char_level_three';
										document.querySelector(".speech-bubble-three").remove();
										break;
								case 4: document.querySelector("#char").classList = 'char_level_four';
										document.querySelector(".speech-bubble-four").remove();
										break;
								case 5: document.querySelector("#char").classList = 'char_level_five';
										document.querySelector(".speech-bubble-five").remove();
										break;
								case 6: document.querySelector("#char").classList = 'char_level_six';
										document.querySelector(".speech-bubble-six").remove();
										break;
							}
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
					switch(cur_level_css)
					{
						//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
						case 1: document.querySelector("#char").classList = 'char_level_one_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
								break;
						case 2: document.querySelector("#char").classList = 'char_level_two_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
								break;
						case 3: document.querySelector("#char").classList = 'char_level_three_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
								break;
						case 4: document.querySelector("#char").classList = 'char_level_four_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
								break;
						case 5: document.querySelector("#char").classList = 'char_level_five_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
								break;
						case 6: document.querySelector("#char").classList = 'char_level_six_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble">Alguma regra está faltando ";"</div>';
								break;
					}
					setTimeout(function(){
						switch(cur_level_css)
						{
							//Retorna o personagem para pose normal e remove a fala depois de um tempo
							case 1: document.querySelector("#char").classList = 'char_level_one';
									document.querySelector(".speech-bubble-one").remove();
									break;
							case 2: document.querySelector("#char").classList = 'char_level_two';
									document.querySelector(".speech-bubble-two").remove();
									break;
							case 3: document.querySelector("#char").classList = 'char_level_three';
									document.querySelector(".speech-bubble-three").remove();
									break;
							case 4: document.querySelector("#char").classList = 'char_level_four';
									document.querySelector(".speech-bubble-four").remove();
									break;
							case 5: document.querySelector("#char").classList = 'char_level_five';
									document.querySelector(".speech-bubble-five").remove();
									break;
							case 6: document.querySelector("#char").classList = 'char_level_six';
									document.querySelector(".speech-bubble-six").remove();
									break;
						}
					}, 2000);
					return;
				}
			}
			
			if(cur_level_css == 1)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					try{
						$(".item h1").css(aux_prop[i], aux_value[i]);
						
					}catch(err)
					{
						switch(cur_level_css)
						{
							//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
							case 1: document.querySelector("#char").classList = 'char_level_one_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 2: document.querySelector("#char").classList = 'char_level_two_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 3: document.querySelector("#char").classList = 'char_level_three_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 4: document.querySelector("#char").classList = 'char_level_four_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 5: document.querySelector("#char").classList = 'char_level_five_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 6: document.querySelector("#char").classList = 'char_level_six_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
						}
						setTimeout(function(){
							switch(cur_level_css)
							{
								//Retorna o personagem para pose normal e remove a fala depois de um tempo
								case 1: document.querySelector("#char").classList = 'char_level_one';
										document.querySelector(".speech-bubble-one").remove();
										break;
								case 2: document.querySelector("#char").classList = 'char_level_two';
										document.querySelector(".speech-bubble-two").remove();
										break;
								case 3: document.querySelector("#char").classList = 'char_level_three';
										document.querySelector(".speech-bubble-three").remove();
										break;
								case 4: document.querySelector("#char").classList = 'char_level_four';
										document.querySelector(".speech-bubble-four").remove();
										break;
								case 5: document.querySelector("#char").classList = 'char_level_five';
										document.querySelector(".speech-bubble-five").remove();
										break;
								case 6: document.querySelector("#char").classList = 'char_level_six';
										document.querySelector(".speech-bubble-six").remove();
										break;
							}
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
						$(".item #pedra").css(aux_prop[i], aux_value[i]);
					}catch(err)
					{
						switch(cur_level_css)
						{
							//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
							case 1: document.querySelector("#char").classList = 'char_level_one_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 2: document.querySelector("#char").classList = 'char_level_two_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 3: document.querySelector("#char").classList = 'char_level_three_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 4: document.querySelector("#char").classList = 'char_level_four_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 5: document.querySelector("#char").classList = 'char_level_five_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 6: document.querySelector("#char").classList = 'char_level_six_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
						}
						setTimeout(function(){
							switch(cur_level_css)
							{
								//Retorna o personagem para pose normal e remove a fala depois de um tempo
								case 1: document.querySelector("#char").classList = 'char_level_one';
										document.querySelector(".speech-bubble-one").remove();
										break;
								case 2: document.querySelector("#char").classList = 'char_level_two';
										document.querySelector(".speech-bubble-two").remove();
										break;
								case 3: document.querySelector("#char").classList = 'char_level_three';
										document.querySelector(".speech-bubble-three").remove();
										break;
								case 4: document.querySelector("#char").classList = 'char_level_four';
										document.querySelector(".speech-bubble-four").remove();
										break;
								case 5: document.querySelector("#char").classList = 'char_level_five';
										document.querySelector(".speech-bubble-five").remove();
										break;
								case 6: document.querySelector("#char").classList = 'char_level_six';
										document.querySelector(".speech-bubble-six").remove();
										break;
							}
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
						$(".item .lamp").css(aux_prop[i], aux_value[i]);
					}catch(err)
					{
						switch(cur_level_css)
						{
							//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
							case 1: document.querySelector("#char").classList = 'char_level_one_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 2: document.querySelector("#char").classList = 'char_level_two_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 3: document.querySelector("#char").classList = 'char_level_three_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 4: document.querySelector("#char").classList = 'char_level_four_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 5: document.querySelector("#char").classList = 'char_level_five_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 6: document.querySelector("#char").classList = 'char_level_six_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
						}
						setTimeout(function(){
							switch(cur_level_css)
							{
								//Retorna o personagem para pose normal e remove a fala depois de um tempo
								case 1: document.querySelector("#char").classList = 'char_level_one';
										document.querySelector(".speech-bubble-one").remove();
										break;
								case 2: document.querySelector("#char").classList = 'char_level_two';
										document.querySelector(".speech-bubble-two").remove();
										break;
								case 3: document.querySelector("#char").classList = 'char_level_three';
										document.querySelector(".speech-bubble-three").remove();
										break;
								case 4: document.querySelector("#char").classList = 'char_level_four';
										document.querySelector(".speech-bubble-four").remove();
										break;
								case 5: document.querySelector("#char").classList = 'char_level_five';
										document.querySelector(".speech-bubble-five").remove();
										break;
								case 6: document.querySelector("#char").classList = 'char_level_six';
										document.querySelector(".speech-bubble-six").remove();
										break;
							}
						}, 2000);
					}
				}
			}
			else if(cur_level_css == 5)
			{
				for(let i = 0; i < lines.length - 1; i++)
				{
					
					try{
						$(".item #p1").css(aux_prop[i], aux_value[i]);
					}catch(err)
					{
						switch(cur_level_css)
						{
							//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
							case 1: document.querySelector("#char").classList = 'char_level_one_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 2: document.querySelector("#char").classList = 'char_level_two_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 3: document.querySelector("#char").classList = 'char_level_three_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 4: document.querySelector("#char").classList = 'char_level_four_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 5: document.querySelector("#char").classList = 'char_level_five_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
							case 6: document.querySelector("#char").classList = 'char_level_six_error';
									document.querySelector(".background").innerHTML += '<div class="speech-bubble">' + err + '":"</div>';
									break;
						}
						setTimeout(function(){
							switch(cur_level_css)
							{
								//Retorna o personagem para pose normal e remove a fala depois de um tempo
								case 1: document.querySelector("#char").classList = 'char_level_one';
										document.querySelector(".speech-bubble-one").remove();
										break;
								case 2: document.querySelector("#char").classList = 'char_level_two';
										document.querySelector(".speech-bubble-two").remove();
										break;
								case 3: document.querySelector("#char").classList = 'char_level_three';
										document.querySelector(".speech-bubble-three").remove();
										break;
								case 4: document.querySelector("#char").classList = 'char_level_four';
										document.querySelector(".speech-bubble-four").remove();
										break;
								case 5: document.querySelector("#char").classList = 'char_level_five';
										document.querySelector(".speech-bubble-five").remove();
										break;
								case 6: document.querySelector("#char").classList = 'char_level_six';
										document.querySelector(".speech-bubble-six").remove();
										break;
							}
						}, 2000);
					}
				}
			}
			
			let current_lvl = cur_level_css-1;
			$('[data-level=' + current_lvl + ']').addClass('cleared');
			answer_css[levels[cur_level_css-1].id] = text;
			level_cleared_css[levels[cur_level_css-1].id] = cur_level_css;
			document.querySelector("#next_btn").classList = 'btn btn-success';
			document.querySelector("#next_btn").disabled = false;
		}
		else if(text.indexOf(levels[cur_level_css-1].sel_init) == -1 && text.indexOf(levels[cur_level_css-1].sel_end) > -1 && text !== 'undefined')
		{
			switch(cur_level_css)
			{
				//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
				case 1: document.querySelector("#char").classList = 'char_level_one_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Seu seletor está incorreto.</div>';
						break;
				case 2: document.querySelector("#char").classList = 'char_level_two_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Seu seletor está incorreto.</div>';
						break;
				case 3: document.querySelector("#char").classList = 'char_level_three_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Seu seletor está incorreto.</div>';
						break;
				case 4: document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Seu seletor está incorreto.</div>';
						break;
				case 5: document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Seu seletor está incorreto.</div>';
						break;
				case 6: document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Seu seletor está incorreto.</div>';
						break;
			}
			
			setTimeout(function(){
				switch(cur_level_css)
				{
					//Retorna o personagem para pose normal e remove a fala depois de um tempo
					case 1: document.querySelector("#char").classList = 'char_level_one';
							document.querySelector(".speech-bubble-one").remove();
							break;
					case 2: document.querySelector("#char").classList = 'char_level_two';
							document.querySelector(".speech-bubble-two").remove();
							break;
					case 3: document.querySelector("#char").classList = 'char_level_three';
							document.querySelector(".speech-bubble-three").remove();
							break;
					case 4: document.querySelector("#char").classList = 'char_level_four';
							document.querySelector(".speech-bubble-four").remove();
							break;
					case 5: document.querySelector("#char").classList = 'char_level_five';
							document.querySelector(".speech-bubble-five").remove();
							break;
					case 6: document.querySelector("#char").classList = 'char_level_six';
							document.querySelector(".speech-bubble-six").remove();
							break;
				}
			}, 2000);
		}
		else if(text.indexOf(levels[cur_level_css-1].sel_init) > -1 && text.indexOf(levels[cur_level_css-1].sel_end) == -1 && text !== 'undefined')
		{
			switch(cur_level_css)
			{
				//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
				case 1: document.querySelector("#char").classList = 'char_level_one_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Está faltando um fecha chaves.</div>';
						break;
				case 2: document.querySelector("#char").classList = 'char_level_two_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Está faltando um fecha chaves.</div>';
						break;
				case 3: document.querySelector("#char").classList = 'char_level_three_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Está faltando um fecha chaves.</div>';
						break;
				case 4: document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Está faltando um fecha chaves.</div>';
						break;
				case 5: document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Está faltando um fecha chaves.</div>';
						break;
				case 6: document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Está faltando um fecha chaves.</div>';
						break;
			}
			
			setTimeout(function(){
				switch(cur_level_css)
				{
					//Retorna o personagem para pose normal e remove a fala depois de um tempo
					case 1: document.querySelector("#char").classList = 'char_level_one';
							document.querySelector(".speech-bubble-one").remove();
							break;
					case 2: document.querySelector("#char").classList = 'char_level_two';
							document.querySelector(".speech-bubble-two").remove();
							break;
					case 3: document.querySelector("#char").classList = 'char_level_three';
							document.querySelector(".speech-bubble-three").remove();
							break;
					case 4: document.querySelector("#char").classList = 'char_level_four';
							document.querySelector(".speech-bubble-four").remove();
							break;
					case 5: document.querySelector("#char").classList = 'char_level_five';
							document.querySelector(".speech-bubble-five").remove();
							break;
					case 6: document.querySelector("#char").classList = 'char_level_six';
							document.querySelector(".speech-bubble-six").remove();
							break;
				}
			}, 2000);
		}
		else{
			switch(cur_level_css)
			{
				//Altera o personagem caso o usuário erre e imprime a mensagem de feedback correspondente
				case 1: document.querySelector("#char").classList = 'char_level_one_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Código incorreto</div>';
						break;
				case 2: document.querySelector("#char").classList = 'char_level_two_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Código incorreto</div>';
						break;
				case 3: document.querySelector("#char").classList = 'char_level_three_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Código incorreto</div>';
						break;
				case 4: document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Código incorreto</div>';
						break;
				case 5: document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Código incorreto</div>';
						break;
				case 6: document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Código incorreto</div>';
						break;
			}
			
			setTimeout(function(){
				switch(cur_level_css)
				{
					//Retorna o personagem para pose normal e remove a fala depois de um tempo
					case 1: document.querySelector("#char").classList = 'char_level_one';
							document.querySelector(".speech-bubble-one").remove();
							break;
					case 2: document.querySelector("#char").classList = 'char_level_two';
							document.querySelector(".speech-bubble-two").remove();
							break;
					case 3: document.querySelector("#char").classList = 'char_level_three';
							document.querySelector(".speech-bubble-three").remove();
							break;
					case 4: document.querySelector("#char").classList = 'char_level_four';
							document.querySelector(".speech-bubble-four").remove();
							break;
					case 5: document.querySelector("#char").classList = 'char_level_five';
							document.querySelector(".speech-bubble-five").remove();
							break;
					case 6: document.querySelector("#char").classList = 'char_level_six';
							document.querySelector(".speech-bubble-six").remove();
							break;
				}
			}, 2000);
		}
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
