<?php
    require_once('fun/score_fun.php');
    $key = NULL;

    if(isset($_GET["key"])){
        $key=$_GET["key"];
    }

    if($key != NULL) {
        $score = readScore($key);
        echo $score === null ? null : "score:".$score;
    }
?>