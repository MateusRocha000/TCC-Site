let cur_level = 1;
let answer = [];
let levels = [
	{
		id: '1',
		name: 'Tag de título: <h1>',
		instr: 'Tag de título para a página',
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
		instr: 'Tag de parágrafo para a página',
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
			instr: 'Tag de imagem para a página',
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
			instr: 'Tag de link externo para a página',
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
			instr: 'Tag de inserção de imagem para a página',
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
			instr: 'Tag de lista para a página',
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
			instr: 'Tag de tabela para a página',
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

	$(".text").val(answer[key]);
	$(".wrap").val(answer[key]);
	

	if(level === 1)
		document.querySelector("#button1").disabled = true;
	if(level === count)
		document.querySelector("#button2").disabled = true;

};


$(function(){
	$(".text").on("keyup", function(){
		$(".wrap").text($(this).val());
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
	
	$("#submit").on("click", function(){
		text = document.querySelector(".wrap").textContent;
		if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
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
	});

	
});
