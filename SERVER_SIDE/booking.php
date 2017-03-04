<?php
    
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
        exit(0);
    }
    
    $message = "Name: " . $_POST["name"] . "\nNumber: " . $_POST["number"] . "\nMessage: " . $_POST["message"];
    $message = htmlspecialchars($message);
    $message = stripslashes($message);

    echo "Message: " . $message.name;

    $to = "patrickmoran121@gmail.com";
    $subject = "Message from " . $_POST["name"];
    $header = "Test Header";

    ini_set( 'sendmail_from', "patrickmoran121@gmail.com"); 
    ini_set( 'SMTP', "mail.google.com" ); 
    ini_set( 'smtp_port', 25 );



?>