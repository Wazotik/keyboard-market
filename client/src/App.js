import styles from "./App.module.css";
import { useState, useEffect } from "react";
import ProductCard from "./components/product-card";

const axios = require("axios");

function App() {
	const [productElemList, setProductElemList] = useState([]);
	const [productInfo, setProductInfo] = useState([]);

	const updateProductInfo = async () => {
		const res = await axios.get("/scraped-product-info");
		const info = res.data
		setProductInfo(res.data);

		setProductElemList(
			info.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img}
						price={product.price}
					></ProductCard>
				);
			})
		);
	};

	const sortPriceHigh = () => {
		const sortedProducts = productInfo.sort((a, b) => {
			if (Number(a.price.substring(1) > Number(b.price.substring(1)))) {
				return -1;
			}
			else if (Number(a.price.substring(1) < Number(b.price.substring(1)))) {
				return 1;
			}
			else {
				return 0;
			}
		});

		setProductElemList(
			sortedProducts.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img}
						price={product.price}
					></ProductCard>
				);
			})
		);
	};

	const sortPriceLow = () => {
		const sortedProducts = productInfo.sort((a, b) => {
			if (Number(a.price.substring(1) < Number(b.price.substring(1)))) {
				return -1;
			}
			else if (Number(a.price.substring(1) > Number(b.price.substring(1)))) {
				return 1;
			}
			else {
				return 0;
			}
		});

		setProductElemList(
			sortedProducts.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img}
						price={product.price}
					></ProductCard>
				);
			})
		);
	};

	useEffect(() => {
		updateProductInfo();
	}, []);

	return (
		<div className="App">
			<div>
				<button onClick={sortPriceHigh}>Sort by highest price</button>
			</div>
			<div>
				<button onClick={sortPriceLow}>Sort by lowest price</button>
			</div>
			<div className={styles.productList}>{productElemList}</div>
		</div>
	);
}

export default App;
