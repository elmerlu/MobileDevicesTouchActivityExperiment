<?php 
    require_once('file.php');

    function writeScore($key, $score) {
        $data = array('score' => $score);
        write("$key.tmp", json_encode($data));
    }

    function readScore($key) {
        $data = json_decode(read("$key.tmp"), true);
        return $data['score'];
    }
?>