/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".perfil";

    angular.module(moduleName)
        .controller('PerfilController', PerfilController);

    PerfilController.$inject = ['$state','$timeout', 'UsuariosDataService'];

    function PerfilController($state, $timeout, UsuariosDataService) {

        /* jshint validthis: true */
        var vm = this;
        var util = ApplicationConfiguration.applicationHelperFunctions;

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
        vm.clickEnviar = clickEnviar;

        vm.valNombre = false;
        vm.valApellidos = false;
        vm.valEmail = false;
        vm.valFechaNacimiento = false;
        vm.valClave = false;

        activate();

        function activate() {
            vm.mostrarCargando = true;
            var datos = UsuariosDataService.getAuthData();
            if (datos) {
                UsuariosDataService.getUsuario(datos.userName)
                                   .then(getUsuarioComplete, getUsuarioFail);
            }
            else {
                $state.go('no-encontrado');
            }

            function getUsuarioComplete(data) {
                vm.usuario = data;
                vm.Nombre = vm.usuario.Nombre;
                vm.Apellidos = vm.usuario.Apellidos;
                vm.Email = vm.usuario.Email;
                vm.FechaNacimiento = util.FechaHelper.fechaToString(vm.usuario.FechaNacimiento);
            }

            function getUsuarioFail(err) {
                $state.go('acceso');
            }
        }

        function openDatePicker() {
            vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;
        }

        function esValido() {
            var isValid = false;

            vm.valEmail = !vm.datosFormulario.email.$invalid;
            vm.valFechaNacimiento = vm.FechaNacimiento && true;

            if (vm.valFechaNacimiento) {
                try {
                    vm.valFechaNacimiento = vm.valFechaNacimiento && util.FechaHelper.fechaToInt(vm.FechaNacimiento.toLocaleDateString());
                } catch (e) {
                    vm.valFechaNacimiento = false;
                }
            }
            isValid = vm.valEmail && vm.valFechaNacimiento;

            return isValid && !vm.datosFormulario.$invalid;
        }

        function clickEnviar() {
            if (esValido()) {
                vm.mostrarCargando = true;
                vm.mostrarErroresValidacion = false;
                vm.mensaje = 'Registrando usuario ...';

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

            function postUsuarioComplete(data) {
                if (data.status) {
                    vm.mostrarCargando = false;
                    vm.mostrarErroresValidacion = true;
                    vm.mensaje = 'Error: ' + data.data.message;
                }
                else {
                    vm.mostrarCargando = false;
                    vm.mostrarErroresValidacion = false;
                    $state.go('completado');
                }
            }

            function postUsuarioFail(err) {
                vm.mostrarCargando = false;
                vm.mostrarErroresValidacion = true;
                vm.mensaje = 'Error: ' + err.data.message;
            }
        }
    }

})();