<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="es" data-ng-app="eventos" ng-hint>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <?php
    if (isset($_SERVER['CI_ENV']) && $_SERVER['CI_ENV'] === 'production')
    {
        echo '<base href="http://aglinformatica.es:6080/pardo/" />';
    }
    else
    {
        echo '<base href="/" />';
    }
    ?>

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
   <meta name="description" content="Panel de administracion de eventos deportivos">
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
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">
    <!-- DataTables CSS -->
    <link href="bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="bower_components/datatables-responsive/css/responsive.dataTables.scss" rel="stylesheet">
    <!-- Timeline CSS -->
    <link href="admin/theme/css/timeline.css" rel="stylesheet">
    <!-- Toastr CSS -->
    <link href="bower_components/toastr/toastr.css" rel="stylesheet" />

    <!-- Custom CSS -->
    <link href="admin/theme/css/sb-admin-2.css" rel="stylesheet">
    <!-- Angular UI Bootstrap -->
    <link href="bower_components/angular-bootstrap/ui-bootstrap-csp.css" rel="stylesheet">
    <!-- Alvaro CSS -->
    <link href="admin/theme/site.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <!--<link href="bower_components/morrisjs/morris.css" rel="stylesheet">-->

    <!-- Custom Fonts -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!--<link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">-->

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <div class="container-fluid full-width-container">
        <section class="container-fluid full-width-container">
            <section ui-view></section>
        </section>
    </div>
    
    <!-- Vendors -->
    <script src="bower_components/jquery/jquery.min.js"></script>
    <script src="bower_components/lodash/lodash.min.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-i18n/angular-locale_es-es.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="admin/theme/js/sb-admin-2.js"></script>

    <!-- Eventos Deportivos -->
    <script src="admin/config.js"></script>
    <script src="admin/app.js"></script>

    <!-- Core Module -->
    <script src="admin/core/core.init.js"></script>
    <script src="admin/core/config/core.routes.js"></script>
    <script src="admin/core/directives/updatetitle.directive.js"></script>
    <script src="admin/core/filters/fecha.filter.js"></script>
    <script src="admin/core/utils/fecha.utils.js"></script>

    <!-- Services -->
    <script src="admin/services/login.dataservice.js"></script>
    <script src="admin/services/actividades.dataservice.js"></script>
    <script src="admin/services/eventos.dataservice.js"></script>
    <script src="admin/services/usuarios.dataservice.js"></script>

    <!-- Login Module -->
    <script src="admin/modules/login/login.init.js"></script>
    <script src="admin/modules/login/config/login.routes.js"></script>
    <script src="admin/modules/login/controllers/login.controller.js"></script>
    
    <!-- Login Module -->
    <script src="admin/modules/noencontrado/noencontrado.init.js"></script>
    <script src="admin/modules/noencontrado/config/noencontrado.routes.js"></script>
    <script src="admin/modules/noencontrado/controllers/noencontrado.controller.js"></script>

    <!-- Panel Module -->
    <script src="admin/modules/panel/panel.init.js"></script>
    <script src="admin/modules/panel/config/panel.routes.js"></script>
    <script src="admin/modules/panel/controllers/panel.controller.js"></script>

    <!-- Actividades Module -->
    <script src="admin/modules/actividades/actividades.init.js"></script>
    <script src="admin/modules/actividades/config/actividades.routes.js"></script>
    <script src="admin/modules/actividades/controllers/actividades.controller.js"></script>
    
    <!-- Eventos Module -->
    <script src="admin/modules/eventos/eventos.init.js"></script>
    <script src="admin/modules/eventos/config/eventos.routes.js"></script>
    <script src="admin/modules/eventos/controllers/eventos.controller.js"></script>

    <!-- Usuarios Module -->
    <script src="admin/modules/usuarios/usuarios.init.js"></script>
    <script src="admin/modules/usuarios/config/usuarios.routes.js"></script>
    <script src="admin/modules/usuarios/controllers/usuarios.controller.js"></script>

    <!-- Inscripciones Module -->
    <script src="admin/modules/inscripciones/inscripciones.init.js"></script>
    <script src="admin/modules/inscripciones/config/inscripciones.routes.js"></script>
    <script src="admin/modules/inscripciones/controllers/inscripciones.controller.js"></script>

    <!-- Perfil Module -->
    <script src="admin/modules/perfil/perfil.init.js"></script>
    <script src="admin/modules/perfil/config/perfil.routes.js"></script>
    <script src="admin/modules/perfil/controllers/perfil.controller.js"></script>

    <!-- Perfil Module -->
    <script src="admin/modules/ajustes/ajustes.init.js"></script>
    <script src="admin/modules/ajustes/config/ajustes.routes.js"></script>
    <script src="admin/modules/ajustes/controllers/ajustes.controller.js"></script>
</body>

</html>