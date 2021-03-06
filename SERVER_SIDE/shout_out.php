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
    $postdata = file_get_contents("php://input");

    if (isset($postdata)) {
        $request = json_decode($postdata);

        $name = $request->n;  
        $message = $request->m; 

        $conn = new mysqli("127.0.0.1", "root", "", "dj");	

        $name = $conn->real_escape_string($name);
        $message = $conn->real_escape_string($message);

        $sql = "INSERT INTO shout_outs(name, message) VALUES('$name', '$message')";
        //Successfully Inputed
        if ($conn->query($sql) === TRUE) {
            $outp = '{"result": {"inserted": "1"} }';
        }
        else{
            //Error inserting query
            $outp = '{"result": {"inserted": "0"} }';
        } 

        echo $outp;
        
        $conn->close();	
    }//if
?>