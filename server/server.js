import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

import { scrapeProducts } from "./data-scraper.js";
import { getAllKeyboardInfo, getKeyboardInfo, updateKeyboards } from "./database.js";

import * as databaseUpdater from "./database-updater.js" ;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is up!");
});

app.get("/all-keyboards-info", async (req, res) => {
	console.log('incoming request for all keyboard info');
	const allKeyboardInfo = await getAllKeyboardInfo();
	console.log(allKeyboardInfo);
	res.send(allKeyboardInfo);
});

// app.get("/single-keyboard-info/:id", async (res, req) => {
// 	const id = req.params.id;
// 	const keyboardInfo = await getKeyboardInfo(id)
// 	res.send(keyboardInfo);
// })

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
