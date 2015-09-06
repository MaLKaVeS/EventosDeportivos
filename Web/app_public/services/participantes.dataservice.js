'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ParticipantesDataService', ParticipantesDataService);

    ParticipantesDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ParticipantesDataService($http, $q, $timeout, $location) {

        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase + '/api/participantes';

        var service = {
            getParticipantesEvento: getParticipantesEvento,
            getgetParticipantesEncuentro: getgetParticipantesEncuentro,
            getEventosParticipante: getEventosParticipante,
            postInscribirUsuario: postInscribirUsuario,
        }

        return service;

        function getgetParticipantesEncuentro(id) {

            return $http.get(serviceBase + '/encuentro/' + id)
                        .then(getgetParticipantesEncuentroComplete, getgetParticipantesEncuentroFail);

            function getgetParticipantesEncuentroComplete(data) {
                if (data.status === 200) {
                    return data.data;
                }
                else {
                    return [];
                }
            }

            function getgetParticipantesEncuentroFail(error) {
                return error;
            }
        }

        function getParticipantesEvento(id) {

            return $http.get(serviceBase + '/evento/' + id)
                        .then(getParticipantesEventoComplete, getParticipantesEventoFail);

            function getParticipantesEventoComplete(data) {
                if (data.status === 200) {
                    return data.data
                }
                else {
                    return [];
                }
            }

            function getParticipantesEventoFail(error) {
                return error;
            }
        }

        function getEventosParticipante(id) {

            return $http.get(serviceBase + '/eventos/' + id)
                        .then(getParticipantesEventoComplete, getParticipantesEventoFail);

            function getParticipantesEventoComplete(data) {
                if (data.status === 200) {
                    return data.data
                }
                else {
                    return [];
                }
            }

            function getParticipantesEventoFail(error) {
                return error;
            }
        }

        function postInscribirUsuario(usuario_id, evento_id) {
            return $http({
                method: 'POST',
                url: serviceBase + '/inscribir',
                data: 'Usuario_Id=' + usuario_id + '&Evento_Id=' + evento_id
            })
                .then(postInscribirUsuarioComplete, postInscribirUsuarioFail);

            function postInscribirUsuarioComplete(data) {
                if (data.status == 200 || data.status == 201) {
                    return data.data;
                }
            }

            function postInscribirUsuarioFail(err) {
                return err;
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