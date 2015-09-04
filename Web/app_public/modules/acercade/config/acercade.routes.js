'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".acercade";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('acercade', {
                url: '/acercade',
                templateUrl: 'app_public/modules/acercade/views/acercade.html',
                data: { title: 'Acerca De - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'app_public/modules/acercade/views/acercade.html'
                    }
                }
            });
    }]);

})();