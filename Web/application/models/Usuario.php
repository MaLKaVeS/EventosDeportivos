<?php
include_once  'PasswordHash.php';
include_once  'Credencial.php';

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class Usuario extends CI_Model
{
    public $Id;
    public $Nombre;
    public $Apellidos;
    public $Email;
    public $FechaAlta;
    public $FechaNacimiento;

    const TABLA  = "Usuarios";
    const ROLESUSUARIO  = "rolusuarios";
    const TABLACREDENCIALES  = "credencials";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function _esValido()
    {
        return ($this->Id !== NULL && strlen($this->Id) > 0) &&
            ($this->Nombre !== NULL && strlen($this->Nombre) > 0) &&
            ($this->Apellidos !== NULL && strlen($this->Apellidos) > 0) &&
            ($this->Email !== NULL && strlen($this->Email) > 0) &&
            ($this->FechaNacimiento !== NULL && strlen($this->FechaNacimiento) > 0);
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
            $fecha = getdate();            
            $this->FechaAlta = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
            $result = $this->db->insert(self::TABLA, $this);
        }
        else
        {
            $result = false;
        }
        return $result;
    }

    private function insert_credenciales() 
    {

    }

    private function getRandomPassword() 
    {

    }

    private function has_password()
    {
    }

    public function update()
    {
        if ($this->_esValido())
        {
            $original = $this->get($this->Id);
            $this->FechaAlta = $original->FechaAlta;
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