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
class Actividades extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['actividades_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['actividades_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['actividades_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['actividades_delete']['limit'] = 50; // 50 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Actividad');
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function actividades_get()
    {
        // Miramos si hay un identificador en la petición.
        $id = $this->get('id');

        $actividades = $this->Actividad->get($id);

        // Miramos si el resultado contiene algo
        if ($actividades)
        {
            // Set the response and exit
            $this->response($actividades, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {
            if ($id === NULL)
            {
                // No hay roles en la bbdd
                $this->response([
                    'status' => FALSE,
                    'message' => 'No se encontraron actividades'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
            else if (FALSE)
            {
                // Identificador no valido.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) HTTP response code
            }
            else
            {
                // No hay un rol para ese identificador
                $this->set_response([
                   'status' => FALSE,
                   'message' => 'No se encontro la Actividad'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
        }
    }

    /**
     * Inserta un nuevo Rol en la base de datos
     */
    public function actividades_post()
    {
        $this->Actividad->Nombre = $this->post('Nombre');
        $this->Actividad->Descripcion = $this->post('Descripcion');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Actividad->insert())
        {
            $msg =sprintf('Actividad %s creada con exito', $this->Actividad->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar la Actividad %s', $this->Actividad->Nombre);
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
    public function actividades_put()
    {
        $this->Actividad->Id = $this->put('Id');
        $this->Actividad->Nombre = $this->put('Nombre');
        $this->Actividad->Descripcion = $this->put('Descripcion');

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Actividad->update())
        {
            $msg =sprintf('Actividad %s actualizada con exito', $this->Actividad->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar la Actividad %s', $this->Actividad->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        $this->set_response($message, $status);
    }

    /**
     * Borra un rol
     */
    public function actividades_delete($id)
    {
        $this->Actividad->Id  = $id;

        // Identificador válido
        if (strlen($this->Actividad->Id) <= 0)
        {
            $msg = sprintf('Error al borrar la Actividad %s', $this->Actividad->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Actividad->delete();
            $msg = sprintf('Actividad %s eliminada', $this->Actividad->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }
}