'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".noencontrado";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('no-encontrado', {
                url: '/no-encontrado',
                templateUrl: 'app_public/modules/noencontrado/views/noencontrado.html',
                data: { title: 'Eventos deportivos - No Encontrado' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/noencontrado/views/noencontrado.html'
                    }
                }
            });
    }]);

})();