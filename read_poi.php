<?php
// Pastikan ada koneksi ke database sebelumnya
// Contoh koneksi menggunakan MySQLi
$mysqli = new mysqli("localhost", "root", "", "pemrogramanWeb");

// Cek koneksi
if ($mysqli->connect_error) {
    die("Koneksi ke database gagal: " . $mysqli->connect_error);
}

// Query untuk membaca data POI dari database
$query = "SELECT * FROM poi";

// Eksekusi query
$result = $mysqli->query($query);

// Buat array kosong untuk menyimpan data POI
$poiData = array();

// Jika query berhasil dieksekusi
if ($result) {
    // Loop melalui hasil query dan tambahkan data ke array
    while ($row = $result->fetch_assoc()) {
        $poiData[] = $row;
    }
}

// Kembalikan data dalam format JSON
echo json_encode($poiData);

// Tutup koneksi ke database
$mysqli->close();
