/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".contacto";

    angular.module(moduleName)
        .controller('ContactoController', ContactoController);

    ContactoController.$inject = ['ContactoDataService'];

    function ContactoController(ContactoDataService) {

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

        }

        function openDatePicker() {
            vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;
        }
        
        function clickEnviar() {
            
        }
    }

})();