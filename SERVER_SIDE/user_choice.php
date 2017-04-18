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

        $artist = $request->a;  
        $title = $request->t; 
        $genre = $request->g;

        $conn = new mysqli("127.0.0.1", "root", "", "dj");	

        //allows for special characters eg. ' or "
        $artist = $conn->real_escape_string($artist);
        $title = $conn->real_escape_string($title);
        $genre = $conn->real_escape_string($genre);

        $sql = "INSERT INTO user_choice(artist, title, genre) VALUES('$artist', '$title', '$genre')";

        if ($conn->query($sql) === TRUE) {
            //successfully inserted 
            $outp = '{"result": {"inserted": "1"} }';
        }
        else{
            //unable to insert
            $outp = '{"result": {"inserted": "0"} }';
        } 

        echo $outp;
        
        $conn->close();	

    }//if

?>