<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * Controlador base para la API basado en el ejemplo de la biblioteca REST
 * El modelo es ROL que será la clave de los permisos de acceso a la app.
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Roles extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['act_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['rol_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['rol_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['rol_delete']['limit'] = 50; // 50 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Rol');
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function roles_get()
    {
        // Miramos si hay un identificador en la petición.
        $id = $this->get('id');

        $roles = $this->Rol->get($id);

        // Miramos si el resultado contiene algo
        if ($roles)
        {
            // Set the response and exit
            $this->response($roles, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {
            if ($id === NULL)
            {
                // No hay roles en la bbdd
                $this->response([
                    'status' => FALSE,
                    'message' => 'No se encontraron roles'
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
                   'message' => 'No se encontro el usuario'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
        }
    }

    /**
     * Inserta un nuevo Rol en la base de datos
     */
    public function roles_post()
    {
        $this->Rol->Nombre = $this->post('Nombre');
        $this->Rol->Descripcion = $this->post('Descripcion');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Rol->insert())
        {
            $msg =sprintf('Rol %s creado con exito', $this->Rol->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar el Rol %s', $this->Rol->Nombre);
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
    public function roles_put()
    {
        $this->Rol->Id = $this->put('Id');
        $this->Rol->Nombre = $this->put('Nombre');
        $this->Rol->Descripcion = $this->put('Descripcion');

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Rol->update())
        {
            $msg =sprintf('Rol %s actualizado con exito', $this->Rol->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar el Rol %s', $this->Rol->Nombre);
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
    public function roles_delete()
    {
        $this->Rol->Id  = $this->delete('Id');

        // Identificador válido
        if (strlen($this->Rol->Id) <= 0)
        {
            $msg = sprintf('Error al borrar el Rol %s', $this->Rol->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Rol->delete();
            $msg = sprintf('Rol %s eliminado', $this->Rol->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }

}