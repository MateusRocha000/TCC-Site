angular.module("tcc-site").controller("tcc-site", function($scope){
	$scope.cur_level = 0;
	$scope.levels = [
		{
				name: 'Tag de título: <h1>',
				instr: 'Tag de título para a página',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n',
				after: '   </body>\n</html>',
				tag_init: '<h1>',
				tag_end: '</h1>'
		},
		{
				name: 'Tag de parágrafo: <p>',
				instr: 'Tag de parágrafo para a página',
				before: "<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n",
				after: "</body>\n</html>",
				tag_init: '<p>',
				tag_end: '</p>'
		}/*,
		{
				name: "intro-css",
				instr: {
					"pt" : "<p>Intro de css</p>",
					"en" : "<p>css intro</p>"
				}
		},
		{
				name: "sel",
				instr: {
					"pt" : "<p>Seletores de CSS</p>",
					"en" : "<p>CSS selectores</p>"
				},
				before: "body{\nbackground-color: blue;\n}"
		},
		{
				name: "intro-js",
				instr: {
					"pt" : "<p>Intro de javascript</p>",
					"en" : "<p>javascript intro</p>"
				}
		},
		{
			name: "variable",
			instr: {
				"pt" : "<p>Variáveis em javascript</p>",
				"en" : "<p>Variables in javascript</p>"
			}
		}*/
	];
	
	var count = Object.keys($scope.levels).length;
	
	$scope.nextLevel = function(cur_level)
	{
		if($scope.cur_level < count-1)
			$scope.cur_level++;
	};
	
	$scope.backLevel = function(cur_level)
	{
		if($scope.cur_level > 0)
			$scope.cur_level--;
	};
	
	$scope.canGoNext = function()
	{
		
	};
	
	
	
	$scope.levelWin = [
		{
			name: "win",
			instr: {
				"pt" : "<p>Parabéns!</p>",
				"en" : "<p>Congratulations</p>"
			}
		}
	];

});