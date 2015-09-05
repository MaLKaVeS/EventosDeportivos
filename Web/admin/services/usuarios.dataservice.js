'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('UsuariosDataService', UsuariosDataService);

    UsuariosDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function UsuariosDataService($http, $q, $timeout, $location) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;

        var utils = ApplicationConfiguration.applicationHelperFunctions;

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
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + utils.FechaHelper.fechaToInt(usuario.FechaNacimiento)
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
                .then(getUsuariosComplete);

            function getUsuariosComplete(data) {
                return data.data;
            }
        }
        
        function getUsuariosCount() {
            var count = 0;
            return getUsuarios()
                .then(getUsuariosComplete);

            function getUsuariosComplete (data) {
                if (data !== undefined) { 
                    count = data.length;
                }
                return $q.when(count);
            }
        }
        
        function getUsuario(usuario) {
            return $http.get(serviceBase + '/api/usuarios/usuarios/' + usuario)
                .then(getUsuarioComplete);

            function getUsuarioComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function postUsuario(usuario) {
            return $http({
                method: 'POST', 
                url: serviceBase + '/api/usuarios/usuarios?XDEBUG_SESSION_START=CB3FFBE9',
                data: 'Nombre=' + encodeURIComponent(usuario.Nombre) + '&Apellidos=' + encodeURIComponent(usuario.Apellidos) +
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + utils.FechaHelper.fechaToInt(usuario.FechaNacimiento)         
                })
                .then(postUsuarioComplete);

            function postUsuarioComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function putUsuario(usuario) {
            return $http({
                method: 'PUT', 
                url: serviceBase + '/api/usuarios/usuarios',
                data: 'Id=' + usuario.Id + '&Nombre=' + encodeURIComponent(usuario.Nombre) + '&Apellidos=' + encodeURIComponent(usuario.Apellidos) +
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + utils.FechaHelper.fechaToInt(usuario.FechaNacimiento)
                })
                .then(putUsuarioComplete);

            function putUsuarioComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function deleteUsuarios(usuario) {
            return $http.delete(serviceBase + '/api/usuarios/usuarios/' + usuario)
                .then(deleteUsuariosComplete);

            function deleteUsuariosComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function getRoles() {
            return $http.get(serviceBase + '/api/roles/roles')
                .then(getRolesComplete);

            function getRolesComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getParticipantes() {
            return $http.get(serviceBase + '/api/participantes/participantes')
                .then(getParticipantesComplete);

            function getParticipantesComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getParticipantesCount() {
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