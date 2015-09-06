'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".registro";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('registro', {
                url: '/registro',
                templateUrl: 'app_public/modules/registro/views/registro.html',
                data: { title: 'Registro - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/registro/views/registro.html'
                    }
                }
            })
            .state('completado', {
                url: '/completado',
                templateUrl: 'app_public/modules/registro/views/completado.html',
                data: { title: 'Registro completado - Eventos deportivos' }
            });
    }]);

})();