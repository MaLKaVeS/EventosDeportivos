'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('EncuentrosDataService', EncuentrosDataService);

    EncuentrosDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function EncuentrosDataService($http, $q, $timeout, $location) {
        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase + '/api/encuentros';

        var service = {
            getEncuentrosEvento: getEncuentrosEvento,
            getEncuentro: getEncuentro,
        }

        return service;

        function getEncuentro(id) {

            return $http.get(serviceBase + '/encuentro/' + id)
                        .then(getEncuentroComplete, getEncuentroFail);

            function getActividadesComplete(data) {
                if (data.status === 200) {
                    return data.data[0];
                }
                else {
                    return {};
                }
            }

            function getActividadesFail(error) {
                return error;
            }
        }

        function getEncuentrosEvento(id) {

            return $http.get(serviceBase + '/evento/' + id)
                        .then(getEncuentrosEventoComplete, getEncuentrosEventoFail);

            function getEncuentrosEventoComplete(data) {
                if (data.status === 200) {
                    return data.data
                }
                else {
                    return {};
                }
            }

            function getEncuentrosEventoFail(error) {
                return error;
            }
        }
    }

})();