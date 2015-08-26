/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".actividades";

    angular.module(moduleName)
        .controller('ActividadesController', ActividadesController);

    ActividadesController.$inject = ['ActividadesDataService'];

    function ActividadesController(ActividadesDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.mostrarCargando = true;
        vm.textoCargando = 'Cargando actividades';
        vm.actividades = [];
        
        activate();

        function activate() {
            ActividadesDataService.getActividades()
            .then(getActividadesComplete)
            .catch(getActividadesFail);
            
            function getActividadesComplete(data) {
                vm.mostrarCargando = false;
                vm.actividades = data;                
            }
            
            function getActividadesFail(data) {
                vm.mostrarCargando = false;
                vm.actividades = [];
            }
        }
    }

})();