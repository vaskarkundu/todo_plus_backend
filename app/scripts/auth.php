<?php
 class Authenticate{


    public function __construct($data){
        // echo "hyse:\n";
        // print_r($data);
        include_once "connection.php";

        $connection = new Connection();

        $conn = $connection->getConnection();
    } 


    public function index(){

    }
 }