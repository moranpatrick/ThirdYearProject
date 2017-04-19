<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("127.0.0.1", "root", "", "dj");

    $query="SELECT id, name, message, inserted FROM shout_outs ORDER BY inserted desc";

    $result = $conn->query($query);
    $outp = "";
    
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {
            $outp .= ",";
        }
        $outp .= '{"id":"'  . $rs["id"] . '",';
		$outp .= '"name":"'  . $rs["name"] . '",';
        $outp .= '"message":"'   . $rs["message"]        . '",';
	    $outp .= '"inserted":"'. $rs["inserted"]     . '"}';
    }  
                              
    $outp = '{"shout_outs":['.$outp.']}';

    $conn->close();
    echo $outp;
?>