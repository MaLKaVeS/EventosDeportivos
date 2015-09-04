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
            postUsuario: postUsuario,
            getRoles: getRoles,
            getUsuarios: getUsuarios,
            getUsuariosCount: getUsuariosCount,
            getParticipantes: getParticipantes,
            getParticipantesCount: getParticipantesCount,
            getUsuario : getUsuario,
            postUsuario : postUsuario,
            putUsuario : putUsuario,
            deleteUsuarios : deleteUsuarios,
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

        function getUsuarios() {
            return $http.get(serviceBase + '/api/usuarios/usuarios')
                .then(getUsuariosComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getUsuarios')(message);
                });

            function getUsuariosComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getUsuariosCount() {
            var count = 0;
            return getUsuarios()
                .then(getUsuariosComplete)
                .catch(exception.catcher('XHR Failed para getUsuariosCount'));

            function getUsuariosComplete (data) {
                if (data !== undefined) { 
                    count = data.length;
                }
                return $q.when(count);
            }
        }
        
        function getUsuario(usuario) {
            return $http.get(serviceBase + '/api/usuarios/usuarios/' + usuario)
                .then(getUsuarioComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getUsuario')(message);
                });

            function getUsuarioComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function postUsuario(usuario) {
            return $http({
                method: 'POST', 
                url: serviceBase + '/api/usuarios/usuarios?XDEBUG_SESSION_START=CB3FFBE9',
                data: 'Nombre=' + encodeURIComponent(usuario.Nombre) + '&Apellidos=' + encodeURIComponent(usuario.Apellidos) +
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + fechaToInt(usuario.FechaNacimiento)         
                })
                .then(postUsuarioComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para postUsuario')(message);
                });

            function postUsuarioComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function putUsuario(usuario) {
            return $http({
                method: 'PUT', 
                url: serviceBase + '/api/usuarios/usuarios',
                data: 'Id=' + usuario.Id + '&Nombre=' + encodeURIComponent(usuario.Nombre) + '&Apellidos=' + encodeURIComponent(usuario.Apellidos) +
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + fechaToInt(usuario.FechaNacimiento)
                })
                .then(putUsuarioComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para putUsuario')(message);
                });

            function putUsuarioComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function deleteUsuarios(usuario) {
            return $http.delete(serviceBase + '/api/usuarios/usuarios/' + usuario)
                .then(deleteUsuariosComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para deleteUsuarios')(message);
                    // $location.url('/');
                });

            function deleteUsuariosComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function getRoles() {
            return $http.get(serviceBase + '/api/roles/roles')
                .then(getRolesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getRoles')(message);
                });

            function getRolesComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getParticipantes() {
            return $http.get(serviceBase + '/api/participantes/participantes')
                .then(getParticipantesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getParticipantes')(message);
                });

            function getParticipantesComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getParticipantesCount() {
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