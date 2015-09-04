'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".actividad";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('actividad', {
                url: '/actividad/{id}',
                templateUrl: 'app_public/modules/actividad/views/actividad.html',
                data: { title: 'Actividad - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/actividad/views/actividad.html'
                    }
                }
            });
    }]);

})();