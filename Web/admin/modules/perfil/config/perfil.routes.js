'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".perfil";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('perfil', {
                url: '/perfil',
                templateUrl: 'admin/modules/perfil/views/perfil.html',
                data: { title: 'Perfil - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/perfil/views/perfil.html'
                    }
                }
            });
    }]);

})();