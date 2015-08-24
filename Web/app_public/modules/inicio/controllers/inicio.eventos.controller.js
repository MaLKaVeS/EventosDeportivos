'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inicio";

    angular.module(moduleName)
        .controller('InicioEventosController', InicioEventosController);

    InicioEventosController.$inject = ['$http', '$filter', 'EventosDataService', 'ActividadesDataService'];

    function InicioEventosController($http, $filter, EventosDataService, ActividadesDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.actividades = [];
        vm.eventos = [];
        vm.texto = "SECCION DE LISTADO";

        activate();

        function activate() {
            ActividadesDataService.getActividades()
                .then(getActividadesComplete, getActividadesFail);

            function getActividadesComplete(data) {
                vm.actividades = data;

                EventosDataService.getUltimosEventos()
                    .then(getUltimosEventosComplete, getUltimosEventosFail);
            }

            function getActividadesFail(data) {
                vm.actividades = [];
                alert('Error');
            }

            function getUltimosEventosComplete(data) {
                vm.eventos = data;

                if (vm.actividades.length > 0) {
                    var numevento = vm.eventos.length;
                    var actividad = '';
                    for (var i = 0; i < numevento; i++) {
                        vm.eventos[i].Actividad = '';
                        actividad = $filter('filter')(vm.actividades, function(act) {
                             return act.Id === vm.eventos[i].Actividad_Id;
                             })[0].Nombre;
                        vm.eventos[i].Actividad = actividad;
                    }
                }
            }

            function getUltimosEventosFail(data) {
                vm.eventos = [];
                alert('Error');
            }


        }
    }
})();