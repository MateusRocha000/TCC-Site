angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window, $location){
	
	$scope.temas = [
		{
			tema: 'HTML', aulas: {
				'titulo': 'Título',
				'paragrafo': 'Parágrafo',
				'imagem': 'Imagem',
				'link': 'Link',
				'botao': 'Botão',
				'lista': 'Lista',
				'tabela': 'Tabela',
				'classe': 'Classe',
				'id': 'Id',
				'comentario': 'Comentário'
			}
		},
		{
			tema: 'CSS', aulas: {
				'seletor': 'Seletor',
				'classe': 'Classe',
				'id': 'Id',
				'texto': 'Texto',
				'tamanho': 'Tamanho dos elementos',
				'caixa': 'Modelo de caixa',
				'posicao': 'Posição',
				'flutuante': 'Elemento flutuante'
			}
		},
		{
			tema: 'JavaScript', aulas: {
				'variavel': 'Variável',
				'condicional': 'Condicional',
				'funcao': 'Função',
				'evento': 'Evento'
			}
		}
		
	];	
	
	$scope.toClass = function(item)
	{
		$location.path(item);
	}
	
	
});