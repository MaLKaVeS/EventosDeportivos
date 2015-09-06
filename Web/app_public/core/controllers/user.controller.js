/// <reference path="../../../_all.js" />

'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .controller('UserController', UserController);

    UserController.$inject = ['$http', 'UsuariosDataService'];

    function UserController($http, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.email = '';        
        vm.userName = '';
        vm.isLoggedIn = false;
        
        vm.doLogOut = doLogOut;

        activate();

        function activate() {
            
            var datos = UsuariosDataService.getAuthData();
            if (datos) {
                vm.isLoggedIn = true;
                vm.userName = datos.userName;
            }
            else
            {
                vm.userName = '';
                vm.isLoggedIn = false;
            }
        }

        function doLogOut() {
            UsuariosDataService.LogOut();
            activate();
        }
    }

})();