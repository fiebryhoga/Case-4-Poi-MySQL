<?php
// Pastikan ada koneksi ke database sebelumnya
// Contoh koneksi menggunakan MySQLi
$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

// Cek koneksi
if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

// Ambil data dari form
$id = $_POST['id'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$nama = $_POST['nama'];
$description = $_POST['description'];
$category = $_POST['category'];
$rating = $_POST['rating'];
$contact = $_POST['contact'];

$query = "UPDATE poi SET latitude=?, longitude=?, nama=?, description=?, category=?, rating=?, contact=? WHERE id=?";
$stmt = $mysqli->prepare($query);

$stmt->bind_param("ddsssssi", $latitude, $longitude, $nama, $description, $category, $rating, $contact, $id);

if ($stmt->execute()) {
    echo "Data POI berhasil diupdate";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error;
}

$stmt->close();

$mysqli->close();
