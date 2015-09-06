'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .factory('EventosDataService', EventosDataService);

    EventosDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function EventosDataService($http, $q, $timeout, $location) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;

        var utils = ApplicationConfiguration.applicationHelperFunctions;

        var service = {
            getUltimosEventos: getUltimosEventos,
            getEventoById: getEventoById,
            getEventosFiltrados: getEventosFiltrados,
            getEventos: getEventos,
            getEventosCount: getEventosCount,
            postEvento: postEvento,
            putEvento: putEvento,
            putEstado: putEstado,
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
                if (data.status === 200) {
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

        function getEventoById(id) {
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
                .then(getEventosComplete);

            function getEventosComplete(data) {
                return data.data;
            }
        }

        function postEvento(evento) {
            return $http({
                method: 'POST',
                url: serviceBase + '/api/eventos/eventos',
                data: 'Nombre=' + evento.Nombre + '&Descripcion=' + evento.Descripcion +
                '&Actividad_Id=' + evento.Actividad_Id + '&FechaInicio=' + utils.FechaHelper.fechaToInt(evento.FechaInicio) +
                '&HoraInicio=' + evento.HoraInicio + '&FechaFin=' + utils.FechaHelper.fechaToInt(evento.FechaFin) +
                '&HoraFin=' + evento.HoraFin + '&EstadoRegistro=' + evento.EstadoRegistro
            })
                .then(postEventoComplete);

            function postEventoComplete(data) {
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
                .then(putEventoComplete);

            function putEventoComplete(data, status, headers, config) {
                return data;
            }
        }

        function putEstado(evento, estado) {
            return $http({
                method: 'PUT',
                url: serviceBase + '/api/eventos/estado/' + evento.Actividad_Id +  '/' + evento.Id + '/' + estado
            })
                .then(putEstadoComplete, putEstadoFail);

            function putEstadoComplete(data) {
                return data.data;
            }

            function putEstadoFail(err) {
                return err;
            }
        }

        function deleteEvento(evento, actividad) {
            return $http.delete(serviceBase + '/api/eventos/eventos/' + evento + '/' + actividad)
                .then(deleteEventoComplete);

            function deleteEventoComplete(data, status, headers, config) {
                return data;
            }
        }

        function getEventosCount() {
            var count = 0;
            return getEventos()
                .then(getEventosCountComplete);

            function getEventosCountComplete(data) {
                if (data !== undefined) {
                    count = data.length;
                }
                return $q.when(count);
            }
        }

        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $http.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }

})();