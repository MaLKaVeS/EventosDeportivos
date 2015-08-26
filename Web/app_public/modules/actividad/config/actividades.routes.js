'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".actividades";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('actividades', {
                url: '/actividades',
                templateUrl: 'app_public/modules/actividades/views/actividades.html',
                data: { title: 'Eventos deportivos - Actividades' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/actividades/views/actividades.html'
                    }
                }
            });
    }]);

})();