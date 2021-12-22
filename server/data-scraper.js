const puppeteer = require("puppeteer");
const url =
	"https://mechanicalkeyboards.com/shop/index.php?l=product_list&c=1&show=100";

const scrapeProducts = async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);
	await page.goto(url);

	await page.waitForSelector(".product-box");
	const productObjArr = await page.evaluate(() => {
		const productObjects = [];
		const productContainers = document.querySelectorAll(".product-box");
		productContainers.forEach(product => {
			const obj = {
				productName: product.querySelector(".ebj_limit_img_height").getAttribute("alt"),
				productImg: `https://mechanicalkeyboards.com/shop/${product.querySelector(".ebj_limit_img_height").getAttribute("src")}`,
			}
			productObjects.push(obj);
		})
		return productObjects;
	})

	console.log(productObjArr);

	await browser.close();
};

scrapeProducts();
