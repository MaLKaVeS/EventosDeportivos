(function() {
    'use strict';

    angular.module('eventos.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        // 'ngplus'
        'LocalStorageModule', 'ui.bootstrap'
    ]);
})();
