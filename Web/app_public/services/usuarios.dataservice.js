'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('UsuariosDataService', UsuariosDataService);

    UsuariosDataService.$inject = ['$http', '$q', '$timeout', '$location', 'FechaDataService'];

    function UsuariosDataService($http, $q, $timeout, $location, FechaDataService) {
        var serviceBase = window.location.protocol + '//' + window.location.host +
            ((window.location.hostname === 'localhost') ? '/index.php' : '/pardo/index.php');

        var service = {
            getValidacionEmail: getValidacionEmail,
            postUsuario: postUsuario
        }

        return service;

        function getValidacionEmail() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(serviceBase + '/api/usuarios/usuarios')
                .then(getValidacionEmailComplete, getValidacionEmailFail);

            return promise;

            function getValidacionEmailComplete(data) {
                if (data.status === 200) {
                    defered.resolve(data.data);
                }
                else {
                    defered.reject(data.data);
                }
            }

            function getValidacionEmailFail(err) {
                defered.reject(err);
            }
        }

        function postUsuario(usuario) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                url: serviceBase + '/api/actividades/actividades',
                method: 'POST',
                data: 'Nombre=' + encodeURIComponent(usuario.Nombre) + '&Apellidos=' + encodeURIComponent(usuario.Apellidos) +
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + FechaDataService.fechaToInt(usuario.FechaNacimiento)
            })
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