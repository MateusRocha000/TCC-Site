angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window){
	
	$scope.temas = [
		{tema: 'HTML', aulas: {
			'name': 'Introdução',
			'name': 'Título',
			'name': 'Parágrafo',
			'name': 'Imagem',
			'name': 'Botão',
			'name': 'Lista',
			'name': 'Tabela',
			'name': 'Classe',
			'name': 'Id',
			'name': 'Comentário'
		}},
		{tema: 'CSS', aulas: {
			'name': 'Introdução',
			'name': 'Id',
			'name': 'Classe',
			'name': 'Texto',
			'name': 'Tamanho dos elementos',
			'name': 'Modelo de caixa',
			'name': 'Posição',
			'name': 'Elemento flutuante'
		}},
		{tema: 'JavaScript', aulas: {
			'name': 'Introdução',
			'name': 'Variável',
			'name': 'Operador',
			'name': 'Condicional',
			'name': 'Função',
			'name': 'Evento'
		}}
		
	];	

});