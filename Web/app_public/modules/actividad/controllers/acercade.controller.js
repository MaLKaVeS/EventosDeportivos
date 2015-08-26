/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".acercade";

    angular.module(moduleName)
        .controller('AcercaDeController', AcercaDeController);

    AcercaDeController.$inject = [];

    function AcercaDeController() {

        /* jshint validthis: true */
        var vm = this;
        
        activate();

        function activate() {

        }
    }

})();