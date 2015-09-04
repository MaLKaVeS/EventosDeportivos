'use strict';

var ApplicationConfiguration = (function () {

    var applicationModuleName = 'eventos';
    var applicationCoreModuleName = 'eventos.core';
    var applicationModuleVendorDependencies = ['ui.router','ui.bootstrap'];
    var applicationHelperFunctions = {};
    var applicationUrlServiceBase = window.location.protocol + '//' + window.location.host +
            ((window.location.hostname === 'localhost') ? '/index.php' : '/pardo/index.php');
    
    var registerModule = function (moduleName) {
        angular.module(moduleName, []);
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationCoreModuleName: applicationCoreModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        applicationHelperFunctions: applicationHelperFunctions,
        applicationUrlServiceBase: applicationUrlServiceBase,
        registerModule: registerModule
    };    

})();