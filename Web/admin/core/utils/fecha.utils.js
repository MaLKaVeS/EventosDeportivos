/// <reference path="../../_all.js" />
'use strict';

(function () {

    //     angular.module(ApplicationConfiguration.applicationCoreModuleName)
    //         .factory('FechaDataService', FechaDataService);
    // 
    //     FechaDataService.$inject = ['$q'];
    // 
    //     function FechaDataService($q) {

    var service = {
        fechaToInt: fechaToInt,
    }

    ApplicationConfiguration.applicationHelperFunctions.FechaHelper = service;

    function fechaToInt(fecha) {
        if (isNaN(fecha)) {
            if (fecha != "") {
                fecha = fecha.toString().trim().split('/');
                fecha = padLeft(fecha[2], 4, '0') + padLeft(fecha[1], 2, '0') + padLeft(fecha[0], 2, '0');

                return Number(fecha);

            } else { return 0; }
        } else {
            return fecha;
        }
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function padLeft(cadena, longitud, caracter) {
        if (cadena !== undefined) {
            while (cadena.length < longitud) {
                cadena = caracter + cadena;
            }
        }
        return cadena;
    }
});