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
                    templateUrl: 'http://localhost:22832/application/app/views/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Acceso',
                    settings: {
                        nav: 4,
                        content: 'Acceso'
                    }
                }
            },
            {
                url: '/panel',
                config: {
                    templateUrl: 'http://localhost:22832/application/app/views/panel.html',
                    controller: 'Panel',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/usuarios',
                config: {
                    templateUrl: 'http://localhost:22832/application/app/views/usuarios.html',
                    controller: 'Usuarios',
                    controllerAs: 'vm',
                    title: 'Eventos Deportivos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/eventos',
                config: {
                    templateUrl: 'http://localhost:22832/application/app/views/eventos.html',
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
                    templateUrl: 'http://localhost:22832/application/app/views/actividades.html',
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
                    templateUrl: 'http://localhost:22832/application/app/views/perfil.html',
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
                    templateUrl: 'http://localhost:22832/application/app/views/ajustes.html',
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