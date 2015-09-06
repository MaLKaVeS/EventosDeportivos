/// <reference path="../_all.js" />
'use strict';
(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".mensajes";
    angular.module(moduleName)
		.controller('MensajesController', MensajesController);
    
    MensajesController.$inject = ['$timeout', '$location', 'MensajesDataService'];

    function MensajesController($timeout, $location, MensajesDataService) {
        var vm = this;
        /* Propiedades */
        vm.title = 'Mensajes | Eventos Deportivos';

        vm.mostrarCargando = true;
        vm.mensajes = [];
		
        /* Funciones */
        //vm.getDatos = getDatos;
        //vm.guardarDatos = guardarDatos;
        //vm.cambiarClave = cambiarClave;
		
        /* Eventos */
        activate();

        function activate() {
            
            MensajesDataService.getMensajes()
                               .then(getMensajesComplete, getMensajesFail);

            function getMensajesComplete(data) {
                vm.mostrarCargando = false;
                if (data.status) {
                    vm.mensajes = [];
                }
                else {
                    vm.mensajes = data;
                }
            }

            function getMensajesFail(data) {
                vm.mostrarCargando = false;
                vm.mensajes = [];
            }
        }
    }
})();