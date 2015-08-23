<?php

/**
 * Cada uno de los roles de un usuario en la aplicación
 *
 * Devuelve los datos de los roles, los inserta, los actualiza y los borra.
 *
 * @version 1.0
 * @author Álvaro
 */
class Rol extends CI_Model
{
    public $Id;
    public $Nombre;
    public $Descripcion;

    const TABLA  = "Rols";

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
        $query = $this->db->where('Id', $id)->get(self::TABLA);
        while(count($query->result()) > 0)
        {
            $this->Id = $this->_getNewID();
            $query = $this->db->where('Id', $id)->get(self::TABLA);
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

    public function get_by_name($nombre = "")
    {
        if ($nombre !== NULL && $nombre !== "")
        {
            $query = $this->db->where('Nombre', $nombre)->get(self::TABLA);
            return $query->row();
        }
        return NULL;
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