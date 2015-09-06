<?php

/**
 * Cada uno de los roles de un usuario en la aplicación
 *
 * Devuelve los datos de los roles, los inserta, los actualiza y los borra.
 *
 * @version 1.0
 * @author Álvaro
 */
class Mensaje extends CI_Model
{
    public $Id;
    public $Asunto;
    public $AsuntoRespuesta;
    public $Contestado;
    public $EmailContacto;
    public $EmailRespuesta;
    public $Fecha;
    public $FechaRespuesta;
    public $Hora;
    public $HoraRespuesta;
    public $TextoMensaje;
    public $TextoRespuesta;
    
    const TABLA  = "Mensajes";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function _esValido()
    {
        return ($this->Id !== NULL && strlen($this->Id) > 0) &&
            ($this->Asunto !== NULL && strlen($this->Asunto) > 0) &&
            ($this->EmailContacto !== NULL && strlen($this->EmailContacto) > 0) &&
            ($this->TextoMensaje !== NULL && strlen($this->TextoMensaje) > 0);
    }

    private function getNewID()
    {
        $this->Id = 1;
        $query = $this->db->select_max('Id')->get(self::TABLA)->row();
        if (isset($query->Id))
        {
            $this->Id = $this->Id + (int) $query->Id;
        }
    }

    public function get($id = "")
    {
        if (isset($id))
        {
            $query = $this->db->where('Id', $id)->get(self::TABLA);
        }
        else
        {
            $query = $this->db->get(self::TABLA);
        }
        return $query->result();
    }

    public function insert()
    {
        $this->getNewID();
        if ($this->_esValido())
        {
            $this->AsuntoRespuesta = "";
            $this->Contestado = false;
            $this->EmailRespuesta = "";

            $fecha = getdate();            
            $this->Fecha = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
            $this->Hora = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];

            $this->FechaRespuesta = 0;
            $this->HoraRespuesta = 0;

            $this->TextoRespuesta = "";

            $result = $this->db->insert(self::TABLA, $this);
        }
        else
        {
            $result = false;
        }
        return $result;
    }

    public function update()
    {
        if ($this->_esValido())
        {
            $result = $this->db->where('Id', $this->Id)->update(self::TABLA, $this);
        }
        else
        {
            $result = false;
        }
        return $result;
    }

    public function delete()
    {
        if ($this->Id !== NULL && strlen($this->Id) > 0)
        {
            $result = $this->db->where('Id', $this->Id)->delete(self::TABLA);
        }
        else
        {
            $result = false;
        }
        return $result;
    }
}