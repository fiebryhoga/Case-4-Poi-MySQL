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

// Query untuk mengupdate data POI dalam database
$query = "UPDATE poi SET latitude='$latitude', longitude='$longitude', nama='$nama', description='$description', category='$category', rating='$rating', contact='$contact' WHERE id='$id'";

// Eksekusi query
if ($mysqli->query($query) === true) {
    echo "Data POI berhasil diupdate";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error;
}

// Tutup koneksi ke database
$mysqli->close();
