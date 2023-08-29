import puppeteer from "puppeteer";
const url =
	"https://mechanicalkeyboards.com/shop/index.php?l=product_list&c=1&show=100";

export const scrapeProducts = async () => {
	console.log("start");
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--proxy-server="direct://"', "--proxy-bypass-list=*"],
	});
	console.log("launched");
	const page = await browser.newPage();
	console.log("new page created");
	await page.setDefaultNavigationTimeout(0);
	await page.goto(url, { waitUntil: "domcontentloaded" });
	console.log("went to url successful");

	await page.waitForSelector(".product-box");
	console.log("selector waited for");

	// page.evaluate allows the manipulation of the new page rendered from the url
	const productObjArr = await page.evaluate(() => {
		const productObjects = [];
		const productContainers = document.querySelectorAll(".product-box");
		productContainers.forEach((product) => {
			const obj = {
				name: product
					.querySelector(".ebj_limit_img_height")
					.getAttribute("alt"),
				img: `https://mechanicalkeyboards.com/shop/${product
					.querySelector(".ebj_limit_img_height")
					.getAttribute("src")}`,
				price: product.querySelector(".sale").innerText,
			};
			productObjects.push(obj);
			console.log("product info added");
		});
		return productObjects;
	});

	await browser.close();
	console.log(productObjArr);
	return productObjArr;
};
