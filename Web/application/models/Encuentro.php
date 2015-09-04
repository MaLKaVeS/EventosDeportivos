<?php

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class Encuentro extends CI_Model
{
    public $Id;
    public $Evento_Id;
    public $Partes;
    public $Ronda;
    public $Duracion;
    public $Lugar;
    public $Hora;
    public $Fecha;
    public $Estado;    
    public $HoraInicio;
    public $FechaInicio;
    public $TiempoTranscurrido;

    const TABLA  = "Encuentroes";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function _esValido()
    {
        return ($this->Id !== NULL && strlen($this->Id) > 0);
    }

    private function getNewID()
    {
        $this->Id = $this->_getNewID();
        $query = $this->db->where('Id', $this->Id)->get(self::TABLA);
        while(count($query->result()) > 0)
        {
            $this->Id = $this->_getNewID();
            $query = $this->db->where('Id', $this->Id)->get(self::TABLA);
        }
    }

    public function getById($id = "")
    {
        $result = NULL;
        if (isset($id))
        {
            $query = $this->db->where('Id', $id)
                ->get(self::TABLA);
            $result = $query->result();
        }

        return $result;
    }


    public function getByEventoId($evento_id = "")
    {
        $result = NULL;
        if (isset($evento_id))
        {
            $query = $this->db->where('Evento_Id', $evento_id)
                ->order_by('Ronda', 'ASC')
                ->order_by('Fecha', 'ASC')
                ->get(self::TABLA);

            $result = $query->result();
        }

        return $result;
    }

    public function insert()
    {
        $this->getNewID();
        if ($this->_esValido())
        {
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