<?php
/**
 * Part of CI PHPUnit Test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

include 'C:\Proyectos\EventosDeportivos\Web\application\models\Rol.php';

class Roles_test extends TestCase
{
    public function setUp()
    {
        $this->resetInstance();
        $this->CI->load->model('Rol');
        $this->obj = $this->CI->Rol;
    }

	public function test_get()
	{
		$rol = new Rol();

        $_actual = $rol->get();
        
        $this->assertCount(0, $_actual, 'Número de resultados no esperado');
	}
}