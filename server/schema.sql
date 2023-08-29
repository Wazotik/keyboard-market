CREATE DATABASE keyboard_market_app;
USE keyboard_market_app;

CREATE TABLE keyboard_info (
	id integer PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	img_url VARCHAR(255),
	price VARCHAR(255)
);

INSERT INTO keyboard_info (name, img_url, price) values ("keychron", "fjsklfjsdlkfj", 120.45);