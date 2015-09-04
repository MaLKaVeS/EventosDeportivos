'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .factory('EventosDataService', EventosDataService);

    EventosDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function EventosDataService($http, $q, $timeout, $location) {
        var serviceBase = window.location.protocol + '//' + window.location.host +
            ((window.location.hostname === 'localhost') ? '/index.php' : '/pardo/index.php');
        
        var service = {
            getUltimosEventos: getUltimosEventos,
            getEventoById: getEventoById,
            getEventosFiltrados: getEventosFiltrados,
            getEventos: getEventos,
            getEventosCount: getEventosCount,
            postEvento: postEvento,
            putEvento: putEvento,
            deleteEvento: deleteEvento,
            
        }

        return service;

        function getUltimosEventos() {
            var defered = $q.defer();
            var promise = defered.promise;
            
            $http.get(serviceBase + '/api/eventos/ultimos')
                .then(getUltimosEventosComplete, getUltimosEventosFail);

            return promise;
                    
            function getUltimosEventosComplete(data) {
                if (data.status === 200)
                {
                  defered.resolve(data.data);
                }
                else {
                    defered.reject(data.data);
                }
            }
            
            function getUltimosEventosFail() {
                promise.reject();
            }
        }

        function getEventoById(id)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var testProvider = {};

            testProvider.id = id;
            testProvider.name = "Proveedor " + id;

            $timeout(function () {
                defered.resolve(testProvider);
            }, 5000); // delay 5 s

            return promise;
        }
        
        function getEventosFiltrados() {
            
        }

        function getEventos() {
            return $http.get(serviceBase + '/api/eventos/eventos')
                .then(getEventosComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getEventos')(message);
                });

            function getEventosComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function postEvento(evento) {            
            return $http({
                method: 'POST', 
                url: serviceBase + '/api/eventos/eventos',
                data: 'Nombre=' + evento.Nombre + '&Descripcion=' + evento.Descripcion +
                '&Actividad_Id=' + evento.Actividad_Id + '&FechaInicio=' + fechaToInt(evento.FechaInicio) +
                '&HoraInicio=' + evento.HoraInicio + '&FechaFin=' + fechaToInt(evento.FechaFin) +
                '&HoraFin=' + evento.HoraFin + '&EstadoRegistro=' + evento.EstadoRegistro               
                })
                .then(postEventoComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para postEvento')(message);
                    // $location.url('/');
                });

            function postEventoComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function putEvento(evento) {
            return $http({
                method: 'PUT', 
                url: serviceBase + '/api/eventos/eventos',
                data: 'Id=' + evento.Id + '&Nombre=' + evento.Nombre + '&Descripcion=' + evento.Descripcion +
                '&Actividad_Id=' + evento.Actividad_Id + '&FechaInicio=' + fechaToInt(evento.FechaInicio) +
                '&HoraInicio=' + evento.HoraInicio + '&FechaFin=' + fechaToInt(evento.FechaFin) +
                '&HoraFin=' + evento.HoraFin + '&EstadoRegistro=' + evento.EstadoRegistro
                 })
                .then(putEventoComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para putEvento')(message);
                    // $location.url('/');
                });

            function putEventoComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function deleteEvento(evento, actividad) {
            return $http.delete(serviceBase + '/api/eventos/eventos/' + evento + '/'  + actividad)
                .then(deleteEventoComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para deleteEvento')(message);
                    // $location.url('/');
                });

            function deleteEventoComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function getEventosCount() {
            var count = 0;
            return getEventos()
                .then(getEventosCountComplete)
                .catch(exception.catcher('XHR Failed para getEventosCount'));

            function getEventosCountComplete (data) {
                if (data !== undefined) {
                    count = data.length;
                }
                return $q.when(count);
            }
        }
    }

})();