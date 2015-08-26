'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".contacto";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('contacto', {
                url: '/contacto',
                templateUrl: 'app_public/modules/contacto/views/contacto.html',
                data: { title: 'Eventos deportivos - Contacto' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/contacto/views/contacto.html'
                    }
                    // ,
                    // 'actividades@inicio': {
                    //     templateUrl: 'app_public/modules/inicio/views/actividades.html'
                    // },
                    // 'eventos@inicio': {
                    //     templateUrl: 'app_public/modules/inicio/views/eventos.html'
                    // }
                }
            });
    }]);

})();