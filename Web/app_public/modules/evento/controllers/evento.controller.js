/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".evento";

    angular.module(moduleName)
        .controller('EventoController', EventoController);

    EventoController.$inject = ['$state', '$stateParams', '$q', 'ActividadesDataService', 'EventosDataService', 'EncuentrosDataService', 'ParticipantesDataService'];

    function EventoController($state, $stateParams, $q, ActividadesDataService, EventosDataService, EncuentrosDataService, ParticipantesDataService) {

        /* jshint validthis: true */
        var vm = this;

        vm.mostrarCargando = true;
        vm.textoCargando = 'Cargando evento';
        vm.evento = {};
        vm.actividad = {};
        vm.participantes = [];
        vm.encuentros = [];

        activate();

        function activate() {
            if ($stateParams.id) {
                var promises = [];

                promises.push(ActividadesDataService.getActividades());
                promises.push(EventosDataService.getEventoById($stateParams.id));
                promises.push(EncuentrosDataService.getEncuentrosEvento($stateParams.id));
                //promises.push(ParticipantesDataService.getParticipantesEvento($stateParams.id));

                $q.all(promises).then(activateComplete, activateFail);
            }

            function activateComplete(data) {
                vm.evento = data[1];
                vm.actividad = _.find(data[0], function (actividad) { return actividad.Id === vm.evento.Actividad_Id; });
                vm.encuentros = data[2];
                vm.participantes = data[3];
                vm.mostrarCargando = false;
            }

            function activateFail(data) {
                vm.mostrarCargando = false;
            }
        }
    }

})();