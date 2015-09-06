/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".evento";

    angular.module(moduleName)
        .controller('EventoController', EventoController);

    EventoController.$inject = ['$state', '$stateParams', '$q', 'ActividadesDataService', 'EventosDataService', 'EncuentrosDataService', 'ParticipantesDataService', 'UsuariosDataService'];

    function EventoController($state, $stateParams, $q, ActividadesDataService, EventosDataService, EncuentrosDataService, ParticipantesDataService, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;

        vm.mostrarCargando = true;
        vm.textoCargando = 'Cargando evento';
        vm.evento = {};
        vm.actividad = {};
        vm.participantes = [];
        vm.encuentros = [];
        vm.usuarioInscrito = false;
        vm.usuarioIdentificado = false;
        vm.datosUsuario = {};

        vm.tiposInscripciones = [{ id: 0, valor: 'Abierta' }, { id: 1, valor: 'Administrada' }, { id: 2, valor: 'Cerrada' }];

        vm.clickInscribir = clickInscribir;

        activate();

        function activate() {
            if ($stateParams.id) {
                var promises = [];

                var datosUsuario = UsuariosDataService.getUserStoredData();
                if (datosUsuario) {
                    vm.usuarioIdentificado = true;
                    vm.datosUsuario = datosUsuario;
                }

                promises.push(ActividadesDataService.getActividades());
                promises.push(EventosDataService.getEventoById($stateParams.id));
                promises.push(EncuentrosDataService.getEncuentrosEvento($stateParams.id));
                promises.push(ParticipantesDataService.getParticipantesEvento($stateParams.id));

                $q.all(promises).then(activateComplete, activateFail);
            }

            function activateComplete(data) {
                vm.evento = data[1];
                vm.actividad = _.find(data[0], function (actividad) { return actividad.Id === vm.evento.Actividad_Id; });
                vm.encuentros = data[2];
                vm.participantes = (data[3]) ? data[3] : [];

                if (vm.participantes.length > 0 && vm.datosUsuario) {

                    vm.usuarioInscrito = _.find(vm.participantes, function (participante) {
                        return participante.Id == vm.datosUsuario.Id;
                    });
                }

                vm.mostrarCargando = false;
            }

            function activateFail(data) {
                vm.mostrarCargando = false;
            }
        }

        function clickInscribir() {
            vm.mostrarCargando = true;
            ParticipantesDataService.postInscribirUsuario(vm.datosUsuario.Id, $stateParams.id)
                                    .then(inscribirComplete, inscribirFail);

            function inscribirComplete(data) {
                vm.mostrarCargando = false;
                
                activate();
            }

            function inscribirFail(err) {
                vm.mostrarCargando = false;
            }
        }
    }

})();