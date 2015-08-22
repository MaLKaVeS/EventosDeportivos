/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.perfil', [])
		.controller('Perfil', ['$timeout', '$location', 'dataservice', 'logger', Perfil]);

	function Perfil($timeout, $location, dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Eventos Deportivos | Perfil de Usuario';
		vm.nombre = 0;
		vm.apellido1 = 0;
		vm.apellido2 = 0;
		vm.email = 0;
		// vm.encuentros = 0;
		// vm.resultados = 0;
		vm.mostrarCargando = true;
		vm.peticiones = 0;
		
		/* Funciones */
		vm.getDatos = getDatos;
		vm.guardarDatos = guardarDatos;
		vm.cambiarClave = cambiarClave;
		
		/* Eventos */
		activate();

		function activate() {
			vm.mostrarCargando = true;

			vm.getDatos();
		}

		function getDatos() {
			vm.peticiones++;
			dataservice.getUsuario()
				.then(getUsuarioComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Perfil.getDatos')(message);
                    // $location.url('/');
                });

			function getUsuarioComplete(data) {
				vm.nombre = data.Nombre;
				vm.email = data.Email;
				vm.apellido1 = data.Apellido1;
				vm.apellido2 = data.Apellido2;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}
		
		function guardarDatos() {
			vm.peticiones++;
			dataservice.getActividadesCount()
				.then(countActividadesComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.getNumeroActividades')(message);
                    $location.url('/');
                });

			function countActividadesComplete(data) {
				vm.actividades = data;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}
		
		function cambiarClave() {
			vm.peticiones++;
			dataservice.getActividadesCount()
				.then(countActividadesComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.getNumeroActividades')(message);
                    $location.url('/');
                });

			function countActividadesComplete(data) {
				vm.actividades = data;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}
	}
})();