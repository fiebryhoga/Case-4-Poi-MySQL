<?php

$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

$query = "SELECT * FROM poi";

$result = $mysqli->query($query);

$poiData = array();

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $poiData[] = $row;
    }
}

echo json_encode($poiData);

$mysqli->close();
