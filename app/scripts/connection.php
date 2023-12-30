<?php
class Connection {
    private $servername = "localhost";
    private $username = "root";
    private $password = "vas181514@";
    private $dbname = "todo_plus";
    private $conn;

    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }else {
            echo "Connected successfully";
        }
    }

    public function getConnection() { 
        return $this->conn;
    }
}
?>
