'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".evento";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('evento', {
                url: '/evento/{id}',
                templateUrl: 'app_public/modules/evento/views/evento.html',
                data: { title: 'Evento - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/evento/views/evento.html'
                    }
                }
            });
    }]);

})();