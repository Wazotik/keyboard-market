import React from 'react'
import styles from "./keyboards-styles.module.css";
import { useState, useEffect } from "react";
import ProductCard from "../components/product-card";
import Navbar from "../components/navbar.js";
import DataControlCenter from '../components/data-control-center';

const axios = require("axios");

const Keyboards = () => {
	const [productElemList, setProductElemList] = useState([]);
	const [productData, setProductData] = useState([]);
	const [infoLoaded, setInfoLoaded] = useState(false);

	// const [productsInCart, setProductsInCart] = useState([]);

	const updateProductInfo = async () => {
		const res = await axios.get("/all-keyboards-info");
		setInfoLoaded(true);
		const keyboardsData = res.data;
		console.log(keyboardsData);
		setProductData(keyboardsData);

		setProductElemList(
			keyboardsData.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img_url}
						price={product.price}
					></ProductCard>
				);
			})
		);
	};
	useEffect(() => {
		updateProductInfo();
	}, []);

	const sortPriceHigh = () => {
		const sortedProducts = productData.sort((a, b) => {
			if (Number(a.price.substring(1) > Number(b.price.substring(1)))) {
				return -1;
			} else if (
				Number(a.price.substring(1) < Number(b.price.substring(1)))
			) {
				return 1;
			} else {
				return 0;
			}
		});

		setProductElemList(
			sortedProducts.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img_url}
						price={product.price}
					></ProductCard>
				);
			})
		);
	};

	const sortPriceLow = () => {
		const sortedProducts = productData.sort((a, b) => {
			if (Number(a.price.substring(1) < Number(b.price.substring(1)))) {
				return -1;
			} else if (
				Number(a.price.substring(1) > Number(b.price.substring(1)))
			) {
				return 1;
			} else {
				return 0;
			}
		});

		setProductElemList(
			sortedProducts.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img_url}
						price={product.price}
					></ProductCard>
				);
			})
		);
	};



	return (
		<div>
			{/* <div className={styles.title}>
				<h1>Discover new keyboards!</h1>
			</div> */}
			<DataControlCenter keyboardData={productData} setProductElemList={setProductElemList} sortHighFunction={sortPriceHigh} sortLowFunction={sortPriceLow} />

			<div
				style={{
					display: infoLoaded ? "none" : "grid",
					placeContent: "center",
					height: "70vh",
					textAlign: "center",
					fontFamily: "Poppins",
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
		</div>
	);
}


export default Keyboards;
