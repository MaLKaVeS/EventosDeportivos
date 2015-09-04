/// <reference path="../_all.js" />
(function () {
    'use strict';
    angular.module('eventos.actividades', [])
		.controller('ActividadesController', ActividadesController);

    ActividadesController.$inject = ['$timeout', '$location', 'ActividadesDataService', 'logger'];

    function ActividadesController($timeout, $location, dataservice, logger) {
        var vm = this;
        /* Propiedades */
        vm.title = 'Actividades | Eventos Deportivos';
        vm.usuario = '';
        vm.actividades = [];
        vm.numactividades = 0;
        vm.actividad = {};
        vm.idActividad = '';
        vm.mostrarCargando = true;
        vm.addNombre = '';
        vm.addDescripcion = '';

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
            logger.info('Pantalla de actividades activa');

            dataservice.getActividades()
				.then(getActividadesComplete)
				.catch(function (message) {
				    // exception.catcher('XHR Failed para Panel.activate')(message);
				});

            function getActividadesComplete(data) {
                vm.actividades = data;
                vm.numactividades = data.length;
            }
        }

        function validar() {
            vm.valNombre = vm.addNombre === '' || vm.addNombre.length < 5;

            return !vm.valNombre;
        }

        function clickGrabar() {
            if (vm.validar()) {
                vm.mostrarCargando = true;
                if (vm.idActividad !== '') {
                    vm.actividad.Nombre = vm.addNombre;
                    vm.actividad.Descripcion = vm.addDescripcion;
                    dataservice.putActividades(vm.actividad)
					.then(grabarActividadComplete)
					.catch(function () {
					    $('#modalActividad').modal('hide');
					});
                }
                else {
                    vm.actividad.Nombre = vm.addNombre;
                    vm.actividad.Descripcion = vm.addDescripcion;

                    dataservice.postActividades(vm.actividad)
					.then(grabarActividadComplete)
					.catch(function () {
					    $('#modalActividad').modal('hide');
					});
                }
            }
            else {
                logger.error('El nombre debe ser un texto de más de 5 caracteres.');
            }

            function grabarActividadComplete() {
                $('#modalActividad').modal('hide');
                vm.tituloModal = 'Añadir Actividad';
                vm.actividad = {};
                vm.idActividad = '';
                vm.addNombre = '';
                vm.addDescripcion = '';
                activate();
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
            dataservice.deleteActividades(vm.idActividad)
				.then(borradoComplete)
				.catch(function () {

				});

            function borradoComplete() {
                vm.actividad = {};
                vm.idActividad = '';
                $('#modalConfirmar').modal('hide');
                activate();
            }
        }
    }
})();