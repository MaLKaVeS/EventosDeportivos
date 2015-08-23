/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.encuentros', [])
		.controller('Encuentros', ['dataservice', 'logger', Encuentros]);

	function Encuentros(dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Encuentros | Eventos Deportivos';
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