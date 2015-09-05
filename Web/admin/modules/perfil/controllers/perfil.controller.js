/// <reference path="../_all.js" />
'use strict';
(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".perfil";

	angular.module(moduleName)
		.controller('PerfilController', PerfilController);

	PerfilController.$inject = ['$timeout', '$location', 'LoginDataService', 'ActividadesDataService', 'UsuariosDataService'];

	function PerfilController($timeout, $location, LoginDataService, ActividadesDataService, UsuariosDataService) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Perfil de Usuario | Eventos Deportivos';
		vm.nombre = '';
		vm.apellido1 = '';
		vm.apellido2 = '';
		vm.email = '';

		vm.mostrarCargando = true;
		
		/* Funciones */
		vm.getDatos = getDatos;
		vm.guardarDatos = guardarDatos;
		vm.cambiarClave = cambiarClave;
		
		/* Eventos */
		activate();

		function activate() {
			vm.mostrarCargando = true;
			if (!LoginDataService.getAuthData()) {
			    $location.path('/login');
			}
			else {
			    vm.getDatos();
			}
		}

		function getDatos() {
			UsuariosDataService.getUsuario()
				.then(getUsuarioComplete);

			function getUsuarioComplete(data) {
				vm.nombre = data.Nombre;
				vm.email = data.Email;
				vm.apellido1 = data.Apellido1;
				vm.apellido2 = data.Apellido2;
				vm.mostrarCargando = false;
			}
		}
		
		function guardarDatos() {
		    UsuariosDataService.getActividadesCount()
				.then(countActividadesComplete);

			function countActividadesComplete(data) {
				vm.actividades = data;
				vm.mostrarCargando = false;
			}
		}
		
		function cambiarClave() {
		    ActividadesDataService.getActividadesCount()
				.then(countActividadesComplete);

			function countActividadesComplete(data) {
				vm.actividades = data;
				vm.mostrarCargando = false;
			}
		}
	}
})();