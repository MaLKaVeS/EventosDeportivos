/// <reference path="../_all.js" />
'use strict';
(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".ajustes";

	angular.module(moduleName)
		.controller('AjustesController', AjustesController);

	AjustesController.$inject = ['$timeout', '$location', 'LoginDataService', 'ActividadesDataService', 'UsuariosDataService'];

	function AjustesController($timeout, $location, LoginDataService, ActividadesDataService, UsuariosDataService) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Ajustes | Eventos Deportivos';
		vm.usuario = '';
		vm.clave = '';
			
		/* Funciones */
		// vm.validar = validar;
			
		/* Eventos */
		// vm.clickAcceso = clickAcceso;
		// vm.getLoginResult = getLoginResult;

		activate();

		function activate() {
		    if (!LoginDataService.getAuthData()) {
		        $location.path('/login');
		    }
		    else {
		    }
		}
	}
})();