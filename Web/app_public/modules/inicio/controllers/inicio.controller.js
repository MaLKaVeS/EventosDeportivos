'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inicio";

    angular.module(moduleName)
           .controller('InicioController', InicioController);

    InicioController.$inject = ['$http'];

    function InicioController($http) {

        /* jshint validthis: true */
        var vm = this;
        
        activate();

        function activate() {
                
        }
    }

})();