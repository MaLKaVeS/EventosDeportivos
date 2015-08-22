<?php
/**
 * Part of CI PHPUnit Test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

include 'C:\Proyectos\EventosDeportivos\Web\application\models\Acceso.php';

class Accesos_test extends TestCase
{
    public function setUp()
    {
        $this->resetInstance();
        $this->CI->load->model('Acceso');
        $this->obj = $this->CI->Acceso;
    }

	public function test_get()
	{
		$acceso = new Acceso();

        $_actual = $acceso->get('');

        $msg = 'Número de accesos no esperado. Obtenidos: '.count($_actual);
        
        $this->assertCount(0, $_actual, $msg);
	}
}