/// <reference path="../../../_all.js" />

'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .controller('UserController', UserController);

    UserController.$inject = ['$http', 'UsuariosDataService'];

    function UserController($http, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.userName = '';
        vm.nombre = 'Usuario';
        vm.isLoggedIn = false;
        
        vm.doLogOut = doLogOut;

        activate();

        function activate() {
            
            var datos = UsuariosDataService.getAuthData();
            if (datos) {
                vm.isLoggedIn = true;
                vm.userName = datos.userName;

                UsuariosDataService.getUsuario(vm.userName)
                                   .then(getUsuarioComplete, getUsuarioFail);
            }
            else
            {
                vm.userName = '';
                vm.isLoggedIn = false;
            }

            function getUsuarioComplete(data) {
                UsuariosDataService.storeUserData(data);
                vm.nombre = data.Nombre;
            }

            function getUsuarioFail(err) {
                vm.userName = '';
                vm.nombre = '';
                vm.isLoggedIn = false;
            }
        }

        function doLogOut() {
            UsuariosDataService.LogOut();
            activate();
        }
    }

})();