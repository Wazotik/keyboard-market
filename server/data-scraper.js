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

		// scarpes data for all pages (need to make dynamic instead of hardcoding 12 pages)
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
						price: parseFloat(
							product
								.querySelector(".sale")
								.innerText.substring(1)
						),
						productID: parseInt(
							product
								.querySelector("input[type='hidden']")
								.getAttribute("value"),
							10
						),
					};
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
			let url = `https://mechanicalkeyboards.com/shop/index.php?l=product_detail&p=${productObj.productID}`;

			await page.goto(url, { waitUntil: "domcontentloaded" });
			console.log("went to url successful");
			await page.waitForSelector(".product-info");
			await page.waitForSelector(".review-list");
			let largerImgUrl = await page.evaluate(() => {
				let productInfoElem = document.querySelector(".product-info");
				let imgUrl = `https://mechanicalkeyboards.com/shop/${productInfoElem
					.querySelector("img")
					.getAttribute("src")}`;
				return imgUrl;
			});
			productObj["largerImg"] = largerImgUrl;

			let allReviewsData = await page.evaluate(() => {
				const allReviewElems =
					document.querySelectorAll(".review-content");

				// Limit on reviews reduce amount of storage used
				let numberOfReviewsToMap = 10;

				if (allReviewElems.length !== 0) {
					let reviewsData = [...allReviewElems]
						.slice(0, numberOfReviewsToMap)
						.map((reviewElem) => {
							let reviewText =
								reviewElem.querySelector("p").innerText;
							let reviewDate =
								reviewElem.previousElementSibling.querySelector(
									"span"
								).innerText;
							return [reviewText, reviewDate];
						});
					console.log(reviewsData);
					return reviewsData;
				} else {
					return [];
				}
			});
			productObj["reviewsData"] = allReviewsData;

			let starRating = await page.evaluate(() => {
				let productMetadataElem =
					document.querySelector(".review-metadata");
				if (productMetadataElem) {
					let rating = productMetadataElem
						.querySelector("img")
						.getAttribute("src")
						.charAt(13);
					return rating;
				} else {
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
