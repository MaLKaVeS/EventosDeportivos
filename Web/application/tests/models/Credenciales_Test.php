<?php
/**
 * Part of CI PHPUnit Test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

include 'C:\Proyectos\EventosDeportivos\Web\application\models\Credencial.php';

class Credenciales_test extends TestCase
{
    public function setUp()
    {
        $this->resetInstance();
        $this->CI->load->model('Credencial');
        $this->obj = $this->CI->Credencial;
    }

	public function test_get()
	{
		$credencial = new Credencial();

        $_actual = $credencial->get('');

        $msg = 'Número de usuarios no esperado. Obtenidos: '.count($_actual);

        
        $this->assertCount(0, $_actual, $msg);
	}
}