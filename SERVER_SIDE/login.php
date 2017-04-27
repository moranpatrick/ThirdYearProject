<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//if parameters are passed through e and p and they are not emmpty
if( isset($_GET["e"]) && isset($_GET["p"]) ){	
		if( !empty($_GET["e"])  && !empty($_GET["p"])  ){	
			
            $conn = new mysqli("127.0.0.1", "root", "", "dj");						
			
            $email=$_GET["e"];		
			$password=$_GET["p"];				
			
			// To protect MySQL injection for Security purpose		
			$email = stripslashes($email);		
			$password = stripslashes($password);		
			$email = $conn->real_escape_string($email);		
			$password = $conn->real_escape_string($password);		
			$salt = sha1(md5($password));
			$password = md5($password.$salt); 	
			
			$query = "SELECT email, username, password FROM users where email like '".$email."' and password like '".$password."'";	
					
			$result = $conn->query($query);		
            $outp = "";				
			//Returns an array that corresponds to the fetched row
			if( $rs = $result->fetch_array(MYSQLI_ASSOC)) {			
				
				if ($outp != "") {
					$outp .= ",";
				}
				
				$outp .= '{"email":"'  . $rs["email"] . '",';			
				$outp .= '"username":"'   . $rs["username"] . '"}';			
			}			
			$outp ='{"records":'.$outp.'}';		
			
            $conn->close();		
			echo($outp);	
		}
	}
	
?> 