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

    private function getNewID()
    {
        $this->Id = $this->_getNewID();
        $query = $this->db->where('Credencial', $this->Credencial)->where('Id', $this->Id)->get(self::TABLA);
        while(count($query->result()) > 0)
        {
            $this->Id = $this->_getNewID();
            $query = $this->db->where('Credencial', $this->Credencial)->where('Id', $this->Id)->get(self::TABLA);;
        }
    }

    public function get($credencial_id) {
        if ($credencial_id !== NULL && $credencial_id !== "")
        {
            $query = $this->db->where('Credencia', $credencial_id)->get(self::TABLA);
            return $query->result();
        }
        return NULL;
    }

    public function insert() {
        $this->getNewID();
        //if ($this->_esValido())
        //{
            $fecha = getdate();            
            $this->Fecha = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
            $this->Hora = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
            $result = $this->db->insert(self::TABLA, $this);
        //}
        //else
        //{
        //    $result = false;
        //}
        return $result;
    }
}