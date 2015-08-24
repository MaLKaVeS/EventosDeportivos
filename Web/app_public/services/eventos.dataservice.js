'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .factory('EventosDataService', EventosDataService);

    EventosDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function EventosDataService($http, $q, $timeout, $location) {
        var serviceBase = window.location.protocol + '//' + window.location.host + '/index.php';
        
        var service = {
            getUltimosEventos: getUltimosEventos,
            getEventoById: getEventoById,
            getEventosFiltrados: getEventosFiltrados,
        }

        return service;

        function getUltimosEventos() {
            var defered = $q.defer();
            var promise = defered.promise;
            
            $http.get(serviceBase + '/api/eventos/ultimos')
                .then(getUltimosEventosComplete, getUltimosEventosFail);
                // .catch(function(message) {
                //     exception.catcher('XHR Failed para getActividades')(message);
                //     $location.url('/');
                // });
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
    }

})();