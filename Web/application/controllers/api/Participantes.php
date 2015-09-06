<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * Controlador para gestionar los datos de las actividades
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Participantes extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['participantes_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['participante_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['evento_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['eventos_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['participantes_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['participantes_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['participantes_delete']['limit'] = 50; // 50 requests per hour per user/key
        $this->methods['inscribir_post']['limit'] = 100; // 100 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Participante');
    }

    /**
     * Inscribe a un usuario en un evento
     */
    public function inscribir_post()
    {
        $evento_id = $this->post('Evento_Id');
        $usuario_id = $this->post('Usuario_Id');

        if (!isset($evento_id) || !isset($usuario_id))
        {
            $this->response([
                    'status' => FALSE,
                    'message' => 'No se indicaron los datos de evento o de usuario'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
        }

        if ($this->Participante->inscribir_participante($usuario_id, $evento_id))
        {
            $this->response([
                    'status' => FALSE,
                    'message' => 'Participante inscrito'
                ], REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {
            $this->response([
                    'status' => FALSE,
                    'message' => 'Error al grabar el usuario'
                ], REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
    }

    /**
     * Recupera los eventos para los que está inscrito un participante.
     */
    public function participante_get($usuario_id)
    {
        $this->Participante->Usuario_Id = $usuario_id;
        $eventos = $this->Participante->getPerfilesUsuario();

        // Miramos si el resultado contiene algo
        if ($eventos)
        {
            // Set the response and exit
            $this->response($eventos, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {            
            // No hay un rol para ese identificador
            $this->set_response([
               'status' => FALSE,
               'message' => 'No se encontraron eventos'
            ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code            
        }
    }

    public function eventos_get($usuario_id)
    {
        $this->Participante->Usuario_Id = $usuario_id;
        $eventos = $this->Participante->getEventosUsuario();

        // Miramos si el resultado contiene algo
        if ($eventos)
        {
            // Set the response and exit
            $this->response($eventos, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {            
            // No hay un rol para ese identificador
            $this->set_response([
               'status' => FALSE,
               'message' => 'No se encontraron eventos'
            ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code            
        }
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function evento_get($evento_id = NULL)
    {
        $inscripciones = $this->Participante->getParticipantesEvento($evento_id);

        // Miramos si el resultado contiene algo
        if ($inscripciones)
        {
            // Set the response and exit
            $this->response($inscripciones, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {            
            // No hay un rol para ese identificador
            $this->set_response([
               'status' => FALSE,
               'message' => 'No se encontro el Encuentro'
            ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code            
        }
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function participantes_get($encuentroo_id = NULL)
    {
        $encuentro = $this->Participante->getByEventoId($evento_id);

        // Miramos si el resultado contiene algo
        if ($encuentro)
        {
            // Set the response and exit
            $this->response($encuentro, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {            
            // No hay un rol para ese identificador
            $this->set_response([
               'status' => FALSE,
               'message' => 'No se encontro el Encuentro'
            ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code            
        }
    }

    /**
     * Inserta un nuevo Rol en la base de datos
     */
    public function participantes_post()
    {
        $this->Participante->Id = $this->post('Id');
        $this->Participante->Evento_Id = $this->post('Evento_Id');
        $this->Participante->Ronda = $this->post('Ronda');
        $this->Participante->Lugar = $this->post('Lugar');
        $this->Participante->Partes = $this->post('Partes');
        $this->Participante->Duracion = $this->post('Duracion');
        $this->Participante->Estado = 0;
        $this->Participante->Fecha = $this->post('Fecha');
        $this->Participante->Hora = $this->post('Hora');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Participante->insert())
        {
            $msg =sprintf('Encuentro %s creado con exito', $this->Participante->Id);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar el Encuentro %s', $this->Participante->Id);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        $this->set_response($message, $status);
    }

    /**
     * Actualiza los datos de un rol
     */
    public function participantes_put()
    {
        $this->Participante->Id = $this->put('Id');
        $this->Participante->Evento_Id = $this->put('Evento_Id');
        $this->Participante->Ronda = $this->put('Ronda');
        $this->Participante->Lugar = $this->put('Lugar');
        $this->Participante->Partes = $this->put('Partes');
        $this->Participante->Duracion = $this->put('Duracion');
        $this->Participante->Estado = $this->put('Estado');
        $this->Participante->Fecha = $this->put('Fecha');
        $this->Participante->Hora = $this->put('Hora');

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Participante->update())
        {
            $msg =sprintf('Encuentro %s actualizado con exito', $this->Participante->Id);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar el Encuentro %s', $this->Participante->Id);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        $this->set_response($message, $status);
    }

    /**
     * Borra una actividad
     */
    public function participantes_delete($id)
    {
        $this->Participante->Id  = $id;

        // Identificador válido
        if (strlen($this->Participante->Id) <= 0)
        {
            $msg = sprintf('Error al borrar el Encuentro %s', $this->Participante->Id);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Participante->delete();
            $msg = sprintf('Encuentro %s eliminado', $this->Participante->Id);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }
}