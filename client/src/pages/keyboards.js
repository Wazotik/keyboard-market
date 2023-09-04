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

	// Update keyboard elements with keyboard data from server
	const updateProductInfo = async () => {
		console.log("getting keyboard data");
		// const res = await axios.get("/api/all-keyboards-info");
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

	// Calls updateProduceInfo() once when productElemList is mounted
	useEffect(() => {
		updateProductInfo();
	}, []);



	return (
		<div>
			{/* <div className={styles.title}>
				<h1>Discover new keyboards!</h1>
			</div> */}
			<DataControlCenter keyboardData={productData} setProductElemList={setProductElemList} />

			<div
				style={{
					display: infoLoaded ? "none" : "grid",
					placeContent: "center",
					height: "70vh",
					textAlign: "center",
					fontFamily: "Poppins",
					margin: "0",
					backgroundColor: "#edf2f4",
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
