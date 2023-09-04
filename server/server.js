import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

import { scrapeProducts } from "./data-scraper.js";
import {
	getKeyboards,
	getKeyboard,
	updateKeyboards,
} from "./database-querying.js";

// invokes cron scheduled database updating
import * as databaseUpdater from "./database-updater.js";

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.get("/", (req, res) => {
	res.send("Server is up!");
});

app.get("/all-keyboards-info", async (req, res) => {
	console.log("incoming request for all keyboard info");
	const allKeyboardInfo = await getKeyboards();
	console.log(allKeyboardInfo);
	res.send(allKeyboardInfo);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
