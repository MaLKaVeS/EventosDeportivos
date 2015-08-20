(function() {
    'use strict';

    angular
        .module('eventos.core')
        .factory('dataservice', ['$http', '$location', '$timeout', '$q', 'localStorageService', 'exception', 'logger', dataservice]);

    /* @ngInject */
    function dataservice($http, $location, $timeout, $q, localStorageService, exception, logger) {
        // Use x-www-form-urlencoded Content-Type
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        
        var isPrimed = false;
        var primePromise;
        
        var serviceBase = 'http://localhost:22832/index.php';

        var _authentication = {
            isAuth: false,
            userName: ""
        };

        var service = {
            getLogin: getLogin,
            getAuthData: getAuthData,
            getActividades: getActividades,
            postActividades: postActividades,
            putActividades: putActividades,
            deleteActividades : deleteActividades,
            getActividadesCount: getActividadesCount,
            getEventos: getEventos,
            getEventosCount: getEventosCount,
            getRoles: getRoles,
            getUsuarios: getUsuarios,
            getUsuariosCount: getUsuariosCount,
            getParticipantes: getParticipantes,
            getParticipantesCount: getParticipantesCount,
            getUsuario : getUsuario,
            postUsuario : postUsuario,
            putUsuario : putUsuario,
            LogOut : LogOut,
            ready: ready
        };

        return service;

        function getActividades() {
            return $http.get(serviceBase + '/api/actividades/actividades')
                .then(getActividadesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getActividades')(message);
                    $location.url('/');
                });

            function getActividadesComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function postActividades(actividad) {            
            return $http({
                method: 'POST', 
                url: serviceBase + '/api/actividades/actividades?XDEBUG_SESSION_START=CB3FFBE9',
                data: 'Nombre=' + actividad.Nombre + '&Descripcion=' + actividad.Descripcion,
                
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
                data: 'Id=' + actividad.Id + '&Nombre=' + actividad.Nombre + '&Descripcion=' + actividad.Descripcion, })
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
                count = data.length;
                return $q.when(count);
            }
        }
        
        function getEventos() {
            return $http.get(serviceBase + '/api/eventos/eventos')
                .then(getEventosComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getEventos')(message);
                    $location.url('/');
                });

            function getEventosComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getRoles() {
            return $http.get(serviceBase + '/api/roles/roles')
                .then(getRolesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getRoles')(message);
                    $location.url('/');
                });

            function getRolesComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getEventosCount() {
            var count = 0;
            return getEventos()
                .then(getEventosCountComplete)
                .catch(exception.catcher('XHR Failed para getEventosCount'));

            function getEventosCountComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }
        
        function getUsuarios() {
            return $http.get(serviceBase + '/api/usuarios/usuarios')
                .then(getAvengersComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getUsuarios')(message);
                    $location.url('/');
                });

            function getAvengersComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function getUsuariosCount() {
            var count = 0;
            return getActividades()
                .then(getActividadesComplete)
                .catch(exception.catcher('XHR Failed para getActividadesCount'));

            function getActividadesComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }
        
        function getUsuario(usuario) {
            return $http.get(serviceBase + '/api/usuarios/usuarios/' + usuario)
                .then(getUsuarioComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getUsuario')(message);
                    $location.url('/');
                });

            function getUsuarioComplete(data, status, headers, config) {
                return data.data;
            }
        }
        
        function postUsuario(usuario) {
            return $http.post(serviceBase + '/api/usuarios/usuarios', usuario)
                .then(postUsuarioComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para postUsuario')(message);
                    $location.url('/');
                });

            function postUsuarioComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function putUsuario(usuario) {
            return $http.put(serviceBase + '/api/usuarios/usuarios', usuario)
                .then(putUsuarioComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para putUsuario')(message);
                    $location.url('/');
                });

            function putUsuarioComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function getParticipantes() {
            return $http.get(serviceBase + '/api/participantes/participantes')
                .then(getParticipantesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getParticipantes')(message);
                    $location.url('/');
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
                count = data.length;
                return $q.when(count);
            }
        }
        
        function getLogin(loginData) {
//             var data = "grant_type=password&username=" + loginData.usuario + "&password=" + loginData.clave;
// 
            var deferred = $q.defer();
// 
//             $http
//                 .post(serviceBase + '/login', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
//                 .success(function (response) {
// 
                $timeout(function() {
                    localStorageService.set('authorizationData', { token: /*response.access_token*/'TokenTemporal', 
                        userName: loginData.usuario });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.usuario;

                    deferred.resolve(_authentication);
        }, 1000);
//                 })
//                 .error(function (err, status) {
//                     LogOut();
//                     deferred.reject(err);
//                 });

            return deferred.promise;
        }

        function getAuthData() {

            var authData = null;

            try {
                authData = localStorageService.get('authorizationData');
            } catch (e) {
                authData = false;
            }

            if (authData) {
                if (authData.token != "" || authData.token != undefined) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                }
            }
            return authData;
        }
        
        function LogOut() {
            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Datos iniciales');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }
    
    
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        
            for(name in obj) {
            value = obj[name];
        
            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        
            return query.length ? query.substr(0, query.length - 1) : query;
        };
    
        // Override $http service's default transformRequest
        $http.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }
})();
