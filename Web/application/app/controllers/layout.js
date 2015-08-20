(function () {
    'use strict';

    angular
        .module('eventos.layout', [])
        .controller('Shell', ['$timeout', 'config', 'logger', Shell]);

    /* @ngInject */
    function Shell($timeout, config, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = config.appTitle;
        vm.mostrarCargando = true;

        activate();

        function activate() {
            // logger.success(config.appTitle + ' cargado!', null);
            //            Using a resolver on all routes or dataservice.ready in every controller
            //            dataservice.ready().then(function(){
            //                hideSplash();
            //            });
            // hideSplash();
            vm.mostrarCargando = false;
        }

        // function hideSplash() {
        //     $timeout(function () {
        //         //Force a 1 second delay so we can see the splash.            
        //         vm.mostrarCargando = false;
        //     }, 5000);
        // }
    }
})();