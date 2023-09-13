import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: '3306',
}).promise();


// query table for all rows
export const getKeyboards = async () => {
	const res = await pool.query(`SELECT * FROM ${process.env.MYSQL_DATABASE_TABLE}`);
	return res[0];
};


// query table for a single row depending on product id
export const getKeyboard = async (id) => {
	const res = await pool.query(`SELECT * FROM ${process.env.MYSQL_DATABASE_TABLE} WHERE product_id=?`, [id]);
	return res[0];
}


// update (delete, restart id increment, insert) all rows
export const updateKeyboards = async (keyboardObjArr) => {
	await pool.query(`DELETE FROM ${process.env.MYSQL_DATABASE_TABLE}`);
	await pool.query(`ALTER TABLE ${process.env.MYSQL_DATABASE_TABLE} AUTO_INCREMENT=1`);
	for (let keyboardObj of keyboardObjArr) {
		await pool.query(`INSERT INTO ${process.env.MYSQL_DATABASE_TABLE} (name, img_url, price, product_id, larger_img_url, star_rating, reviews) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
			[keyboardObj.name, keyboardObj.img, keyboardObj.price, keyboardObj.productID, keyboardObj.largerImg, keyboardObj.starRating, JSON.stringify(keyboardObj.reviewsData)]);
	}
}


