'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inicio";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('inicio', {
                url: '/inicio',
                templateUrl: 'app_public/modules/inicio/views/inicio.html',
                data: { title: 'Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/inicio/views/inicio.html'
                    },
                    'actividades@inicio': {
                        templateUrl: 'app_public/modules/inicio/views/actividades.html'
                    },
                    'eventos@inicio': {
                        templateUrl: 'app_public/modules/inicio/views/eventos.html'
                    }
                }
            });
    }]);

})();