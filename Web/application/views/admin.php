<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="es" data-ng-app="eventos" ng-hint>

<head>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Panel de administraci�n de eventos deportivos">
    <meta name="author" content="">
    <style>
        /* This helps the ng-show/ng-hide animations start at the right place. */
        /* Since Angular has this but needs to load, this gives us the class early. */
        .ng-hide {
            display: none !important;
        }

        div.loading {
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            z-index: 2000;
            text-align: center;
            /*display: none;
            background-image: url(../Images/transparente.png);*/
        }

            div.loading i {
                margin: 10% auto;
                color: #2676ad;
                font-size: 100px;
            }
    </style>
    <title>Eventos Deportivos - Panel de Administracion</title>

    <!-- Bootstrap Core CSS -->
    <link href="../../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">
    <!-- DataTables CSS -->
    <link href="../../bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="../../bower_components/datatables-responsive/css/responsive.dataTables.scss" rel="stylesheet">
    <!-- Timeline CSS -->
    <link href="/application/theme/css/timeline.css" rel="stylesheet">
    <!-- Toastr CSS -->
    <link href="../../bower_components/toastr/toastr.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link href="/application/theme/css/sb-admin-2.css" rel="stylesheet">
    <!-- Angular UI Bootstrap -->
    <link href="../../bower_components/angular-bootstrap/ui-bootstrap-csp.css" rel="stylesheet">
    <!-- Alvaro CSS -->
    <link href="/application/theme/site.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <!--<link href="../../bower_components/morrisjs/morris.css" rel="stylesheet">-->

    <!-- Custom Fonts -->
    <link href="../../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <div data-ng-include="'http://localhost:22832/application/app/views/shell.html'"></div>



    <!-- jQuery -->
    <script src="../../bower_components/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="../../bower_components/angular/angular.js"></script>
    <script src="../../bower_components/angular-animate/angular-animate.js"></script>
    <script src="../../bower_components/angular-route/angular-route.js"></script>
    <script src="../../bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="../../bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
    <script src="../../bower_components/toastr/toastr.js"></script>
    <script src="../../bower_components/angular-i18n/angular-locale_es-es.js"></script>
    <script src="../../bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../../bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <!--<script src="../../bower_components/raphael/raphael-min.js"></script>
    <script src="../../bower_components/morrisjs/morris.min.js"></script>
    <script src="application/js/morris-data.js"></script>-->

    <!-- Custom Theme JavaScript -->
    <script src="/application/theme/js/sb-admin-2.js"></script>

    <!-- Eventos Deportivos -->
    <script src="/application/app/app.js"></script>
    <script src="/application/app/blocks/exception/exception.module.js"></script>
    <script src="/application/app/blocks/exception/exception-handler.provider.js"></script>
    <script src="/application/app/blocks/exception/exception.js"></script>
    <script src="/application/app/blocks/logger/logger.module.js"></script>
    <script src="/application/app/blocks/logger/logger.js"></script>
    <script src="/application/app/blocks/router/router.module.js"></script>
    <script src="/application/app/blocks/router/routehelper.js"></script>

    <!-- core module -->
    <script src="/application/app/core/core.module.js"></script>
    <script src="/application/app/core/constants.js"></script>
    <script src="/application/app/core/config.js"></script>
    <script src="/application/app/core/config.routes.js"></script>
    <script src="/application/app/core/dataservice.js"></script>
    <script src="/application/app/filters/filter.fecha.js"></script>

    <!-- layout -->
    <script src="/application/app/controllers/layout.js"></script>
    <script src="/application/app/controllers/login.js"></script>
    <script src="/application/app/controllers/panel.js"></script>
    <script src="/application/app/controllers/actividades.js"></script>
    <script src="/application/app/controllers/usuarios.js"></script>
    <script src="/application/app/controllers/encuentros.js"></script>
    <script src="/application/app/controllers/eventos.js"></script>
    <script src="/application/app/controllers/perfil.js"></script>
    <script src="/application/app/controllers/eventos.js"></script>
    <!--<script src="/application/app/layout/shell.controller.js"></script>
    <script src="/application/app/layout/sidebar.controller.js"></script>-->



</body>

</html>
