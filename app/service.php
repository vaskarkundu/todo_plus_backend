<?php
session_start();

$postData = file_get_contents("php://input");


if(!empty($postData)){

    require_once "scripts/auth.php";
    $data = json_decode($postData, true);
    if($data['route']=="signup"){
        $response = new Authenticate($data);
        
    }else if($data['route']=="login"){
        $response = new Authenticate($data);
        
    }  
}else{
    echo "<h1>NOT FOUND</h1>";
}

?>
