<?php
    require_once('config/config.php');
    
    function write($filename, $data) {
        global $dir_path;
        $myfile = fopen("$dir_path/$filename", "w");

        fwrite($myfile, $data);
        fclose($myfile);
    }

    function read($filename) {
        global $dir_path;
        $data = @file_get_contents("$dir_path/$filename");
        return $data === FALSE ? null : $data;
    }
?>