const puppeteer = require("puppeteer");
const url =
	"https://mechanicalkeyboards.com/shop/index.php?l=product_list&c=1&show=100";

const scrapeProducts = async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(url);

	await page.waitForSelector("img");
	const productImgSrcs = await page.evaluate(() => {
		const imgSrs = Array.from(document.querySelectorAll(".ebj_limit_img_height")).map(
			(image) => {
				return `https://mechanicalkeyboards.com/shop/${image.getAttribute("src")}`;
			}
		);
		return imgSrs;
	});

	

	console.log(productImgSrcs);


	await browser.close();
};

scrapeProducts();
