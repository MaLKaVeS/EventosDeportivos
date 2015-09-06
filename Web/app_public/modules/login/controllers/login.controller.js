/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".login";

    angular.module(moduleName)
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$timeout','UsuariosDataService'];

    function LoginController($timeout, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.title = 'Acceso | Eventos Deportivos';
        vm.usuario = '';
        vm.clave = '';
        vm.mostrarCargando = false;
        vm.loginError = false;
        vm.loginOk = false;
        vm.enviado = false;
        vm.mensaje = 'Enviando ...';/* Funciones */
        vm.validar = validar;

        /* Eventos */
        vm.clickAcceso = clickAcceso;
        vm.getLoginResult = getLoginResult;
        vm.claveKeyDown = claveKeyDown;

        activate();

        function activate() {
            UsuariosDataService.LogOut(); // Limpiamos las credenciales siempre que entre en la pantalla de login
            vm.mostrarCargando = false;
        }

        function validar() {
            return vm.usuario && vm.clave;
        }

        function clickAcceso() {
            vm.mostrarCargando = true;
            vm.enviado = true;
            vm.loginError = false;
            vm.loginOk = false;
            vm.mensaje = 'Enviando ...';
            if (vm.validar()) {
                var params = { usuario: vm.usuario, clave: vm.clave };
                vm.getLoginResult(params);
            }
            else {
                vm.mostrarCargando = false;
                vm.loginError = true;
                vm.mensaje = 'Error en los datos.';
            }
        }

        function getLoginResult(login) {

            UsuariosDataService.doLogin(login)
				.then(getLoginResultComplete, getLoginResultError);

            function getLoginResultComplete(data) {
                vm.mostrarCargando = false;

                if (data && data.isAuth) {
                    vm.loginError = false;
                    vm.loginOk = true;
                    vm.mensaje = 'Acceso correcto.';

                    $timeout(function () {
                        vm.mostrarCargando = true;
                        vm.mensaje = 'Entrando ...';
                        location.href = '/';
                    }, 2000);
                }
                else {
                    vm.loginOk = false;
                    vm.mostrarCargando = false;
                    vm.mensaje = 'Error en los datos.';
                    vm.loginError = true;
                }
            }

            function getLoginResultError(err) {
                vm.loginOk = false;
                vm.mostrarCargando = false;
                vm.mensaje = 'Error en los datos.';
                vm.loginError = true;
            }
        }

        function claveKeyDown(event) {
            if (event.keyCode == 13) {
                if (event.currentTarget.name == "usuario" || event.currentTarget.name == "clave") {
                    vm.clickAcceso();
                }
            }
        }
    }

})();