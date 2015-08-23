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
                    templateUrl: 'app_admin/views/login.html',
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
                    templateUrl: 'app_admin/views/panel.html',
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
                    templateUrl: 'app_admin/views/usuarios.html',
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
                    templateUrl: 'app_admin/views/eventos.html',
                    controller: 'Eventos',
                    controllerAs: 'vm',
                    title: 'Eventos | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/actividades',
                config: {
                    templateUrl: 'app_admin/views/actividades.html',
                    controller: 'Actividades',
                    controllerAs: 'vm',
                    title: 'Actividades | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/perfil',
                config: {
                    templateUrl: 'app_admin/views/perfil.html',
                    controller: 'Perfil',
                    controllerAs: 'vm',
                    title: 'Perfil | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/ajustes',
                config: {
                    templateUrl: 'app_admin/views/ajustes.html',
                    controller: 'Ajustes',
                    controllerAs: 'vm',
                    title: 'Ajustes | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            },
            {
                url: '/inscripciones',
                config: {
                    templateUrl: 'app_admin/views/inscripciones.html',
                    controller: 'Inscripciones',
                    controllerAs: 'vm',
                    title: 'Inscripciones | Panel de administracion',
                    settings: {
                        nav: 4,
                        content: 'Panel de Administracion'
                    }
                }
            }
        ];
    }
})();