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
				'classe': 'Div',
				'comentario': 'Comentário',
				'link': 'Link'
			}
		},
		{
			tema: 'CSS', aulas: {
				'seletor': 'Seletor',
				'id': 'Identificador',
				'classe': 'Classe',
				'planofundo': 'Plano de Fundo',
				'posicao': 'Flebox',
				'cor' : 'Grid'
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