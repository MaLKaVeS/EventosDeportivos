<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/admin
	 *	- or -
	 * 		http://example.com/index.php/admin/index
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->helper('url');
        //if ( strpos($_SERVER['HTTP_HOST'], 'http://aglinformatica.es:6080/') !== false)
        //{   
        //    $this->load->view('admin_deploy');
        //}
        //else
        //{
            $this->load->view('admin');
        //}
	}
}