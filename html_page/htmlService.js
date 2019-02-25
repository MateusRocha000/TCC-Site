angular.module("tcc-site").service("tccSite", function($http){
	var _saveAnswer = function(code)
	{
		return $http.post(`/${cur_level}`, code);
	};
	
	var _getAnswer = function()
	{
		return $http.get(`/${cur_level}`);
	};
});