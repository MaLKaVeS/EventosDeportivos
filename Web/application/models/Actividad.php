<?php

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class Actividad extends CI_Model
{
    public $Id;
    public $Nombre;
    public $Descripcion;
    public $Imagen;
    public $Icono;
    public $ImagenPortada;

    const TABLA  = "Actividads";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function _esValido()
    {
        return ($this->Id !== NULL && strlen($this->Id) > 0) &&
            ($this->Nombre !== NULL && strlen($this->Nombre) > 0);
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

    public function get($id = "")
    {
        if ($id !== NULL && $id !== "")
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