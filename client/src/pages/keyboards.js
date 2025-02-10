import React from "react";
import styles from "../styles/keyboards-styles.module.css";
import { useState, useEffect } from "react";
import ProductCard from "../components/product-card";
import DataControlCenter from "../components/data-control-center";
import ToTopButton from "../components/to-top-button";
import { TailSpin } from "react-loader-spinner";

const axios = require("axios");

const Keyboards = () => {
	const [productElemList, setProductElemList] = useState([]);
	const [productData, setProductData] = useState([]);
	const [infoLoaded, setInfoLoaded] = useState(false);

	// Update keyboard elements with keyboard data from server
	const updateProductInfo = async () => {
		console.log("getting keyboard data");
		const res = await axios.get("/api/keyboards");
		// const res = await axios.get("/keyboards");
		const keyboardsData = res.data;
		console.log(keyboardsData);
		setProductData(keyboardsData);
		setInfoLoaded(true);

		setProductElemList(
			keyboardsData.map((product) => {
				return (
					<ProductCard
						key={product.id}
						productID={product.product_id}
						name={product.name}
						imgUrl={product.img_url}
						largerImgUrl={product.larger_img_url}
						price={product.price}
						reviews={product.reviews}
						starRating={product.star_rating}
					></ProductCard>
				);
			})
		);
	};

	// Calls updateProduceInfo() on initial page load only
	useEffect(() => {
		updateProductInfo();
	}, []);

	return (
		<div>
			<div className={styles.main}>
				<DataControlCenter
					keyboardData={productData}
					setProductElemList={setProductElemList}
				/>
				{!infoLoaded ? (
					<div className={styles.loadingData}>
						<h3>Loading Keyboard Data...</h3>
						<TailSpin
							height="40"
							width="40"
							ariaLabel="tail-spin-loading"
							radius="1"
							color="#2b2d42"
						/>
					</div>
				) : (
					<div className={styles.productList}>
						{productElemList}
					</div>
				)}
			</div>
			<ToTopButton />
		</div>
	);
};

export default Keyboards;
