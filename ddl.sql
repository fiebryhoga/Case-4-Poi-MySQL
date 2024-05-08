CREATE TABLE poi (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    latitude DECIMAL(10,8) NULL,
    longitude DECIMAL(11,8) NULL,
    nama VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    category VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    rating DECIMAL(3,2) NULL,
    contact VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
);


-- database : pemrogramanWeb --