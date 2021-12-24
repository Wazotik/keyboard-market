import React from 'react'
import styles from "./product-card-styles.module.css";

const ProductCard = ({ name, imgUrl, price}) => {
	return (
		<div className={styles.card}>
			<div className={styles.imgContainer}>
				<img src={imgUrl} alt="" />
			</div>
			<div className={styles.name}>{name}</div>
			<div className={styles.price}>{price}</div>
		</div>
	)
}

export default ProductCard;
