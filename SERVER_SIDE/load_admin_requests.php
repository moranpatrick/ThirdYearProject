<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("127.0.0.1", "root", "", "dj");

    $query="SELECT id, artist, title, genre, inserted FROM user_choice ORDER BY inserted DESC;";

    $result = $conn->query($query);
    $outp = "";
    
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {
            $outp .= ",";
        }
        $outp .= '{"id":"'  . $rs["id"] . '",';
		$outp .= '"artist":"'   . $rs["artist"]        . '",';
        $outp .= '"title":"'   . $rs["title"]        . '",';
		$outp .= '"genre":"'   . $rs["genre"]        . '",';
	    $outp .= '"inserted":"'. $rs["inserted"]     . '"}';
    }  
                              
    $outp = '{"song_requests":['.$outp.']}';

    $conn->close();
    echo $outp;
?>