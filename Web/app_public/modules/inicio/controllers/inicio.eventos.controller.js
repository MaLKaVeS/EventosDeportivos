'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inicio";

    angular.module(moduleName)
        .controller('InicioEventosController', InicioEventosController);

    InicioEventosController.$inject = ['$q', '$filter', 'EventosDataService', 'ActividadesDataService'];

    function InicioEventosController($q, $filter, EventosDataService, ActividadesDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.actividades = [];
        vm.eventos = [];
        vm.textoCargando = "Cargando eventos";
        vm.mostrarCargando = true;
        vm.haCargado = false;
        
        activate();

        function activate() {
            var promises = []
            promises.push(ActividadesDataService.getActividades());
            promises.push(EventosDataService.getUltimosEventos());

            $q.all(promises)
                .then(activateComplete, activateFail);

            function activateComplete(data) {
                if (Object.prototype.toString.call(data[0]) === '[object Array]' 
                    && Object.prototype.toString.call(data[1]) === '[object Array]') {
                    vm.actividades = data[0];
                    vm.eventos = data[1];

                    if (vm.actividades.length > 0) {
                        var numevento = vm.eventos.length;
                        var actividad = '';
                        for (var i = 0; i < numevento; i++) {
                            vm.eventos[i].Actividad = '';
                            actividad = $filter('filter')(vm.actividades, function (act) {
                                return act.Id === vm.eventos[i].Actividad_Id;
                            })[0].Nombre;
                            vm.eventos[i].Actividad = actividad;
                        }
                    }
                    vm.mostrarCargando = false;
                    vm.haCargado = true;                    
                }
            }

            function activateFail(data) {
                vm.actividades = [];
                vm.eventos = [];
                vm.mostrarCargando = false;                
                vm.haCargado = true;                    
            }
        }
    }
})();