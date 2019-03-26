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
		name: 'Tag de título: <h1>',
		instr: 'Nossa cidade precisa de uma mensagem de boas vindas. Utilize a tag para criar essa mensagem para a entrada da nossa cidade.',
		before: '<html>\n   <head>\n     <title>Título</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<h1>',
		tag_end: '</h1>',
		style: 'one',
		help: 'A tag <h1></h1> é utilizada para transformar seu texto em um título. O número 1 na tag representa o título principal da página. Caso queira criar outros títulos, ou subtítulos, no corpo da sua página você pode usar a tag com numerações maiores: <h2>, <h3>, etc.',
	},
	{
		id: '2',
		name: 'Tag de parágrafo: <p>',
		instr: 'Use a tag para criar uma mensagem de boas vindas.',
		before: "<html>\n   <head>\n     <title>Parágrafo</title>\n   </head>\n   <body>\n",
		after: '   </body>\n</html>',
		tag_init: '<p>',
		tag_end: '</p>',
		style: 'two',
		help: 'A tag de parágrafo <p></p> é utilizada para indicar que seu texto pertence ao parágrafo da página. Sempre que quiser adicionar um novo parágrafo, basta iniciar novamente a tag.'
	},
	{
		id: '3',
		name: 'Tag de imagem: <img>',
		instr: 'Utilize a tag para colocar uma foto chamativa no outdoor. Assim, nossa cidade atrai a atenção dos outros. Para isso, use a imagem do caminho: ',
		before: '<html>\n   <head>\n     <title>Imagem</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<img',
		tag_end: '>',
		style: 'three',
		help: 'A tag de imagem <img> adiciona uma imagem ao corpo de sua página. Observe que ela não possui o fechamento como as anteriores. Para que a página saiba qual imagem será carregada, você precisa utilizar o atributo \"src\" e atribuir o nome da imagem, como: \n\n<img src=\"nome_da_imagem.jpg\">.\n\nCaso a imagem esteja em um diretório diferente do qual está seu código HTML, é necessário que você insira o caminho completo para a imagem:\n\n<img src=\"Caminho/ para/ imagem/nome_da_image.jpg\"'
	},
	{
		id: '4',
		name: 'Tag de botão: <button>',
		instr: 'Precisamos de um novo botão de alarme para aviso de invasões. Consegue criar para nós?',
		before: '<html>\n   <head>\n     <title>Botão</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<button>',
		tag_end: '</button>',
		style: 'four',
		help: 'A tag <button> insere um botão na página que pode executar alguma função que deseje. Essa função é chamada quando o botão é clicado. Ao criar um botão, você pode colocar um nome para o mesmo que indicará o que ele faz: <button>Botão</button>'
	},
	{
		id: '5',
		name: 'Tags de lista: <ul> e <li>',
		instr: 'Muitos dos ingredientes que tínhamos foi perdido. Crie uma lista de compras para o restaurante.',
		before: '<html>\n   <head>\n     <title>Lista</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<ul>',
		tag_end: '</ul>',
		style: 'five',
		help: 'Estas tags criam uma lista com, ou sem, subitens. A tag <ul> cria a lista, enquanto a <li> indica os itens da lista.\n<ul>Lista\n   <li>Item 1</li>\n   <li>Item 2</li>\n   <li>Item 3</li>\n</ul>'
	},
	{
		id: '6',
		name: 'Tags de tabela: <table>, <tr>, <th> e <td>',
		instr: 'A janela da prefeitura foi danificada e precisamos de outra. Use seu conhecimento para fazer uma.',
		before: '<html>\n   <head>\n     <title>Tabela</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<table>',
		tag_end: '</table>',
		style: 'six',
		help: 'A tag <table> cria uma tabela e as tags <tr>, <th>, <td> criam os elementos da tabela, onde <tr> é referente à linha da tabela, <th> ao título da coluna e <td> ao dado da célula da tabela.\n\n<table>\n  <tr><th>Cabeçalho</th></tr>\n  <tr><td>Elemento 1</td></tr>\n  <tr><td>Elemento 2</td></tr>\n</table>'
	},
	{
		id: '7',
		name: 'Classes',
		instr: 'Classe para tags da página. ',
		before: '<html>\n   <head>\n     <title>Classes</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: 'class=\"',
		tag_end: '\"',
		style: 'seven',
		help: 'Uma classe é um atributo que pode ser utilizado para atribuir funcionalidades ou estilos para as tags de HTML. O valor que esse atributo recebe é o nome que o identificará quando for utilizar a linguagem CSS. Um exemplo para utilizar classes nas tags é o caso de de definir um estilo para várias tags, como os botões, imagens ou elementos de uma lista ou tabela. Quando quiser utilizar classes basta colocar o atributo na abertura de sua tag e atribuir um nome para ele: <nome_da_tag class=\"nome_da_classe\">'
	},
	{
		id: '8',
		name: 'Identificadores',
		instr: 'Identificador para tags da página',
		before: '<html>\n   <head>\n     <title>Identificadores</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: 'id=\"',
		tag_end: '\"',
		style: 'eight',
		help: 'Os identificadores possuem a mesma função que as classes, definir quem irá receber um estilo. Entretanto, ao contrário de antes, você só pode utilizar um identificador único para uma tag. Ou seja, uma vez que uma tag possua um identificador com um nome, outra tag não pode tê-lo. Isso ajuda para o caso de você dar um estilo específico para uma tag que outras não terão. Digamos que sua página possui muitos campos de título, mas cada um possui seu tamanho, cor ou outra propriedade. Para ajudá-lo, basta usar o atributo de identificador \"id\" e atribuir um nome para ele: <nome_da_tag id=\"nome_do_id\"&gt.'
	},
	{
		id: '9',
		name: 'Tag de comentário: <!-- -->',
		instr: 'Tag de comentário para a página',
		before: '<html>\n   <head>\n     <title>Comentário</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<!--',
		tag_end: '-->',
		style: 'nine',
		help: 'Estas tags especiais são utilizadas para fazer seu navegador ignorar aquela parte. Ou seja, ao abrir a página qualquer código que estiver dentro delas não será utilizado. Um bom uso para elas é o de deixar seu código mais fácil de entender caso outra pessoa tenha acesso. Outra forma é a de testar seu código, comentando algo que já existia para verificar se a remoção da parte do código afeta sua página ou, ainda, tirar alguma parte que esteja causando dor de cabeça e queira resolver depois.'
	},
	{
		id: '10',
		name: 'Tag de link: <a>',
		instr: ' Crie um link para a página de CSS (webcity.herokuapp.com/css_page/aula.html). Lembre-se de colocar um nome para o link para não ficar vazio.',
		before: '<html>\n   <head>\n     <title>Link</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<a',
		tag_end: '</a>',
		style: 'ten',
		help: 'A tag <a> cria um link para uma página, atribuindo o link da página ao atributo \"href\". Assim, ao clicar nele, você é redirecionado àquela página.'
	}
];

//Variável auxiliar que pega a quantidade de níveis
let num_levels = Object.keys(levels).length;

//Carrega o nível ao carregar a página
$(window).on("load", loadLevel(cur_level));

//Salva os níveis concluídos antes de sair da página caso deem refresh na página
//Mas caso deem refresh de novo, os níveis concluídos são perdidos (Mudar para MongoDB??)
$(window).on("beforeunload", function(){
	localStorage.setItem('level_cleared_html', JSON.stringify(level_cleared));
});

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
	document.querySelector("#title").textContent = levels[level-1].name;
	document.querySelector("#instr").textContent = levels[level-1].instr;
	document.querySelector("#dialog").textContent = levels[level-1].help;
	document.querySelector("#about").innerHTML = '<p>O HTML (HyperText Markup Language), ou Linguagem de Marcação de HiperTexto, é um formato de arquivo em texto com marcações dando a este uma estrutura. As marcações são definidas utilizando <i>tags</i> que representam alguma informação da página Web. Todas as tags necessitam que sejam iniciadas com &lt;nome_da_tag&gt; e fechadas com &lt;/nome_da_tag&gt;.</p><p>O navegador interpreta o arquivo como HTML ao utilizar a tag <i>&lt;html&gt;&lt;/html&gt;</i>. Dentro desta tag, será construída sua página. Ela possui um cabeçalho, definido pela tag <i>&lt;head&gt;&lt;/head&gt;</i> (onde são definidos o título da página, que aparece na aba do navegador, e os metadados presentes na página que não são mostrados e costumam ser links para documentos de estilo da página e scripts), e um corpo, definido pela tag <i>&lt;body&gt;&lt;/body&gt;</i> e é dentro dessa tag que estará todo o corpo de sua página.</p><p>Portanto, sabemos que um documento html tem essa cara:</p><img src="../img/diagram_html.jfif"><p>Cumpra as atividades e avance para os próximos níveis.</p>';
	document.querySelector("#before").textContent = levels[level-1].before;
	document.querySelector("#after").textContent = levels[level-1].after;
	document.querySelector(".current").innerHTML = level;
	document.querySelector(".total").innerHTML = num_levels;
	document.querySelector(".background").classList = 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").disabled = true;
	document.querySelector("#next_btn").classList = 'btn btn-secondary';
	document.querySelector(".item").classList = 'item pos_' + levels[level-1].style;
	document.querySelector(".item").innerHTML = '';
	
	//Se a página está sendo visitada pela primeira vez, mostra modal de ajuda e marca como visitada
	if(localStorage.getItem('visited') == null)
	{
		document.querySelector("#help_body").style.display = "block";
		localStorage.setItem('visited',true);
	}

	//Se o nível já tiver sido concluído e foi visitado novamente, carrega as respostas que o usuário salvou
	if(answer[level-1] !== '' && answer[level-1] !== undefined)
	{
		$("textarea").val(answer[level-1]);
		document.querySelector(".item").innerHTML = answer[level-1];
	}
	//Remove o que usuário digitou ao mudar de nível para não permanecer na tela
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
		document.querySelector("textarea").classList = 'text_two';
		document.querySelector("#pc_screen").classList = 'pc_screen_two';
	}
	else if(level == 5)
	{
		document.querySelector("textarea").classList = 'text_five';
		document.querySelector("#pc_screen").classList = 'pc_screen_five';
	}
	else if(level == 6)
	{
		document.querySelector("#pc_screen").classList = 'pc_screen_table';
		document.querySelector("textarea").classList = 'text_six';
	}
	else
	{
		document.querySelector("#pc_screen").classList = 'pc_screen_else';
		document.querySelector("textarea").classList = 'text_else';
	}
	
	//Condicionais para deixar botões de mudança de nível apenas nos níveis corretos
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

$(function(){
	//Não permite que o usuário dê ENTER além do número estipulado de linhas para a área de texto
	let new_line_level_two = 3, new_line_level_five = 3, new_line_level_six = 4;
	$("textarea").keydown(function(e){
		newLines = $(this).val().split("\n").length;

		if(	(e.keyCode == 13 && cur_level == 2 && newLines >= new_line_level_two) || 
			(e.keyCode == 13 && cur_level == 5 && newLines >= new_line_level_five) || 
			(e.keyCode == 13 && cur_level == 6 && newLines >= new_line_level_six) || 
			(e.keyCode == 13 && (cur_level !== 2 && cur_level !== 5 && cur_level !== 6)))
		{
			return false;
		}
	});

	//Limpa as respostas salvas
	$("#clear_storage").on("click", function(){
		answer.length = 0;
		localStorage.clear();
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
				if(cur_level < num_levels)
				{
					cur_level++;
					loadLevel(cur_level);
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
				if(cur_level !== 1)
				{
					document.querySelector("#button1").disabled = false;
					cur_level--;
					loadLevel(cur_level);
				}
			}, 1000
		);
	});
	
	//Cria uma caixa com ícones dos níveis da atividade
	levels.forEach(function(level, i){
		let levelMarker = $('<span/>').addClass('level-marker').attr('data-level', i).text(i+1);

		if (hasValue(level.id, localStorage.getItem('level_cleared_html'))) {
			levelMarker.addClass('cleared');
		}

		levelMarker.appendTo('#levels');
	});

	//Muda o nível para o selecionado na caixa
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
	
	//Testa o código digitado pelo usuário e trata erros de entrada
	$("#check").on("click", function(){
		text = $("textarea").val();

		//Se a resposta estiver correta, atribui o código ao item da área de visualização
		if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
			if(cur_level === 3)
			{
				let aux = text.split("\"");
				let src = aux[1].split("\"");
				checkImageExists(src[0], function(existsImage){
					if(existsImage == false)
					{
						console.log(src[0]);
						document.querySelector(".background").innerHTML += '<div class="speech-bubble">Imagem não encontrada.</div>';
						setTimeout(function(){
							document.querySelector(".speech-bubble").remove();
						}, 2000);
					}
				});
			}
			document.querySelector(".item").innerHTML = text;
			document.querySelector("#next_btn").classList = 'btn btn-success';
			let current_lvl = cur_level-1;
			$('[data-level=' + current_lvl + ']').addClass('cleared');
			answer[cur_level-1] = text;
			level_cleared[cur_level-1] = cur_level;
			localStorage.setItem('level_cleared_html', JSON.stringify(level_cleared));
			localStorage.setItem('answer_html',JSON.stringify(answer));
			document.querySelector("#next_btn").disabled = false;
		}
		//Tratamento de erro para o caso de o usuário digitar de forma incorreta, ou não digitar, a abertura de tag
		else if(text.indexOf(levels[cur_level-1].tag_init) == -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Você não abriu sua tag ou está incorreta.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		//Tratamento de erro para o caso de o usuário digitar de forma incorreta, ou não digitar, o fechamento da tag
		else if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) == -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Você não fechou sua tag ou está incorreta.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		//Tratamento de erro para o caso de o usuário digitar de forma incorreta, ou não digitar, a abertura e fechamento da tag
		else if(text.indexOf(levels[cur_level-1].tag_init) == -1 && text.indexOf(levels[cur_level-1].tag_end) == -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Você está se esquecendo das tags.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
		}
		//Habilita o botão de próximo para avançar um nível
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