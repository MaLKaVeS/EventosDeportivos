'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ActividadesDataService', ActividadesDataService);

    ActividadesDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ActividadesDataService($http, $q, $timeout, $location) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;

        var utils = ApplicationConfiguration.applicationHelperFunctions;

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
                .then(postActividadesComplete);

            function postActividadesComplete(data) {
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
                .then(putActividadesComplete);

            function putActividadesComplete(data) {
                return data;
            }
        }
        
        function deleteActividades(actividad) {
            return $http.delete(serviceBase + '/api/actividades/actividades/' + actividad)
                .then(deleteActividadesComplete);

            function deleteActividadesComplete(data) {
                return data;
            }
        }

        function getActividadesCount() {
            var count = 0;
            return getActividades()
                .then(getActividadesComplete);

            function getActividadesComplete (data) {
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