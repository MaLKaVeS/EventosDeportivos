<?php

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class Evento extends CI_Model
{
    public $Id;
    public $Nombre;
    public $Descripcion;
    public $Actividad_Id;
    public $FechaCreacion;
    public $HoraCreacion;
    public $FechaInicio;
    public $HoraInicio;
    public $FechaFin;
    public $HoraFin;
    public $Estado;
    public $EstadoRegistro;

    const TABLA  = "Eventoes";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function _esValido()
    {
        return ($this->Id !== NULL && strlen($this->Id) > 0) &&
            ($this->Actividad_Id !== NULL && strlen($this->Actividad_Id) > 0) &&
            ($this->FechaInicio !== NULL && $this->FechaInicio > 0) &&
            ($this->FechaFin !== NULL && $this->HoraFin > 0) &&
            ($this->HoraInicio !== NULL && $this->HoraInicio > 0) &&
            ($this->HoraFin !== NULL && $this->HoraFin > 0) &&
            ($this->Nombre !== NULL && strlen($this->Nombre) > 0);
    }

    private function getNewID()
    {
        $this->Id = $this->_getNewID();
        $query = $this->db->where('Actividad_Id', $this->Actividad_Id)->where('Id', $this->Id)->get(self::TABLA);
        while(count($query->result()) > 0)
        {
            $this->Id = $this->_getNewID();
            $query = $this->db->where('Actividad_Id', $this->Actividad_Id)->where('Id', $this->Id)->get(self::TABLA);;
        }
    }

    public function get($actividad = "", $id = "")
    {
        if ($id !== NULL && $id !== "")
        {
            $query = $this->db->where('Actividad_Id', $actividad)->where('Id', $id)->get(self::TABLA);
        }
        else if ($actividad !== NULL && $actividad !== "")
        {
            $query = $this->db->where('Actividad_Id', $actividad)->get(self::TABLA);
        }
        else
        {
            $query = $this->db->get(self::TABLA);
        }
        return $query->result();
    }

    public function ultimos($actividad = "", $id = "", $limite = 20)
    {
        if ($id !== NULL && $id !== "" && $actividad !== NULL && $actividad !== "")
        {
            $query = $this->db->where('Estado < ',0)
                ->where('Actividad_Id', $actividad)
                ->where('Id', $id)
                ->order_by('FechaInicio', 'DESC')
                ->limit($limite)
                ->get(self::TABLA);
        }
        else if ($actividad !== NULL && $actividad !== "")
        {
            $query = $this->db->where('Estado < ',0)
                ->where('Actividad_Id', $actividad)
                ->order_by('FechaInicio', 'DESC')
                ->limit($limite)
                ->get(self::TABLA);
        }
        else
        {
            $query = $this->db->order_by('FechaInicio', 'DESC')
                ->where('Estado > ', 0)
                ->limit($limite)
                ->get(self::TABLA);
        }
        return $query->result();
    }

    public function insert()
    {
        $this->getNewID();
        if ($this->_esValido())
        {
            $fecha = getdate();            
            $this->FechaCreacion = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
            $this->HoraCreacion = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
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
            $result = $this->db->where('Actividad_Id', $this->Actividad_Id)->where('Id', $this->Id)->update(self::TABLA, $this);
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
            $result = $this->db->where('Actividad_Id', $this->Actividad_Id)->where('Id', $this->Id)->delete(self::TABLA);
        }
        else
        {
            $result = false;
        }
        return $result;
    }
}