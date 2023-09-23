import React, { useEffect, useState  } from 'react';
import styles from '../styles/data-control-center-styles.module.css';
import ProductCard from './product-card';
import { sortAsc, sortDesc } from '../scripts/sortFunctions';


const DataControlCenter = ({keyboardData, setProductElemList}) => {

	const [searchText, setSearchText] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [sortFunction, setSortFunction] = useState("");

	const clearInputFields = () => {
		setSearchText("");
		setMinPrice("");
		setMaxPrice("");
		setSortFunction("");
	}

	// selects sorting function depending on user selection
	const handleSort = (keyboardData) => {
		let sortedData = []
		if (sortFunction === "priceAsc") {
			sortedData = sortAsc(keyboardData, "price")
		}
		else if (sortFunction === "priceDesc") {
			sortedData = sortDesc(keyboardData, "price");
		}
		else if (sortFunction === "starAsc") {
			sortedData = sortAsc(keyboardData, "star")
		}
		else if (sortFunction === "starDesc") {
			sortedData = sortDesc(keyboardData, "star");
		}
		else {
			alert("INCORRECT SORT SELECTION");
		}
		return sortedData;
	};


	// invokes on mount, goes through all possible filtering inputs and filters data
	const filterKeyboardData = () => {
		let filteredData = keyboardData;
		if (searchText) {
			filteredData = filteredData.filter((keyboard) => keyboard.name.toLowerCase().includes(searchText.toLowerCase()));
		}

		if (minPrice) {
			filteredData = filteredData.filter((keyboard) => parseFloat(keyboard.price) >= minPrice);
		}

		if (maxPrice) {
			filteredData = filteredData.filter((keyboard) => parseFloat(keyboard.price) <= maxPrice);
		}

		if (sortFunction) {
			filteredData = handleSort(filteredData);
		}
		console.log(filteredData);
		setProductElemList(
			filteredData.map((product) => {
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
		)
	}

	// filters data only if state of inputs is changed
	useEffect(() => {
		filterKeyboardData();
		
	}, [searchText, sortFunction, minPrice, maxPrice]);

	return (
		<div>
			<div className={styles.dataControlCenterContainer}>

				<div className={`${styles.inputContainer} ${styles.inputContainerBigger}`}>
					<label htmlFor="searchInput">Find a keyboard:</label>
					<input id='searchInput' value={searchText} type="text" placeholder="Enter keywords (Ducky, Black, 60%)..." onChange={(e) => setSearchText(e.target.value)} />
				</div>

				<div className={styles.inputContainer}>
					<label htmlFor="minPriceInput">Min price:</label>
					<input value={minPrice} id='minPriceInput' type="number" placeholder="" onChange={(e) => setMinPrice(e.target.value)} />
				</div>

				<div className={styles.inputContainer}>
					<label htmlFor="maxPriceInput">Max price:</label>
					<input value={maxPrice} id='maxPriceInput' type="number" placeholder="" onChange={(e) => setMaxPrice(e.target.value)} />
				</div>
				
				<div className={styles.inputContainer}>
					<label htmlFor="sortSelection">Sort by:</label>
					<select name="" value={sortFunction} id="sortSelection" onChange={(e) => setSortFunction(e.target.value)} >
						<option value={""} disabled selected></option>
						<option value="priceAsc">Price (asc)</option>
						<option value="priceDesc">Price (desc)</option>
						<option value="starAsc">Star Rating (asc)</option>
						<option value="starDesc">Star Rating (desc)</option>
					</select>
				</div>

				<div className={styles.resetButtonContainer}>
					<button type="button" onClick={clearInputFields}>Reset</button>
				</div>
			</div>
		</div>
	);
}
;
export default DataControlCenter;