'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".perfil";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('perfil', {
                url: '/perfil',
                templateUrl: 'app_public/modules/perfil/views/perfil.html',
                data: { title: 'Perfil de Usuario - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/perfil/views/perfil.html'
                    }
                }
            });
    }]);

})();