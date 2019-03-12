let cur_level = 1;
let answer = [];
let language = window.location.hash.substring(1) || 'pt-br';
let levels = [
	{
		id: '1',
		name: 'Tag de título: <h1>',
		instr: 'A tag <h1> é utilizada para transformar seu texto em um título. Você ainda pode criar subtítulos aumentando a numeração da tag: <h2>, <h3>, etc.',
		before: '<html>\n   <head>\n     <title>Título</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<h1>',
		tag_end: '</h1>',
		url: 'titulo',
		style: 'one'
	},
	{
		id: '2',
		name: 'Tag de parágrafo: <p>',
		instr: 'Esta tag é utilizada para indicar que seu texto pertence ao parágrafo da página. Quando você quiser mudar de parágrafo basta criar outra área de texto dentro de uma nova tag.',
		before: "<html>\n   <head>\n     <title>Parágrafo</title>\n   </head>\n   <body>\n",
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<p>',
		tag_end: '</p>',
		url: 'paragrafo',
		style: 'two'
	},
	{
		id: '3',
		name: 'Tag de imagem: <img>',
		instr: 'A tag de imagem adiciona uma imagem ao corpo de sua página, fornecendo a caminho onde se encontra a imagem para o atributo \"src\". Se ela estiver em uma subpasta em seu computador, é necessário fornecer o caminho completo.',
		before: '<html>\n   <head>\n     <title>Imagem</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<img',
		tag_end: '/>',
		url: 'imagem',
		style: 'three'
	},
	{
		id: '4',
		name: 'Tag de link: <a>',
		instr: 'A tag <a> cria um link para uma página, inserindo o link da página para o atributo \"href\". Lembre-se de colocar um nome para o link para não ficar vazio.',
		before: '<html>\n   <head>\n     <title>Link</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<a',
		tag_end: '</a>',
		url: 'link',
		style: 'four'
	},
	{
		id: '5',
		name: 'Tag de botão: <button>',
		instr: 'A tag <button> insere um botão na página que pode executar alguma função que deseje.',
		before: '<html>\n   <head>\n     <title>Botão</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<button>',
		tag_end: '</button>',
		url: 'botao',
		style: 'five'
	},
	{
		id: '6',
		name: 'Tags de lista: <ul> e <li>',
		instr: 'Estas tags criam uma lista com, ou sem, subitens. A tag <ul> cria a lista, enquanto a <li> indica os itens da lista. Caso queria abrir uma lista dentro de outra é necessário abrir uma <ul> novamente.',
		before: '<html>\n   <head>\n     <title>Lista</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<ul>',
		tag_end: '</ul>',
		url: 'lista',
		style: 'six'
	},
	{
		id: '7',
		name: 'Tags de tabela: <table>, <tr>, <th> e <td>',
		instr: 'A tag <table> cria uma tabela e as tags <tr>, <th>, <td> criam os elementos da tabela, onde <tr> é referente à linha da tabela, <th> ao título da coluna e <td> ao dado da célula da tabela.',
		before: '<html>\n   <head>\n     <title>Tabela</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<table>',
		tag_end: '</table>',
		url: 'tabela',
		style: 'seven'
	},
	{
		id: '8',
		name: 'Classes',
		instr: 'Classe para tags da página',
		before: '<html>\n   <head>\n     <title>Classes</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: 'class=\"',
		tag_end: '\"',
		url: 'classe',
		style: 'eight'
	},
	{
		id: '9',
		name: 'Identificadores',
		instr: 'Identificador para tags da página',
		before: '<html>\n   <head>\n     <title>Identificadores</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: 'id=\"',
		tag_end: '\"',
		url: 'id',
		style: 'nine'
	},
	{
		id: '10',
		name: 'Tag de comentário: <!-- -->',
		instr: 'Tag de comentário para a página',
		before: '<html>\n   <head>\n     <title>Comentário</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		item: '',
		tag_init: '<!--',
		tag_end: '-->',
		url: 'comentario',
		style: 'ten'
	}
];

let count = Object.keys(levels).length;
let key = Object.values(levels[cur_level-1].id);

function saveData(text)
{
	answer[cur_level-1] = text;
	localStorage.setItem('answer',JSON.stringify(answer));
	
};

function clearStorage()
{
	answer.length = 0;
	localStorage.clear();
	console.log("Local Storage: " + localStorage);
};

$(window).on("load", loadLevel(cur_level));

function getXY(){
	var x = screen.width/2 - 540;
	var y = screen.height/2 - 385;
	return 'left='+x+',top='+y;
}

let window_code = 'help.html';

$(window).on("load", () => {
	if(typeof window.localStorage !== "undefined" && !localStorage.getItem('html_visited')){
		localStorage.setItem('html_visited', true);

		var x = screen.width/2 - 700/2;
		var y = screen.height/2 - 450/2;
		window.open(window_code, 'Ajuda', 'width=800, height=750, left='+x+',top='+y);
	}
});

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


	if(level === 1)
		document.querySelector("#button1").disabled = true;
	if(level === count)
		document.querySelector("#button2").disabled = true;
};


$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
	});

	$("#clear_storage").on("click", function(){
		answer.length = 0;
		localStorage.clear();
	});
	
	$("#next_btn").on("click", function(){
		let next_content = answer[cur_level+1];
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
		$(".item").empty();
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
		text = document.querySelector(".wrap").textContent;
		console.log("Código: " +text);
		if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".item").innerHTML = text;
			console.log("Item: " + document.querySelector(".item").innerHTML);
			saveData(text);
			document.querySelector("#next_btn").disabled = false;
		}
		else if((text.indexOf('<html>') > -1 && text.indexOf('</html>') > -1) 
				&& (text.indexOf('<head>') > -1 && text.indexOf('</head>') > -1)
				&& (text.indexOf('<body>') > -1 && text.indexOf('</body>')) > -1 && cur_level === 1  && text !== 'undefined')
		{
			
			saveData(text);
			document.querySelector("#next_btn").disabled = false;
		}
		console.log("Resposta: " + answer);
	});

	
});
