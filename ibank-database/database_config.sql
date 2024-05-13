DROP DATABASE IF EXISTS ibank_management_system;
CREATE DATABASE ibank_management_system;
USE ibank_management_system;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    membership_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    value INT NOT NULL,
    balance_before INT NOT NULL,
    balance_after INT NOT NULL,
    description VARCHAR(255),
    CONSTRAINT fk_user_id_transactions FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
