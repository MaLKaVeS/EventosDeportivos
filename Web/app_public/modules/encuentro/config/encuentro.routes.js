'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".encuentro";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('encuentro', {
                url: '/encuentro/{id}',
                templateUrl: 'app_public/modules/encuentro/views/encuentro.html',
                data: { title: 'Encuentro - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/encuentro/views/encuentro.html'
                    }
                }
            });
    }]);

})();