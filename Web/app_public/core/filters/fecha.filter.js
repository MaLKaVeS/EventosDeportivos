(function () {
    'use strict';
    angular
        .module('eventos.core')
        .filter('fecha', function () {
            return function (fecha) {
                return AplicaFormatoFecha(fecha);
            }
        })
        .filter('hora', function () {
            return function (hora) {
                return AplicaFormatoHora(hora);
            }
        });

    function AplicaFormatoFecha(fecha) {
        if (fecha) {
            var _fecha = fecha.toString();
            return _fecha.substr(6, 2) + "/" + _fecha.substr(4, 2) + "/" + _fecha.substr(0, 4);
        }
        else {
            return fecha;
        }
    }

    function AplicaFormatoHora(hora) {
        if (hora) {
            var _hora = hora.toString();
            if (_hora.length == 5) { _hora = "0" + _hora; }
            return _hora.substr(0, 2) + ":" + _hora.substr(2, 2) + ":" + _hora.substr(4, 2);
        }
        else {
            return hora;
        }
    }

})();