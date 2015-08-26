'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".eventos";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('eventos', {
                url: '/eventos',
                templateUrl: 'app_public/modules/eventos/views/eventos.html',
                data: { title: 'Eventos deportivos - Eventos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/eventos/views/eventos.html'
                    }
                }
            });
    }]);

})();