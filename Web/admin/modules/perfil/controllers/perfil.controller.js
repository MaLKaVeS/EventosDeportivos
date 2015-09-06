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
		var util = ApplicationConfiguration.applicationHelperFunctions;

		vm.Nombre = '';
		vm.Email = '';
		vm.Clave = '';
		vm.ConfirmarClave = '';
		vm.Apellidos = '';
		vm.FechaNacimiento = '';
		vm.estadoFechaNacimiento = { abierto: false };
		vm.formatoFecha = 'dd/MM/yyyy';
		vm.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		};
		vm.mostrarCargando = true;
		vm.mostrarErroresValidacion = false;

		vm.openDatePicker = openDatePicker;
		vm.getDatos = getDatos;

		vm.valNombre = false;
		vm.valApellidos = false;
		vm.valEmail = false;
		vm.valFechaNacimiento = false;
		vm.valClave = false;

		activate();

		function activate() {
		    vm.mostrarCargando = true;
		    var datos = LoginDataService.getAuthData();
			if (!datos) {
			    location.href = location.pathname + '#/login';
			}
			else {
			    vm.getDatos(datos.userName);
			}
		}

		function getDatos(userName) {
			UsuariosDataService.getUsuario(userName)
				                .then(getUsuarioComplete);

			function getUsuarioComplete(data) {
			    vm.usuario = data;
			    vm.Nombre = vm.usuario.Nombre;
			    vm.Apellidos = vm.usuario.Apellidos;
			    vm.Email = vm.usuario.Email;
			    vm.FechaNacimiento = util.FechaHelper.fechaToString(vm.usuario.FechaNacimiento);
				vm.mostrarCargando = false;
			}
		}
		
		function openDatePicker() {
		    vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;
		}

		function guardarDatos() {
		   

		    function guardarDatosComplete(data) {
				vm.mostrarCargando = false;
			}
		}
		
		function cambiarClave() {
		    

		    function cambiarClaveComplete(data) {
				vm.mostrarCargando = false;
			}
		}
	}
})();