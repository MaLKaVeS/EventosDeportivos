<?php
/**
 * Part of CI PHPUnit Test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

include 'C:\Proyectos\EventosDeportivos\Web\application\models\Usuario.php';

class Usuarios_test extends TestCase
{
    private $usuarios = 0;

    public function setUp()
    {
        $this->resetInstance();
        $this->CI->load->model('Usuario');
        $this->obj = $this->CI->Usuario;

        $usuarios = $this->obj->get();
        //$this->usuarios = count();
        $this->obj->db->trans_start();
        foreach ($usuarios as $_usuario)
        {
            $this->obj->Id = $_usuario->Id;
        	$this->obj->delete();
        }
        $this->obj->db->trans_complete();
    }

	public function test_get()
	{
        $_actual = $this->obj->get();
        
        $msg = 'Número de usuarios no esperado. Obtenidos: '.count($_actual);

        $this->assertCount($this->usuarios, $_actual, $msg);
	}

    /**
     * @depends test_get
     */
    public function test_esMailValido() {
        $this->obj->Email = "prueba@local.com";

        $result = $this->obj->esMailValido();

        $this->assertTrue($result);
    }

    /**
     * @depends test_esMailValido
     */
    public function test_insert()
	{
        $fecha = getdate();

        $this->obj->Apellidos = "Pruebas Probadas";
        $this->obj->Email = "prueba@local.com";
        $this->obj->FechaAlta = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
        $this->obj->FechaNacimiento = 20150801;
        $this->obj->Nombre = "Usuario";
        $this->obj->HoraAlta = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
        
        $_actual = $this->obj->insert();
        
        $this->assertTrue($_actual);
	}
    /**
     * @depends test_insert
     */
    public function test_esMailValido_FAIL() {
        $this->obj->Email = "prueba@local.com";

        $result = $this->obj->esMailValido();

        $this->assertTrue($result);
    }

    /**
     * @depends test_esMailValido_FAIL
     */
    public function test_insert_FAIL()
	{
        $fecha = getdate();

        $this->obj->Apellidos = "Pruebas Probadas";
        $this->obj->Email = "prueba@local.com";
        $this->obj->FechaAlta = $fecha["year"] * 10000 + $fecha["mon"] * 100 + $fecha["mday"];
        $this->obj->FechaNacimiento = 20150801;
        $this->obj->Nombre = "Usuario";
        $this->obj->HoraAlta = $fecha["hours"] * 10000 + $fecha["minutes"] * 100 + $fecha["seconds"];
        
        $_actual = $this->obj->insert();
        
        $this->assertFalse($_actual);
	}
}