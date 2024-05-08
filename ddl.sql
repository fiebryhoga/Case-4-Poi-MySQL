CREATE TABLE poi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    nama VARCHAR(255),
    description TEXT,
    category VARCHAR(50),
    rating DECIMAL(3, 2),
    contact VARCHAR(255)
);


-- database : pemrogramanWeb --