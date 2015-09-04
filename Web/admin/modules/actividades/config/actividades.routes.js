'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".actividades";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('actividades', {
                url: '/actividades',
                templateUrl: 'admin/modules/actividades/views/actividades.html',
                data: { title: 'Actividades - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/actividades/views/actividades.html'
                    }
                }
            })
            .state('editActividad', {
                url: '/actividades/edit/{id}',
                templateUrl: 'admin/modules/actividades/views/edit.html',
                data: { title: 'Editar Actividad - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/actividades/views/edit.html'
                    }
                }
            });
    }]);

})();