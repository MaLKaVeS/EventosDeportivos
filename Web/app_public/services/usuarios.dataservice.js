/// <reference path="../_all.js" />
'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('UsuariosDataService', UsuariosDataService);

    UsuariosDataService.$inject = ['$http', '$q', '$timeout', '$location',  'localStorageService'];

    function UsuariosDataService($http, $q, $timeout, $location, localStorageService) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;
        
        var helperFecha = ApplicationConfiguration.applicationHelperFunctions.FechaHelper;

        var authentication = {
            isAuth: false,
            userName: ''
        };

        var service = {
            doLogin: doLogin,            
            getAuthData: getAuthData,
            LogOut: LogOut,
            getValidacionEmail: getValidacionEmail,
            postUsuario: postUsuario,
            hayRegistro: hayRegistro,
            getUsuario: getUsuario
        }

        return service;

        function getValidacionEmail() {

            return $http.get(serviceBase + '/api/usuarios/usuarios')
                        .then(getValidacionEmailComplete, getValidacionEmailFail);

            function getValidacionEmailComplete(data) {
                if (data.status === 200) {
                    return data.data;
                }
                else {
                    return data.data;
                }
            }

            function getValidacionEmailFail(err) {
                return err;
            }
        }

        function getUsuario(userName) {
            return $http({
                method: 'GET',
                url: serviceBase + '/api/usuarios/datos/' + encodeURIComponent(userName), 
                    })
                        .then(getUsuarioComplete, getUsuarioFail);

            function getUsuarioComplete(data) {
                if (data.status === 200) {
                    return data.data;
                }
                else {
                    return data.data;
                }
            }

            function getUsuarioFail(err) {
                return err;
            }
        }

        function postUsuario(usuario) {

            return $http({
                url: serviceBase + '/api/usuarios/usuarios',
                method: 'POST',
                data: 'Nombre=' + encodeURIComponent(usuario.Nombre) + '&Apellidos=' + encodeURIComponent(usuario.Apellidos) +
                '&Email=' + encodeURIComponent(usuario.Email) + '&FechaNacimiento=' + helperFecha.fechaToInt(usuario.FechaNacimiento.toLocaleDateString()) +
                '&Clave=' + encodeURIComponent(usuario.Clave)

            })
            .then(getActividadesComplete, getActividadesFail);


            function getActividadesComplete(data) {
                if (data.status === 200 || data.status == 201) {
                    localStorageService.set('authorizationData', {
                        userName: data
                    });

                    return data.data;
                }
                else {
                    return data;
                }
            }

            function getActividadesFail(err) {
                return err;
            }
        }

        function hayRegistro() {
            var hay = null;

            try {
                hay = localStorageService.get('authorizationData');
            } catch (e) {
                hay = false;
            }

            return hay;
        }

        function doLogin(datosLogin) {
            return $http({
                method: 'POST',
                url: serviceBase + '/api/usuarios/acceso',
                data: 'Usuario=' + datosLogin.usuario + '&Clave=' + datosLogin.clave
            })
                .then(postAccesoComplete, postAccesoFail);

            function postAccesoComplete(data) {
                if (data.status == 200) {
                    localStorageService.set('authorizationData', {
                        token: /*response.access_token*/'TokenTemporal',
                        userName: datosLogin.usuario
                    });

                    authentication.isAuth = true;
                    authentication.userName = datosLogin.usuario;

                    return authentication;
                }
            }

            function postAccesoFail(err) {
                LogOut();
                return authentication;
            }
        }

        function getAuthData() {
            var authData = null;

            try {
                authData = localStorageService.get('authorizationData');
            } catch (e) {
                authData = false;
            }

            if (authData) {
                if (authData.token != '' || authData.token != undefined) {
                    authentication.isAuth = true;
                    authentication.userName = authData.userName;
                }
            }
            return authData;
        }

        function LogOut() {
            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.userName = '';
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