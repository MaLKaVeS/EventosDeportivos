'use strict';

/**
* @desc directiva para la actualizacion del titulo de una pagina, al usar enrutamiento
* @example <head><title update-title/></head>
*/

(function () {

    angular.module(ApplicationConfiguration.applicationCoreModuleName)
           .directive('updateTitle',
	                function ($rootScope) {

	                    return {
	                        link: function (scope, element) {
	                            var listener = function (event, toState, toParams, fromState, fromParams) {
	                                var title = 'Panel de administración';
	                                if (toState.data && toState.data.title) {
	                                    title = toState.data.title;
	                                }
	                                element.text(title);
	                            };

	                            $rootScope.$on('$stateChangeStart', listener);
	                        }
	                    };
	                }
            );

})();