'use restrict';

(function () {

    var moduleName = ApplicationConfiguration.applicationModuleName + ".usuarios";

    angular.module(moduleName).config(['$stateProvider',
    function ProvidersRouter($stateProvider) {
        $stateProvider
            .state('usuarios', {
                url: '/usuarios',
                templateUrl: 'admin/modules/usuarios/views/usuarios.html',
                data: { title: 'Usuarios - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/usuarios/views/usuarios.html'
                    },
                    //'viewRoles': {
                    //    templateUrl: 'admin/modules/usuarios/views/roles.html'
                    //},
                    //'editRoles': {
                    //    templateUrl: 'admin/modules/usuarios/views/editRoles.html'
                    //},
                }
            })
            .state('editUsuario', {
                url: '/usuarios/edit/{id}',
                templateUrl: 'admin/modules/usuarios/views/edit.html',
                data: { title: 'Editar Usuario - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/usuarios/views/edit.html'
                    }
                }
            })
            .state('detailsUsuario', {
                url: '/usuarios/details/{id}',
                templateUrl: 'admin/modules/usuarios/views/details.html',
                data: { title: 'Detalle Usuario - Eventos deportivos' },
                views: {
                    '': {
                        templateUrl: 'admin/modules/usuarios/views/details.html'
                    }
                }
            });
    }]);

})();