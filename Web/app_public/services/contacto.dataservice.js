'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ContactoDataService', ContactoDataService);

    ContactoDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ContactoDataService($http, $q, $timeout, $location) {
        var serviceBase = window.location.protocol + '//' + window.location.host +
            ((window.location.hostname === 'localhost') ? '/index.php' : '/pardo/index.php');

        var service = {
            postMensaje: postMensaje
        }

        return service;

        function postMensaje(mensaje) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'POST',
                url: serviceBase + '/api/usuarios/usuarios',
                data: mensaje,
            })
            .then(postMensajeComplete, postMensajeFail);

            return promise;

            function postMensajeComplete(data) {
                if (data.status === 200) {
                    defered.resolve(data.data);
                }
                else {
                    defered.reject(data.data);
                }
            }

            function postMensajeFail(err) {
                defered.reject(err);
            }
        }
    }

})();