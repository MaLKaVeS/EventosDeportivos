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
        
        vm.openDatePicker = openDatePicker;
        vm.clickEnviar = clickEnviar;
        
        activate();

        function activate() {
            var datos = UsuariosDataService.getAuthData();
            if (datos) {
                vm.Email = datos.userName;
            }
        }

        function openDatePicker() {
            vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;
        }
        
        function clickEnviar() {
            
        }
    }

})();