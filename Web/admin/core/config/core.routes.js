'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .config(['$urlRouterProvider',
	                function ($urlRouterProvider) {

	                    $urlRouterProvider.when('', '/login');

	                    $urlRouterProvider.otherwise('/pagina404');

	                }
           ]);

})();