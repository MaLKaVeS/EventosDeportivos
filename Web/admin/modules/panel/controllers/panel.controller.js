'use strict';
(function () {
    var moduleName = ApplicationConfiguration.applicationModuleName + ".panel";

    angular.module(moduleName)
		.controller('PanelController', PanelController);

    PanelController.$inject = ['$timeout', '$location', '$q', 'LoginDataService', 'ActividadesDataService', 'EventosDataService', 'UsuariosDataService'];

    function PanelController($timeout, $location, $q, LoginDataService, ActividadesDataService, EventosDataService, UsuariosDataService) {
        var vm = this;
        /* Propiedades */
        vm.title = 'Panel de Administración | Eventos Deportivos';
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
        //vm.getNumeroActividades = getNumeroActividades;
        //vm.getNumeroEventos = getNumeroEventos;
        //vm.getNumeroParticipantes = getNumeroParticipantes;
        //vm.getNumeroUsuarios = getNumeroUsuarios;

        /* Eventos */
        activate();

        function activate() {
            vm.mostrarCargando = true;

            if (!LoginDataService.getAuthData()) {
                $location.path('/login');
            }

            var promises = [];

            promises.push(ActividadesDataService.getActividadesCount());
            promises.push(UsuariosDataService.getUsuariosCount());
            promises.push(ActividadesDataService.getActividadesCount()); // Reemplazar con participantes
            promises.push(EventosDataService.getEventosCount());

            $q.all(promises).then(activateComplete, activateFail);

            function activateComplete(data) {
                vm.mostrarCargando = false;
                vm.actividades = data[0];
                vm.usuarios = data[1];
                vm.participantes = data[2];
                vm.eventos = data[3];

            }

            function activateFail(data) {
                vm.mostrarCargando = false;

            }
        }
        /*
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

        */
    }
})();