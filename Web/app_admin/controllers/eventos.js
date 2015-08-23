/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.eventos', [])
		.controller('Eventos', ['dataservice', 'logger', Eventos]);

	function Eventos(dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Eventos | Eventos Deportivos';
		vm.tituloModal = 'Añadir evento';
		vm.evento = '';
		vm.mostrarCargando = true;
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

		activate();

		function activate() {
			logger.info('Pantalla de eventos activa');
			vm.mostrarCargando = true;

			dataservice.getActividades()
				.then(getActividadesComplete)
				.catch(function (message) {
                    // exception.catcher('XHR Failed para Panel.activate')(message);
                });

			function getActividadesComplete(data) {
				vm.actividades = data;
				vm.numactividades = data.length;

				if (vm.numactividades > 0) {
					dataservice.getEventos()
						.then(getEventosComplete, getEventosError)
						.catch(function () {

						});
				}
			}

			function getEventosComplete(data) {
				if (data !== undefined) {
					vm.eventos = data;
					vm.numeventos = data.length;
				}
				vm.mostrarCargando = false;
			}

			function getEventosError(data) {
				vm.eventos = [];
				vm.numeventos = 0;
				vm.mostrarCargando = false;
			}

		}

		function validar() {
			return true;
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
					dataservice.putEvento(vm.evento)
						.then(grabarEventoComplete)
						.catch(function () {
							$('#modalEvento').modal('hide');
						});
				}
				else {
					dataservice.postEvento(vm.evento)
						.then(grabarEventoComplete)
						.catch(function () {
							$('#modalEvento').modal('hide');
						});
				}
			}
			else {
				if (vm.valNombre) {
					logger.error('El nombre debe ser un texto de más de 5 caracteres.');
				}

				if (vm.valFechaInicio) {
					logger.error('La fecha de inicio debe ser válida.');
				}

				if (vm.valFechaFin) {
					logger.error('La fecha de fin debe ser váldida');
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
				activate();
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
			vm.addFechaInicio = dataservice.fechaToString(evento.FechaInicio);
			vm.addHoraInicio = evento.HoraInicio;
			vm.addFechaFin = dataservice.fechaToString(evento.FechaFin);
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
			vm.evento = evento;
			vm.idEvento = evento.Id;			
			$('#modalConfirmar').modal('show');
		}

		function clickConfirmaBorrar() {
			dataservice.deleteEvento(vm.idEvento, vm.evento.Actividad_Id)
				.then(borradoComplete)
				.catch(function () {

				});

			function borradoComplete() {
				vm.evento = {};
				vm.idEvento = '';
				$('#modalConfirmar').modal('hide');
				activate();
			}
		}
	}
})();