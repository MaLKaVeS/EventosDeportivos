/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.ajustes', [])
		.controller('Ajustes', ['dataservice', 'logger', Ajustes]);

	function Ajustes(dataservice, logger) {
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
			logger.info('Pantalla de encuentros activa');

		}
	}
})();