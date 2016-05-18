<?php 
    require_once('file.php');

    function writeScore($key, $score) {
        $data = json_decode(read("score.tmp"), true);
        if($data != null) {
            $data[$key] = $score;
        }else {   
            $data = array($key => $score); 
        }
        write("score.tmp", json_encode($data));
    }

    function readScore($key) {
        $data = json_decode(read("score.tmp"), true);
        return $data[$key];
    }
?>