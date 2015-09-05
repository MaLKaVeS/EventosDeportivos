'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".eventos";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('eventos', {
                url: '/eventos',
                templateUrl: 'admin/modules/eventos/views/eventos.html',
                data: { title: 'Eventos - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/eventos/views/eventos.html'
                    }
                }
            });
    }]);

})();