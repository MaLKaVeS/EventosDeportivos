<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * Controlador para gestionar los datos de los eventos
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Eventos extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['eventos_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['eventos_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['eventos_put']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['eventos_delete']['limit'] = 50; // 50 requests per hour per user/key

        // Cargamos el modelo
        $this->load->model('Evento');
    }

    /**
     * Recupera un rol si se envía el parametro id. Si no todos los roles en la base de datos.
     */
    public function eventos_get()
    {
        // Miramos si hay un identificador en la petición.
        $id = $this->get('id');
        $actividad = $this->get('actividad');

        $eventos = $this->Evento->get($actividad, $id);

        // Miramos si el resultado contiene algo
        if ($eventos)
        {
            // Set the response and exit
            $this->response($eventos, REST_Controller::HTTP_OK); // OK (200) HTTP response code
        }
        else
        {
            if ($id === NULL && $actividad === NULL)
            {
                // No hay eventos en la bbdd
                $this->response([
                    'status' => FALSE,
                    'message' => 'No se encontraron eventos'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
            else if (FALSE)
            {
                // Identificador no valido.
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) HTTP response code
            }
            else
            {
                // No hay un evento para ese identificador y actividad
                $this->set_response([
                   'status' => FALSE,
                   'message' => 'No se encontro el Evento'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) HTTP response code
            }
        }
    }

    /**
     * Inserta un nuevo Rol en la base de datos
     */
    public function eventos_post()
    {
        $this->Evento->Actividad_Id = $this->post('Actividad_Id');
        $this->Evento->Nombre = $this->post('Nombre');
        $this->Evento->Descripcion = $this->post('Descripcion');
        $this->Evento->FechaInicio = $this->post('FechaInicio');
        $this->Evento->FechaFin = $this->post('FechaFin');
        $this->Evento->HoraInicio = $this->post('HoraInicio');
        $this->Evento->HoraFin = $this->post('HoraFin');
        $this->Evento->Estado = $this->post('Estado');
        $this->Evento->EstadoRegistro = $this->post('EstadoRegistro');

        $status  = REST_Controller::HTTP_CREATED; // CREATED (201) HTTP response code
        if ($this->Evento->insert())
        {
            $msg =sprintf('Evento %s creada con exito', $this->Evento->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al insertar el Evento %s', $this->Evento->Nombre);
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
    public function eventos_put()
    {
        $this->Evento->Id = $this->post('Id');
        $this->Evento->Actividad_Id = $this->post('Actividad_Id');
        $this->Evento->Nombre = $this->post('Nombre');
        $this->Evento->Descripcion = $this->post('Descripcion');
        $this->Evento->FechaInicio = $this->post('FechaInicio');
        $this->Evento->FechaFin = $this->post('FechaFin');
        $this->Evento->HoraInicio = $this->post('HoraInicio');
        $this->Evento->HoraFin = $this->post('HoraFin');
        $this->Evento->Estado = $this->post('Estado');
        $this->Evento->EstadoRegistro = $this->post('EstadoRegistro');

        $status =  REST_Controller::HTTP_ACCEPTED; // CREATED (202) HTTP response code

        if ($this->Evento->update())
        {
            $msg =sprintf('Evento %s actualizado con exito', $this->Evento->Nombre);
            $message = [
                    'status' => FALSE,
                    'message' => $msg
                ];
        }
        else
        {
            $msg = sprintf('Error al actualizar el Evento %s', $this->Evento->Nombre);
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
    public function eventos_delete()
    {
        $this->Evento->Id  = $this->delete('Id');
        $this->Evento->Actividad_Id  = $this->delete('Actividad_Id');

        // Identificador    
        if (strlen($this->Evento->Id) <= 0 || strlen($this->Evento->Actividad_Id) <= 0)
        {
            $msg = sprintf('Error al borrar el Evento %s', $this->Evento->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status = REST_Controller::HTTP_BAD_REQUEST; // BAD_REQUEST (400) HTTP response code
        }
        else
        {

            $this->Evento->delete();
            $msg = sprintf('Evento %s eliminado', $this->Evento->Nombre);
            $message = [
                    'status' => TRUE,
                    'message' => $msg
                ];
            $status =  REST_Controller::HTTP_NO_CONTENT; // CREATED (204) HTTP response code
        }
        $this->set_response($message, $status);
    }
}