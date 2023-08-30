import * as dataScraper from"./data-scraper.js";
import { insertKeyboards } from "./database.js";
import cron from "node-cron";

// Update database with new scraped keyboard info every Sunday
cron.schedule("0 0 * * 0", async () => {
	try {
		const scrapedKeyboardData = await dataScraper.scrapeProducts();
		await insertKeyboards(scrapedKeyboardData);
		console.log("Data scraped and saved to DB successfully :)");
	} catch (error) {
		console.error("Error with Database updater", error);
	}
});

// cron.schedule("* * * * *", async () => {
// });



