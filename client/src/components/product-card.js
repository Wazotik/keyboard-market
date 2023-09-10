import { useState } from "react";
import styles from "../styles/product-card-styles.module.css";
import KeyboardReviewModal from "./keyboard-reviews-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const ProductCard = ({ name, imgUrl, largerImgUrl, price, reviews, starRating }) => {

	const [modalVisible, setModalVisible] = useState(false);

	const toggleReviewsModal = () => {
		setModalVisible(!modalVisible);
		if (modalVisible) {
			document.body.style.overflow = "auto";
		}
		else {
			document.body.style.overflow = "hidden";
		}
	}

	return (
		<div>
			<div className={styles.card} onClick={toggleReviewsModal}>
				<div className={styles.imgContainer} >
					{/* <img src={imgUrl} alt="" /> */}
					<LazyLoadImage src={imgUrl} alt={`${name} image`} effect="opacity"/>
				</div>
				<div className={styles.name}>{name}</div>
				<div className={styles.price}>${price}</div>
			</div>
			{modalVisible ? 
				<KeyboardReviewModal toggleReviewsModal={toggleReviewsModal} largerImgUrl={largerImgUrl} reviews={reviews} starRating={starRating}/> 
				: null
			}
		</div>
	);
};

export default ProductCard;
