/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.login', [])
		.controller('Login', ['$timeout', '$location', 'dataservice', 'logger', Login]);

	function Login($timeout, $location, dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Eventos Deportivos | Acceso';
		vm.usuario = '';
		vm.clave = '';
		vm.mostrarCargando = false;
			
		/* Funciones */
		vm.validar = validar;
			
		/* Eventos */
		vm.clickAcceso = clickAcceso;
		vm.getLoginResult = getLoginResult;

		activate();

		function activate() {
			logger.info('Pantalla de login activa');
			dataservice.LogOut(); // Limpiamos las credenciales siempre que entre en la pantalla de login
			// if (dataservice.getAuthData()) {
			// 	$location.path('/panel');				
			// }
			vm.mostrarCargando = false;
		}

		function validar() {
			return vm.usuario && vm.clave;
		}

		function clickAcceso() {
			if (vm.validar()) {
				var params = { usuario: vm.usuario, clave: vm.clave };
				vm.getLoginResult(params);
			}
			else {
				logger.error('Datos de acceso erroneos');
			}
		}

		function getLoginResult(login) {

			dataservice.getLogin(login)
				.then(getLoginResultComplete)
				.catch();

			function getLoginResultComplete(data) {
				// logger.success('Acceso correcto. Abriendo panel de administracion.');
				$location.path('/panel');				

			}
		}
	}
})();