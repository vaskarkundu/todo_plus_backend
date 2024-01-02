<?php
 class Authenticate{


    function __construct($data){
        include_once "connection.php";

        $connection = new Connection();

        $conn = $connection->getConnection();

        self::handleRoute( $conn,$data); 
    }


    static private function handleRoute( $conn,$data)
    {
          $route = $data['route'];
        if ($route == 'signup') {
            self::signup($conn, $data);    
        
        } else{
            $response = ['status' => 404, 'msg' => "Route not found"];
            echo json_encode($response);
           
        }
       
    }


    static private function signup($conn,$data){

    
        $username = $data['username'];
        $email = $data['email'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $dateOfBirth = $data['date_of_birth'];

        $password = $data['password'];
        if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!&])[A-Za-z\d@#$%!&]{8,}$/', $password)) {
            $res = array('status' => 400, 'errMsg' => 'Password must meet the specified criteria.');
            echo json_encode($res);
            return;
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT); 

        if (!isset($username) || !is_string($username) || empty($username)) {
            $res = array('status' => 400, 'msg' => 'Username must be a non-empty string.');
            echo json_encode($res);
            return;

        }
        if (!isset($firstname) || !is_string($firstname) || empty($firstname)) {
            $res = array('status' => 400, 'msg' => 'Firstname must be a non-empty string.');
            echo json_encode($res);
            return;
        

        }
        if (!isset($lastname) || !is_string($lastname) || empty($lastname)) {
            $res = array('status' => 400, 'msg' => 'Lastname must be a non-empty string.');
            echo json_encode($res);
            return;

        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $res = array('status' => 400, 'msg' => 'Invalid email address');
            echo json_encode($res);
            return;
        }

        if (strtotime($dateOfBirth) === false || strtotime($dateOfBirth) >= time()) {
            $res = array('status' => 400, 'msg' => 'Invalid date of birth. It must be a valid date and previous to today.');
            echo json_encode($res);
            return;
        }
        
        $query = "SELECT * FROM todo_profile_list WHERE email = '$email'";
        $result = mysqli_query($conn, $query);

        if($result  && mysqli_num_rows($result) > 0){
            $res =  array('status' => 400, 'msg' => 'This user is already exits');
            echo json_encode($res);
            return;
        }


        $query = "INSERT INTO todo_profile_list (username, email, password, firstname, lastname, date_of_birth) 
                  VALUES ('$username', '$email', '$hashedPassword', '$firstname', '$lastname', '$dateOfBirth')";

   
    $result = mysqli_query($conn, $query);
 
    if ($result) {
        $res =  array('status' => 200, 'msg' => "User Register Successfully");
        echo json_encode($res);

    } else {
        echo "Error: " . mysqli_error($conn);
    }

    }

 }