angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window){
	
	//Salva o nível atual em que o usuário está
	$scope.cur_level = 1;
	
	//Array que salva o código que o usuário coloca, caso esteja certo
	$scope.answer = [];
	
	//Contém os dados de cada nível
	$scope.levels = [
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

	//Variável auxiliar com o tamanho da variável níveis
	var count = Object.keys($scope.levels).length;
	
	//Variável para mapear a posição em que o código do usuário será salvo na variável "answer"
	var key = Object.values($scope.levels[$scope.cur_level-1].id);
	
	//Salva o dado como parâmetro em "answer" e no localStorage para poder ser carregado caso o usuário volte em um nível concluído, mostrando a resposta dele
	$scope.saveData = function(text)
	{
		//key = Object.values($scope.levels[$scope.cur_level-1].id-1);
		//$scope.answer[key] = text;
		//localStorage.setItem('$scope.answer',JSON.stringify($scope.answer));
		$scope.answer[$scope.cur_level-1] = text;
		console.log('Respostas: ' + $scope.cur_level + ': ' + $scope.answer);
		
	};
	
	//Limpa o localStorage
	$scope.clearStorage = function()
	{
		$scope.answer.length = 0;
	};
	
	//Função que carrega os dados do nível
	$scope.loadLevel = function()
	{
		$scope.title = $scope.levels[$scope.cur_level-1].name;
		$scope.instruction = $scope.levels[$scope.cur_level-1].instr;
		$scope.before = $scope.levels[$scope.cur_level-1].before;
		$scope.after = $scope.levels[$scope.cur_level-1].after;
		$scope.item = $scope.levels[$scope.cur_level-1].item;
		$scope.disableBtn = true;
		
		$scope.backBtn = true;
		if($scope.cur_level !== 1)
			$scope.backBtn = false;
		
		$scope.nextBtn = false;
		if($scope.cur_level === count)
			$scope.nextBtn = true;
		
		key = Object.values($scope.levels[$scope.cur_level-1].id);
		var content = $scope.answer[key];
		$scope.text_code = content;
		
	}
	
	//Função para o botão de passar nível do botão Próximo
	$scope.passLevel = function()
	{
		//Variável que carrega o código da resposta salva (caso exista) do próximo nível
		var next_content = $scope.answer[$scope.cur_level];
		if($scope.cur_level < count)
		{
			if(next_content == ''){
				$scope.text_code = '';
				$scope.wrap = '';
			}
				

			$scope.cur_level = $scope.cur_level + 1;
			$scope.loadLevel();
		}
	};
	
	//Função para o botão do header de avançar um nível
	$scope.nextLevel = function()
	{
		//Variável que carrega o código da resposta salva (caso exista) do próximo nível
		var next_content = $scope.answer[$scope.cur_level];
		if($scope.cur_level !== count)
		{
			$scope.nextBtn = false;
			if(next_content == ''){
				$scope.text_code = '';
				$scope.wrap = '';
			}
			
			$scope.cur_level = $scope.cur_level + 1;
			$scope.loadLevel();
			
		}
	};
	
	//Função que retorna um nível para o botão do header
	$scope.backLevel = function()
	{
		//Variável que carrega o código da resposta salva (caso exista) do nível anterior
		var back_content = $scope.answer[$scope.cur_level-2];
		if($scope.cur_level !== 1)
		{
			$scope.backBtn = false;
			if(back_content == ''){
				$scope.text_code = '';
				$scope.wrap = '';
			}
			
			$scope.cur_level = $scope.cur_level - 1;
			$scope.loadLevel();
						
		}
	};
	
	//Função para salvar o código do usuário e habilitar o botão de passar para o próximo nível
	$scope.submit = function()
	{
		//Se o código inserido contém as tags que o usuário digitou, salva o código e habilita o botão de Próximo
		if( ($scope.text_code.includes($scope.levels[$scope.cur_level-1].tag_init)) && ($scope.text_code.includes($scope.levels[$scope.cur_level-1].tag_end)) && $scope.text_code !== 'undefined'){
			$scope.saveData($scope.text_code);
			$scope.disableBtn = false;
		}
		else if(($scope.text_code.includes('<html>') && $scope.text_code.includes('</html>')) 
			&& ($scope.text_code.includes('<head>') && $scope.text_code.includes('</head>'))
			&& ($scope.text_code.includes('<body>') && $scope.text_code.includes('</body>')) && $scope.cur_level === 1  && $scope.text_code !== 'undefined')
		{
			$scope.saveData($scope.text_code);
			$scope.disableBtn = false;
		}
		else
			{
				var el = angular.element(document.querySelector(".background"));
				el.append('<div class=\"alert\"><strong>Opa!</strong>Seu código está incorreto.</div>');
				$scope.text_code = '';
			}
	};
	
	//Objeto para a conclusão do curso, informando a finalização
	$scope.levelWin = [
		{
			name: 'win',
			instr: {
				'pt' : '<p>Parabéns!</p>',
				'en' : '<p>Congratulations</p>'
			}
		}
	];

});