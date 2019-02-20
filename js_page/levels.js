angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window){
	
	//Salva o nível atual em que o usuário está
	$scope.cur_level = 1;
	
	//Array que salva o código que o usuário coloca, caso esteja certo
	$scope.answer = [];

	
	//Contém os dados de cada nível
	$scope.levels = [
		{
				id: '1',
				name: 'Variável',
				instr: 'Variáveis em JavaScript',
				before: '<body>\n      <div id="ola">Olá</div>\n</body>\n\n<script>\n$(document).ready(function() {',
				after: 'ola.innerHTML += \'Olá, como vai?\';\n</script>',
				js_init: 'var'
		},
		{
				id: '2',
				name: 'Condicional',
				instr: 'Condicional em JavaScript.',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div>Olá</div>\n   </body>\n</html>\n<script>\nvar ola = document.getElementById("ola");\n',
				after: '});\n</script>',
				js_init: 'if'
		},
		{
				id: '3',
				name: 'Função',
				instr: 'Função em JavaScript',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div>Olá</div>\n   </body>\n</html>',
				
				js_init: 'function'
		},
		{
				id: '4',
				name: 'Evento',
				instr: 'Evento em JavaScript',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n      <div>Olá</div>\n   </body>\n</html>',
				
				js_init: 'on'
		}
	];	
	
	
	//Variável auxiliar com o tamanho da variável níveis
	var count = Object.keys($scope.levels).length;
	
	//Variável para mapear a posição em que o código do usuário será salvo na variável "answer"
	var key = Object.values($scope.levels[$scope.cur_level-1].id);
	
	//Salva o dado como parâmetro em "answer" e no localStorage para poder ser carregado caso o usuário volte em um nível concluído, mostrando a resposta dele
	$scope.saveData = function(text)
	{
		key = Object.values($scope.levels[$scope.cur_level-1].id);
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
		$scope.title = $scope.levels[$scope.cur_level-1].name;
		$scope.instruction = $scope.levels[$scope.cur_level-1].instr;
		$scope.before = $scope.levels[$scope.cur_level-1].before;
		$scope.after = $scope.levels[$scope.cur_level-1].after;
		$scope.disableBtn = true;
		
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
			if(next_content == '')
				$scope.text_code = '';

			$scope.cur_level = $scope.cur_level + 1;
			$scope.loadLevel();
		}
	};
	
	//Função para o botão do header de avançar um nível
	$scope.nextLevel = function()
	{
		//Variável que carrega o código da resposta salva (caso exista) do próximo nível
		var next_content = $scope.answer[$scope.cur_level];
		if($scope.cur_level < count)
		{
			
			if(next_content == '')
				$scope.text_code = '';
			
			$scope.cur_level = $scope.cur_level + 1;
			$scope.loadLevel();
		}
	};
	
	//Função que retorna um nível para o botão do header
	$scope.backLevel = function(cur_level)
	{
		//Variável que carrega o código da resposta salva (caso exista) do nível anterior
		var back_content = $scope.answer[$scope.cur_level-2];
		if($scope.cur_level > 1)
		{
			
			if(back_content == '')
				$scope.text_code = '';

			$scope.cur_level = $scope.cur_level - 1;
			$scope.loadLevel();
			
		}
	};
	
	//Função para salvar o código do usuário e habilitar o botão de passar para o próximo nível
	$scope.submit = function()
	{
		//Se o código inserido contém as tags que o usuário digitou, salva o código e habilita o botão de Próximo
		if( ($scope.text_code.includes($scope.levels[$scope.cur_level-1].js_init))){
			$scope.saveData($scope.text_code);
			$scope.disableBtn = false;
		}
		else
			{
				//Se não tiver as tags, abre uma janela popup informando o erro
				var x = screen.width/2 - 700/2;
			    var y = screen.height/2 - 450/2;
				$window.open("popup_modal.html","popup","width=500,height=500,left="+x+",top="+y);
				//$window.write("<h1>Código incorreto</h1><br><p>O código inserido está incorreto</p>");
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