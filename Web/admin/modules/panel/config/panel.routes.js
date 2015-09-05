'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".login";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('panel', {
                url: '/panel',
                templateUrl: 'admin/modules/panel/views/panel.html',
                data: { title: 'Panel de Administración - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/panel/views/panel.html'
                    }
                }
            });
    }]);

})();