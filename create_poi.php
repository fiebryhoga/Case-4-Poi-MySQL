<?php
// Pastikan ada koneksi ke database sebelumnya
// Contoh koneksi menggunakan MySQLi
$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

// Cek koneksi
if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

// Ambil data dari form
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$nama = $_POST['nama'];
$description = $_POST['description'];
$category = $_POST['category'];
$rating = $_POST['rating'];
$contact = $_POST['contact'];

// Tambahan atribut lain sesuai kebutuhan

// Query untuk menyimpan data POI ke dalam database
$query = "INSERT INTO poi (latitude, longitude, nama, description, category, rating, contact) VALUES ('$latitude', '$longitude', '$nama', '$description', '$category', '$rating',  '$contact')";
// Eksekusi query
if ($mysqli->query($query) === true) {
    echo "Data POI berhasil disimpan";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error;
}

// Tutup koneksi ke database
$mysqli->close();
