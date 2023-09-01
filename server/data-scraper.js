import puppeteer from "puppeteer";

export const scrapeProducts = async () => {
	try {
		console.log("start");
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--proxy-server="direct://"', "--proxy-bypass-list=*"],
		});
		console.log("launched");
		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);

		let allPagesKeyboardObjs = [];

		for (let i = 1; i <= 12; i++) {
			console.log(`Page: ${i}`);
			let url = `https://mechanicalkeyboards.com/shop/index.php?pg=${i}&l=product_list&c=1&show=100`;
			await page.goto(url, { waitUntil: "domcontentloaded" });
			console.log("went to url successful");

			await page.waitForSelector(".product-box");
			console.log("selector waited for");

			// page.evaluate allows the manipulation of the new page rendered from the url
			let singlePageKeyboardObjs = await page.evaluate(() => {
				let productObjs = [];
				let productContainers =
					document.querySelectorAll(".product-box");
				console.log(productContainers);
				productContainers.forEach((product) => {
					let obj = {
						name: product
							.querySelector(".ebj_limit_img_height")
							.getAttribute("alt"),
						img: `https://mechanicalkeyboards.com/shop/${product
							.querySelector(".ebj_limit_img_height")
							.getAttribute("src")}`,
						price: product.querySelector(".sale").innerText,
					};
					productObjs.push(obj);
					console.log("product info added");
				});
				return productObjs;
			});

			allPagesKeyboardObjs = allPagesKeyboardObjs.concat(singlePageKeyboardObjs);
		}

		await browser.close();
		console.log(allPagesKeyboardObjs);
		return allPagesKeyboardObjs;
	} catch (error) {
		console.log(error);
	}
};
