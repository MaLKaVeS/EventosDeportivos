<?php

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class Acceso extends CI_Model
{
    public $Id;
    public $Credencial;
    public $Hora;
    public $Fecha;
    public $Resultado;

    const TABLA  = "accesoes";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }


}