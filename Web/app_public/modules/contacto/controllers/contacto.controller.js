/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".contacto";

    angular.module(moduleName)
        .controller('ContactoController', ContactoController);

    ContactoController.$inject = ['ContactoDataService', 'UsuariosDataService'];

    function ContactoController(ContactoDataService, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.Nombre = '';
        vm.Email = '';
        vm.Asunto = '';
        vm.Texto = '';
        vm.Apellidos = '';
        
        vm.mostrarCargando = false;
        vm.mensajeOk = false;
        vm.mensajeError = false;

        vm.clickEnviar = clickEnviar;
        vm.isValid = isValid;
        
        activate();

        function activate() {
            var datos = UsuariosDataService.getAuthData();
            if (datos) {
                vm.Email = datos.userName;
            }
        }

        function isValid() {
            var isOk = false;

            return isOk;
        }
        
        function clickEnviar() {
            vm.mostrarCargando = true;
            vm.datosFormulario.$submitted = true;
            if (vm.isValid()) {
                vm.mensajeOk = false;
                vm.mensajeError = false;

                var mensaje = {
                    Asunto: vm.Asunto,
                    Apellidos: vm.Apellidos,
                    Email: vm.Email,
                    Nombre: vm.Nombre,
                    Texto: vm.Texto
                };

                ContactoDataService.postMensaje(mensaje)
                                   .then(postMensajeComplete, postMensajeFail);
            }
            else
            {
                vm.mensajeError = true;
                vm.mostrarCargando = false;
                vm.mensajeOk = false;
            }

            function postMensajeComplete(data) {
                vm.mostrarCargando = false;
                vm.mensajeOk = true;
                vm.mensajeError = false;
            }

            function postMensajeFail(err) {
                vm.mostrarCargando = false;
                vm.mensajeOk = false;
                vm.mensajeError = true;
            }
        }
    }

})();