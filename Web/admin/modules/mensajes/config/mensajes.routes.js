'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".mensajes";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('mensajes', {
                url: '/mensajes',
                templateUrl: 'admin/modules/mensajes/views/mensajes.html',
                data: { title: 'Mensajes - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/mensajes/views/mensajes.html'
                    }
                }
            });
    }]);

})();