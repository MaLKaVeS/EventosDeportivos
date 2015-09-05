'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".inscripciones";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('inscripciones', {
                url: '/inscripciones',
                templateUrl: 'admin/modules/inscripciones/views/inscripciones.html',
                data: { title: 'Inscripciones - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/inscripciones/views/inscripciones.html'
                    }
                }
            });
    }]);

})();