import * as dataScraper from "./data-scraper.js";
import { updateKeyboards } from "./database-querying.js";
import cron from "node-cron";

// Update database with new scraped keyboard every 2 days at 11pm
// cron.schedule("0 23 */2 * *", async () => {

cron.schedule("0 1 * * *", async () => {
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
