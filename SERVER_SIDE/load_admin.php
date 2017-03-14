<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("127.0.0.1", "root", "", "dj");

    // Adding has more
    $result = $conn->query("SELECT count(*) as total from shout_outs");
    $data = $result->fetch_array(MYSQLI_ASSOC);
    $shout_outs = $data['total'];

    $result = $conn->query("SELECT count(*) as total from user_choice");
    $data = $result->fetch_array(MYSQLI_ASSOC);
    $songRequests = $data['total'];
                                 
    $outp = '{"shout_outs":'.$shout_outs.',"songRequests":'.$songRequests.'}';
    //$outp ='{"has_more":'.$has_more.',"records":['.$outp.']}';

    $conn->close();
    echo $outp;
?>