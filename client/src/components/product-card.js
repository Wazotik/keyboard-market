import React, { useState } from "react";
import styles from "./product-card-styles.module.css";

const ProductCard = ({ name, imgUrl, price }) => {
	const [showButton, setShowButton] = useState(false);

	return (
		<div
			onMouseEnter={() => {
				setShowButton(true);
			}}
			onMouseLeave={() => {
				setShowButton(false);
			}}
			className={styles.card}
		>
			<div className={styles.imgContainer}>
				<img src={imgUrl} alt="" />
			</div>
			<div className={styles.name}>{name}</div>
			<div className={styles.price}>{price}</div>

			<button style={{
				opacity: showButton ? "1" : "0",
				transform: showButton ? "translateY(1rem)" : "translateY(0rem)",
			}} className={styles.addButton}>Add To Cart</button>
		</div>
	);
};

export default ProductCard;
