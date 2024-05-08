<?php

$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$nama = $_POST['nama'];
$description = $_POST['description'];
$category = $_POST['category'];
$rating = $_POST['rating'];
$contact = $_POST['contact'];


$query = "INSERT INTO poi (latitude, longitude, nama, description, category, rating, contact) VALUES ('$latitude', '$longitude', '$nama', '$description', '$category', '$rating',  '$contact')";
if ($mysqli->query($query) === true) {
    echo "Data POI berhasil disimpan";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error;
}

$mysqli->close();
