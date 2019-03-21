let cur_level = 1;
let answer = [];

let levels = [
	{
		id: '1',
		name: 'Tag de título: <h1>',
		instr: 'A tag <h1> é utilizada para transformar seu texto em um título. Utilize a tag para criar uma mensagem para a entrada da nossa cidade.',
		before: '<html>\n   <head>\n     <title>Título</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<h1>',
		tag_end: '</h1>',
		style: 'one'
	},
	{
		id: '2',
		name: 'Tag de parágrafo: <p>',
		instr: 'Esta tag é utilizada para indicar que seu texto pertence ao parágrafo da página. Use a tag para criar uma mensagem de boas vindas.',
		before: "<html>\n   <head>\n     <title>Parágrafo</title>\n   </head>\n   <body>\n",
		after: '   </body>\n</html>',
		tag_init: '<p>',
		tag_end: '</p>',
		style: 'two'
	},
	{
		id: '3',
		name: 'Tag de imagem: <img>',
		instr: 'A tag de imagem adiciona uma imagem ao corpo de sua página, fornecendo a caminho onde se encontra a imagem para o atributo \"src\". Coloque uma foto chamativa no outdoor.',
		before: '<html>\n   <head>\n     <title>Imagem</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<img',
		tag_end: '/>',
		style: 'three'
	},
	{
		id: '4',
		name: 'Tag de link: <a>',
		instr: 'A tag <a> cria um link para uma página, inserindo o link da página para o atributo \"href\". Lembre-se de colocar um nome para o link para não ficar vazio.',
		before: '<html>\n   <head>\n     <title>Link</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<a',
		tag_end: '</a>',
		style: 'four'
	},
	{
		id: '5',
		name: 'Tag de botão: <button>',
		instr: 'A tag <button> insere um botão na página que pode executar alguma função que deseje.',
		before: '<html>\n   <head>\n     <title>Botão</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<button>',
		tag_end: '</button>',
		style: 'five'
	},
	{
		id: '6',
		name: 'Tags de lista: <ul> e <li>',
		instr: 'Estas tags criam uma lista com, ou sem, subitens. A tag <ul> cria a lista, enquanto a <li> indica os itens da lista. Crie a lista de compras do restaurante.',
		before: '<html>\n   <head>\n     <title>Lista</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<ul>',
		tag_end: '</ul>',
		style: 'six'
	},
	{
		id: '7',
		name: 'Tags de tabela: <table>, <tr>, <th> e <td>',
		instr: 'A tag <table> cria uma tabela e as tags <tr>, <th>, <td> criam os elementos da tabela, onde <tr> é referente à linha da tabela, <th> ao título da coluna e <td> ao dado da célula da tabela.',
		before: '<html>\n   <head>\n     <title>Tabela</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<table>',
		tag_end: '</table>',
		style: 'seven'
	},
	{
		id: '8',
		name: 'Classes',
		instr: 'Classe para tags da página',
		before: '<html>\n   <head>\n     <title>Classes</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: 'class=\"',
		tag_end: '\"',
		style: 'eight'
	},
	{
		id: '9',
		name: 'Identificadores',
		instr: 'Identificador para tags da página',
		before: '<html>\n   <head>\n     <title>Identificadores</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: 'id=\"',
		tag_end: '\"',
		style: 'nine'
	},
	{
		id: '10',
		name: 'Tag de comentário: <!-- -->',
		instr: 'Tag de comentário para a página',
		before: '<html>\n   <head>\n     <title>Comentário</title>\n   </head>\n   <body>\n',
		after: '   </body>\n</html>',
		tag_init: '<!--',
		tag_end: '-->',
		style: 'ten'
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
	document.querySelector("#after").textContent = levels[level-1].after;
	document.querySelector(".current").innerHTML = level;
	document.querySelector(".total").innerHTML = count;
	document.querySelector(".background").classList = 'background level-' + levels[level-1].style;
	document.querySelector("#next_btn").disabled = true;
	document.querySelector(".item").classList = 'item pos_' + levels[level-1].style;
	document.querySelector(".item").innerHTML = '';
	
	if(localStorage.getItem('visited') == null)
	{
		document.querySelector("#help_body").style.display = "block";
		localStorage.setItem('visited',true);
	}

	if(answer[level-1] !== '' && answer[level-1] !== undefined)
	{
		$("textarea").val(answer[level-1]);
		document.querySelector(".item").innerHTML = answer[level-1];
	}
	else
		$("textarea").val('');
	
	$("#levels-box").hide();
	$(".level-marker").removeClass('current').eq(this.cur_level).addClass('current');
	
	key = Object.values(levels[level-1].id);
	let content = answer[key];
	
	if(hasClass(document.querySelector('#board'), 'fadeOut') && hasClass(document.querySelector('#board'), 'animated_fadeout'))
	{
		document.querySelector('#board').classList.remove('fadeOut');
		document.querySelector('#board').classList.remove('animated_fadeout');
	}
	
	document.querySelector('#board').classList.add('fadeIn');
	document.querySelector('#board').classList.add('animated_fadein');

	

	if(level == 6)
	{
		document.querySelector("textarea").classList = 'text_six';
	}
	else if(level == 7)
	{
		document.querySelector("#pc_screen").classList = 'pc_screen_table';
		document.querySelector("textarea").classList = 'text_seven';
	}
	else
	{
		document.querySelector("#pc_screen").classList = 'pc_screen_else';
		document.querySelector("textarea").classList = 'text_else';
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
	let new_line_level_six = 3, new_line_level_seven = 6;
	$("textarea").keydown(function(e){
		newLines = $(this).val().split("\n").length;

		if(e.keyCode == 13 && cur_level == 6 && newLines >= new_line_level_six)
		{
			return false;
		}
		else if(e.keyCode == 13 && cur_level == 7 && newLines >= new_line_level_seven)
		{
			return false;
		}
		else if(e.keyCode == 13 && (cur_level !== 7 && cur_level !== 6))
		{
			return false;
		}

	});

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
		text = $("textarea").val();
		if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".item").innerHTML = text;
			answer[cur_level-1] = text;
			localStorage.setItem('answer',JSON.stringify(answer));
			document.querySelector("#next_btn").disabled = false;
		}
		else if(text.indexOf(levels[cur_level-1].tag_init) == -1 && text.indexOf(levels[cur_level-1].tag_end) > -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Você não abriu sua tag ou está incorreta.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
			$("textarea").val('');
		}
		else if(text.indexOf(levels[cur_level-1].tag_init) > -1 && text.indexOf(levels[cur_level-1].tag_end) == -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Você não fechou sua tag ou está incorreta.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
			$("textarea").val('');
		}
		else if(text.indexOf(levels[cur_level-1].tag_init) == -1 && text.indexOf(levels[cur_level-1].tag_end) == -1 && text !== 'undefined')
		{
			document.querySelector(".background").innerHTML += '<div class="speech-bubble">Você está se esquecendo das tags.</div>';
			setTimeout(function(){
				document.querySelector(".speech-bubble").remove();
			}, 2000);
			$("textarea").val('');
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