/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.usuarios', [])
		.controller('Usuarios', ['dataservice', 'logger', Usuarios]);

	function Usuarios(dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Eventos Deportivos | Acceso';
		vm.usuario = '';
		vm.clave = '';
			
		/* Funciones */
		// vm.validar = validar;
			
		/* Eventos */
		// vm.clickAcceso = clickAcceso;
		// vm.getLoginResult = getLoginResult;

		activate();

		function activate() {
			logger.info('Pantalla de usuarios activa');

		}
	}
})();