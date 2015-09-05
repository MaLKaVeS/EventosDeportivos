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
class Usuarios extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['usuarios_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['usuarios_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['usuarios_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['usuarios_delete']['limit'] = 50; // 50 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Usuario');
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function usuarios_get()
    {
        // Miramos si hay un identificador en la petición.
        $id = $this->get('id');

        $usuarios = $this->Usuario->get($id);

        // Miramos si el resultado contiene algo
        if ($usuarios)
        {
            // Set the response and exit
            $this->response($usuarios, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {
            if ($id === NULL)
            {
                // No hay roles en la bbdd
                $this->response([
                    'status' => FALSE,
                    'message' => 'No se encontraron usuarios'
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
                   'message' => 'No se encontro el Usuario'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
        }
    }

    /**
     * Inserta un nuevo Rol en la base de datos
     */
    public function usuarios_post()
    {
        $this->Usuario->Nombre = $this->post('Nombre');
        $this->Usuario->Apellidos = $this->post('Apellidos');
        $this->Usuario->Email = $this->post('Email');
        $this->Usuario->FechaNacimiento = $this->post('FechaNacimiento');
        $clave = $this->post('clave');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Usuario->insert($clave))
        {
            $msg =sprintf('Usuario %s creada con exito', $this->Usuario->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar el Usuario %s', $this->Usuario->Nombre);
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
    public function usuarios_put()
    {
        $this->Usuario->Id = $this->put('Id');
        $this->Usuario->Nombre = $this->post('Nombre');
        $this->Usuario->Apellidos = $this->post('Apellidos');
        $this->Usuario->Email = $this->post('Email');
        $this->Usuario->FechaNacimiento = $this->post('FechaNacimiento');

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Usuario->update())
        {
            $msg = sprintf('Usuario %s actualizado con exito', $this->Usuario->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar el Usuario %s', $this->Usuario->Nombre);
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
    public function usuarios_delete($id)
    {
        $this->Usuario->Id  = $id;

        // Identificador válido
        if (strlen($this->Usuario->Id) <= 0)
        {
            $msg = sprintf('Error al borrar el Usuario %s', $this->Usuario->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Usuario->delete();
            $msg = sprintf('Usuario %s eliminado', $this->Usuario->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }

    public function rol_post()
    {
        $this->load->model('RolUsuarios');
        
        $this->RolUsuarios->Rol_Id = $this->post('rol');
        $this->RolUsuarios->Usuario_Id = $this->post('usuario');

        if ($this->RolUsuarios->insert())
        {
            $status = REST_Controller::HTTP_OK; // BAD_REQUEST (400) HTTP response code
            $msg = sprintf('Rol asignado a Usuario', $this->Usuario->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
        }
        else
        {
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
            $msg = 'Error al asignar el rol del usuario';
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
        }
        $this->set_response($message, $status);

    }

    public function rol_delete($rol, $usuario)
    {
        $this->load->model('RolUsuarios');
        
        $this->RolUsuarios->Rol_Id = $rol;
        $this->RolUsuarios->Usuario_Id = $usuario;

        if ($this->RolUsuarios->delete())
        {
            $status = REST_Controller::HTTP_OK; // OK (200) HTTP response code
            $msg = sprintf('Rol eliminado del Usuario', $this->Usuario->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
        }
        else
        {
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
            $msg = sprintf('Error al eliminar Rol del Usuario', $this->Usuario->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
        }
        $this->set_response($message, $status);
    }

    public function acceso_post()
    {
        $email = $this->post('Usuario');
        $clave = $this->post('Clave');

        $resultado = $this->Usuario->acceso($email, $clave);
        $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        if ($resultado)
        {
            $status = REST_Controller::HTTP_OK; // OK (200) HTTP response code
            $msg = 'Acceso correcto';
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $_SESSION["usuario"] = $this->post('Usuario');
        }
        else
        {
            $msg = 'Acceso incorrecto';
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
        }
        $this->set_response($message, $status);
    }
}