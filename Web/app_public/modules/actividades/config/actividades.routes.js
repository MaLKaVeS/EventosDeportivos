'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".acercade";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('actividades', {
                url: '/actividades',
                templateUrl: 'app_public/modules/actividades/views/actividades.html',
                data: { title: 'Actividades - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/actividades/views/actividades.html'
                    }
                }
            });
    }]);

})();