/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".actividad";

    angular.module(moduleName)
        .controller('ActividadController', ActividadController);

    ActividadController.$inject = ['$state', '$stateParams', '$q', 'ActividadesDataService', 'EventosDataService'];

    function ActividadController($state, $stateParams, $q, ActividadesDataService, EventosDataService) {

        /* jshint validthis: true */
        var vm = this;

        vm.mostrarCargando = false;
        vm.textoCargando = 'Cargando actividad';

        vm.Nombre = '';
        vm.Descripcion = '';
        vm.Imagen = '';
        vm.Eventos = [];

        activate();

        function activate() {
            if ($stateParams.id) {
                vm.mostrarCargando = true;
                vm.textoCargando = 'Cargando actividad';

                var promises = [];

                promises.push(ActividadesDataService.getActividad($stateParams.id));
                promises.push(EventosDataService.getEventosActividad($stateParams.id));

                $q.all(promises).then(activateComplete, activateFail);
            }
            else {
                vm.mostrarCargando = false;
                $state.go('actividades');
            }

            function activateComplete(data) {
                vm.mostrarCargando = false;
                if (Object.prototype.toString.call(data[0]) === '[object Object]') {
                    var actividad = data[0];
                    vm.Nombre = actividad.Nombre;
                    vm.Icono = (actividad.Icono !== "null") ? actividad.Icono : '';
                    vm.Descripcion = actividad.Descripcion;
                    vm.Imagen = (actividad.Imagen !== "null") ? actividad.Imagen : '';
                }

                if (Object.prototype.toString.call(data[1]) === '[object Array]') {
                    vm.Eventos = data[1];
                }
            }

            function activateFail(data) {
                vm.mostrarCargando = false;
            }
        }
    }

})();