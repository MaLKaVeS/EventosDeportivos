<?php

/**
 * ParticipanteEvento short summary.
 *
 * ParticipanteEvento description.
 *
 * @version 1.0
 * @author Álvaro
 */
class ParticipanteEvento extends CI_Model
{
    public $Evento_Id;
    public $Evento_Id1;
    public $Perfil_Id;
    public $Perfil_Id1;
    public $FechaInscripcion;
    public $HoraInscripcion;

    const TABLA  = "PerfilEventoes";

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get()
    {
        return $this->db
            ->where('Evento_Id', $this->Evento_Id)
            ->where('Perfil_Id', $this->Perfil_Id)
            ->get(self::TABLA)
            ->row();
    }

    public function getByEvento()
    {
        return $this->db
            ->where('Evento_Id', $this->Evento_Id)
            ->get(self::TABLA)->result();
    }

    public function getByUsuario()
    {
        return $this->db
            ->where('Perfil_Id', $this->Perfil_Id)
            ->get(self::TABLA)->result();
    }

    public function insert()
    {
        return $this->db->insert(self::TABLA, $this);
    }

}