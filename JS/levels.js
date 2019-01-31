angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window){
	
	//Salva o nível atual em que o usuário está
	$scope.cur_level = 0;
	
	//Array que salva o código que o usuário coloca, caso esteja certo
	$scope.answer = [];
	
	//Inicializa a área de texto como vazia
	$scope.myHTML = '';
	
	
	
	//Contém os dados de cada nível
	$scope.levels = [
		{
				id: '0',
				name: 'Tag de título: <h1>',
				instr: 'Tag de título para a página',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n',
				after: '   </body>\n</html>',
				item: '',
				tag_init: '<h1>',
				tag_end: '</h1>'
		},
		{
				id: '1',
				name: 'Tag de parágrafo: <p>',
				instr: 'Tag de parágrafo para a página',
				before: "<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n",
				after: "</body>\n</html>",
				item: '',
				tag_init: '<p>',
				tag_end: '</p>'
		},
		{
				id: '2',
				name: 'Seletores',
				instr: 'Seletores de CSS',
				before: 'HTML:\n...\n<h1 id="title">Titulo</h1>\n...\n-----------------------\nCSS:\n',
				item: '<h1>Titulo</h1>',
				tag_init: '#title{',
				tag_end: '}'
		},
		{
				id: '3',
				name: 'Variáveis',
				instr: 'Variáveis em javascript'
		}
	];	
	
	//Variável auxiliar com o tamanho da variável níveis
	var count = Object.keys($scope.levels).length;
	
	//Variável para mapear a posição em que o código do usuário será salvo na variável "answer"
	var key = Object.values($scope.levels[$scope.cur_level].id);
	
	//Salva o dado como parâmetro em "answer" e no localStorage para poder ser carregado caso o usuário volte em um nível concluído, mostrando a resposta dele
	$scope.saveData = function(text)
	{
		key = Object.values($scope.levels[$scope.cur_level].id);
		$scope.answer[key] = text;
		localStorage.setItem('$scope.answer',JSON.stringify($scope.answer));
	};
	
	//Limpa o localStorage
	$scope.clearStorage = function()
	{
		$scope.answer.length = 0;
	};
	
	//Função que carrega os dados do nível
	$scope.loadLevel = function()
	{
		console.log($scope.cur_level);
		$scope.title = $scope.levels[$scope.cur_level].name;
		$scope.instruction = $scope.levels[$scope.cur_level].instr;
		$scope.before = $scope.levels[$scope.cur_level].before;
		$scope.after = $scope.levels[$scope.cur_level].after;
		$scope.item = $scope.levels[$scope.cur_level].item;
		$scope.disableBtn = true;
		
		key = Object.values($scope.levels[$scope.cur_level].id);
		var content = $scope.answer[key];
		$scope.myHTML = content;
	}
	
	//Função para o botão de passar nível do botão Próximo
	$scope.passLevel = function()
	{
		//Variável que carrega o código da resposta salva (caso exista) do próximo nível
		var next_content = $scope.answer[$scope.cur_level+1];
		if($scope.cur_level < count-1)
		{
			if(next_content == '')
				$scope.myHTML = '';

			$scope.cur_level++;
			$scope.loadLevel();
		}
	};
	
	//Função para o botão do header de avançar um nível
	$scope.nextLevel = function()
	{
		//Variável que carrega o código da resposta salva (caso exista) do próximo nível
		var next_content = $scope.answer[$scope.cur_level+1];
		if($scope.cur_level < count-1)
		{
			
			if(next_content == '')
				$scope.myHTML = '';
			
			$scope.cur_level++;
			$scope.loadLevel();
		}
	};
	
	//Função que retorna um nível para o botão do header
	$scope.backLevel = function(cur_level)
	{
		//Variável que carrega o código da resposta salva (caso exista) do nível anterior
		var back_content = $scope.answer[$scope.cur_level-1];
		if($scope.cur_level > 0)
		{
			
			if(back_content == '')
				$scope.myHTML = '';

			$scope.cur_level--;
			$scope.loadLevel();
			
		}
	};
	
	//Função para salvar o código do usuário e habilitar o botão de passar para o próximo nível
	$scope.submit = function()
	{
		//Se o código inserido contém as tags que o usuário digitou, salva o código e habilita o botão de Próximo
		if( ($scope.myHTML.includes($scope.levels[$scope.cur_level].tag_init)) && ($scope.myHTML.includes($scope.levels[$scope.cur_level].tag_end)) ){
			$scope.saveData($scope.myHTML);
			$scope.disableBtn = false;
		}
		else
			{
				//Se não tiver as tags, abre uma janela popup informando o erro
				var x = screen.width/2 - 700/2;
			    var y = screen.height/2 - 450/2;
				$window.open("popup_modal.html","popup","width=500,height=500,left="+x+",top="+y);
				//$window.write("<h1>Código incorreto</h1><br><p>O código inserido está incorreto</p>");
				$scope.myHTML = '';
			}
	};
	
	$scope.applyStyle = function()
	{
		return $scope.levels[$scope.cur_level].style;
	}
	
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