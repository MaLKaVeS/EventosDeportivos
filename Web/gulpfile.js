/// <vs />
// How-To con VISUAL http://www.mikeobrien.net/blog/using-gulp-to-build-and-deploy-dotnet-apps-on-windows/
var
 gulp = require('gulp'),
 watch = require('gulp-watch'), /* Para tareas que mantienen la ejecución */
 assemblyInfo = require('gulp-dotnet-assembly-info'), // Para sobreescribir los datos del AssemblyInfo
 msbuild = require('gulp-msbuild'), // Para compilar 
 mocha = require('gulp-mocha'), // Framework de testing
 xmlpoke = require('xmlpoke'), // Para leer y editar XML
 /* Testing de UI */
 path = require('path'),
 child_process = require('child_process'),
 protractor = require("gulp-protractor").protractor;
// YARGS se usa para pasar argumentos (por si hace falta)
//var args = require('yargs').argv;

// Ejecución por defecto, sin parámetro
gulp.task('default', function () {
    console.log('Tareas disponibles: ');
    console.log('* testui -> Ejecuta los test con protractor [PENDIENTE]');
    console.log('* testmocha -> Ejecuta los test con mocha [PENDIENTE]');
    console.log('* runtest -> Ejecuta los test');
    console.log('* ci -> Ejecuta el proceso de integración continua');
    console.log('* publicadev -> Publica a desarrollo');
    console.log('* publicareal -> Publica a producción');
    console.log('* webconfigdev -> Establece los valores del webconfig del entorno de desarrollo');
    console.log('* webconfigreal -> Establece los valores del webconfig del entorno de producción');
    console.log('* webconfiglocal -> Establece los valores del webconfig del entorno de local');
});

//gulp.task('build', ['configuration'], function () {
//    return gulp
//        .src('../DiezSoftware.DiezEmpleado.sln')
//        .pipe(msbuild({
//            toolsVersion: 12.0,
//            targets: ['Clean', 'Build'],
//            errorOnFail: true,
//            stdout: true
//        }));
//});

// Para ejecutar los tests
gulp.task('runtest', /*['tasks'],*/ function (callback) {
    console.log('Comenzando pruebas.');

    var dominio = 'http://demo.10empleadotest.com/';

    return gulp.src(["tests/protactor.js"])
    .pipe(protractor({
        configFile: "tests/protractor.config.js",
        args: ['--baseUrl', dominio]
    }))
    .on('error', function (e) {
        //console.log(e);
        throw e;
    });
});

gulp.task('testui', /*['tasks'],*/ function (callback) {
    console.log('Comenzando pruebas de interfaz.');

    var dominio = 'http://demo.10empleadotest.com/';

    return gulp.src(["tests/protactor.js"])
    .pipe(protractor({
        configFile: "tests/protractor.config.js",
        args: ['--baseUrl', dominio]
    }))
    .on('error', function (e) {
        //console.log(e);
        throw e;
    });

    callback();
});

gulp.task('testmocha', /*['tasks'],*/ function (callback) {
    console.log('Comenzando pruebas de servicios.');
    /* MOCHA */
    //return gulp.src('tests/testDev.js', { read: false })
    //    .pipe(mocha({ reporter: 'spec' }));
    callback();
});

// Cambia el webconfig para publicar en LOCAl
gulp.task('webconfiglocal', function (callback) {
    xmlpoke('web.config', function (xml) {
        console.log('Poniendo valores de DEV en el webconfig');
        xml.withBasePath('configuration')
           .set("appSettings/add[@key='dominioRutas']/@value", 'diezempleado.local,10empleado.local');
        xml.withBasePath('configuration/system.serviceModel')
           .set("client/endpoint[@name='BasicHttpBinding_INominas']/@address", 'http://serviciosnominasdev.cloudsoftware.es/Nominas.svc')
           .set("client/endpoint[@name='BasicHttpBinding_ICentroTrabajo']/@address", 'http://serviciosnominasdev.cloudsoftware.es/CentroTrabajo.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IEmpresas']/@address", 'http://serviciosnominasdev.cloudsoftware.es/Empresas.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IUsuariosOld']/@address", 'http://serviciosdiezdev.cloudsoftware.es/UsuariosOld.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IParametros']/@address", 'http://servicioscontadev.cloudsoftware.es/Parametros.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IDocumentServices']/@address", 'http://servicioswebcentraldev.cloudsoftware.es/DocumentServices.svc')
           .set("client/endpoint[@name='SoapUsuarios1']/@address", 'http://serviciosdiezdev.cloudsoftware.es/Usuarios.svc/SoapUsuariosService')
           .set("client/endpoint[@name='BasicHttpBinding_ITrabajadores']/@address", 'http://serviciosnominasdev.cloudsoftware.es/Trabajadores.svc')
           .set("client/endpoint[@name='BasicHttpBinding_ILiveDemo']/@address", 'http://serviciosempleadodev.cloudsoftware.es/LiveDemo.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IEmpleado']/@address", 'http://serviciosempleadodev.cloudsoftware.es/Empleados.svc')
           .set("client/endpoint[@name='SoapUsuarios']/@address", 'http://serviciosdiezdev.cloudsoftware.es/Usuarios.svc/SoapUsuariosService');
    });

    xmlpoke('ParametrosSDM.config', function (xml) {
        console.log('Poniendo valores de DEV en ParametrosSDM');
        xml.withBasePath('appSettings')
           .set("add[@key='UrlWebCentral']/@value", 'http://servicioswebcentraldev.cloudsoftware.es')
           .set("add[@key='claveAzure']/@value", 'uWdFBX4eV+4/S3xdfAj6LUF304KtVhkzZal91p6ENFpMrsmeX/93zluuZOuAMgm5VJl/oykxZLivAWYdG8mNuw==')
           .set("add[@key='usuarioAzure']/@value", 'pruebasgruposdm')
           .set("add[@key='urlGeneral']/@value", 'http://pruebasgruposdm.blob.core.windows.net')
           .set("add[@key='claveAzureDocs']/@value", 'q+YDadZgodGRj9Vpnp9Guzzu2hhW2yZc5u5zkF2OlIkdFczSS00cWvpY8RZh1xvOVoUSHxTsTTECswWVPAo7sg==')
           .set("add[@key='usuarioAzureDocs']/@value", 'gruposdmappsdev')
           .set("add[@key='urlGeneralDocs']/@value", 'http://gruposdmappsdev.blob.core.windows.net');
    });
    callback();
});

// Cambia el webconfig para publicar en DESARROLLO
gulp.task('webconfigdev', function (callback) {
    xmlpoke('web.config', function (xml) {
        console.log('Poniendo valores de DEV en el webconfig');
        xml.withBasePath('configuration')
           .set("appSettings/add[@key='dominioRutas']/@value",
           '10empleadotest.com');
        xml.withBasePath('configuration/system.serviceModel')
           .set("client/endpoint[@name='BasicHttpBinding_INominas']/@address", 'http://serviciosnominasdev.cloudsoftware.es/Nominas.svc')
           .set("client/endpoint[@name='BasicHttpBinding_ICentroTrabajo']/@address", 'http://serviciosnominasdev.cloudsoftware.es/CentroTrabajo.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IEmpresas']/@address", 'http://serviciosnominasdev.cloudsoftware.es/Empresas.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IUsuariosOld']/@address", 'http://serviciosdiezdev.cloudsoftware.es/UsuariosOld.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IParametros']/@address", 'http://servicioscontadev.cloudsoftware.es/Parametros.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IDocumentServices']/@address", 'http://servicioswebcentraldev.cloudsoftware.es/DocumentServices.svc')
           .set("client/endpoint[@name='SoapUsuarios1']/@address", 'http://serviciosdiezdev.cloudsoftware.es/Usuarios.svc/SoapUsuariosService')
           .set("client/endpoint[@name='BasicHttpBinding_ITrabajadores']/@address", 'http://serviciosnominasdev.cloudsoftware.es/Trabajadores.svc')
           .set("client/endpoint[@name='BasicHttpBinding_ILiveDemo']/@address", 'http://serviciosempleadodev.cloudsoftware.es/LiveDemo.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IEmpleado']/@address", 'http://serviciosempleadodev.cloudsoftware.es/Empleados.svc')
           .set("client/endpoint[@name='SoapUsuarios']/@address", 'http://serviciosdiezdev.cloudsoftware.es/Usuarios.svc/SoapUsuariosService');
    });

    xmlpoke('ParametrosSDM.config', function (xml) {
        console.log('Poniendo valores de DEV en ParametrosSDM');
        xml.withBasePath('appSettings')
           .set("add[@key='UrlWebCentral']/@value", 'http://servicioswebcentraldev.cloudsoftware.es')
           .set("add[@key='claveAzure']/@value", 'uWdFBX4eV+4/S3xdfAj6LUF304KtVhkzZal91p6ENFpMrsmeX/93zluuZOuAMgm5VJl/oykxZLivAWYdG8mNuw==')
           .set("add[@key='usuarioAzure']/@value", 'pruebasgruposdm')
           .set("add[@key='urlGeneral']/@value", 'http://pruebasgruposdm.blob.core.windows.net')
           .set("add[@key='claveAzureDocs']/@value", 'q+YDadZgodGRj9Vpnp9Guzzu2hhW2yZc5u5zkF2OlIkdFczSS00cWvpY8RZh1xvOVoUSHxTsTTECswWVPAo7sg==')
           .set("add[@key='usuarioAzureDocs']/@value", 'gruposdmappsdev')
           .set("add[@key='urlGeneralDocs']/@value", 'http://gruposdmappsdev.blob.core.windows.net');
    });
    callback();
});

// Cambia el webconfig para publicar en REAL
gulp.task('webconfigreal', function (callback) {
    xmlpoke('web.config', function (xml) {
        console.log('Poniendo valores de REAL en el webconfig');
        xml.withBasePath('configuration')
           .set("appSettings/add[@key='dominioRutas']/@value", 'diezempleado.com,10empleado.com');
        xml.withBasePath('configuration/system.serviceModel')
           .set("client/endpoint[@name='BasicHttpBinding_INominas']/@address", 'http://servicesnomina.cloudsoftware.es/Nominas.svc')
           .set("client/endpoint[@name='BasicHttpBinding_ICentroTrabajo']/@address", 'http://servicesnomina.cloudsoftware.es/CentroTrabajo.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IEmpresas']/@address", 'http://servicesnomina.cloudsoftware.es/Empresas.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IUsuariosOld']/@address", 'http://servicesdiez.cloudsoftware.es/UsuariosOld.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IParametros']/@address", 'http://servicesconta.cloudsoftware.es/Parametros.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IDocumentServices']/@address", 'http://serviceswebcentral.cloudsoftware.es/DocumentServices.svc')
           .set("client/endpoint[@name='SoapUsuarios1']/@address", 'http://servicesdiez.cloudsoftware.es/Usuarios.svc/SoapUsuariosService')
           .set("client/endpoint[@name='BasicHttpBinding_ITrabajadores']/@address", 'http://servicesnomina.cloudsoftware.es/Trabajadores.svc')
           .set("client/endpoint[@name='BasicHttpBinding_ILiveDemo']/@address", 'http://servicesempleado.cloudsoftware.es/LiveDemo.svc')
           .set("client/endpoint[@name='BasicHttpBinding_IEmpleado']/@address", 'http://servicesempleado.cloudsoftware.es/Empleados.svc')
           .set("client/endpoint[@name='SoapUsuarios']/@address", 'http://servicesdiez.cloudsoftware.es/Usuarios.svc/SoapUsuariosService');
    });
    xmlpoke('ParametrosSDM.config', function (xml) {
        console.log('Poniendo valores de REAL en ParametrosSDM');
        xml.withBasePath('appSettings')
           .set("add[@key='UrlWebCentral']/@value", 'http://serviceswebcentral.cloudsoftware.es')
           .set("add[@key='claveAzure']/@value", 'TbcwKIYvXExZVLtEJNWrezzKZtCA36ChJpSk9JJ5u3b0Rrp1LdJHN4o+2U6B8/WgwCtJSviAb4i5N+VLeO28Sg==')
           .set("add[@key='usuarioAzure']/@value", 'gruposdmgd')
           .set("add[@key='urlGeneral']/@value", 'http://gruposdmgd.blob.core.windows.net')
           .set("add[@key='claveAzureDocs']/@value", 'xzMPoR66mA1AboLIpiPJT8gSxByRuIoqKjBN5tf2Jf/vwEiG9qvROBTEVo3ZvgTmphrDRcS9lYGL8yUrmi2R1Q==')
           .set("add[@key='usuarioAzureDocs']/@value", 'gruposdmapps')
           .set("add[@key='urlGeneralDocs']/@value", 'http://gruposdmapps.blob.core.windows.net');
    });
    callback();
});

// Publica a desarrollo')
gulp.task('publicadev', ['webconfigdev', 'runtest'], function (callback) { });
// Publica a real
gulp.task('publicareal', ['webconfigreal', 'runtest'], function (callback) { });

// Para cuando hay integración continua :')
gulp.task('ci', []);

/****************************************************/
//// Return a stream so gulp can determine completion
//gulp.task('clean', function () {
//    return gulp
//        .src('app/tmp/*.js', { read: false })
//        .pipe(clean());
//});

//// OR

//// Take in the gulp callback and call it when done
//gulp.task('clean', function (callback) {
//    gulp.src('app/tmp/*.js', { read: false })
//        .pipe(clean());
//    callback();
//});

//// Specify the dependencies in the second parameter
//gulp.task('build', ['clean'], function () {
//    // Build...
//});
/****************************************************/