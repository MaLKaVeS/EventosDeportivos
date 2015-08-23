<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
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

    <title>Eventos Deportivos</title>

    <!-- Bootstrap core CSS -->
    <link href="../../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <style type="text/css">
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
    </style>
    <!-- Toastr CSS -->
    <link href="../../bower_components/toastr/toastr.css" rel="stylesheet" />

    <!-- Angular UI Bootstrap -->
    <link href="../../bower_components/angular-bootstrap/ui-bootstrap-csp.css" rel="stylesheet">
    <!-- Alvaro CSS -->
    <link href="/app_admin/theme/site.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="../../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Eventos Deportivos</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
            <li class="active"><a href="#/actividades">Actividades</a></li>
            <li><a href="#/eventos">Eventos</a></li>
            <li><a href="#/contacto">Contacto</a></li>
            <li><a href="#/about">Acerca de</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Clave" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Acceso</button>
            <a href="#/registro" class="btn btn-primary">Registro</a>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    
    <footer class="footer" >
        <div class="container">
            <hr>
            <p>&copy; &Aacute;lvaro Pardo de Santayana 2015</p>
        </div>
    </footer>
    <script src="../../bower_components/jquery/jquery.min.js"></script>
    <script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>