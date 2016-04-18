<?php
    require_once('fun/score_fun.php');
    $key = NULL;
    $score = NULL;

    if(isset($_GET["key"])){
        $key=$_GET["key"];
    }
    if(isset($_GET["score"])){
        $score=$_GET["score"];
    }
    writeScore($key, $score);
?>