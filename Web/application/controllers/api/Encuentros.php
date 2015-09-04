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
class Encuentros extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['encuentro_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['evento_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['encuentros_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['encuentros_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['encuentros_delete']['limit'] = 50; // 50 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Encuentro');
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function encuentro_get($id = NULL)
    {
        $encuentro = $this->Encuentro->getById($id);

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
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function evento_get($evento_id = NULL)
    {
        $encuentro = $this->Encuentro->getByEventoId($evento_id);

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
    public function encuentros_post()
    {
        $this->Encuentro->Evento_Id = $this->post('Evento_Id');
        $this->Encuentro->Ronda = $this->post('Ronda');
        $this->Encuentro->Lugar = $this->post('Lugar');
        $this->Encuentro->Partes = $this->post('Partes');
        $this->Encuentro->Duracion = $this->post('Duracion');
        $this->Encuentro->Estado = 0;
        $this->Encuentro->Fecha = $this->post('Fecha');
        $this->Encuentro->Hora = $this->post('Hora');
        $this->Encuentro->FechaInicio = $this->post('Fecha');
        $this->Encuentro->HoraInicio = $this->post('Hora');
        $this->Encuentro->TiempoTranscurrido = $this->post('Hora');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Encuentro->insert())
        {
            $msg =sprintf('Encuentro %s creado con exito', $this->Encuentro->Id);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar el Encuentro %s', $this->Encuentro->Id);
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
    public function encuentros_put()
    {
        $this->Encuentro->Id = $this->put('Id');
        $this->Encuentro->Evento_Id = $this->put('Evento_Id');
        $this->Encuentro->Ronda = $this->put('Ronda');
        $this->Encuentro->Lugar = $this->put('Lugar');
        $this->Encuentro->Partes = $this->put('Partes');
        $this->Encuentro->Duracion = $this->put('Duracion');
        $this->Encuentro->Estado = $this->put('Estado');
        $this->Encuentro->Fecha = $this->put('Fecha');
        $this->Encuentro->Hora = $this->put('Hora');

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Encuentro->update())
        {
            $msg =sprintf('Encuentro %s actualizado con exito', $this->Encuentro->Id);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar el Encuentro %s', $this->Encuentro->Id);
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
    public function encuentros_delete($id)
    {
        $this->Encuentro->Id  = $id;

        // Identificador válido
        if (strlen($this->Encuentro->Id) <= 0)
        {
            $msg = sprintf('Error al borrar el Encuentro %s', $this->Encuentro->Id);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Encuentro->delete();
            $msg = sprintf('Encuentro %s eliminado', $this->Encuentro->Id);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }
}