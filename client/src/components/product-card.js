import { useState } from "react";
import styles from "../styles/product-card-styles.module.css";
import KeyboardReviewModal from "./keyboard-reviews-modal";

const ProductCard = ({ productID, name, imgUrl, price }) => {

	const [modalVisible, setModalVisible] = useState(false);

	const toggleReviewsModal = () => {
		setModalVisible(!modalVisible);
		console.log(modalVisible);
	}

	return (
		<div>
			<div className={styles.card} onClick={toggleReviewsModal}>
				<div className={styles.imgContainer} >
					<img src={imgUrl} alt="" />
				</div>
				<div className={styles.name}>{name}</div>
				<div className={styles.price}>${price}</div>
			</div>
			{modalVisible ? <KeyboardReviewModal toggleReviewsModal={toggleReviewsModal}/> : null}
		</div>
	);
};

export default ProductCard;
