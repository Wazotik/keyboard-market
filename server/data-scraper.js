import puppeteer from "puppeteer";

export const scrapeProducts = async () => {
	try {
		console.log("start");
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--proxy-server="direct://"', "--proxy-bypass-list=*"],
			executablePath: process.env.CHROME_BIN || null,
		});
		console.log("launched");
		const page = await browser.newPage();
		await page.setDefaultNavigationTimeout(0);

		let allPagesKeyboardObjs = [];

		// scarpes data for all pages (need to make dynamic instead of hardcoding 12 pages)
		for (let i = 1; i <= 35; i++) {
			console.log(`Page: ${i}`);
			// let url = `https://mechanicalkeyboards.com/shop/index.php?pg=${i}&l=product_list&c=1&show=100`;
			let url = `https://mechanicalkeyboards.com/collections/mechanical-keyboards?page=${i}`;
			await page.goto(url, { waitUntil: "domcontentloaded" });
			console.log("went to url successful");

			await page.waitForSelector(".collection-product-card");
			console.log("selector waited for");

			// page.evaluate allows the manipulation of the new page rendered from the url
			let singlePageKeyboardObjs = await page.evaluate(() => {
				let productObjs = [];
				let productContainers =
					document.querySelectorAll(".collection-product-card");
				console.log(productContainers);
				productContainers.forEach((product) => {
					let obj = {
						name: product
							.querySelector(".card__title > a")
							.getAttribute("title"),
						largerImg: `https:${product
							.querySelector(".card__inner div img")
							.getAttribute("src")}`,
						price: product
							.querySelector(".price-item--regular").innerText
							.replace(/\s+/g, '') 
							.replace(/From\$/, '') 
							.replace(/\$/g, '')
						,
						productID: 
							product
								.querySelector(".card-wrapper")
								.getAttribute("data-product")
						,
					};
					console.log(obj);
					productObjs.push(obj);
					console.log("product info added");
				});
				return productObjs;
			});

			allPagesKeyboardObjs = allPagesKeyboardObjs.concat(
				singlePageKeyboardObjs
			);
		}

		// fetches additional data and updates final object array (for future features such as reviews)
		for (let i = 0; i < allPagesKeyboardObjs.length; i++) {
			let productObj = allPagesKeyboardObjs[i];
			console.log(
				`fetching data for product id: ${productObj.productID}`
			);
			let url = `https://mechanicalkeyboards.com/products/${productObj.productID}`;

			await page.goto(url, { waitUntil: "domcontentloaded" });
			console.log("went to url successful");
			await page.waitForSelector(".product__media-item");
			await page.waitForSelector(".jdgm-rev-widg__reviews");
			let largerImgUrl = await page.evaluate(() => {
				let noscriptContent = document.querySelector(".product__media-item > noscript").innerHTML;
				let tempDiv = document.createElement('div');
				tempDiv.innerHTML = noscriptContent;
				let imgUrl = `https:${tempDiv.querySelector("img").getAttribute("src")}`;
				console.log(imgUrl);
				return imgUrl;
			});
			productObj["img"] = largerImgUrl;

			let allReviewsData = await page.evaluate(() => {
				const allReviewElems =
					document.querySelectorAll(".jdgm-rev");

				// Limit on reviews reduce amount of storage used
				let numberOfReviewsToMap = 5;

				if (allReviewElems.length !== 0) {
					let reviewsData = [...allReviewElems]
						.slice(0, numberOfReviewsToMap)
						.map((reviewElem) => {
							let reviewText =
								reviewElem.querySelector(".jdgm-rev__body > p").innerText;
							let reviewDate =
								reviewElem.querySelector(".jdgm-rev__timestamp").getAttribute("data-content");
							let reviewStarRating = reviewElem.querySelector(".jdgm-rev__rating").getAttribute("data-score");
							return [reviewText, reviewDate, reviewStarRating];
						});
					return reviewsData;
				} else {
					return [];
				}
			});
			productObj["reviewsData"] = allReviewsData;

			let starRating = await page.evaluate(() => {
				let ratingElem = document.querySelector(".rating-text");
				if (ratingElem) {
					return ratingElem.innerText.trim();
				}
				else {
					return -1;
				}

			});
			productObj["starRating"] = parseInt(starRating, 10);
		}

		await browser.close();
		console.log(allPagesKeyboardObjs);
		return allPagesKeyboardObjs;
	} catch (error) {
		console.log(error);
	}
};
