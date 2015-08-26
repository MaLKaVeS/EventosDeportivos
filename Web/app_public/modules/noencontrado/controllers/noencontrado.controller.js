/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".noencontrado";

    angular.module(moduleName)
        .controller('NoEncontradoController', NoEncontradoController);

    NoEncontradoController.$inject = [];

    function NoEncontradoController() {

        /* jshint validthis: true */
        var vm = this;
        
        activate();

        function activate() {

        }
    }

})();