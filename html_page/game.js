//Nível atual
let cur_level_html = parseInt(localStorage.cur_level_html, 10) || 1;

//Vetor onde serão salvas as respostas do usuário (caso corretas)
let answer_html = (localStorage.answer_html && JSON.parse(localStorage.answer_html)) || {};

//Vetor que indica quais níveis foram cumpridos
let level_cleared_html = (localStorage.level_cleared_html && JSON.parse(localStorage.level_cleared_html)) || [];

let correct_answer = false;

//Informações de cada nível
let levels = [
	{
		id		: '1',
		name	: 'Tag de título: <h1>',
		instr	: 'Nossa vila precisa do nome na entrada. Utilize a tag para colocar o nome \"Web Village\" como título principal para a entrada da nossa cidade. Lembre-se de que os dois nomes precisam começar com letra maiúscula.',
		before	: '<html>\n   <head>\n     <title>Título</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<h1>',
		tag_end	: '</h1>',
		style	: 'one',
		help	: '<p>A tag &lt;h1&gt;&lt;/h1&gt; é utilizada para transformar seu texto em um título. O número 1 na tag representa o título principal da página.</p> <p>Caso queira criar outros títulos, ou subtítulos, no corpo da sua página você pode usar a tag com numerações maiores: &lt;h2&gt;, &lt;h3&gt;, até &lt;h6&gt;.</p>',
	},
	{
		id		: '2',
		name	: 'Tag de parágrafo: <p>',
		instr	: 'Use a tag para criar uma mensagem de boas vindas na placa.',
		before	: '<html>\n   <head>\n     <title>Parágrafo</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<p>',
		tag_end	: '</p>',
		style	: 'two',
		help	: '<p>A tag de parágrafo &lt;p&gt;&lt;/p&gt; é utilizada para indicar que seu texto pertence ao parágrafo da página.</p> <p>Sempre que quiser adicionar um novo parágrafo, basta iniciar novamente a tag.</p>'
	},
	{
		id		: '3',
		name	: 'Tag de imagem: <img>',
		instr	: 'Utilize a tag para colocar uma foto chamativa no outdoor. Assim, nossa cidade atrai a atenção dos outros. Para isso, use a imagem do caminho: https://i.imgur.com/MTpaggz.png',
		before	: '<html>\n   <head>\n     <title>Imagem</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<img',
		tag_end	: '>',
		style	: 'three',
		help	: '<p>A tag de imagem &lt;img&gt; adiciona uma imagem ao corpo de sua página. Observe que ela não possui o fechamento como as anteriores.</p> <p>Para que a página saiba qual imagem será carregada, você precisa utilizar o atributo <q>src</q> e atribuir o nome da imagem, como:</p> <p>&lt;img src=<q>nome_da_imagem.jpg</q>&gt;.</p><p>Caso a imagem esteja em um diretório diferente do qual está seu código HTML, é necessário que você insira o caminho completo para a imagem:</p><p>&lt;img src=<q>Caminho/ para/ imagem/nome_da_image.jpg</q>&gt;</p>'
	},
	{
		id		: '4',
		name	: 'Tag de botão: <button>',
		instr	: 'Precisamos de um novo botão de alarme para aviso de invasões. Consegue criar para nós? Coloque o nome de "Alarme" no conteúdo do botão.',
		before	: '<html>\n   <head>\n     <title>Botão</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<button>',
		tag_end	: '</button>',
		style	: 'four',
		help	: '<p>A tag &lt;button&gt; insere um botão na página que pode executar alguma função que deseje. Essa função é chamada quando o botão é clicado.</p> <p>Ao criar um botão, você pode colocar um nome para o mesmo que indicará o que ele faz: &lt;button&gt;Botão&lt;/button&gt;'
	},
	{
		id		: '5',
		name	: 'Tags de lista: <ul>, <ol> e <li>',
		instr	: 'Perdemos alguns ingredientes. Crie uma lista de compras com os que estão faltando.',
		before	: '<html>\n   <head>\n     <title>Lista</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<ul>',
		tag_end	: '</ul>',
		style	: 'five',
		help	: '<p>Estas tags criam uma lista com, ou sem, subitens. A tag &lt;ul&gt; cria a lista, enquanto a &lt;li&gt; indica os itens da lista.</p><p>&lt;ul&gt;Lista</p><p>&nbsp;&nbsp;&lt;li&gt;Item 1&lt;/li&gt;</p><p>&nbsp;&nbsp;&lt;li&gt;Item 2&lt;/li&gt;</p><p>&nbsp;&nbsp;&lt;li&gt;Item 3&lt;/li&gt;</p><p>&lt;/ul&gt;</p><p>Listas criadas pela tag &lt;ul&gt; são conhecidas como listas não ordenadas, onde os itens não possuem uma numeração. Para que sua lista possua os números em cada item, você utiliza &lt;ol&gt;</p>'
	},
	{
		id		: '6',
		name	: 'Tags de tabela: <table>, <tr>, <th> e <td>',
		instr	: 'A janela da prefeitura foi quebrada. Nos ajuda com outra. Para isto, utilize um cabeçalho e uma linha com dois dados da célula. Lembre-se que o cabeçalho tem que ocupar o espaço dos dois.',
		before	: '<html>\n   <head>\n     <title>Tabela</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<table>',
		tag_end	: '</table>',
		style	: 'six',
		help	: '<p>A tag &lt;table&gt; cria uma tabela e as tags &lt;tr&gt;, &lt;th&gt;, &lt;td&gt; criam os elementos da tabela, onde &lt;tr&gt; é referente à linha da tabela, &lt;th&gt; ao título da coluna e &lt;td&gt; ao dado da célula da tabela.</p><p>&lt;table&gt;</p><p>&nbsp;&nbsp;&lt;tr&gt;&lt;th&gt;...&lt;/th&gt;&lt;/tr&gt;</p><p>&nbsp;&nbsp;&lt;tr&gt;&lt;td&gt;...&lt;/td&gt;&lt;td&gt;...&lt;/td&gt;&lt;/tr&gt;</p><p>&lt;/table&gt;</p><p>No caso desta atividade não há necessidade de colocar texto dentro da tag.</p><p>Dica: você pode utilizar o atributo colspan para fazer um elemento ocupar mais de uma linha. Para isso, basta atribuir o número de colunas que irá ocupar, como:</p><p>&lt;th colspan=2&gt;</p>'
	},
	{
		id		: '7',
		name	: 'Tag de divisão: <div>',
		instr	: 'Crie duas div vazias e sem classes ou identificadores para serem lâmpadas.',
		before	: '<html>\n   <head>\n     <title>Div</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<div>',
		tag_end	: '</div>',
		style	: 'seven',
		help	: 'A tag &lt;div&gt; é utilizada para organizar melhor seu código, criando divisões em sua página. Estas divisões funcionam como blocos e você pode estilizá-los, utilizando <q>id</q> e/ou <q>class</q>, e organizar sua página de maneira mais eficiente. Quando se aplica um estilo a uma &lt;div&gt;, tudo que estiver dentro da mesma irá receber aquele estilo.<br>&lt;div id=<q>id_da_div</q>&gt;</p><p>&nbsp;&nbsp;&lt;div class=<q>classe_da_div</q>&gt;...&lt;/div&gt;</p><p>&nbsp;&nbsp;&lt;div class=<q>classe_da_div</q>&gt;...&lt;/div&gt;</p><p>&lt;/div&gt;</p>'
	},
	{
		id		: '8',
		name	: 'Tag de comentário: <!-- -->',
		instr	: 'Os invasores bloquearam o caminho. Utilize as tags de comentário para removê-las do caminho, comentando <div id="pedra"></div>',
		before	: '<html>\n   <head>\n     <title>Comentário</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<!--',
		tag_end	: '-->',
		style	: 'eight',
		item	: '<div id="pedra"></div>',
		help	: '<p>Estas tags especiais são utilizadas para fazer seu navegador ignorar aquela parte. Ou seja, ao abrir a página qualquer código que estiver dentro delas não será utilizado.</p> <p>Um bom uso para elas é o de deixar seu código mais fácil de entender caso outra pessoa tenha acesso.</p> <p>Outra forma é a de testar seu código, comentando algo que já existia para verificar se a remoção da parte do código afeta sua página ou, ainda, tirar alguma parte que esteja causando dor de cabeça e queira resolver depois.</p><p>A maneira de usar está a seguir:</p><p>&lt;!--</p><p>&nbsp;&nbsp;Código</p><p>--&gt;</p>'
	},
	{
		id		: '9',
		name	: 'Tag de link: <a>',
		instr	: ' Crie um link para a página de CSS (vide ajuda). Lembre-se de colocar um nome para o link para não ficar vazio. Assim que ele for criado, clique no mesmo para ser direcionado para as atividades de CSS.',
		before	: '<html>\n   <head>\n     <title>Link</title>\n   </head>\n   <body>\n',
		after	: '   </body>\n</html>',
		tag_init: '<a',
		tag_end	: '</a>',
		style	: 'nine',
		help	: '<p>A tag &lt;a&gt; cria um link para uma página, atribuindo o link da página ao atributo <q>href</q>. Assim, ao clicar nele, você é redirecionado àquela página.</p><p>&lt;a href=<q>link_da_página</q>&gt;Nome do link&lt;/a&gt;<p>Lembre-se que links que não possuem o protocolo http, ou https, na url do link que você criou é entendida pelo navegador como uma url relativa, ou seja, ele irá utilizar como base a url do site em que você se encontra e acrescentar o link que você está passando. Para que você seja redirecionado, de fato, para o link fornecido é necessário que você coloque a url absoluta do site com <q>http</q></p><p>Utilize o seguinte link nesta atividade:</p><p>https://webvillage.herokuapp.com/css_page/aula.html</p>'
	}
];

//Variável auxiliar que pega a quantidade de níveis
let num_levels = Object.keys(levels).length;

//Carrega o nível ao carregar a página
$(window).on("load", loadLevel(cur_level_html));

//Função auxiliar para verificar se uma classe está atribuída à um elemento do HTML
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

//Função que carrega as informações de cada nível
function loadLevel(level)
{
	document.querySelector("#title").textContent 	= levels[level-1].name;
	document.querySelector("#title").classList		= 'title_else';
	document.querySelector("#instr").textContent 	= levels[level-1].instr;
	document.querySelector("#dialog").innerHTML 	= levels[level-1].help;
	document.querySelector("#about").innerHTML 		= '<p>O HTML (HyperText Markup Language), ou Linguagem de Marcação de HiperTexto, é um formato de arquivo em texto com marcações dando a este uma estrutura. As marcações são definidas utilizando <i>tags</i> que representam alguma informação da página Web. Quase todas as tags necessitam que sejam iniciadas com &lt;nome_da_tag&gt; e fechadas com &lt;/nome_da_tag&gt;. Aquelas que podem ter um elemento filho precisam ser fechadas. Mas tags como de imagem &lt;img&gt; não precisam pois não existe um elemento filho para ela.</p><p>O navegador interpreta o arquivo como HTML ao utilizar a tag <i>&lt;html&gt;&lt;/html&gt;</i>. Dentro desta tag, será construída sua página. Ela possui um cabeçalho, definido pela tag <i>&lt;head&gt;&lt;/head&gt;</i> (onde são definidos o título da página, que aparece na aba do navegador, e os metadados presentes na página que não são mostrados e costumam ser links para documentos de estilo da página e scripts), e um corpo, definido pela tag <i>&lt;body&gt;&lt;/body&gt;</i> e é dentro dessa tag que estará todo o corpo de sua página.</p><p>Portanto, sabemos que um documento html tem essa cara:</p><img src="../img/diagram_html.jfif"><p>Cumpra as atividades e avance para os próximos níveis.</p>';
	document.querySelector("#before").textContent 	= levels[level-1].before;
	document.querySelector("#after").textContent 	= levels[level-1].after;
	document.querySelector(".current").innerHTML 	= level;
	document.querySelector(".total").innerHTML 		= num_levels;
	document.querySelector(".background").classList = 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").classList 	= 'btn btn-secondary';
	document.querySelector("#next_btn").textContent = 'Próximo';
	document.querySelector(".item").classList 		= 'item pos_' + levels[level-1].style;
	document.querySelector(".item").innerHTML 		= '';
	
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
		case 7: document.querySelector("#char").classList = 'char_level_seven';
				break;
		case 8: document.querySelector("#char").classList = 'char_level_eight';
				break;
		case 9: document.querySelector("#char").classList = 'char_level_nine';
				break;
	}

	if(level_cleared_html[level] !== null && level_cleared_html[level] !== undefined)
	{
		document.querySelector("#next_btn").disabled = false;
		document.querySelector("#next_btn").classList = 'btn btn-success';
	}
	else
		document.querySelector("#next_btn").disabled = true;
	
	//Se o nível já tiver sido concluído e foi visitado novamente, carrega as respostas que o usuário salvou
	if(answer_html[level] !== '' || answer_html[level] !== null && (localStorage.answer_html !== null || localStorage.answer_html !== ''))
	{
		$("textarea").val(answer_html[level]);
		//let ans = JSON.parse(localStorage.answer_html);
		if(answer_html[level] !== undefined && answer_html[level] !== null)
		{
			document.querySelector(".item").innerHTML = answer_html[level];
		}
	}
	//Se não tinha resposta salva para o nível, a área de texto fica sem valor
	else
		$("textarea").val('');
	
	//Esconde box com os níveis
	$("#levels-box").hide();
	
	//Ao carregar o nível remove a animação de fadeOut de quando saiu do nível
	if(hasClass(document.querySelector('#board'), 'fadeOut') && hasClass(document.querySelector('#board'), 'animated_fadeout'))
	{
		document.querySelector('#board').classList.remove('fadeOut');
		document.querySelector('#board').classList.remove('animated_fadeout');
	}
	
	//Adiciona animação de fadeIn ao carregar o nível
	document.querySelector('#board').classList.add('fadeIn');
	document.querySelector('#board').classList.add('animated_fadein');

	//Condicionais para carregar o tamanho da área de texto dos níveis
	if(level == 2)
	{
		document.querySelector("textarea").classList 	= 'text_two';
		document.querySelector("#pc_screen").classList 	= 'pc_screen_two';
	}
	else if(level == 5)
	{
		document.querySelector("textarea").classList 	= 'text_five';
		document.querySelector("#pc_screen").classList 	= 'pc_screen_five';
		document.querySelector("#title").classList		= 'title_table';
	}
	else if(level == 6)
	{
		document.querySelector("#pc_screen").classList 	= 'pc_screen_table';
		document.querySelector("textarea").classList 	= 'text_six';
		document.querySelector("#title").classList		= 'title_table';
	}
	else if(level == 7)
	{
		document.querySelector("#pc_screen").classList 	= 'pc_screen_div';
		document.querySelector("textarea").classList 	= 'text_seven';
	}
	else if(level == 8)
	{
		document.querySelector(".item").innerHTML 		= levels[level-1].item;
		document.querySelector("#pedra").classList 		= 'pos_' + levels[level-1].style;
		document.querySelector("#pc_screen").classList 	= 'pc_screen_eight';
		document.querySelector("textarea").classList 	= 'text_eight';
	}
	else if(level == num_levels)
	{
		document.querySelector("#pc_screen").classList 	= 'pc_screen_nine';
		document.querySelector("textarea").classList 	= 'text_nine';
	}
	else
	{
		document.querySelector("#pc_screen").classList 	= 'pc_screen_else';
		document.querySelector("textarea").classList 	= 'text_else';
	}
	//Condicionais para deixar botões de mudança de nível apenas nos níveis corretos
	if(level === 1)
	{
		document.querySelector("#button1").disabled = true;
		document.querySelector("#button2").disabled = false;
	}
	else
	{
		if(level === num_levels)
		{
			document.querySelector("#button1").disabled = false;
			document.querySelector("#button2").disabled = true;
			document.querySelector("#check").classList = 'btn btn-primary check_last_level';
			document.querySelector("#clear_text").classList = 'btn btn-info clear_text_last_level';
			document.querySelector("#next_btn").style.display = 'none';
		}
		else{
			document.querySelector("#check").classList = 'btn btn-primary check';
			document.querySelector("#clear_text").classList = 'btn btn-info clear_text';
			document.querySelector("#button1").disabled = false;
			document.querySelector("#button2").disabled = false;
		}
	}	
};

function checkImageExists(image, callBack)
{
	let imgData = new Image();
	imgData.onload = function(){
		callBack(true);
	};
	imgData.onerror = function(){
		callBack(false);
	};
	imgData.src = image;
}

$(window).on('beforeunload', function(){
	localStorage.setItem('cur_level_html', cur_level_html);
	localStorage.setItem('answer_html', JSON.stringify(answer_html));
	localStorage.setItem('level_cleared_html', JSON.stringify(level_cleared_html));
});

$(function(){
	
	//Não permite que o usuário dê ENTER além do número estipulado de linhas para a área de texto
	let new_line_level_two = 3, 
		new_line_level_five = 5,
		new_line_level_six = 4,
		new_line_level_seven = 4,
		new_line_level_eight = 4,
		new_line_level_nine = 3;
	$("textarea").keydown(function(e){
		newLines = $(this).val().split("\n").length;

		if(	(e.keyCode == 13 && cur_level_html == 2 && newLines >= new_line_level_two) 		|| 
			(e.keyCode == 13 && cur_level_html == 5 && newLines >= new_line_level_five) 		|| 
			(e.keyCode == 13 && cur_level_html == 6 && newLines >= new_line_level_six) 		|| 
			(e.keyCode == 13 && cur_level_html == 7 && newLines >= new_line_level_nine) 		|| 
			(e.keyCode == 13 && cur_level_html == 8 && newLines >= new_line_level_eight) 		|| 
			(e.keyCode == 13 && cur_level_html == 9 && newLines >= new_line_level_eleven) 	|| 
			(e.keyCode == 13 && (cur_level_html !== 2 && cur_level_html !== 5 && cur_level_html !== 6 && cur_level_html !== 7 && cur_level_html !== 8 && cur_level_html !== 9)))
		{
			return false;
		}
	});

	//Limpa as respostas e recarrega a página depois de um segundo
	$("#clear_storage").on("click", function(){
		answer_html = {};
		level_cleared_html = [];
		localStorage.setItem("level_cleared_html", level_cleared_html);
		localStorage.setItem("answer_html", answer_html);
		setTimeout(function(){
			location.reload();
		}, 1000);
	});

	//Limpa a área de texto do código
	$("#clear_text").on("click", function(){
		$("textarea").val('');
	});
	
	//Muda de nível caso o atual tenha sido concluído adicionando animação de fadeOut
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
				if(cur_level_html < num_levels)
				{
					cur_level_html++;
					loadLevel(cur_level_html);
				}
			}, 1000
		);
	});

	//Botão de voltar um nível com animação de fadeOut
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
				if(cur_level_html !== 1)
				{
					document.querySelector("#button1").disabled = false;
					cur_level_html--;
					loadLevel(cur_level_html);
				}
			}, 1000
		);
	});
	
	//Cria uma caixa com ícones dos níveis da atividade
	levels.forEach(function(level, i){
		let levelMarker = $('<span/>').addClass('level-marker').attr('data-level', i).text(i+1);

		if(localStorage.getItem('level_cleared_html') !== null)
		{
			if (hasValue(level.id, localStorage.getItem('level_cleared_html'))) {
				levelMarker.addClass('cleared');
			}
		}
		
		levelMarker.appendTo('#levels');
	});

	//Muda o nível para o selecionado na caixa
	$(".level-marker").on("click", function(){
		let level = $(this).attr('data-level');
		level = parseInt(level, 10);
		level++;
		cur_level_html = level;
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

	//Disponibiliza a caixa com os ícones dos níveis ao clicar no indicador de nível
	$("#level-indicator").on("click", function(){
		$('#levels-box').toggle();
	});

	//Botão de avançar um nível com animação de fadeOut
	$("#button2").on("click", function(){
		if(hasClass(document.querySelector('#board'), 'fadeIn') && hasClass(document.querySelector('#board'), 'animated_fadein'))
		{
			document.querySelector('#board').classList.remove('fadeIn');
			document.querySelector('#board').classList.remove('animated_fadein');
		}
		document.querySelector('#board').classList.add('fadeOut');
		document.querySelector('#board').classList.add('animated_fadeout');
		setTimeout(function(){
			if(cur_level_html !== num_levels)
			{
				document.querySelector("#button2").disabled = false;
				cur_level_html++;
				loadLevel(cur_level_html);
			}
		}, 1000);
	});
	
	//Testa o código digitado pelo usuário e trata erros de entrada
	$("#check").on("click", function(){
		
		text = $("textarea").val();
		
		//Se a resposta estiver correta, atribui o código ao item da área de visualização
		if(text.indexOf(levels[cur_level_html-1].tag_init) > -1 
				&& text.indexOf(levels[cur_level_html-1].tag_end) > -1 
				&& text !== 'undefined' || (cur_level_html == 5 && text.indexOf('<ol>') > -1 
				&& text.indexOf('</ol>') > -1))
		{
			if(text[text.indexOf('>') + 1] !== '<' || cur_level_html === 8 || cur_level_html === 7 || cur_level_html === 6)
			{
				correct_answer = true;
				if(!(text.indexOf("Web Village") > -1) && cur_level_html === 1)
				{
					correct_answer = false;
					document.querySelector("#char").classList = 'char_level_one_error';
					document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">O nome de nossa vila está errado.</div>';
					setTimeout(function(){
						document.querySelector("#char").classList = 'char_level_one';
						document.querySelector(".speech-bubble-one").remove();
					}, 2000);
				}
				else if(cur_level_html === 3)
				{
					let aux = text.split("\"");
					let src = aux[1].split("\"");
					checkImageExists(src[0], function(existsImage){
						if(existsImage == false)
						{
							correct_answer = false;
							document.querySelector("#char").classList = 'char_level_three_error';
							document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Imagem não encontrada.</div>';
							setTimeout(function(){
								document.querySelector("#char").classList = 'char_level_three';
								document.querySelector(".speech-bubble-three").remove();
							}, 2000);
						}
					});
				}
				else if(cur_level_html === 4)
				{
					if (!(text.indexOf('Alarme') >= 0))
					{
						correct_answer = false;
						document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Nome errado do botão.</div>';
						setTimeout(function(){
							document.querySelector("#char").classList = 'char_level_four';
							document.querySelector(".speech-bubble-four").remove();
						}, 2000);
					}
				}
				else if(cur_level_html === 5)
				{
					
					if (!(text.indexOf('Batata') >= 0 && text.indexOf('Garra') >= 0 && text.indexOf('Frutas') >= 0))
					{
						correct_answer = false;
						document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Tem ingredientes errados na lista.</div>';
						setTimeout(function(){
							document.querySelector("#char").classList = 'char_level_five';
							document.querySelector(".speech-bubble-five").remove();
						}, 2000);
					}
				}
				else if(cur_level_html === 6)
				{
					let aux = text.replace(/(\r\n|\n|\r)/gm, "");
					if (aux.indexOf('colspan') < 0)
					{
						correct_answer = false;
						document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Está faltando o colspan.</div>';
						setTimeout(function(){
							document.querySelector("#char").classList = 'char_level_six';
							document.querySelector(".speech-bubble-six").remove();
						}, 2000);
					}
					else{
						for (var i = 0; i < aux.length-1; i++) {
							console.log(aux[i]);
							if(aux[i] == '>' && aux[i+1] !== '<')
							{
								correct_answer = false;
								document.querySelector("#char").classList = 'char_level_six_error';
								document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Não precisa de texto.</div>';
								setTimeout(function(){
									document.querySelector("#char").classList = 'char_level_six';
									document.querySelector(".speech-bubble-six").remove();
								}, 2000);
								break;
							}
						}
					}					
				}
				else if(cur_level_html === 8)
				{
					if(text.indexOf(levels[cur_level_html-1].item) <= 0){
						correct_answer = false;
						document.querySelector("#char").classList = 'char_level_eight_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-eight">Sua div está incorreta.</div>';
						setTimeout(function(){
							document.querySelector("#char").classList = 'char_level_eight';
							document.querySelector(".speech-bubble-eight").remove();
						}, 2000);
					}
				}

				if (correct_answer === true)
				{
					document.querySelector(".item").innerHTML = text;
					let current_lvl = cur_level_html-1;
					$('[data-level=' + current_lvl + ']').addClass('cleared');
					answer_html[levels[cur_level_html-1].id] = text;
					level_cleared_html[levels[cur_level_html-1].id] = cur_level_html;
					document.querySelector("#next_btn").disabled = false;
					document.querySelector("#next_btn").classList = 'btn btn-success';
					switch(cur_level_html)
					{
						case 1: document.querySelector("#char").classList = 'char_level_one_done';
								break;
						case 2: document.querySelector("#char").classList = 'char_level_two_done';
								break;
						case 3: document.querySelector("#char").classList = 'char_level_three_done';
								break;
						case 4: document.querySelector("#char").classList = 'char_level_four_done';
								break;
						case 5: document.querySelector("#char").classList = 'char_level_five_done';
								break;
						case 6: document.querySelector("#char").classList = 'char_level_six_done';
								break;
						case 7: document.querySelector("#char").classList = 'char_level_seven_done';
								break;
						case 8: document.querySelector("#char").classList = 'char_level_eight_done';
								break;
						case 9: document.querySelector("#char").classList = 'char_level_nine_done';
								break;
					}
				}
			}
			else{
				correct_answer = false;
				switch(cur_level_html)
				{
					case 1: document.querySelector("#char").classList = 'char_level_one_error';
							document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Esqueceu do conteúdo.</div>';
							break;
					case 2: document.querySelector("#char").classList = 'char_level_two_error';
							document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Esqueceu do conteúdo.</div>';
							break;
					case 4: document.querySelector("#char").classList = 'char_level_four_error';
							document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Esqueceu do conteúdo.</div>';
							break;
					case 5: document.querySelector("#char").classList = 'char_level_five_error';
							document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Esqueceu do conteúdo.</div>';
							break;
					case 9: document.querySelector("#char").classList = 'char_level_nine_error';
							document.querySelector(".background").innerHTML += '<div class="speech-bubble-nine">Esqueceu do conteúdo.</div>';
							break;
				}
				setTimeout(function(){
					switch(cur_level_html)
					{
					case 1: document.querySelector("#char").classList = 'char_level_one';
							document.querySelector(".speech-bubble-one").remove();
							break;
					case 2: document.querySelector("#char").classList = 'char_level_two';
							document.querySelector(".speech-bubble-two").remove();
							break;
					case 4: document.querySelector("#char").classList = 'char_level_four';
							document.querySelector(".speech-bubble-four").remove();
							break;
					case 5: document.querySelector("#char").classList = 'char_level_five';
							document.querySelector(".speech-bubble-five").remove();
							break;
					case 9: document.querySelector("#char").classList = 'char_level_nine';
							document.querySelector(".speech-bubble-nine").remove();
							break;
					}
				}, 2000);
			}
		}

		//Tratamento de erro para o caso de o usuário digitar de forma incorreta, ou não digitar, a abertura de tag
		else if(text.indexOf(levels[cur_level_html-1].tag_init) == -1 && text.indexOf(levels[cur_level_html-1].tag_end) > -1 && text !== 'undefined')
		{
			correct_answer = false;
			switch(cur_level_html)
			{
				case 1: document.querySelector("#char").classList = 'char_level_one_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 2: document.querySelector("#char").classList = 'char_level_two_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 3: document.querySelector("#char").classList = 'char_level_three_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 4: document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 5: document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 6: document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 7: document.querySelector("#char").classList = 'char_level_seven_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-seven">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 8: document.querySelector("#char").classList = 'char_level_eight_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-eight">Você não abriu sua tag ou está incorreta.</div>';
						break;
				case 9: document.querySelector("#char").classList = 'char_level_nine_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-nine">Você não abriu sua tag ou está incorreta.</div>';
						break;
			}
			setTimeout(function(){
				switch(cur_level_html)
				{
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
				case 7: document.querySelector("#char").classList = 'char_level_seven';
						document.querySelector(".speech-bubble-seven").remove();
						break;
				case 8: document.querySelector("#char").classList = 'char_level_eight';
						document.querySelector(".speech-bubble-eight").remove();
						break;
				case 9: document.querySelector("#char").classList = 'char_level_nine';
						document.querySelector(".speech-bubble-nine").remove();
						break;
				}
			}, 2000);
		}
		//Tratamento de erro para o caso de o usuário digitar de forma incorreta, ou não digitar, o fechamento da tag
		else if(text.indexOf(levels[cur_level_html-1].tag_init) > -1 && text.indexOf(levels[cur_level_html-1].tag_end) == -1 && text !== 'undefined')
		{
			correct_answer = false;
			switch(cur_level_html)
			{
				case 1: document.querySelector("#char").classList = 'char_level_one_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 2: document.querySelector("#char").classList = 'char_level_two_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 3: document.querySelector("#char").classList = 'char_level_three_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 4: document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 5: document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 6: document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 7: document.querySelector("#char").classList = 'char_level_seven_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-seven">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 8: document.querySelector("#char").classList = 'char_level_eight_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-eight">Você não fechou sua tag ou está incorreta.</div>';
						break;
				case 9: document.querySelector("#char").classList = 'char_level_nine_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-nine">Você não fechou sua tag ou está incorreta.</div>';
						break;
			}
			setTimeout(function(){
				switch(cur_level_html)
				{
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
				case 7: document.querySelector("#char").classList = 'char_level_seven';
						document.querySelector(".speech-bubble-seven").remove();
						break;
				case 8: document.querySelector("#char").classList = 'char_level_eight';
						document.querySelector(".speech-bubble-eight").remove();
						break;
				case 9: document.querySelector("#char").classList = 'char_level_nine';
						document.querySelector(".speech-bubble-nine").remove();
						break;
				}
			}, 2000);
		}
		//Tratamento de erro para o caso de o usuário digitar de forma incorreta, ou não digitar, a abertura e fechamento da tag
		else if(text.indexOf(levels[cur_level_html-1].tag_init) == -1 && text.indexOf(levels[cur_level_html-1].tag_end) == -1 && text !== 'undefined')
		{
			correct_answer = false;
			switch(cur_level_html)
			{
				case 1: document.querySelector("#char").classList = 'char_level_one_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-one">Você está se esquecendo das tags.</div>';
						break;
				case 2: document.querySelector("#char").classList = 'char_level_two_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-two">Você está se esquecendo das tags.</div>';
						break;
				case 3: document.querySelector("#char").classList = 'char_level_three_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-three">Você está se esquecendo das tags.</div>';
						break;
				case 4: document.querySelector("#char").classList = 'char_level_four_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-four">Você está se esquecendo das tags.</div>';
						break;
				case 5: document.querySelector("#char").classList = 'char_level_five_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-five">Você está se esquecendo das tags.</div>';
						break;
				case 6: document.querySelector("#char").classList = 'char_level_six_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-six">Você está se esquecendo das tags.</div>';
						break;
				case 7: document.querySelector("#char").classList = 'char_level_seven_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-seven">Você está se esquecendo das tags.</div>';
						break;
				case 8: document.querySelector("#char").classList = 'char_level_eight_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-eight">Você está se esquecendo das tags.</div>';
						break;
				case 9: document.querySelector("#char").classList = 'char_level_nine_error';
						document.querySelector(".background").innerHTML += '<div class="speech-bubble-nine">Você está se esquecendo das tags.</div>';
						break;
			}
			setTimeout(function(){
				switch(cur_level_html)
				{
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
				case 7: document.querySelector("#char").classList = 'char_level_seven';
						document.querySelector(".speech-bubble-seven").remove();
						break;
				case 8: document.querySelector("#char").classList = 'char_level_eight';
						document.querySelector(".speech-bubble-eight").remove();
						break;
				case 9: document.querySelector("#char").classList = 'char_level_nine';
						document.querySelector(".speech-bubble-nine").remove();
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

	$("#html_about_btn").on('click', function(){
		$("#about").dialog('open');
		return false;
	});
});


/*

let titles = [
	{
		'pt-br' : 'Tag de título: <h1>',
		'es'	: 'Etiqueta del título: <h1>',
		'en'	: 'Title tag: <h1>',
		'fr'	: 'Balise de titre: <h1>',
		'it'	: 'Tag del titolo: <h1>',
		'jp'	: 'タイトルタグ: <h1>',
		'ch'	: '標題標籤: <h1>',
		'cr'	: '제목 태그',
		'dt'	: 'Titel-Tag: <h1>'
	},
	{
		'pt-br' : 'Tag de parágrafo: <p>',
		'es'	: 'Etiqueta de párrafo: <p>',
		'en'	: 'Paragraph Tag: <p>',
		'fr'	: 'Balise de paragraphe: <p>',
		'it'	: 'Etichetta del paragrafo: <p>',
		'jp'	: '段落タグ：<p>',
		'ch'	: '段落標籤：<p>',
		'cr'	: '단락 태그: <p>',
		'dt'	: 'Absatz-Tag: <p>'
	},
	{
		'pt-br' : 'Tag de imagem: <img>',
		'es'	: 'Etiqueta de imagen: <img>',
		'en'	: 'Image Tag: <img>',
		'fr'	: 'Tags d'image: <img>',
		'it'	: 'Tag immagine: <img>',
		'jp'	: '画像タグ：<img>',
		'ch'	: '圖片標籤：<img>',
		'cr'	: '이미지 태그 : <img>',
		'dt'	: 'Image-Tag: <img>'
	},
	{
		'pt-br' : 'Tag de link: <a>',
		'es'	: 'Etiqueta de enlace: <a>',
		'en'	: 'Link Tag: <a>',
		'fr'	: 'Tag de lien: <a>',
		'it'	: 'Tag de link: <a>',
		'jp'	: 'リンクタグ：<a>',
		'ch'	: '鏈接標籤：<a>',
		'cr'	: '링크 태그 : <a>',
		'dt'	: 'Link-Tag: <a>'
	},
	{
		'pt-br' : 'Tag de botão: <button>',
		'es'	: 'Etiqueta de botón: <button>',
		'en'	: 'Button tag: <button>',
		'fr'	: 'Tag du bouton: <button>',
		'it'	: 'Tag pulsante: <button>',
		'jp'	: 'ボタンタグ：<button>',
		'ch'	: '按鈕標記：<button>',
		'cr'	: '버튼 태그 : <button>',
		'dt'	: 'Button Tag: <button>'
	},
	{
		'pt-br' : 'Tag de lista: <ul>, <li>',
		'es'	: '',
		'en'	: '',
		'fr'	: '',
		'it'	: '',
		'jp'	: '',
		'ch'	: '',
		'cr'	: '',
		'dt'	: ''
	},
	{
		'pt-br' : 'Tags de tabela: <table>, <tr>, <th> e <td>',
		'es'	: '',
		'en'	: '',
		'fr'	: '',
		'it'	: '',
		'jp'	: '',
		'ch'	: '',
		'cr'	: '',
		'dt'	: ''
	},
	{
		'pt-br' : 'Classe',
		'es'	: '',
		'en'	: '',
		'fr'	: '',
		'it'	: '',
		'jp'	: '',
		'ch'	: '',
		'cr'	: '',
		'dt'	: ''
	},
	{
		'pt-br' : 'Identificador',
		'es'	: '',
		'en'	: '',
		'fr'	: '',
		'it'	: '',
		'jp'	: '',
		'ch'	: '',
		'cr'	: '',
		'dt'	: ''
	},
	{
		'pt-br' : 'Tag de comentário: <!-- -->',
		'es'	: '',
		'en'	: '',
		'fr'	: '',
		'it'	: '',
		'jp'	: '',
		'ch'	: '',
		'cr'	: '',
		'dt'	: ''
	}
];

let instructions = [
	{
		'pt-br' : 'A tag <h1> é utilizada para transformar seu texto em um título. Utilize a tag para criar uma mensagem para a entrada da nossa cidade.',
		'es'	: 'La etiqueta <h1> se utiliza para transformar su texto en un título. Utilice la etiqueta para crear un mensaje para la entrada de nuestra ciudad.',
		'en'	: 'The <h1> tag is used to turn your text into a title. Please use the tag to create a message to the entrance of our city.',
		'fr'	: 'La balise <h1> est utilisée pour transformer votre texte en titre. Utilisez la balise pour créer un message pour entrer dans notre ville.',
		'it'	: 'Il tag <h1> viene utilizzato per trasformare il tuo testo in un titolo. Usa il tag per creare un messaggio per entrare nella nostra città.',
		'jp'	: '<h1>タグは、テキストをタイトルに変えるために使用されます。 タグを使用して私たちの街に入るためのメッセージを作成してください。',
		'ch'	: '<h1>標籤用於將文字轉換為標題。 使用標記創建消息以進入我們的城市。',
		'cr'	: '<h1> 태그는 텍스트를 제목으로 변환하는 데 사용됩니다. 이 태그를 사용하여 우리시에 들어오는 메시지를 만드십시오.',
		'dt'	: 'Das <h1> -Tag wird verwendet, um aus Ihrem Text einen Titel zu machen. Verwenden Sie das Tag, um eine Nachricht zu erstellen, um unsere Stadt einzugeben.'
	}
];
*/
