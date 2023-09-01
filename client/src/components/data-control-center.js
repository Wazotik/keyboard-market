import React, { useEffect, useState, useRef } from 'react';
import styles from './data-control-center-style.module.css';
import MultiRangeSlider from "multi-range-slider-react";
import ProductCard from './product-card';
import { sortPriceHigh, sortPriceLow } from '../scripts/sortFunctions';


const DataControlCenter = ({keyboardData, setProductElemList, sortHighFunction, sortLowFunction}) => {

	const [searchText, setSearchText] = useState("");
	const [minPrice, setMinPrice] = useState(undefined);
	const [maxPrice, setMaxPrice] = useState(undefined);
	const [sortFunction, setSortFunction] = useState(undefined);
	// const [filteredKeyboardElems, setFilteredKeyboardElems] = useState([]);

	const saveSearchText = (event) => {
		setSearchText(event.target.value);
	}

	const saveMinPrice = (event) => {
		setMinPrice(event.target.value);
	}

	const saveMaxPrice = (event) => {
		setMaxPrice(event.target.value);
	}

	const saveSortFunction = (event) => {
		setSortFunction(event.target.value);
	}

	const handleSort = (data) => {
		const selectedSort = sortFunction;
		let sortedData = []
		if (selectedSort === "priceAsc") {
			sortedData = sortPriceLow(data)
		}
		else if (selectedSort === "priceDesc") {
			sortedData = sortPriceHigh(data);
		}
		else {
			alert("INCOREECT SORT SELECTION");
		}
		return sortedData;
	};

	const filterKeyboardData = () => {
		let filteredData = keyboardData;
		if (searchText) {
			filteredData = filteredData.filter((keyboard) => keyboard.name.toLowerCase().includes(searchText.toLowerCase()));
		}

		if (minPrice) {
			filteredData = filteredData.filter((keyboard) => Number(keyboard.price.substring(1)) > minPrice);
		}

		if (maxPrice) {
			filteredData = filteredData.filter((keyboard) => Number(keyboard.price.substring(1)) < maxPrice);
		}

		if (sortFunction) {
			filteredData = handleSort(filteredData);
		}
		console.log(filteredData);
		setProductElemList(
			filteredData.map((product) => {
				return (
					<ProductCard
						name={product.name}
						imgUrl={product.img_url}
						price={product.price}
					></ProductCard>
				);
			})
		)
	}

	useEffect(() => {
		filterKeyboardData();
	}, [searchText, sortFunction, minPrice, maxPrice]);

	return (
		<div>
			<div className={styles.dataControlCenterContainer}>

				<div className={`${styles.inputContainer} ${styles.inputContainerBigger}`}>
					<label htmlFor="searchInput">Find a keyboard:</label>
					<input id='searchInput'  type="text" placeholder="Enter keywords (Ducky, Black, 60%)..." onChange={saveSearchText} />
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor="sortSelection">Sort by:</label>
					<select name="" id="sortSelection" onChange={saveSortFunction} >
						<option value="priceAsc">Price (asc)</option>
						<option value="priceDesc">Price (desc)</option>
					</select>
				</div>

				<div className={styles.inputContainer}>
					<label htmlFor="minPriceInput">Min price:</label>
					<input id='minPriceInput' type="number" placeholder="" onChange={saveMinPrice} />
				</div>

				<div className={styles.inputContainer}>
					<label htmlFor="maxPriceInput">Max price:</label>
					<input id='maxPriceInput' type="number" placeholder="" onChange={saveMaxPrice} />
				</div>

				<div className={styles.restButtonContainer}>
					<button type="button">Reset</button>
				</div>
			</div>
		</div>
	);
}
;
export default DataControlCenter;