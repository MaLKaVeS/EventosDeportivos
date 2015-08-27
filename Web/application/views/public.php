<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en" data-ng-app="eventos">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <?php
    if (isset($_SERVER['CI_ENV']) && $_SERVER['CI_ENV'] === 'production')
    {
        echo '<base href="//aglinformatica.es:6080/pardo/" />';
    }
    else
    {
        echo '<base href="/" />';
    }
    ?>

    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/favicon.ico">
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
    <style>
        /* This helps the ng-show/ng-hide animations start at the right place. */
        /* Since Angular has this but needs to load, this gives us the class early. */
        .ng-hide {
            display: none !important;
        }

        html {
            position: relative;
            min-height: 100%;
        }

        body {
            padding-top: 50px;
            padding-bottom: 20px;
            margin-bottom: 60px;
        }

        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            /* Set the fixed height of the footer here */
            height: 60px;
            background-color: #f5f5f5;
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

            div.loading i, div.loading p {
                margin: 10% auto;
                color: #2676ad;
                font-size: 20px;
            }
    </style>

    <title update-title>Eventos Deportivos</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Toastr CSS -->
    <link href="bower_components/toastr/toastr.css" rel="stylesheet" />

    <!-- Angular UI Bootstrap -->
    <link href="bower_components/angular-bootstrap/ui-bootstrap-csp.css" rel="stylesheet">
    <!-- Alvaro CSS -->
    <link href="/app_admin/theme/site.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <!-- Header -->
    <header ng-include="'app_public/core/views/header.html'"></header>
    <!-- Views -->
    <div class="container-fluid full-width-container">
        <section class="container main-content">
            <section ui-view></section>
        </section>
    </div>
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <hr>
            <p>&copy; &Aacute;lvaro Pardo de Santayana 2015</p>
        </div>
    </footer>

    <!-- Vendors -->
    <script src="bower_components/jquery/jquery.min.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-i18n/angular-locale_es-es.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/angular-local-storage/dist/angular-local-storage.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Core Modules -->
    <script src="app_public/config.js"></script>
    <script src="app_public/app.js"></script>
    <script src="app_public/core/core.init.js"></script>
    <script src="app_public/core/config/core.routes.js"></script>
    <script src="app_public/core/directives/updatetitle.directive.js"></script>
    <script src="app_public/core/filters/fecha.filter.js"></script>
    <script src="app_public/core/utils/fecha.utils.js"></script>

    <!-- Services -->
    <script src="app_public/services/actividades.dataservice.js"></script>
    <script src="app_public/services/contacto.dataservice.js"></script>
    <script src="app_public/services/eventos.dataservice.js"></script>
    <script src="app_public/services/usuarios.dataservice.js"></script>

    <!-- Inicio Modules -->
    <script src="app_public/modules/inicio/inicio.init.js"></script>
    <script src="app_public/modules/inicio/config/inicio.routes.js"></script>
    <script src="app_public/modules/inicio/controllers/inicio.controller.js"></script>
    <script src="app_public/modules/inicio/controllers/inicio.actividades.controller.js"></script>
    <script src="app_public/modules/inicio/controllers/inicio.eventos.controller.js"></script>

    <!-- NoEncontrado Modules -->
    <script src="app_public/modules/noencontrado/noencontrado.init.js"></script>
    <script src="app_public/modules/noencontrado/config/noencontrado.routes.js"></script>
    <script src="app_public/modules/noencontrado/controllers/noencontrado.controller.js"></script>

    <!-- Registro Modules -->
    <script src="app_public/modules/registro/registro.init.js"></script>
    <script src="app_public/modules/registro/config/registro.routes.js"></script>
    <script src="app_public/modules/registro/controllers/registro.controller.js"></script>

    <!-- Acercade Modules -->
    <script src="app_public/modules/acercade/acercade.init.js"></script>
    <script src="app_public/modules/acercade/config/acercade.routes.js"></script>
    <script src="app_public/modules/acercade/controllers/acercade.controller.js"></script>

    <!-- Contacto Modules -->
    <script src="app_public/modules/acercade/acercade.init.js"></script>
    <script src="app_public/modules/acercade/config/acercade.routes.js"></script>
    <script src="app_public/modules/acercade/controllers/acercade.controller.js"></script>

    <!-- Login Modules -->
    <script src="app_public/modules/login/login.init.js"></script>
    <script src="app_public/modules/login/config/login.routes.js"></script>
    <script src="app_public/modules/login/controllers/login.controller.js"></script>

    <!-- Eventos Modules -->
    <script src="app_public/modules/eventos/eventos.init.js"></script>
    <script src="app_public/modules/eventos/config/eventos.routes.js"></script>
    <script src="app_public/modules/eventos/controllers/eventos.controller.js"></script>

    <!-- Actividades Modules -->
    <script src="app_public/modules/actividades/actividades.init.js"></script>
    <script src="app_public/modules/actividades/config/actividades.routes.js"></script>
    <script src="app_public/modules/actividades/controllers/actividades.controller.js"></script>

    <!-- Contacto Modules -->
    <script src="app_public/modules/contacto/contacto.init.js"></script>
    <script src="app_public/modules/contacto/config/contacto.routes.js"></script>
    <script src="app_public/modules/contacto/controllers/contacto.controller.js"></script>

    <!-- Acceso Modules -->
    <script src="app_public/modules/login/login.init.js"></script>
    <script src="app_public/modules/login/config/login.routes.js"></script>
    <script src="app_public/modules/login/controllers/login.controller.js"></script>
</body>
</html>
