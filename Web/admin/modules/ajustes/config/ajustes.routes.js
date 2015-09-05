'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".ajustes";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('ajustes', {
                url: '/ajustes',
                templateUrl: 'admin/modules/ajustes/views/ajustes.html',
                data: { title: 'Ajustes - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/ajustes/views/ajustes.html'
                    }
                }
            });
    }]);

})();