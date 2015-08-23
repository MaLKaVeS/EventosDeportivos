(function() {
    'use strict';

    angular
        .module('eventos.core')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app_web/views/main.html',
                    controller: 'Main',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos',
                    settings: {
                        nav: 4,
                        content: 'Principal'
                    }
                }
            },
            {
                url: '/eventos',
                config: {
                    templateUrl: 'app_web/views/eventos.html',
                    controller: 'Eventos',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/actividades',
                config: {
                    templateUrl: 'app_web/views/actividades.html',
                    controller: 'Actividades',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/perfil',
                config: {
                    templateUrl: 'app_web/views/perfil.html',
                    controller: 'Perfil',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/ajustes',
                config: {
                    templateUrl: 'app_web/views/ajustes.html',
                    controller: 'Ajustes',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            }
        ];
    }
})();