'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .config(['$urlRouterProvider',
	                function ($urlRouterProvider) {

	                    $urlRouterProvider.when('', '/inicio');

	                    $urlRouterProvider.otherwise('/pagina404');

	                }
           ]);

})();