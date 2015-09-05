/// <reference path="../_all.js" />
'use strict';
(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".actividades";

    angular.module(moduleName)
		.controller('ActividadesController', ActividadesController);

    ActividadesController.$inject = ['$timeout', '$location', 'LoginDataService', 'ActividadesDataService'];

    function ActividadesController($timeout, $location, LoginDataService, ActividadesDataService) {
        var vm = this;
        /* Propiedades */
        vm.title = 'Actividades | Eventos Deportivos';
        vm.usuario = '';
        vm.actividades = [];
        vm.buscar = '';
        vm.numactividades = 0;
        vm.actividad = {};
        vm.idActividad = '';
        vm.mostrarCargando = true;
        vm.addNombre = '';
        vm.addDescripcion = '';
        vm.addIcono = '';
        vm.addImagen = '';
        vm.hayError = false;
        vm.mensajeError = 'Error al guardar la actividad';

        vm.valNombre = false;
        vm.valDescripcion = false;

        vm.tituloModal = 'Añadir actividad';

        /* Funciones */
        vm.validar = validar;

        /* Eventos */
        vm.clickGrabar = clickGrabar;
        vm.clickAdd = clickAdd;
        vm.clickEditar = clickEditar;
        vm.clickBorrar = clickBorrar;
        vm.clickConfirmaBorrar = clickConfirmaBorrar;

        activate();

        function activate() {

            if (!LoginDataService.getAuthData()) {
                $location.path('/login');
            }
            else {

                ActividadesDataService.getActividades()
                    .then(getActividadesComplete);

                function getActividadesComplete(data) {
                    vm.actividades = data;
                    vm.numactividades = data.length;
                }
            }
        }

        function validar() {
            vm.valNombre = vm.addNombre === '' || vm.addNombre.length < 5;

            return !vm.valNombre;
        }

        function clickGrabar() {
            if (vm.validar()) {
                vm.mostrarCargando = true;

                vm.actividad.Nombre = vm.addNombre;
                vm.actividad.Descripcion = vm.addDescripcion;
                vm.actividad.Imagen = vm.addImagen;
                vm.actividad.Icono = vm.addIcono;

                if (vm.idActividad !== '') {
                    ActividadesDataService.putActividades(vm.actividad)
					.then(grabarActividadComplete, grabarActividadFail);
                }
                else {
                    ActividadesDataService.postActividades(vm.actividad)
					.then(grabarActividadComplete, grabarActividadFail);
                }
            }
            else {
                vm.hayError = true;
                vm.mensajeError = 'Debe indicar el nombre de la actividad';
            }

            function grabarActividadComplete() {
                $('#modalActividad').modal('hide');
                vm.tituloModal = 'Añadir Actividad';
                vm.actividad = {};
                vm.idActividad = '';
                vm.addNombre = '';
                vm.addDescripcion = '';
                vm.addImagen = '';
                vm.addIcono = '';
                activate();
            }

            function grabarActividadFail() {
                vm.hayError = true;
                vm.mensajeError = 'Ocurrió un error al guardar la actividad';
            }
        }

        function clickAdd() {
            vm.tituloModal = 'Añadir Actividad';
            vm.valNombre = false;
            vm.addNombre = '';
            vm.addDescripcion = '';
            vm.actividad = {};
            vm.idActividad = '';

            $('#modalActividad').modal('show');
        }

        function clickEditar(actividad) {
            vm.tituloModal = 'Editar Actividad';
            vm.actividad = actividad;
            vm.idActividad = actividad.Id;
            vm.addNombre = actividad.Nombre;
            vm.addDescripcion = actividad.Descripcion;

            $('#modalActividad').modal('show');
        }

        function clickBorrar(actividad) {
            vm.actividad = actividad;
            vm.idActividad = actividad.Id;
            $('#modalConfirmar').modal('show');
        }

        function clickConfirmaBorrar() {
            ActividadesDataService.deleteActividades(vm.idActividad)
				.then(borradoComplete);

            function borradoComplete() {
                vm.actividad = {};
                vm.idActividad = '';
                $('#modalConfirmar').modal('hide');
                activate();
            }
        }
    }
})();