angular.module("tcc-site").controller("tcc-site", function($scope){
	$scope.levels = [
		{
				name: 'tag-h1',
				instr: 'Tag de título para a página',
				before: '<html>\n   <head>\n     <title>Titulo</title>\n   </head>\n   <body>\n',
				after: '   </body>\n</html>'
		},
		{
				name: 'tag-p',
				instr: {
					"pt" : "<p>Tag de parágrafo para a página</p>",
					"en" : "<p>Paragraph tag for the web page</p>"
				},
				before: "<body>",
				after: "</body>"
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