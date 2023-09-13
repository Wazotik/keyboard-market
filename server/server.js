import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

import {
	getKeyboards,
	getKeyboard,
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

// Retrieve all keyboards
app.get("/keyboards", async (req, res) => {
	console.log("incoming request for all keyboard info");
	const keyboards = await getKeyboards();
	console.log(keyboards);
	res.status(200).json(keyboards);
});

// Retrieve a specific keyboard based on product id
app.get("/keyboards/:id", async (req, res) => {
    const keyboard = await getKeyboard(req.params.id);
    if (!keyboard) {
        res.status(404).json({ error: "Keyboard not found" });
    } else {
        res.status(200).json(keyboard);
    }
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
