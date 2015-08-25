<?php

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class RolUsuarios extends CI_Model
{
    public $Rol_Id;
    public $Usuario_Id;

    const TABLA  = "RolUsuarios";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function _esValido()
    {
        return ($this->Rol_Id !== NULL && strlen($this->Rol_Id) > 0) &&
            ($this->Usuario_Id !== NULL && strlen($this->Usuario_Id) > 0);
    }

    public function get_by_rol($rol_id)
    {
        if ($rol_id !== NULL && $rol_id !== "")
        {
            $query = $this->db->where('Rol_Id', $rol_id)->get(self::TABLA);
            return $query->result();
        }
        return NULL;
    }

    public function get_by_usuario($usuario_id)
    {
        if ($usuario_id !== NULL && $usuario_id !== "")
        {
            $query = $this->db->where('Usuario_Id', $usuario_id)->get(self::TABLA);
            return $query->result();
        }
        return NULL;
    }

    public function insert()
    {
        if ($this->_esValido())
        {
            $query = $this->db->insert(self::TABLA, $this);
            return $query;
        }
        return false;
    }

    public function delete()
    {
        if ($this->_esValido())
        {
            $query = $this->db->where('Rol_id', $this->Rol_Id)->where('Usuario_Id', $this->Usuario_Id)->delete(self::TABLA, $this);
            return $query;
        }
        return false;
    }
}