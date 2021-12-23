const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const dataScraper = require("./data-scraper");

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is up!");
});

app.get("/scraped-product-info", async (req, res) => {
	console.log("requesting product info...");
	const productInfo = await dataScraper.scrapeProducts();
	res.send(productInfo);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
