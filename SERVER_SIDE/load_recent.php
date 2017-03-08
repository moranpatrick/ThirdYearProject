<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("127.0.0.1", "root", "", "dj");

    $till = 10;

    if(isset($_GET["till"]) && !empty($_GET["till"]) ){
		$till = $_GET["till"];
		$till = $conn->real_escape_string($till);
	}

    $query="SELECT artist, title, genre FROM chart_recent where id <= $till";

    $result = $conn->query($query);
    $outp = "";
    
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"artist":"'  . $rs["artist"] . '",';
        $outp .= '"title":"'   . $rs["title"]        . '",';
	    $outp .= '"genre":"'. $rs["genre"]     . '"}';
    }   


    // Adding has more
    $result = $conn->query("SELECT count(*) as total from chart_recent");
    $data = $result->fetch_array(MYSQLI_ASSOC);
    $total = $data['total'];

    if(($total - $till) > 0){
        $has_more = $total - $till;
    }
    else{
        $has_more = 0;
    }
                                 
    $outp ='{"has_more":'.$has_more.',"records":['.$outp.']}';
     
    $conn->close();
    echo $outp;
?>