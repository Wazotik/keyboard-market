CREATE DATABASE keyboard_market_app;
USE keyboard_market_app;

CREATE TABLE keyboard_info (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	img_url VARCHAR(255),
	price	DECIMAL(7, 2) NOT NULL,
	product_id INT NOT NULL,
	larger_img_url VARCHAR(255),
	star_rating INT,
	reviews JSON
);

INSERT INTO keyboard_info (name, img_url, price) values ("keychron", "fjsklfjsdlkfj", 120.45);