import * as dataScraper from"./data-scraper.js";
import { updateKeyboards } from "./database.js";
import cron from "node-cron";

// Update database with new scraped keyboard info every 5 minutes hour
cron.schedule("*/5 * * * *", async () => {
	try {
		console.log("updating keyboard info in DB");
		const scrapedKeyboardData = await dataScraper.scrapeProducts();
		await updateKeyboards(scrapedKeyboardData);
		console.log("Data scraped and saved to DB successfully :)");
	} catch (error) {
		console.error("Error with Database updater", error);
	}
});

// cron.schedule("* * * * *", async () => {
// });



