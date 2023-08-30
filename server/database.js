import mysql from "mysql2";
import cron from "node-cron";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
}).promise();

export const getAllKeyboardInfo = async () => {
	const res = await pool.query("SELECT * FROM keyboard_info");
	return res[0];
};

// id=? -> stops sql injections
export const getKeyboardInfo = async (id) => {
	const res = await pool.query(`SELECT * FROM keyboard_info WHERE id=?`, [id]);
	return res[0];
}

export const insertKeyboardInfo = async (name, img_url, price) => {
	await pool.query(`INSERT INTO ${process.env.MYSQL_DATABASE_TABLE} (name, img_url, price) VALUES (?, ?, ?)`, [name, img_url, price]);
};

export const updateKeyboards = async (keyboardObjArr) => {
	await pool.query(`DELETE FROM ${process.env.MYSQL_DATABASE_TABLE}`);
	for (let keyboardObj of keyboardObjArr) {
		await pool.query(`INSERT INTO ${process.env.MYSQL_DATABASE_TABLE} (name, img_url, price) VALUES (?, ?, ?)`, [keyboardObj.name, keyboardObj.img, keyboardObj.price]);
	}
}


