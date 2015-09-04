'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .factory('EventosDataService', EventosDataService);

    EventosDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function EventosDataService($http, $q, $timeout, $location) {
        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase + '/api/eventos';

        var service = {
            getEventos: getUltimosEventos,
            getUltimosEventos: getUltimosEventos,
            getEventoById: getEventoById,
            getEventosFiltrados: getEventosFiltrados,
            getEventosActividad: getEventosActividad,
        }

        return service;

        function getUltimosEventos() {

            return $http.get(serviceBase + '/ultimos')
                        .then(getUltimosEventosComplete, getUltimosEventosFail);

            return promise;

            function getUltimosEventosComplete(data) {
                if (data.status === 200) {
                    return data.data;
                }
                else {
                    return data.data;
                }
            }

            function getUltimosEventosFail() {

            }
        }

        function getEventoById(id) {
            return getUltimosEventos().then(getEventosComplete, getEventosFail);

            function getEventosComplete(data) {
                var result = _.find(data, function (evento) { return evento.Id === id; });
                if (result) {
                    return result;
                }
                else {
                    return {}
                }
            }

            function getEventosFail(error) {
                return error;
            }
        }

        function getEventosFiltrados() {

        }

        function getEventosActividad(idActividad) {

            return $http.get(serviceBase + '/actividad/' + idActividad)
                        .then(getEventosActividadComplete, getEventosActividadFail);
            return promise;

            function getEventosActividadComplete(data) {
                if (data.status === 200) {
                    return data.data;
                }
                else {
                    return data.data;
                }
            }

            function getEventosActividadFail(data) {
                return data.data;
            }
        }
    }

})();