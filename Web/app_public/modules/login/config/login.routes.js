﻿'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".login";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('acceso', {
                url: '/acceso',
                templateUrl: 'app_public/modules/login/views/login.html',
                data: { title: 'Eventos deportivos - Acceso' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/login/views/login.html'
                    }
                }
            });
    }]);

})();