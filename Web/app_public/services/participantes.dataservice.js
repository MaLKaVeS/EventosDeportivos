'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ParticipantesDataService', ParticipantesDataService);

    ParticipantesDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ParticipantesDataService($http, $q, $timeout, $location) {
        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase + '/api/participantes';

        var service = {
            getParticipantesEvento: getParticipantesEvento,
            getgetParticipantesEncuentro: getgetParticipantesEncuentro,
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
    }

})();