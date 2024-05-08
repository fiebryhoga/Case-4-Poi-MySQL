<?php

$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

if (isset($_POST['id'])) {
    $id = $mysqli->real_escape_string($_POST['id']); 

    $query = "DELETE FROM poi WHERE id = $id";

    if ($mysqli->query($query) === true) {
        echo "success";
    } else {
        echo "Error: " . $query . "<br>" . $mysqli->error;
    }
} else {
    echo "Parameter id tidak ditemukan";
}

$mysqli->close();
