<?php
// Pastikan ada koneksi ke database sebelumnya
// Contoh koneksi menggunakan MySQLi
$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

// Cek koneksi
if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

// Periksa apakah parameter $_POST['id'] telah diset
if (isset($_POST['id'])) {
    // Ambil id POI dari permintaan POST
    $id = $mysqli->real_escape_string($_POST['id']); // Mengamankan input dari serangan SQL Injection

    // Query untuk menghapus data POI dari database
    $query = "DELETE FROM poi WHERE id = $id";

    // Eksekusi query
    if ($mysqli->query($query) === true) {
        echo "success";
    } else {
        echo "Error: " . $query . "<br>" . $mysqli->error;
    }
} else {
    echo "Parameter id tidak ditemukan";
}

// Tutup koneksi ke database
$mysqli->close();
