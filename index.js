angular.module("tcc-site").controller("tcc-site", function($scope, $localStorage, $sessionStorage, $window, $location){
	
	$scope.temas = [
		{
			tema: 'HTML', aulas: {
				'titulo': 'Título',
				'paragrafo': 'Parágrafo',
				'imagem': 'Imagem',
				'botao': 'Botão',
				'lista': 'Lista',
				'tabela': 'Tabela',
				'classe': 'Classe',
				'id': 'Id',
				'comentario': 'Comentário',
				'link': 'Link'
			}
		},
		{
			tema: 'CSS', aulas: {
				'seletor': 'Seletor',
				'id': 'Id',
				'classe': 'Classe',
				'planofundo': 'Plano de Fundo',
				'posicao': 'Posição',
				'cor' : 'Cores',
				'flutuante': 'Elemento flutuante'
			}
		}/*,
		{
			tema: 'JavaScript', aulas: {
				'variavel': 'Variável',
				'condicional': 'Condicional',
				'funcao': 'Função',
				'evento': 'Evento'
			} 
		}*/
		
	];	
	
	$scope.toClass = function(item)
	{
		$location.path(item);
	}
});