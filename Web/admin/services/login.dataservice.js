'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('LoginDataService', LoginDataService);

    LoginDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function LoginDataService($http, $q, $timeout, $location) {
        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;

        var _authentication = {
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
            // var deferred = $q.defer();

            return $http({
                method: 'POST', 
                url: serviceBase + '/api/usuarios/acceso?XDEBUG_SESSION_START=CB3FFBE9',
                data: 'Usuario=' + loginData.usuario + '&Clave=' + loginData.clave         
                })
                .then(postAccesoComplete, postAccesoFail)
                .catch(function(message) {
                    exception.catcher('XHR Failed para getLogin')(message);
                });
                

            // return deferred.promise;
            
            function postAccesoComplete(response) {
                // $timeout(function() {
                    localStorageService.set('authorizationData', { token: /*response.access_token*/'TokenTemporal', 
                        userName: loginData.usuario });

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.usuario;

                    return _authentication;
                    // deferred.resolve(_authentication);
        // }, 1000);
            }
            
            function postAccesoFail(err) {
                LogOut();
                throw 'Login incorrecto';
                // deferred.reject(err);
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
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                }
            }
            return authData;
        }
        
        function LogOut() {
            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = '';
            
            $location.url('/');            
        }
    }
})();