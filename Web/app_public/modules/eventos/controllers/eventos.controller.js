/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".eventos";

    angular.module(moduleName)
        .controller('EventosController', EventosController);

    EventosController.$inject = ['EventosDataService'];

    function EventosController(EventosDataService) {

        /* jshint validthis: true */
        var vm = this;
        
        vm.mostrarCargando = true;
        vm.textoCargando = 'Cargando eventos';
        vm.eventos = [];

        activate();

        function activate() {
            EventosDataService.getEventos().then(activateComplete, activateFail);

            function activateComplete(data) {
                vm.eventos = data;
                vm.mostrarCargando = false;
            }

            function activateFail(data) {
                vm.mostrarCargando = false;
            }
        }
    }

})();