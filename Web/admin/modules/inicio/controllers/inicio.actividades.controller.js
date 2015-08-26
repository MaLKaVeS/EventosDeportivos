'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inicio";

    angular.module(moduleName)
           .controller('InicioActividadesController', InicioActividadesController);

    InicioActividadesController.$inject = ['$http'];

    function InicioActividadesController($http) {

        var vm = this;

        vm.texto = "SECCION DE FILTROS";
        vm.doSomething = doSomething;

        activate();

        function activate() {

        }

        function doSomething() {

        }

    }

})();