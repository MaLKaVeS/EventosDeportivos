'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".login";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'admin/modules/login/views/login.html',
                data: { title: 'Acceso - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/login/views/login.html'
                    }
                }
            });
    }]);

})();