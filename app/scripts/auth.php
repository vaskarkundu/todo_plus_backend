<?php
 class Authenticate{


    public function __construct($data){
        include_once "connection.php";

        $connection = new Connection();

        $conn = $connection->getConnection();

        $route = $data['route'];

        
        if ($route == 'signup') {
            $this->signup($conn, $data);
        
        } else{
            $response = ['status' => 404, 'msg' => "Route not found"];
            echo json_encode($response);
           
        }
  
    }


    static private function signup($conn,$data){

    $username = $data['username'];
    $email = $data['email'];
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT); 
    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $dateOfBirth = $data['date_of_birth'];


    $query = "SELECT * FROM todo_profile_list WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if($result  && mysqli_num_rows($result) > 0){
        $response = ['status' => 201, 'msg' => "This User already exits"];
        return
    }




    // 
    $query = "INSERT INTO todo_profile_list (username, email, password, firstname, lastname, date_of_birth) 
           
            --   VALUES ('john_doe', 'john@example.com', 'hashed_password', 'John', 'Doe', '1990-01-01')";

   VALUES ('$username', '$email', '$hashedPassword', '$firstname', '$lastname', '$dateOfBirth')";

    // Execute the query
    $result = mysqli_query($conn, $query);

    // Check if the query was successful
    if ($result) {
        echo "User registration successful";
        $response = ['status' => 200, 'msg' => "User Register Successfully"];
        echo json_encode($response);
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    }

 }