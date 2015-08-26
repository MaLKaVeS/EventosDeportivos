/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".login";

    angular.module(moduleName)
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', 'UsuariosDataService'];

    function LoginController($http, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.Email = '';
        vm.Clave = '';
        
        activate();

        function activate() {

        }
    }

})();