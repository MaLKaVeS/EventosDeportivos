/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".eventos";

    angular.module(moduleName)
        .controller('EventosController', EventosController);

    EventosController.$inject = [];

    function EventosController() {

        /* jshint validthis: true */
        var vm = this;
        
        activate();

        function activate() {

        }
    }

})();