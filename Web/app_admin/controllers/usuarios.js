/// <reference path="../_all.js" />
(function () {
	'use strict';
	angular.module('eventos.usuarios', [])
		.controller('Usuarios', ['dataservice', 'logger', Usuarios]);

	function Usuarios(dataservice, logger) {
		var vm = this;
		/* Propiedades */
		vm.title = 'Usuarios | Eventos Deportivos';
		vm.tituloModal = 'Añadir usuario';		
		vm.usuario = '';
		vm.mostrarCargando = true;		
		vm.usuarios = [];
		vm.numusuarios = 0;
		vm.idUsuario = '';
		vm.addNombre = '';
		vm.addApellidos = '';
		vm.addFechaNacimiento = '';
		vm.addEmail = '';
		vm.valNombre = false;
		vm.valApellidos = false;
		vm.valEmail = false;
		vm.valFechaNacimiento = false;	
		vm.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
		vm.formatoFecha = 'dd/MM/yyyy';
		vm.estadoFechaNacimiento = { abierto: false };
			
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
			vm.mostrarCargando = true;
			logger.info('Pantalla de usuarios activa');

			dataservice.getUsuarios()
				.then(getUsuariosComplete, getUsuariosError)
				.catch(function () {

				});

			function getUsuariosComplete(data) {
				if (data !== undefined) {
					vm.usuarios = data;
					vm.numusuario = data.length;
				}
				vm.mostrarCargando = false;				
			}

			function getUsuariosError(data) {
				vm.usuarios = [];
				vm.numusuarios = 0;
				vm.mostrarCargando = false;
			}
		}

		function validar() {
			return true;
		}
		
		function clickGrabar() {
			if (vm.validar()) {
				vm.mostrarCargando = true;	
				
				vm.usuario.Nombre = vm.addNombre;
				vm.usuario.Apellidos = vm.addApellidos;
				vm.usuario.Email = vm.addEmail;
				vm.usuario.FechaNacimiento = vm.addFechaNacimiento.toLocaleDateString();			
				if (vm.idUsuario !== '') {
					dataservice.putUsuario(vm.usuario)
					.then(grabarUsuarioComplete)
					.catch(function() {
						$('#modalUsuario').modal('hide');						
					});
				}
				else {
					dataservice.postUsuario(vm.usuario)
					.then(grabarUsuarioComplete)
					.catch(function() {
						$('#modalUsuario').modal('hide');						
					});
				}
			}
			else {
				if (vm.valNombre)
				{
					logger.error('El nombre debe ser un texto de más de 5 caracteres.');
				}
				
				if (vm.valApellidos)
				{
					logger.error('Los apellidos deben ser un texto de más de 5 caracteres.');
				}
				
				if (vm.valEmail)
				{
					logger.error('El email debe ser un texto con formato usuario@dominio.terminacion');
				}
				
				if (vm.valFechaNacimiento)
				{
					logger.error('La fecha de nacimiento debe ser una fecha menor que el día de hoy y mayor que el 01/01/1900.');
				}
			}
			
			function grabarUsuarioComplete() {
				$('#modalUsuario').modal('hide');
				vm.tituloModal = 'Añadir Usuario';
				vm.usuario = {};
				vm.idUsuario = '';
				vm.addNombre = '';
				vm.addApellidos = '';
				vm.addEmail = '';
				vm.addFechaNacimiento = '';
				activate();
			}
		}
		
		function clickAdd() {
			vm.tituloModal = 'Añadir Usuario';
			vm.valNombre = false;
			vm.addNombre = '';
			vm.addApellidos = '';
			vm.valApellidos = false;
			vm.valEmail = false;			
			vm.addEmail = '';
			vm.valFechaNacimiento = false;			
			vm.addFechaNacimiento = '';
			vm.usuario = {};
			vm.idUsuario = '';
			
			$('#modalUsuario').modal('show');
		}
		
		function clickEditar(usuario) {
			vm.tituloModal = 'Editar Usuario';
			vm.valNombre = false;
			vm.addNombre = usuario.Nombre;
			vm.addApellidos = usuario.Apellidos;
			vm.valApellidos = false;
			vm.valEmail = false;			
			vm.addEmail = usuario.Email;
			vm.valFechaNacimiento = false;			
			vm.addFechaNacimiento = usuario.FechaNacimiento;
			vm.usuario = usuario;
			vm.idUsuario = usuario.Id;
			
			$('#modalUsuario').modal('show');
		}
		
		function clickBorrar(usuario) {
			vm.usuario = usuario;
			vm.idUsuario = usuario.Id;
			$('#modalConfirmar').modal('show');
		}
		
		function clickConfirmaBorrar() {
			dataservice.deleteUsuarios(vm.idUsuario)
				.then(borradoComplete)
				.catch(function () {

				});

			function borradoComplete() {
				vm.usuario = {};
				vm.idUsuario = '';
				$('#modalConfirmar').modal('hide');
				activate();				
			}
		}
		
		function openDatePicker($event) {
			vm.estadoFechaNacimiento.abierto = !vm.estadoFechaNacimiento.abierto;			
		};
	}
})();