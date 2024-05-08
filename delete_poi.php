<?php
// Pastikan ada koneksi ke database sebelumnya
// Contoh koneksi menggunakan MySQLi
$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

// Cek koneksi
if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

// Ambil id POI dari permintaan POST
$id = $_POST['id'];

// Query untuk menghapus data POI dari database
$query = "DELETE FROM poi WHERE id = $id";

// Eksekusi query
if ($mysqli->query($query) === true) {
    echo "Data POI berhasil dihapus";
} else {
    echo "Error: " . $query . "<br>" . $mysqli->error;
}

// Tutup koneksi ke database
$mysqli->close();
