<!-- index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POI Management</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

    <style>.popup-confirmation {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
}

.popup-content {
    text-align: center;
}

.popup-content p {
    margin-bottom: 15px;
}

.popup-content button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
}

.popup-content button:hover {
    background-color: #c82333;
}

.popup-content button:last-child {
    background-color: #6c757d;
}

.popup-content button:last-child:hover {
    background-color: #5a6268;
}
</style>
</head>
<body>
    <div class="container mt-5">
        <h2>Points of Interest</h2>
        <div id="map" style="height: 80vh;"></div>
    </div>

    

    <!-- Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<!-- Custom JS -->
<script src="script.js"></script>
</body>
</html>
