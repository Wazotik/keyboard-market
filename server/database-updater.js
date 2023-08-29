import * as dataScraper from"./data-scraper.js";
import { insertKeyboards } from "./database.js";
import cron from "node-cron";

// Update database with new scraped keyboard info every 1st day of the month
cron.schedule("0 0 1 * *", async () => {
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



