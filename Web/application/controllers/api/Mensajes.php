<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * Controlador para gestionar los datos de las Mensajees
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Mensajes extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['mensajes_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['mensajes_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['mensajes_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['mensajes_delete']['limit'] = 50; // 50 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Mensaje');
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function mensajes_get($id = NULL)
    {
        $mensajes = $this->Mensaje->get($id);

        // Miramos si el resultado contiene algo
        if ($mensajes)
        {
            // Set the response and exit
            $this->response($mensajes, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {
            if ($id === NULL)
            {
                // No hay roles en la bbdd
                $this->response([
                    'status' => FALSE,
                    'message' => 'No se encontraron Mensajees'
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
                   'message' => 'No se encontro el Mensaje'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
        }
    }

    /**
     * Inserta un nuevo Rol en la base de datos
     */
    public function mensajes_post()
    {
        $this->Mensaje->Asunto = $this->post('Asunto');
        $this->Mensaje->EmailContacto = $this->post('EmailContacto');
        $this->Mensaje->TextoMensaje = $this->post('Nombre').''.$this->post('Apellidos').' - '.$this->post('TextoMensaje');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Mensaje->insert())
        {
            $msg =sprintf('Mensaje %s creado con exito', $this->Mensaje->Asunto);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar el Mensaje %s', $this->Mensaje->Asunto);
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
    public function mensajes_put()
    {
        $this->Mensaje->Id = $this->put('Id');
        $this->Mensaje->Nombre = $this->put('Nombre');
        $this->Mensaje->Descripcion = $this->put('Descripcion');
        $this->Mensaje->Icono = $this->put('Icono');
        $this->Mensaje->Imagen = $this->put('Imagen');
        $this->Mensaje->ImagenPortada = 'ImagenPortada';

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Mensaje->update())
        {
            $msg =sprintf('Mensaje %s actualizado con exito', $this->Mensaje->Asunto);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar el Mensaje %s', $this->Mensaje->Asunto);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        $this->set_response($message, $status);
    }

    /**
     * Borra una Mensaje
     */
    public function mensajes_delete($id)
    {
        $this->Mensaje->Id  = $id;

        // Identificador válido
        if (strlen($this->Mensaje->Id) <= 0)
        {
            $msg = sprintf('Error al borrar el Mensaje %s', $this->Mensaje->Asunto);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Mensaje->delete();
            $msg = sprintf('Mensaje %s eliminado', $this->Mensaje->Asunto);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }
}