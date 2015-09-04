'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ActividadesDataService', ActividadesDataService);

    ActividadesDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ActividadesDataService($http, $q, $timeout, $location) {
        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase + '/api/actividades/actividades';

        var service = {
            getActividades: getActividades,
            getActividad: getActividad,
        }

        return service;

        function getActividades() {

            return $http.get(serviceBase).then(getActividadesComplete, getActividadesFail);

            function getActividadesComplete(data) {
                if (data.status === 200) {
                    return data.data;
                }
                else {
                    return data.data;
                }
            }

            function getActividadesFail(error) {
                return error;
            }
        }

        function getActividad(id) {

            return $http.get(serviceBase + '/' + id)
                        .then(getActividadesComplete, getActividadesFail);

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
    }

})();