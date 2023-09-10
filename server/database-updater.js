import * as dataScraper from "./data-scraper.js";
import { updateKeyboards } from "./database-querying.js";
import cron from "node-cron";

// Update database with new scraped keyboard every week on a Sunday
cron.schedule("0 0 * * 0", async () => {
	try {
		console.log("updating keyboard info in DB");
		const scrapedKeyboardData = await dataScraper.scrapeProducts();
		if (scrapedKeyboardData.length !== 0) {
			await updateKeyboards(scrapedKeyboardData);
			console.log("Data scraped and saved to DB successfully :)");
		}
		else {
			console.log("UNABLE TO GET SCRAPED DATA");
		}
	} catch (error) {
		console.error("ERROR WITH DATABASE UPDATER:", error);
	}
});
