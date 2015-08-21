/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.panel', [])
		.controller('Panel', ['$timeout', '$location', 'dataservice', 'logger', Panel]);

	function Panel($timeout, $location, dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Eventos Deportivos | Acceso';
		vm.usuario = '';
		vm.clave = '';
		vm.actividades = 0;
		vm.eventos = 0;
		vm.participantes = 0;
		vm.usuarios = 0;
		vm.encuentros = 0;
		vm.resultados = 0;
		vm.mostrarCargando = true;
		vm.peticiones = 0;
		
		/* Funciones */
		vm.getNumeroActividades = getNumeroActividades;
		vm.getNumeroEventos = getNumeroEventos;
		vm.getNumeroParticipantes = getNumeroParticipantes;
		vm.getNumeroUsuarios = getNumeroUsuarios;
		
		/* Eventos */
		activate();

		function activate() {
			vm.mostrarCargando = true;

			vm.getNumeroActividades();
			vm.getNumeroUsuarios();
			vm.getNumeroParticipantes();
			vm.getNumeroEventos();
		}

		function getNumeroActividades() {
			vm.peticiones++;
			dataservice.getActividadesCount()
				.then(countActividadesComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.getNumeroActividades')(message);
                });

			function countActividadesComplete(data) {
				vm.actividades = data;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}

		function getNumeroUsuarios() {
			vm.peticiones++;
			dataservice.getUsuariosCount()
				.then(countUsuariosComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.getNumeroUsuarios')(message);
                });

			function countUsuariosComplete(data) {
				vm.usuarios = data;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}

		function getNumeroParticipantes() {
			vm.peticiones++;
			dataservice.getActividadesCount()
				.then(countParticipantesComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.activate')(message);
                });

			function countParticipantesComplete(data) {
				vm.participantes = data;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}
		
		function getNumeroEventos() {
			vm.peticiones++;
			dataservice.getEventosCount()
				.then(countEventosComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.activate')(message);
                });

			function countEventosComplete(data) {
				vm.eventos = data;
				vm.peticiones--;
				vm.mostrarCargando = vm.peticiones > 0;
			}
		}
	}
})();