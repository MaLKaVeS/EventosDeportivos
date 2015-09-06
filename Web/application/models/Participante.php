<?php

include_once  'Evento.php';
include_once  'Usuario.php';
include_once  'ParticipanteEvento.php';

/**
 * Cada uno de los roles de un usuario en la aplicación
 *
 * Devuelve los datos de los roles, los inserta, los actualiza y los borra.
 *
 * @version 1.0
 * @author Álvaro
 */
class Participante extends CI_Model
{
    public $Id;
    public $Usuario_Id;
    public $Actividad_Id;
    public $Bio;
    public $FechaCreacion;
    public $HoraCreacion;
    public $Imagen;
    public $MostrarEdad;
    public $MostrarEmail;

    const TABLAENCUENTROS = "EncuentroParticipantes";
    const TABLAPERFIL  = "PerfilParticipantes";
    const TABLAEVENTOS  = "PerfilEventoes";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /**
     * Inscribe un usuario en un evento. 
     * Si el usuario tiene perfil para la actividad, lo utiliza.
     * Si no lo crea uno nuevo.
     * @param mixed $usuario_id -> Identificador del usuario participante
     * @param mixed $evento_id  -> Identificador del evento
     */
    public function inscribir_participante($usuario_id, $evento_id)
    {
        if (!isset($usuario_id) || !isset($evento_id))
        {
            return false;
        }

        $usuarioModel = new Usuario();
        $eventoModel = new Evento();

        $evento = $eventoModel->getById($evento_id);
        $usuario =  $usuarioModel->get($usuario_id);

        $result = false;

        if (isset($evento) && isset($usuario))
        {
            $this->Usuario_Id = $usuario_id;
            $this->Actividad_Id = $evento->Actividad_Id;

            $perfil = $this->getPerfilActividad();

            if ($perfil)
            {
                $this->Id = $perfil->Id;
                $fecha = getdate();            
                $this->FechaCreacion = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
                $this->HoraCreacion = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
                $result = true;
            }
            else
            {
                $this->Id = $usuario_id;
                $fecha = getdate();            
                $this->FechaCreacion = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
                $this->HoraCreacion = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
                $this->Bio = $usuario->Nombre.' '.$usuario->Apellidos.' participa en el evento '.$evento->Nombre;
                $this->MostrarEdad = false;
                $this->MostrarEmail = false;
                $result = $this->db->insert(self::TABLAPERFIL, $this);
            }


            if ($result)
            {
                $inscripcionModel = new ParticipanteEvento();
                $inscripcionModel->Evento_Id = $evento_id;
                $inscripcionModel->Evento_Id1 = $evento_id;
                $inscripcionModel->Perfil_Id = $this->Id;
                $inscripcionModel->Perfil_Id1 = $this->Id;
                $inscripcionModel->FechaInscripcion = $this->FechaCreacion;
                $inscripcionModel->HoraInscripcion = $this->HoraCreacion;

                $result = $inscripcionModel->insert();
            }
        }

        return $result;
    }


    public function _esValido()
    {
        return true;
    }

    private function getNewID()
    {
        $this->Id = $this->_getNewID();
        $query = $this->db->where('Id', $this->Id)->get(self::TABLAPERFIL);
        while(count($query->result()) > 0)
        {
            $this->Id = $this->_getNewID();
            $query = $this->db->where('Id', $this->Id)->get(self::TABLAPERFIL);
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

    public function getPerfilActividad()
    {
        return $this->db->where('Usuario_Id',$this->Usuario_Id)->where('Actividad_Id',$this->Actividad_Id)
            ->get(self::TABLAPERFIL)->row();
    }

    public function getPerfilesUsuario()
    {
        return $this->db->where('Usuario_Id',$this->Usuario_Id)
                        ->get(self::TABLAPERFIL)->result();
    }

    public function getEventosUsuario() 
    {
        return $this->db->where('Perfil_Id', $this->Usuario_Id)->get(self::TABLAEVENTOS)->result();
    }

    public function getParticipantesEvento($evento_id) 
    {
        //return $this->db->where('Evento_Id', $evento_id)->get(self::TABLAEVENTOS)->result();
        return $this->db->select('*')
                        ->from(self::TABLAEVENTOS)
                        ->where(self::TABLAEVENTOS.'.Evento_Id', $evento_id)
                        //->join('Eventoes', 'Eventoes.Id = '.self::TABLAEVENTOS.'.Evento_Id')
                        ->join('Usuarios', 'Usuarios.Id = '.self::TABLAEVENTOS.'.Perfil_Id')
                        ->get()->result();
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