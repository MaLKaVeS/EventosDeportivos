'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('LoginDataService', LoginDataService);

    LoginDataService.$inject = ['$http', '$q', '$timeout', '$location', 'localStorageService'];

    function LoginDataService($http, $q, $timeout, $location, localStorageService) {

        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;

        var authentication = {
            isAuth: false,
            userName: ''
        };

        var service = {
            getLogin: getLogin,
            getAuthData: getAuthData,
            LogOut : LogOut,
        }

        return service;

        function getLogin(loginData) {

            return $http({
                method: 'POST', 
                url: serviceBase + '/api/usuarios/acceso?XDEBUG_SESSION_START=CB3FFBE9',
                data: 'Usuario=' + loginData.usuario + '&Clave=' + loginData.clave         
                })
                .then(postAccesoComplete, postAccesoFail);
            
            function postAccesoComplete(data) {
                if (data.status == 200) {
                    localStorageService.set('authorizationData', {
                        token: /*response.access_token*/'TokenTemporal',
                        userName: loginData.usuario
                    });

                    authentication.isAuth = true;
                    authentication.userName = loginData.usuario;

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