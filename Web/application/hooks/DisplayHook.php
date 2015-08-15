<?php

/**
 * DisplayHook short summary.
 *
 * DisplayHook description.
 *
 * @version 1.0
 * @author Álvaro
 */
class DisplayHook
{
    public function captureOutput()
    {
        $this->CI =& get_instance();
        $output = $this->CI->output->get_output();
        if (ENVIRONMENT != 'testing') {
            echo $output;
        }
    }
}
