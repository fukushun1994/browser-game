CREATE DATABASE browser_game;

CREATE TABLE users(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(32) UNIQUE,
    password_hash VARCHAR(256)
)ENGINE=InnoDB;

CREATE TABLE characters(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    owner INTEGER,
    name VARCHAR(64),
    hp INTEGER,
    atk INTEGER,
    def INTEGER,
    money INTEGER,
    exp INTEGER,
    level INTEGER,
    FOREIGN KEY(owner) REFERENCES users(id)
)ENGINE=InnoDB;

CREATE TABLE enemies(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64),
    hp INTEGER,
    atk INTEGER,
    def INTEGER,
)ENGINE=InnoDB;