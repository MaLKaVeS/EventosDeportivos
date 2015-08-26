/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".registro";

    angular.module(moduleName)
        .controller('RegistroController', RegistroController);

    RegistroController.$inject = ['$scope', 'UsuariosDataService'];

    function RegistroController($scope, UsuariosDataService) {

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
        }
        
        function isPasswordMatch() {
            return vm.Clave === vm.ConfirmarClave;
        }

        function openDatePicker() {
            vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;
        }
        
        function esValido() {
            if (vm.datosFormulario)
            {
                
            }
            
            return true;
        }
        
        function clickEnviar() {
            if (esValido()) {
                vm.mostrarCargando = true;
                UsuariosDataService.postUsuario()
                .then(postUsuarioComplete, postUsuarioFail);
            }
            else {
                vm.mostrarErroresValidacion = true;
            }
            
            function postUsuarioComplete() {
                
            }
            
            function postUsuarioFail() {
                
            }
        }
    }

})();