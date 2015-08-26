'use strict';

var ApplicationConfiguration = (function () {

    var applicationModuleName = 'eventos';
    var applicationCoreModuleName = 'eventos.core';
    var applicationModuleVendorDependencies = ['ui.router','ui.bootstrap'];

    var registerModule = function (moduleName) {
        angular.module(moduleName, []);
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationCoreModuleName: applicationCoreModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };    

})();