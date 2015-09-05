/// <reference path="../_all.js" />
'use strict';
(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inscripciones";
    angular.module(moduleName)
		.controller('InscripcionesController', InscripcionesController);
    
    InscripcionesController.$inject = ['$timeout', '$location', 'LoginDataService'];

    function InscripcionesController($timeout, $location, LoginDataService) {
        var vm = this;
        /* Propiedades */
        vm.title = 'Inscripciones | Eventos Deportivos';
        vm.nombre = 0;
        vm.apellido1 = 0;
        vm.apellido2 = 0;
        vm.email = 0;
        // vm.encuentros = 0;
        // vm.resultados = 0;
        vm.mostrarCargando = true;
        vm.peticiones = 0;
		
        /* Funciones */
        //vm.getDatos = getDatos;
        //vm.guardarDatos = guardarDatos;
        //vm.cambiarClave = cambiarClave;
		
        /* Eventos */
        activate();

        function activate() {
            vm.mostrarCargando = false;
            if (!LoginDataService.getAuthData()) {
                $location.path('/login');
            }
            else {
            }

        }

        function getDatos() {
            vm.peticiones++;
            dataservice.getUsuario()
				.then(getUsuarioComplete);

            function getUsuarioComplete(data) {
                vm.nombre = data.Nombre;
                vm.email = data.Email;
                vm.apellido1 = data.Apellido1;
                vm.apellido2 = data.Apellido2;
                vm.peticiones--;
                vm.mostrarCargando = vm.peticiones > 0;
            }
        }
		
        function guardarDatos() {
            vm.peticiones++;
            dataservice.getActividadesCount()
				.then(countActividadesComplete);

            function countActividadesComplete(data) {
                vm.actividades = data;
                vm.peticiones--;
                vm.mostrarCargando = vm.peticiones > 0;
            }
        }
		
        function cambiarClave() {
            vm.peticiones++;
            dataservice.getActividadesCount()
				.then(countActividadesComplete);

            function countActividadesComplete(data) {
                vm.actividades = data;
                vm.peticiones--;
                vm.mostrarCargando = vm.peticiones > 0;
            }
        }
    }
})();