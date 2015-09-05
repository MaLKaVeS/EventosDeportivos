/// <reference path="../../../_all.js" />

'use strict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".noencontrado";

    angular.module(moduleName)
        .controller('NoEncontradoController', NoEncontradoController);

    NoEncontradoController.$inject = ['LoginDataService'];

    function NoEncontradoController(LoginDataService) {

        /* jshint validthis: true */
        var vm = this;
        
        activate();

        function activate() {
            if (!LoginDataService.getAuthData()) {
                $location.path('/login');
            }
        }
    }

})();