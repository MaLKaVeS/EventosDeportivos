﻿'use strict';

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
        .factory('ContactoDataService', ContactoDataService);

    ContactoDataService.$inject = ['$http', '$q', '$timeout', '$location'];

    function ContactoDataService($http, $q, $timeout, $location) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var serviceBase = ApplicationConfiguration.applicationUrlServiceBase;

        var service = {
            postMensaje: postMensaje
        }

        return service;

        function postMensaje(mensaje) {

            return $http({
                method: 'POST',
                url: serviceBase + '/api/mensajes/mensajes',
                data: 'EmailContacto=' + mensaje.Email + '&Asunto=' + mensaje.Asunto + '&TextoMensaje=' + mensaje.Texto
                    + '&Nombre=' + mensaje.Nombre + '&Apellidos=' + mensaje.Apellidos
            })
                    .then(postMensajeComplete, postMensajeFail);

            function postMensajeComplete(data) {
                if (data.status == 200 || data.status == 201) {
                    return data.data;
                }
                else {
                    return [];
                }
            }

            function postMensajeFail(err) {
                return err;
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