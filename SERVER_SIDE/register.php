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
		
		$email = $request->e;  
		$username = $request->u; 		
		$password = $request->p;

		$salt = sha1(md5($password));
		$password = md5($password.$salt); 
		//$password = md5($password);
	
		$conn = new mysqli("127.0.0.1", "root", "", "dj");
		//Check database for existing user - using username as its primary key
		$check_username = "SELECT count(*) FROM users WHERE email = '$email'";
		$rs = mysqli_query($conn, $check_username);
		$data = mysqli_fetch_array($rs, MYSQLI_NUM);

		if($data[0] > 0) {
			$outp='{"result":{"success": "0" , "exists": "1" } }';
		}
		else{	
			$sql = "INSERT INTO users VALUES('$email', '$username', '$password')";		
			if ($conn->query($sql) === TRUE) {
				$outp='{"result":{"success": "1", "exists": "0" } }';
			} 
		}
		
		echo $outp;
		
		$conn->close();	
	
    }

?> 