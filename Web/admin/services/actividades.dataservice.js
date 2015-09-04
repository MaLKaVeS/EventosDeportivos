'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ActividadesDataService', ActividadesDataService);

    ActividadesDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ActividadesDataService($http, $q, $timeout, $location) {
        var serviceBase = window.location.protocol + '//' + window.location.host +
            ((window.location.hostname === 'localhost') ? '/index.php' : '/pardo/index.php');

        var service = {
            getActividades: getActividades,
            postActividades: postActividades,
            putActividades: putActividades,
            deleteActividades : deleteActividades,
            getActividadesCount: getActividadesCount,            
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

        function postActividades(actividad) {            
            return $http({
                method: 'POST', 
                url: serviceBase + '/api/actividades/actividades',
                data: 'Nombre=' + encodeURIComponent(actividad.Nombre) 
                + '&Descripcion=' + encodeURIComponent(actividad.Descripcion)                
                })
                .then(postActividadesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para postActividades')(message);
                    // $location.url('/');
                });

            function postActividadesComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function putActividades(actividad) {
            return $http({
                method: 'PUT', 
                url: serviceBase + '/api/actividades/actividades',
                data: 'Id=' + actividad.Id + '&Nombre=' + encodeURIComponent(actividad.Nombre)
                 + '&Descripcion=' + encodeURIComponent(actividad.Descripcion)
                 })
                .then(putActividadesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para putActividades')(message);
                    // $location.url('/');
                });

            function putActividadesComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function deleteActividades(actividad) {
            return $http.delete(serviceBase + '/api/actividades/actividades/' + actividad)
                .then(deleteActividadesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para deleteActividades')(message);
                    // $location.url('/');
                });

            function deleteActividadesComplete(data, status, headers, config) {
                return data;
            }
        }

        function getActividadesCount() {
            var count = 0;
            return getActividades()
                .then(getActividadesComplete)
                .catch(exception.catcher('XHR Failed para getActividadesCount'));

            function getActividadesComplete (data) {
                if (data !== undefined) { 
                   count = data.length;
                }
                return $q.when(count);
            }
        }
    }

})();