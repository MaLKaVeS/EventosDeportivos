'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".registro";

    angular.module(moduleName)
           .controller('RegistroController', RegistroController);

    RegistroController.$inject = ['$http'];

    function RegistroController($http) {

        /* jshint validthis: true */
        var vm = this;
        
        activate();

        function activate() {
                
        }
    }

})();