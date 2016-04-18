<?php
    require_once('fun/score_fun.php');
    $key = NULL;

    if(isset($_GET["key"])){
        $key=$_GET["key"];
    }

    if($key != NULL) {
        echo "score:".readScore($key);
    }
?>