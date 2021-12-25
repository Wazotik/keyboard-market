import React, {useState} from "react";
import styles from "./product-card-styles.module.css";

const ProductCard = ({ name, imgUrl, price }) => {

	const [showButton, setShowButton ] = useState(false);



	return (
		<div onMouseEnter={() => {
			setShowButton(true);
		}} onMouseLeave={() => {
			setShowButton(false);
		}} className={styles.card}>
			<div className={styles.imgContainer}>
				<img src={imgUrl} alt="" />
			</div>
			<div className={styles.name}>{name}</div>
			<div className={styles.price}>{price}</div>

			<button style={showButton ? {opacity: '100', height: '3rem', transition: 'all 0.3s ease-in-out'} : {opacity: '0', height: '0', transition: 'all 0.3s ease-in-out', margin: '0'}}>Add to Cart</button>


		</div>
	);
};

export default ProductCard;
