angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window){
	$scope.cur_level = 0;
	$scope.answer = [];
	$scope.myHTML = '';
	$scope.levels = [
		{
				id: '0',
				name: 'Tag de título: <h1>',
				instr: 'Tag de título para a página',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n',
				after: '   </body>\n</html>',
				tag_init: '<h1>',
				tag_end: '</h1>'
		},
		{
				id: '1',
				name: 'Tag de parágrafo: <p>',
				instr: 'Tag de parágrafo para a página',
				before: "<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n",
				after: "</body>\n</html>",
				tag_init: '<p>',
				tag_end: '</p>'
		},
		{
				id: '2',
				name: 'Seletores',
				instr: 'Seletores de CSS',
				before: 'body{\nbackground-color: blue;\n}'
		},
		{
				id: '3',
				name: 'Variáveis',
				instr: 'Variáveis em javascript'
		}
	];
	
	var count = Object.keys($scope.levels).length;
	var key = Object.values($scope.levels[$scope.cur_level].id);
	
	$scope.saveData = function(text)
	{
		key = Object.values($scope.levels[$scope.cur_level].id);
		$scope.answer[key] = text;
		localStorage.setItem('$scope.answer',JSON.stringify($scope.answer));
		console.log($scope.answer);
	};
	
	$scope.clearStorage = function()
	{
		$scope.answer.length = 0;
		console.log($scope.answer);
	};
	
	$scope.loadLevel = function()
	{
		$scope.title = $scope.levels[$scope.cur_level].name;
		$scope.instruction = $scope.levels[$scope.cur_level].instr;
		$scope.before = $scope.levels[$scope.cur_level].before;
		$scope.after = $scope.levels[$scope.cur_level].after;
		$scope.disableBtn = true;
		
		key = Object.values($scope.levels[$scope.cur_level].id);
		var content = $scope.answer[key];
		$scope.myHTML = content;
	}
	
	$scope.passLevel = function()
	{
		var next_content = $scope.answer[$scope.cur_level+1];
		if($scope.cur_level < count-1)
		{
			if(next_content == '')
				$scope.myHTML = '';
			else{
				$scope.cur_level++;
				$scope.loadLevel();
			}
			console.log('Resposta deste nível: ' + $scope.answer[$scope.cur_level]);
			
		}
	};
	
	$scope.nextLevel = function()
	{
		var next_content = $scope.answer[$scope.cur_level+1];
		if($scope.cur_level < count-1)
		{
			
			if(next_content == '')
				$scope.myHTML = '';
			else{
				$scope.cur_level++;
				$scope.loadLevel();
			}
			
		}
	};
	
	$scope.backLevel = function(cur_level)
	{
		var back_content = $scope.answer[$scope.cur_level-1];
		if($scope.cur_level > 0)
		{
			
			if(back_content == '')
				$scope.myHTML = '';
			else{
				$scope.cur_level--;
				$scope.loadLevel();
			}
			
		}
	};
	
	$scope.submit = function()
	{
		var text = $scope.myHTML;
		if( ($scope.myHTML.includes($scope.levels[$scope.cur_level].tag_init)) && ($scope.myHTML.includes($scope.levels[$scope.cur_level].tag_end)) ){
			$scope.saveData(text);
			$scope.disableBtn = false;
		}
		else
			{
				var x = screen.width/2 - 700/2;
			    var y = screen.height/2 - 450/2;
				$window.open("popup_modal.html","popup","width=500,height=500,left="+x+",top="+y);
				//$window.write("<h1>Código incorreto</h1><br><p>O código inserido está incorreto</p>");
				$scope.myHTML = '';
			}
	};
	
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