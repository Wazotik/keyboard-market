import React from 'react'
import styles from "../styles/keyboards-styles.module.css";
import { useState, useEffect } from "react";
import ProductCard from "../components/product-card";
import DataControlCenter from '../components/data-control-center';
import ToTopButton from '../components/to-top-button';

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
			<DataControlCenter keyboardData={productData} setProductElemList={setProductElemList} />

			<div
				style={{
					display: infoLoaded ? "none" : "grid",
					placeContent: "center",
					height: "65vh",
					textAlign: "center",
					fontFamily: "Poppins, sans-serif",
					margin: "0",
				}}
			>
				<h2>loading keyboard data...</h2>
				<img
					src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
					alt=""
					style={{
						width: "50%",
						margin: "0 auto",
					}}
				/>
			</div>
			<div className={styles.productList}>{productElemList}</div>
			<ToTopButton />
		</div>
	);
}


export default Keyboards;
