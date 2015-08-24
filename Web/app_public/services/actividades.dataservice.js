'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ActividadesDataService', ActividadesDataService);

    ActividadesDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ActividadesDataService($http, $q, $timeout, $location) {
        var serviceBase = window.location.protocol + '//' + window.location.host + '/index.php';

        var service = {
            getActividades: getActividades
        }

        return service;

        function getActividades() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(serviceBase + '/api/actividades/actividades')
                .then(getActividadesComplete, getActividadesFail);
                
            return promise;

            function getActividadesComplete(data) {
                if (data.status === 200) {
                    defered.resolve(data.data);
                }
                else {
                    defered.reject(data.data);
                }
            }

            function getActividadesFail(err) {
                defered.reject(err);
            }
        }
    }

})();