let cur_level = 1;
let answer = [];
let levels = [
	{
		id: '1',
		name: 'Tag de título: <h1>',
		instr: 'A tag <h1> é utilizada para transformar seu texto em um título. Utilize a tag para criar um nome para a entrada da nossa cidade.',
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
		instr: 'Esta tag é utilizada para indicar que seu texto pertence ao parágrafo da página. Use a tag para criar uma mensagem de boas vindas.',
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
		instr: 'A tag de imagem adiciona uma imagem ao corpo de sua página, fornecendo a caminho onde se encontra a imagem para o atributo \"src\". Coloque uma foto chamativa no outdoor.',
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
		instr: 'Estas tags criam uma lista com, ou sem, subitens. A tag <ul> cria a lista, enquanto a <li> indica os itens da lista. Crie a lista de compras do restaurante.',
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

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function loadLevel(level)
{
	let title = document.querySelector("#title");
	let instr = document.querySelector("#instr");
	let before = document.querySelector("#before");
	let after = document.querySelector("#after");
	let item = document.querySelector(".item");
	let submitBtn = document.querySelector("#submit");
	let quitBtn = document.querySelector("#quit_btn");
	let display_cur_level = document.querySelector(".current");
	let total_levels = document.querySelector(".total");
	let text = document.querySelector("textarea");
	let backG = document.querySelector(".background");
	let pc = document.querySelector("#pc_screen");
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
	after.textContent = levels[level-1].after;
	display_cur_level.innerHTML = level;
	total_levels.innerHTML = count;
	if(hasClass(document.querySelector('#board'), 'fadeOut') && hasClass(document.querySelector('#board'), 'animated_fadeout'))
	{
		document.querySelector('#board').classList.remove('fadeOut');
		document.querySelector('#board').classList.remove('animated_fadeout');
	}
	
	document.querySelector('#board').classList.add('fadeIn');
	document.querySelector('#board').classList.add('animated_fadein');
	backG.classList = 'background level-' + style;
	item.classList = 'item pos_' + style;

	if(level == 6)
		text.classList = 'text_six';
	else if(level == 7)
	{
		pc.classList = 'pc_screen_table';
		text.classList = 'text_seven';
	}
	else
	{
		pc.classList = 'pc_screen_else';
		text.classList = 'text_else';
	}
		

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
		//text = document.querySelector(".wrap").textContent;
		text = $("textarea.text").val();
		if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".item").innerHTML = text;
			saveData(text);
			document.querySelector("#next_btn").disabled = false;
		}
		else{
			alert("Código incorreto");
		}
	});
	

	let modal = document.querySelector("#help_body");

	$("#help_btn").on('click', function(){
		modal.style.display = "block";
	});

	$(".close_modal").on('click', function(){
		modal.style.display = "none";
	});

});
