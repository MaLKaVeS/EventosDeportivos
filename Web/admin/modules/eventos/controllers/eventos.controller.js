/// <reference path="../_all.js" />
'use strict';
(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".eventos";

    angular.module(moduleName)
		.controller('EventosController', EventosController);

    EventosController.$inject = ['$timeout', '$location', '$q', 'LoginDataService', 'ActividadesDataService', 'EventosDataService'];

    function EventosController($timeout, $location, $q, LoginDataService, ActividadesDataService, EventosDataService) {
        var vm = this;

        var util = ApplicationConfiguration.applicationHelperFunctions;

        /* Propiedades */
        vm.title = 'Eventos | Eventos Deportivos';
        vm.tituloModal = 'Añadir evento';
        vm.textoConfirmaModal = '';
        vm.tituloConfirmaModal = 'Confirmar borrado';
        vm.accionModal = 0;
        vm.evento = '';
        vm.buscar = '';
        vm.mostrarCargando = true;
        vm.hayError = false;
        vm.enviado = false;
        vm.eventos = [];
        vm.actividades = [];
        vm.numeventos = 0;
        vm.numactividades = 0;
        vm.idEvento = '';
        vm.addActividad_Id = '';
        vm.addNombre = '';
        vm.addDescripcion = '';
        vm.addFechaInicio = '';
        vm.addHoraInicio = '';
        vm.addFechaFin = '';
        vm.addHoraFin = '';
        vm.addRegistro = '';
        vm.valActividad_Id = false;
        vm.valNombre = false;
        vm.valDescripcion = false;
        vm.valFechaInicio = false;
        vm.valHoraInicio = false;
        vm.valFechaFin = false;
        vm.valHoraFin = false;
        vm.valRegistro = false;
        vm.estadoFechaInicio = { abierto: false };
        vm.estadoFechaFin = { abierto: false };

        vm.estados = [{ id: 0, valor: 'Creado' }, { id: 1, valor: 'Publicado' }, { id: 2, valor: 'En Progreso' },
			{ id: 3, valor: 'Terminado' }, { id: 4, valor: 'Finalizado' }];
        vm.tiposInscripciones = [{ id: 0, valor: 'Abierta' }, { id: 1, valor: 'Administrada' }, { id: 2, valor: 'Cerrada' }];
        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.formatoFecha = 'dd/MM/yyyy';

        /* Funciones */
        vm.validar = validar;

        /* Eventos */
        vm.clickGrabar = clickGrabar;
        vm.clickAdd = clickAdd;
        vm.clickEditar = clickEditar;
        vm.clickBorrar = clickBorrar;
        vm.clickConfirmaBorrar = clickConfirmaBorrar;
        vm.openDatePicker = openDatePicker;
        vm.clickPublicar = clickPublicar;
        vm.clickFinalizar = clickFinalizar;

        activate();

        function activate() {
            vm.mostrarCargando = true;
            if (!LoginDataService.getAuthData()) {
                $location.path('/login');
            }
            else {
                var promises = [];

                promises.push(ActividadesDataService.getActividades());
                promises.push(EventosDataService.getEventos());

                $q.all(promises).then(activateComplete, activateFail);
            }

            function activateComplete(data) {
                vm.actividades = data[0];
                vm.numactividades = data[0].length;

                vm.eventos = data[1];
                vm.numeventos = data[1].length;
                vm.mostrarCargando = false;

            }

            function activateFail(err) {
                vm.actividades = [];
                vm.numactividades = 0;
                vm.eventos = [];
                vm.numeventos = 0;

                vm.mostrarCargando = false;
            }

        }

        function validar() {
            vm.valNombre = vm.addNombre && vm.addNombre.length > 5;
            vm.valActividad_Id = vm.addActividad_Id && vm.addActividad_Id.length > 0;
            vm.valFechaInicio = vm.addFechaInicio;
            vm.valFechaFin = vm.addFechaFin;

            if (vm.valFechaInicio && vm.valFechaFin) {
                vm.valFechaFin = vm.valFechaFin && util.FechaHelper.fechaToInt(vm.addFechaInicio.toLocaleDateString()) <= util.FechaHelper.fechaToInt(vm.addFechaFin.toLocaleDateString());
            }

            vm.enviado = true;

            return vm.valNombre && vm.valActividad_Id && vm.valFechaFin && vm.valFechaInicio;
        }

        function openDatePicker($event, datePicker) {
            if (datePicker === 1) {
                vm.estadoFechaInicio.abierto = !vm.estadoFechaInicio.abierto;
            }
            else if (datePicker === 2) {
                vm.estadoFechaFin.abierto = !vm.estadoFechaFin.abierto;
            }
        };

        function clickGrabar() {
            vm.hayError = false;

            if (vm.validar()) {
                vm.mostrarCargando = true;

                vm.evento.Actividad_Id = vm.addActividad_Id;
                vm.evento.Nombre = vm.addNombre;
                vm.evento.Descripcion = vm.addDescripcion;
                vm.evento.FechaInicio = vm.addFechaInicio.toLocaleDateString();
                vm.evento.HoraInicio = vm.addHoraInicio;
                vm.evento.FechaFin = vm.addFechaFin.toLocaleDateString();
                vm.evento.HoraFin = vm.addHoraFin;
                vm.evento.EstadoRegistro = vm.addRegistro;

                if (vm.idEvento !== '') {
                    EventosDataService.putEvento(vm.evento)
						.then(grabarEventoComplete, grabarEventoError);
                }
                else {
                    EventosDataService.postEvento(vm.evento)
						.then(grabarEventoComplete, grabarEventoError);
                }
            }
            else {
                vm.hayError = true;
                vm.mensajeError = '';
                if (!vm.valNombre) {
                    vm.mensajeError = 'El nombre del evento debe tener al menos 5 caracteres. ';
                }

                if (!vm.valActividad_Id) {
                    vm.mensajeError += '\nDebe indicar la actividad del evento. ';
                }

                if (!vm.valFechaInicio) {
                    vm.mensajeError += '\nDebe indicar la fecha de inicio del evento. ';
                }

                if (!vm.valFechaFin) {
                    vm.mensajeError += '\nDebe indicar la fecha de fin del evento y esta debe ser igual o mayor que la de fin. ';
                }
            }

            function grabarEventoComplete() {
                $('#modalEvento').modal('hide');
                vm.tituloModal = 'Añadir Evento';
                vm.evento = {};
                vm.idEvento = '';
                vm.addActividad_Id = '';
                vm.addNombre = '';
                vm.addDescripcion = '';
                vm.addFechaInicio = '';
                vm.addHoraInicio = '';
                vm.addFechaFin = '';
                vm.addHoraFin = '';
                vm.addRegistro = '';
                vm.valActividad_Id = false;
                vm.valNombre = false;
                vm.valDescripcion = false;
                vm.valFechaInicio = false;
                vm.valHoraInicio = false;
                vm.valFechaFin = false;
                vm.valHoraFin = false;
                vm.valRegistro = false;
                vm.enviado = false;
                activate();
            }

            function grabarEventoError(data) {
                vm.mostrarCargando = false;
                vm.hayError = true;
                vm.mensajeError = 'Error al guardar el evento';

            }
        }

        function clickAdd() {
            vm.tituloModal = 'Añadir Evento';
            vm.addActividad_Id = '';
            vm.addNombre = '';
            vm.addDescripcion = '';
            vm.addFechaInicio = '';
            vm.addHoraInicio = '';
            vm.addFechaFin = '';
            vm.addHoraFin = '';
            vm.addRegistro = '';
            vm.valActividad_Id = false;
            vm.valNombre = false;
            vm.valDescripcion = false;
            vm.valFechaInicio = false;
            vm.valHoraInicio = false;
            vm.valFechaFin = false;
            vm.valHoraFin = false;
            vm.valRegistro = false;
            vm.evento = {};
            vm.idEvento = '';

            $('#modalEvento').modal('show');
        }

        function clickEditar(evento) {
            vm.tituloModal = 'Editar evento';
            vm.addActividad_Id = evento.Actividad_Id;
            vm.addNombre = evento.Nombre;
            vm.addDescripcion = evento.Descripcion;
            vm.addFechaInicio = util.FechaHelper.fechaToString(evento.FechaInicio);
            vm.addHoraInicio = evento.HoraInicio;
            vm.addFechaFin = util.FechaHelper.fechaToString(evento.FechaFin);
            vm.addHoraFin = evento.HoraFin;
            vm.addRegistro = evento.EstadoRegistro;
            vm.valActividad_Id = false;
            vm.valNombre = false;
            vm.valDescripcion = false;
            vm.valFechaInicio = false;
            vm.valHoraInicio = false;
            vm.valFechaFin = false;
            vm.valHoraFin = false;
            vm.valRegistro = false;
            vm.evento = evento;
            vm.idEvento = evento.Id;

            $('#modalEvento').modal('show');
        }

        function clickBorrar(evento) {
            vm.tituloConfirmaModal = 'Confirmar borrado';
            vm.textoConfirmaModal = '¿Desea eliminar el evento "' + evento.Nombre + '"? Esta operación no se puede deshacer.';
            vm.evento = evento;
            vm.idEvento = evento.Id;
            vm.accionModal = 0;
            $('#modalConfirmar').modal('show');
        }

        function clickConfirmaBorrar() {
            switch (vm.accionModal) {
                case 0:
                    EventosDataService.deleteEvento(vm.idEvento, vm.evento.Actividad_Id)
				                      .then(borradoComplete);
                    break;
                case 1:
                case 3:
                    EventosDataService.putEstado(vm.evento, vm.accionModal)
				                      .then(borradoComplete);
                    break;
            }


            function borradoComplete() {
                vm.evento = {};
                vm.idEvento = '';
                $('#modalConfirmar').modal('hide');
                activate();
            }
        }

        function clickPublicar(evento) {
            vm.tituloConfirmaModal = 'Publicar evento';
            vm.textoConfirmaModal = '¿Desea publicar el evento "' + evento.Nombre + '"? Desde ese momento aparecerá en la parte pública de Eventos Deportivos.';
            vm.evento = evento;
            vm.idEvento = evento.Id;
            vm.accionModal = 1;
            $('#modalConfirmar').modal('show');
        }

        function clickFinalizar(evento) {
            vm.tituloConfirmaModal = 'Finalizar evento';
            vm.textoConfirmaModal = '¿Desea marcar el evento "' + evento.Nombre + '" como finalizado? No se podrán realizar más cambios en el mismo.';
            vm.evento = evento;
            vm.accionModal = 3;
            vm.idEvento = evento.Id;
            $('#modalConfirmar').modal('show');
        }
    }
})();