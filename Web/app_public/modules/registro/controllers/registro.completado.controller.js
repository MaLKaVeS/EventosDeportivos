/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".registro";

    angular.module(moduleName)
        .controller('RegistroCompletadoController', RegistroCompletadoController);

    RegistroCompletadoController.$inject = ['$state', 'UsuariosDataService'];

    function RegistroCompletadoController($state, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        vm.Nombre = '';
        vm.Email = '';
        vm.Clave = '';
        vm.ConfirmarClave = '';
        vm.Apellidos = '';
        vm.FechaNacimiento = '';
        vm.estadoFechaNacimiento = { abierto: false };
        vm.formatoFecha = 'dd/MM/yyyy';
        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.mostrarCargando = true;
        vm.mostrarErroresValidacion = false;

        vm.openDatePicker = openDatePicker;
        vm.isPasswordMatch = isPasswordMatch;
        vm.clickEnviar = clickEnviar;

        activate();

        function activate() {
            vm.mostrarCargando = false;
            if (!UsuariosDataService.hayRegistro()) {
                $state.go('no-encontrado');
            }
        }

        function isPasswordMatch() {
            return vm.Clave === vm.ConfirmarClave;
        }

        function openDatePicker() {
            vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;
        }

        function esValido() {
            var isValid = false;
            // if (vm.datosFormulario && vm.)
            // {
            //     
            // }

            return isValid;
        }

        function clickEnviar() {
            if (esValido()) {
                vm.mostrarCargando = true;
                var usuario = {
                    Nombre: vm.Nombre,
                    Apellidos: vm.Apellidos,
                    Email: vm.Email,
                    Clave: vm.Clave,
                    FechaNacimiento: vm.FechaNacimiento
                };

                UsuariosDataService.postUsuario(usuario)
                                   .then(postUsuarioComplete, postUsuarioFail);
            }
            else {
                vm.datosFormulario.$submitted = true;
            }

            function postUsuarioComplete() {
                $state.go('completado');
            }

            function postUsuarioFail() {

            }
        }
    }

})();