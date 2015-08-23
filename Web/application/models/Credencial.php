<?php

/**
 * Actividad short summary.
 *
 * Actividad description.
 *
 * @version 1.0
 * @author Álvaro
 */
class Credencial extends CI_Model
{
    public $Id;
    public $Intentos;
    public $Salt;
    public $PasswordHash;
    public $FechaDesbloqueo;
    public $HoraDesbloqueo;
    public $Usuario_Id;
    public $Estado;

    const TABLA  = "credencials";
    const PETICIONES_MAXIMAS  = 5;
    const TIEMPO_PETICIONES  = 5;
    const DURACION_BLOQUEO = 30;

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    private function getNewID()
    {
        $this->Id = $this->_getNewID();
        $query = $this->db->where('Usuario_Id', $this->Usuario_Id)->where('Id', $this->Id)->get(self::TABLA);
        while(count($query->result()) > 0)
        {
            $this->Id = $this->_getNewID();
            $query = $this->db->where('Usuario_Id', $this->Usuario_Id)->where('Id', $this->Id)->get(self::TABLA);;
        }
    }

    public function get($id_usuario)
    {
        if ($id_usuario !== NULL && $id_usuario !== "")
        {
            $query = $this->db->where('Usuario_Id', $id_usuario)->get(self::TABLA);
            return $query->result();
        }

        return NULL;
    }

    public function insert($usuario_id, $password_hash, $salt)
    {
        $result = NULL;

        if (count($this->get($usuario_id)) === 0)
        {
            $this->Usuario_Id = $usuario_id;
            $this->getNewID();
            $this->PasswordHash = $password_hash;
            $this->Salt = $salt;
            $this->Intentos = 0;
            $this->HoraDesbloqueo = 0;
            $this->Estado = 0;
            $this->FechaDesbloqueo = 0;
            
            $result = $this->db->insert(self::TABLA, $this);
        }
        return $result;
    }
    
    public function update_estado($id_usuario, $estado)
    {
        $result = $this->get($id_usuario);
        if ($result !== NULL)
        {
            $datos = NULL;
            foreach ($result as $row)
            {
            	$datos = $row;
                $this->Id = $row->Id;
                $this->Usuario_Id = $row->Usuario_Id;
                $this->PasswordHash = $row->PasswordHash;
                $this->Salt = $row->Salt;
                $this->Intentos = $row->Intentos;
                $this->HoraDesbloqueo = $row->HoraDesbloqueo;
                $this->FechaDesbloqueo = $row->FechaDesbloqueo;
                break;
            }

            $this->Estado = $estado;
            switch ($estado)
            {
                case 0:
                    $this->FechaDesbloqueo = 0;
                    $this->HoraDesbloqueo = 0;
                    $this->Intentos = 0;
                    break;
                case 1:
                    $fecha = getdate();
                    $fecha->add(new DateInterval('PT' . $this::DURACION_BLOQUEO . 'M'));
                    $this->FechaDesbloqueo = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
                    $this->HoraDesbloqueo = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
                    $this->Intentos = self::PETICIONES_MAXIMAS;
                    break;
                case 2:
                case 3:
                    $this->FechaDesbloqueo = 99999999;
                    $this->HoraDesbloqueo = 999999;
                    $this->Intentos = self::PETICIONES_MAXIMAS; 
                    if ($estado === 3) // Si ha sido banneado eliminamos su contraseña
                    {
                        $this->PasswordHash = '';
                        $this->Salt = '';
                    }
                    break;
            }
            
            $result = $this->db->where('Usuario_Id', $this->Actividad_Id)->where('Id', $this->Id)->update(self::TABLA, $this);
        }
    }

    public function update()
    {
        $result = $this->db->where('Usuario_Id', $this->Actividad_Id)->where('Id', $this->Id)->update(self::TABLA, $this);        
    }
}